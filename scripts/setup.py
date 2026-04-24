#!/usr/bin/env python3
"""
Open Agents — Development Environment Setup

Starts AXL nodes, MCP router, and verifies connectivity.
Run from the project root: python scripts/setup.py
"""

from __future__ import annotations

import json
import os
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
AXL_DIR = Path.home() / "axl-nodes"
AXL_BIN = AXL_DIR / "axl"
AXL_INTEGRATIONS = AXL_DIR / "integrations"
ENV_FILE = PROJECT_ROOT / ".env"

NODE_A_CONFIG = {
    "PrivateKeyPath": "private.pem",
    "Peers": [],
    "Listen": ["tls://0.0.0.0:9001"],
}

NODE_B_CONFIG = {
    "PrivateKeyPath": "private-2.pem",
    "Peers": ["tls://127.0.0.1:9001"],
    "api_port": 9003,
}

MCP_ROUTER_PORT = 9013
A2A_SERVER_PORT = 9014

_children: list[subprocess.Popen] = []


def log(msg: str) -> None:
    print(f"\033[1;36m[setup]\033[0m {msg}", flush=True)


def err(msg: str) -> None:
    print(f"\033[1;31m[setup]\033[0m {msg}", file=sys.stderr, flush=True)


def cleanup(signum=None, frame=None) -> None:
    log("Shutting down child processes...")
    for proc in reversed(_children):
        try:
            proc.terminate()
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
    sys.exit(0)


signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)


# ---------------------------------------------------------------------------
# AXL key generation
# ---------------------------------------------------------------------------

def ensure_keys() -> None:
    """Generate ed25519 private keys for both AXL nodes if missing."""
    for name in ("private.pem", "private-2.pem"):
        path = AXL_DIR / name
        if path.exists():
            log(f"Key already exists: {path}")
            continue
        log(f"Generating {name}...")
        subprocess.run(
            ["openssl", "genpkey", "-algorithm", "ed25519", "-out", str(path)],
            check=True,
        )
        path.chmod(0o600)


# ---------------------------------------------------------------------------
# AXL node configs
# ---------------------------------------------------------------------------

def write_configs() -> None:
    """Write node-config.json and node-config-2.json."""
    for name, cfg in [("node-config.json", NODE_A_CONFIG), ("node-config-2.json", NODE_B_CONFIG)]:
        path = AXL_DIR / name
        path.write_text(json.dumps(cfg, indent=2) + "\n")
        log(f"Wrote {path}")


# ---------------------------------------------------------------------------
# Start AXL nodes
# ---------------------------------------------------------------------------

def start_node(config_name: str, label: str) -> subprocess.Popen:
    """Start an AXL node in the background."""
    log(f"Starting AXL {label} ({config_name})...")
    proc = subprocess.Popen(
        [str(AXL_BIN), "-config", config_name],
        cwd=str(AXL_DIR),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    _children.append(proc)
    return proc


def wait_for_api(port: int, timeout: float = 10.0) -> bool:
    """Poll until the AXL HTTP API responds on the given port."""
    import urllib.request
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            req = urllib.request.Request(f"http://127.0.0.1:{port}/topology")
            with urllib.request.urlopen(req, timeout=2) as resp:
                if resp.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(0.3)
    return False


def get_public_key(port: int) -> str:
    """Fetch the node's public key from /topology."""
    import urllib.request
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/topology", timeout=5) as resp:
        data = json.loads(resp.read())
    return data["our_public_key"]


# ---------------------------------------------------------------------------
# MCP Router + A2A Server (from AXL integrations)
# ---------------------------------------------------------------------------

def ensure_axl_integrations() -> None:
    """Clone AXL repo integrations/ if not already present."""
    if AXL_INTEGRATIONS.exists() and (AXL_INTEGRATIONS / "pyproject.toml").exists():
        log("AXL integrations already present")
        return

    log("Cloning AXL integrations from GitHub...")
    tmp = Path("/tmp/axl-clone")
    if tmp.exists():
        shutil.rmtree(tmp)

    subprocess.run(
        ["git", "clone", "--depth=1", "--filter=blob:none", "--sparse",
         "https://github.com/gensyn-ai/axl.git", str(tmp)],
        check=True, capture_output=True,
    )
    subprocess.run(
        ["git", "sparse-checkout", "set", "integrations"],
        cwd=str(tmp), check=True, capture_output=True,
    )
    if (tmp / "integrations").exists():
        shutil.copytree(tmp / "integrations", AXL_INTEGRATIONS, dirs_exist_ok=True)
        log(f"Copied integrations to {AXL_INTEGRATIONS}")
    else:
        err("integrations/ not found in AXL repo — MCP Router won't be available")

    shutil.rmtree(tmp, ignore_errors=True)


def install_axl_integrations() -> None:
    """Install the AXL integrations dependencies (requires-python >=3.12 in their
    pyproject.toml, so we install deps directly and add to PYTHONPATH)."""
    if not (AXL_INTEGRATIONS / "pyproject.toml").exists():
        log("Skipping integrations install — not found")
        return
    log("Installing AXL integrations dependencies...")
    deps = ["aiohttp>=3.9.0", "a2a-sdk>=0.3.0", "httpx>=0.28.1", "uvicorn>=0.34.2"]
    result = subprocess.run(
        [sys.executable, "-m", "pip", "install", *deps],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        err(f"pip install failed: {result.stderr}")
    else:
        log("AXL integration dependencies installed")


def _integrations_env() -> dict[str, str]:
    """Return env with AXL integrations on PYTHONPATH."""
    env = os.environ.copy()
    env["PYTHONPATH"] = str(AXL_INTEGRATIONS) + os.pathsep + env.get("PYTHONPATH", "")
    return env


def start_mcp_router(node_config_path: Path) -> subprocess.Popen | None:
    """Start the MCP Router process."""
    if not (AXL_INTEGRATIONS / "mcp_routing").exists():
        log("MCP Router not available (integrations not installed)")
        return None

    log(f"Starting MCP Router on port {MCP_ROUTER_PORT}...")
    proc = subprocess.Popen(
        [sys.executable, "-m", "mcp_routing.mcp_router", "--port", str(MCP_ROUTER_PORT)],
        env=_integrations_env(),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    _children.append(proc)
    return proc


def start_a2a_server() -> subprocess.Popen | None:
    """Start the A2A Server process (optional — requires compatible a2a-sdk)."""
    if not (AXL_INTEGRATIONS / "a2a_serving").exists():
        log("A2A Server not available (integrations not installed)")
        return None

    log(f"Starting A2A Server on port {A2A_SERVER_PORT}...")
    proc = subprocess.Popen(
        [sys.executable, "-m", "a2a_serving.a2a_server",
         "--port", str(A2A_SERVER_PORT),
         "--router", f"http://127.0.0.1:{MCP_ROUTER_PORT}"],
        env=_integrations_env(),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    # Give it a moment to see if it crashes immediately (SDK version mismatch)
    time.sleep(2)
    if proc.poll() is not None:
        log("A2A Server failed to start (a2a-sdk version mismatch) — skipping (optional)")
        return None
    _children.append(proc)
    return proc


# ---------------------------------------------------------------------------
# .env update
# ---------------------------------------------------------------------------

def update_env(node_a_key: str, node_b_key: str) -> None:
    """Update .env with AXL node keys."""
    if not ENV_FILE.exists():
        err(f".env not found at {ENV_FILE} — skipping env update")
        return

    lines = ENV_FILE.read_text().splitlines()
    updates = {
        "AXL_NODE_A_KEY": node_a_key,
        "AXL_NODE_B_KEY": node_b_key,
        "AXL_NODE_A_URL": "http://127.0.0.1:9002",
        "AXL_NODE_B_URL": "http://127.0.0.1:9003",
    }

    existing_keys = set()
    new_lines = []
    for line in lines:
        key = line.split("=", 1)[0].strip() if "=" in line else ""
        if key in updates:
            new_lines.append(f"{key}={updates[key]}")
            existing_keys.add(key)
        else:
            new_lines.append(line)

    for key, val in updates.items():
        if key not in existing_keys:
            new_lines.append(f"{key}={val}")

    ENV_FILE.write_text("\n".join(new_lines) + "\n")
    log(f"Updated {ENV_FILE} with AXL node keys")


# ---------------------------------------------------------------------------
# Connectivity test
# ---------------------------------------------------------------------------

def test_connectivity(key_a: str, key_b: str) -> bool:
    """Send a message B→A and A→B, verify receipt."""
    import urllib.request

    log("Testing B → A...")
    req = urllib.request.Request(
        "http://127.0.0.1:9003/send",
        data=b"setup-ping-from-B",
        headers={"X-Destination-Peer-Id": key_a},
        method="POST",
    )
    try:
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        err(f"Send B→A failed: {e}")
        return False

    time.sleep(1)
    try:
        with urllib.request.urlopen("http://127.0.0.1:9002/recv", timeout=5) as resp:
            body = resp.read().decode()
            if "setup-ping-from-B" not in body:
                err(f"Unexpected message on A: {body!r}")
                return False
    except Exception as e:
        err(f"Recv on A failed: {e}")
        return False

    log("Testing A → B...")
    req = urllib.request.Request(
        "http://127.0.0.1:9002/send",
        data=b"setup-ping-from-A",
        headers={"X-Destination-Peer-Id": key_b},
        method="POST",
    )
    try:
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        err(f"Send A→B failed: {e}")
        return False

    time.sleep(1)
    try:
        with urllib.request.urlopen("http://127.0.0.1:9003/recv", timeout=5) as resp:
            body = resp.read().decode()
            if "setup-ping-from-A" not in body:
                err(f"Unexpected message on B: {body!r}")
                return False
    except Exception as e:
        err(f"Recv on B failed: {e}")
        return False

    return True


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    log("=" * 50)
    log("Open Agents — Development Setup")
    log("=" * 50)

    if not AXL_BIN.exists():
        err(f"AXL binary not found at {AXL_BIN}")
        err("Make sure you're running inside the devcontainer.")
        sys.exit(1)

    # Kill any existing AXL processes
    subprocess.run(["pkill", "-f", "axl -config"], capture_output=True)
    time.sleep(1)

    # 1. Keys & configs
    ensure_keys()
    write_configs()

    # 2. Start nodes
    start_node("node-config.json", "Node A")
    time.sleep(2)
    start_node("node-config-2.json", "Node B")

    # 3. Wait for APIs
    log("Waiting for Node A (port 9002)...")
    if not wait_for_api(9002):
        err("Node A failed to start — check ~/axl-nodes/ for errors")
        cleanup()

    log("Waiting for Node B (port 9003)...")
    if not wait_for_api(9003):
        err("Node B failed to start — check ~/axl-nodes/ for errors")
        cleanup()

    # 4. Get keys
    key_a = get_public_key(9002)
    key_b = get_public_key(9003)
    log(f"Node A public key: {key_a}")
    log(f"Node B public key: {key_b}")

    # 5. Update .env
    update_env(key_a, key_b)

    # 6. AXL integrations (MCP Router + A2A)
    ensure_axl_integrations()
    install_axl_integrations()
    start_mcp_router(AXL_DIR / "node-config.json")
    start_a2a_server()
    time.sleep(2)

    # 7. Connectivity test
    log("Running connectivity test...")
    if test_connectivity(key_a, key_b):
        log("\033[1;32m✓ Bidirectional P2P messaging works!\033[0m")
    else:
        err("Connectivity test failed — nodes may need more time to peer")

    # 8. Summary
    log("")
    log("=" * 50)
    log("AXL Setup Complete")
    log("=" * 50)
    log(f"  Node A API:    http://127.0.0.1:9002")
    log(f"  Node B API:    http://127.0.0.1:9003")
    log(f"  Node A Key:    {key_a[:16]}...")
    log(f"  Node B Key:    {key_b[:16]}...")
    log(f"  MCP Router:    http://127.0.0.1:{MCP_ROUTER_PORT}")
    log(f"  A2A Server:    http://127.0.0.1:{A2A_SERVER_PORT}")
    log("")
    log("Nodes running in background. Press Ctrl+C to stop all.")
    log("=" * 50)

    # Keep running until interrupted
    reported_dead: set[int] = set()
    try:
        while True:
            alive = 0
            for proc in _children:
                if proc.poll() is not None:
                    if proc.pid not in reported_dead:
                        reported_dead.add(proc.pid)
                        err(f"Process {proc.pid} exited with code {proc.returncode}")
                else:
                    alive += 1
            if alive == 0:
                err("All child processes have exited")
                break
            time.sleep(5)
    except KeyboardInterrupt:
        cleanup()


if __name__ == "__main__":
    main()

# Agent Instructions

## Project
ETHGlobal Open Agents hackathon. Proof of Thought — TEE-verified multi-model AI consensus over P2P.

## Build Commands
```bash
# TypeScript
npm install
npm run build
npm run dev
npm test

# Python (AXL services)
uv sync
uv run pytest

# AXL nodes
python scripts/setup.py
```

## Key Principles
- TEE verification is the core product — every inference must be verified
- Agents run on separate AXL nodes (structurally required)
- x402 payments for PoT Reports via KeeperHub
- Commit early and often — judges check git history

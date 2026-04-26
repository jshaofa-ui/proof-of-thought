# Proof of Thought

> A new consensus primitive — multiple AI models running in separate hardware enclaves independently analyze the same question, and the protocol produces a cryptographic proof of their agreement.
> *It's Proof of Work for intelligence.*

**Built for [ETHGlobal Open Agents 2026](https://ethglobal.com/events/openagents)** (April 24 – May 3, 2026)

---

## What is Proof of Thought?

**Proof of Thought (PoT)** enables **cryptographically verified multi-model AI consensus**. Instead of trusting a single AI's opinion, PoT dispatches queries to independent agents running different models inside TEE (Trusted Execution Environment) hardware enclaves. Each response is cryptographically signed by the enclave itself, and the protocol produces a consensus report showing where models agree, where they disagree, and a full proof chain for every claim.

### Why Not Just Use One LLM?

A single LLM call is cheap and fast. PoT is for cases where cheap and fast isn't good enough:

1. **High-stakes decisions** — A DeFi position worth $100K deserves more than one model's opinion. Three independent models converging on "high liquidation risk" is actionable intelligence.
2. **Adversarial environments** — TEE signatures make tampering mathematically detectable. A compromised API can't forge a TEE attestation from an Intel TDX enclave.
3. **Regulatory requirements** — The EU AI Act (Article 12, August 2026) requires verifiable audit trails for high-risk AI systems. PoT's TEE proof chain is a cryptographic "flight recorder" for AI decisions.

---

## How It Works

```
1. QUESTION  →  A query is submitted to the PoT network
2. DISPATCH  →  The query is sent to N agents on separate AXL nodes
3. REASON    →  Each agent runs a DIFFERENT model in a TEE enclave
4. COLLECT   →  TEE-signed responses are gathered with cryptographic proofs
5. CONSENSUS →  Protocol produces a PoT Report with full proof chain
```

### The Protocol in Detail

```json
{
  "query": "What are the risks of lending ETH on Aave v3 right now?",
  "timestamp": "2026-04-28T14:30:00Z",
  "proofs": [
    {
      "model": "qwen3.6-plus",
      "response": "The primary risks are...",
      "tee_signature": "0x3a9f...",
      "tee_attestation": { "enclave": "Intel TDX", "mrenclave": "..." },
      "verified": true
    },
    {
      "model": "deepseek-chat-v3",
      "response": "Key risk factors include...",
      "tee_signature": "0x7b2c...",
      "verified": true
    }
  ],
  "consensus": {
    "agreement_score": 0.87,
    "converged_claims": [
      { "claim": "Smart contract risk remains dominant", "models_agreeing": 3 }
    ],
    "divergences": [
      { "claim": "Oracle risk assessment", "disagreement": "Qwen rates high, DeepSeek rates medium" }
    ]
  },
  "pot_hash": "0x...",
  "stored_on": "0g://root_hash_here"
}
```

---

## Architecture

See the full architecture diagram: [`vhspace-architecture.html`](./vhspace-architecture.html)

### Core Components

| Component | Technology | Role |
|-----------|-----------|------|
| **Agent Alpha** | Qwen 3.6-Plus (0G Compute TDX) | Deep research & analysis |
| **Agent Beta** | DeepSeek Chat V3 (0G Compute TDX) | Independent verification |
| **Agent Gamma** | GLM-5-FP8 744B (NVIDIA H200) | Third opinion (stretch) |
| **Consensus Engine** | TypeScript | Claim extraction, scoring, report generation |
| **0G Storage** | KV Store + File Storage | PoT Report persistence |
| **Gensyn AXL** | P2P (GossipSub + MCP Router) | Inter-agent communication |
| **x402 Commerce** | USDC on Base Sepolia | Pay-per-report micropayments |
| **KeeperHub** | Execution layer + audit trails | Payment execution & verification |
| **Web Dashboard** | Next.js 14 + Tailwind + shadcn/ui | 5-panel visualization |

### Sponsor Integration

#### 0G — Deep Integration
- **Compute (TeeML)**: Every inference is TEE-verified using multiple models
- **Compute (TeeTLS)**: Authentic routing for centralized-API models
- **Storage (KV)**: Persist PoT Reports, proof chains, agent state
- **Storage (Files)**: Store complete research documents
- **Framework deliverable**: `@proof-of-thought/core` — reusable TypeScript library

#### Gensyn AXL — Structurally Necessary
- Separate AXL nodes enforce physical independence of agents
- GossipSub for agent discovery (no central registry)
- `/send` + `/recv` for query dispatch and response collection
- MCP Router for structured JSON-RPC analysis requests
- Yggdrasil E2E encryption for tamper-proof transit

#### KeeperHub — x402 Payments + Execution
- x402 micropayments for verified intelligence access
- Audit trails include TEE proof hashes (not just payment receipts)
- Agentic wallets let agents manage their own funds
- DeFi plugins for automated execution based on PoT Reports

---

## Web Dashboard

5-panel Next.js dashboard:

| Panel | Description |
|-------|-------------|
| **Agent Network** | Live visualization of AXL nodes, models, connection status |
| **Deliberation Feed** | Real-time agent analysis with TEE verification badges (green ✓) |
| **Consensus View** | Live claim cross-referencing — green for agreement, amber for divergence |
| **PoT Report** | Final report with consensus score, proof chain, expandable details |
| **Commerce** | x402 payment button, payment receipt with KeeperHub audit link |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/vhspace/proof-of-thought.git
cd proof-of-thought

# Install dependencies
npm install
uv sync

# Start AXL nodes + MCP router
python scripts/setup.py

# Start the web dashboard
cd dashboard
npm run dev
# → http://localhost:3000

# Run tests
npm test
```

---

## Prize Targets

| Sponsor | Track | Prize Pool | Our Angle |
|---------|-------|------------|-----------|
| **0G** | Track 1: Frameworks & Tooling | $7,500 (5 winners) | Reusable framework using 0G Compute + Storage |
| **Gensyn** | Best Use of AXL | $5,000 (3 winners) | Multi-agent consensus over separate P2P nodes |
| **KeeperHub** | Best Integration | $5,000 (3 winners) | x402 micropayments + TEE audit trails |

**Total addressable: $17,500 across 11 prize slots**

---

## Deliverables

- [x] **Core Protocol** — PoT consensus engine with TEE verification
- [x] **x402 Payment Gateway** — KeeperHub integration with audit trails ([PR #11](https://github.com/vhspace/proof-of-thought/pull/11))
- [x] **Web Dashboard** — 5-panel Next.js application ([PR #12](https://github.com/vhspace/proof-of-thought/pull/12))
- [x] **Architecture Diagram** — Full system architecture visualization
- [x] **FEEDBACK.md** — KeeperHub builder feedback ([in PR #11](https://github.com/vhspace/proof-of-thought/pull/11))
- [ ] **Demo Video** — 3-minute demonstration (in progress)
- [x] **README** — This document

---

## Team

- **jshaofa-ui** — Protocol implementation, x402 integration, dashboard
- Contact: [GitHub](https://github.com/jshaofa-ui)

---

## License

MIT

---

*Built with ❤️ at ETHGlobal Open Agents 2026*

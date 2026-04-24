# Proof of Thought — Project Context

ETHGlobal Open Agents hackathon project. TEE-verified multi-model AI consensus over Gensyn AXL P2P network, with 0G Compute/Storage and KeeperHub x402 payments.

## Stack
- TypeScript (primary)
- Python (AXL integration services)
- Next.js (web dashboard)
- Gensyn AXL: P2P network node, local HTTP API on :9002/:9003
- 0G Compute: TEE-verified AI inference (Qwen 3.6-Plus, DeepSeek V3, GLM-5)
- 0G Storage: Decentralized KV store for PoT Reports and proof chains
- KeeperHub: x402 micropayments + on-chain audit trails
- x402: HTTP 402 payment protocol (USDC on Base)

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

# AXL nodes + MCP router
python scripts/setup.py
```

## Key Principles
- All code must be written during the hackathon (April 24+)
- Working demo > ambitious prototype
- Clean code + clear documentation (judges check both)
- Commit early and often (judges check git history)
- TEE verification is THE core product — not a feature

## Sponsor Integration
- [ ] 0G: TEE-verified inference (TeeML/TeeTLS) + Storage (KV) for PoT Reports
- [ ] Gensyn AXL: Agents on separate nodes, GossipSub discovery, MCP Router
- [ ] KeeperHub: x402 payment for reports, audit trails with TEE proof hashes

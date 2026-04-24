# Proof of Thought

> A new consensus primitive — multiple AI models running in separate hardware enclaves independently analyze the same question, and the protocol produces a cryptographic proof of their agreement.
>
> *It's Proof of Work for intelligence.*

## What is this?

Proof of Thought (PoT) enables **cryptographically verified multi-model AI consensus**. Instead of trusting a single AI's opinion, PoT dispatches queries to independent agents running different models inside TEE (Trusted Execution Environment) hardware enclaves. Each response is cryptographically signed by the enclave itself, and the protocol produces a consensus report showing where models agree, where they disagree, and a full proof chain for every claim.

## How it works

```
1. QUESTION  →  A query is submitted to the PoT network
2. DISPATCH  →  The query is sent to N agents on separate P2P nodes
3. REASON    →  Each agent runs a DIFFERENT model in a TEE enclave
4. COLLECT   →  TEE-signed responses are gathered with cryptographic proofs
5. CONSENSUS →  The protocol produces a PoT Report with proof chain
```

## Tech Stack

- **0G Compute** — TEE-verified AI inference (Qwen 3.6-Plus, DeepSeek V3, GLM-5)
- **0G Storage** — Decentralized persistence for PoT Reports and proof chains
- **Gensyn AXL** — P2P agent communication across separate nodes
- **KeeperHub** — x402 micropayments for verified intelligence + on-chain audit trails
- **TypeScript** — Primary language
- **Next.js** — Web dashboard

## Quick Start

```bash
# Install dependencies
npm install
uv sync

# Start AXL nodes + MCP router
python scripts/setup.py

# Start development server
npm run dev
```

## Project Structure

```
src/
  core/           # PoT protocol — consensus engine, TEE verification
  agents/         # Agent Alpha (Analyst) + Agent Beta (Challenger)
  storage/        # 0G Storage integration (KV store, file uploads)
  commerce/       # x402 payment flow + KeeperHub audit trails
  discovery/      # AXL GossipSub peer discovery
dashboard/        # Next.js web dashboard
scripts/          # Setup scripts (AXL nodes, MCP router)
docs/             # Project plan, prize tracker, vendor activity
```

## ETHGlobal Open Agents 2026

Built for [ETHGlobal Open Agents](https://ethglobal.com/events/openagents) hackathon (April 24 - May 3, 2026).

**Target prizes:** 0G Track 1 ($7.5K) + Gensyn AXL ($5K) + KeeperHub ($5K)

See [docs/PROJECT.md](docs/PROJECT.md) for the full project plan.

## License

MIT

# ETHGlobal Open Agents — Prize Tracker

> Last updated: **2026-04-24** (hackathon day 1)
> Source: https://ethglobal.com/events/openagents/prizes
> Deadline: **May 3, 2026, 12:00 PM EDT**

## Summary: $50,000+ advertised, $35,000 confirmed across 5 sponsors

**The gap (~$15K):**
- **ETHGlobal Finalist Pool** — ETHGlobal runs their own finalist judging (top 20% of projects, 7-min live sessions). Prize amount TBA but typically $10-15K at their events.
- More sponsors could still be added during the hackathon.

| Sponsor | Total | Top Prize | Key Requirement |
|---------|-------|-----------|-----------------|
| 0G | $15,000 | $2,500 | Deploy on 0G (Storage/Compute/Chain); contract addresses required |
| Uniswap Foundation | $5,000 | $2,500 | `FEEDBACK.md` in repo root required |
| Gensyn | $5,000 | $2,500 | AXL across separate nodes; winners → grant programme |
| **ENS** | **$5,000** | **$1,250** | **ENS must do real work (not cosmetic); functional demo required** |
| KeeperHub | $5,000 | $2,500 | Working demo + README; $500 feedback bounty separate |

---

## 0G — $15,000

### Track 1: Best Agent Framework, Tooling & Core Extensions — $7,500

| Place | Prize |
|-------|-------|
| 1st | $2,500 |
| 2nd | $2,000 |
| 3rd | $1,500 |
| 4th | $1,000 |
| 5th | $500 |

**Focus:** Framework-level work — core extensions, forks, or new agent frameworks deployed on 0G. OpenClaw or alternatives.

**Ideas from sponsor:**
- OpenClaw modules for hierarchical planning, reflection loops, multi-modal reasoning with 0G Compute (qwen3.6-plus, GLM-5-FP8)
- Self-evolving agent frameworks using 0G Storage memory
- Modular "agent brain" libraries with swappable memory layers (0G Storage KV/Log), LLM backends, decision engines
- No-code/low-code visual agent builder with one-click deploy to 0G

**Qualification:**
- Project name + short description
- Contract deployment addresses
- Public GitHub repo with README + setup instructions
- Demo video + live demo link (video under 3 mins!)
- Explain which 0G features/SDKs you used
- Team member names + contact info (Telegram & X)
- **At least one working example agent** built using your framework
- Architecture diagram showing integration with 0G Storage/Compute (strongly recommended)

### Track 2: Best Autonomous Agents, Swarms & iNFT Innovations — $7,500

Up to 5 teams at $1,500 each.

**Focus:** Autonomous agents, multi-agent swarms, iNFTs (ERC-7857) on 0G.

**Ideas from sponsor:**
- Personal "Digital Twin" with evolving persistent memory via 0G Storage (KV for state, Log for history)
- Research/knowledge agent with persistent context + self-fact-checking via verifiable 0G Compute inference
- Specialist swarms (planner + researcher + critic + executor) collaborating via shared 0G Storage + 0G Compute
- iNFT-minted agents with embedded intelligence (encrypted on 0G Storage), dynamic upgrades, royalty splits
- Agent breeding/merging via iNFTs, agent arenas, emergent behavior experiments

**Qualification:**
- Same as Track 1, plus:
- For swarms: clear explanation of how agents communicate and coordinate
- For iNFT projects: link to minted iNFT on 0G explorer + proof intelligence/memory is embedded

---

## Uniswap Foundation — $5,000

### Best Uniswap API Integration

| Place | Prize |
|-------|-------|
| 1st | $2,500 |
| 2nd | $1,500 |
| 3rd | $1,000 |

**Focus:** Integrate the Uniswap Trading API for agent swap/settlement.

**Ideas from sponsor:**
- Agents that trade
- Agents coordinating with other agents
- New primitives for agentic finance

**Qualification:**
- Must include `FEEDBACK.md` in repo root (builder experience report — what worked, what didn't, bugs, docs gaps, DX friction)

---

## Gensyn — $5,000

### Best Application of Agent eXchange Layer (AXL)

| Place | Prize |
|-------|-------|
| 1st | $2,500 |
| 2nd | $1,500 |
| 3rd | $1,000 |

**Focus:** Build something on AXL with real utility.

**Ideas from sponsor:**
- Agent Town: multi-agent simulation with distinct personalities communicating over AXL
- Decentralised Agent Messaging: agents discover, form groups, communicate P2P (like Telegram for AI agents)

**Qualification:**
- Must use AXL for inter-agent communication across SEPARATE nodes
- No centralized message broker replacing AXL
- Built during hackathon

**Bonus:** All winners fast-tracked into Gensyn Foundation grant programme

---

## ENS — $5,000 (NEW)

### Best ENS Integration for AI Agents — $2,500

| Place | Prize |
|-------|-------|
| 1st | $1,250 |
| 2nd | $750 |
| 3rd | $500 |

**Focus:** ENS as the identity mechanism for AI agents.

**Ideas from sponsor:**
- Resolving agent addresses via ENS names
- Storing agent metadata in ENS records
- Gating access via ENS
- Enabling agent discovery through ENS
- Coordinating agent-to-agent interaction via ENS names

**Qualification:**
- ENS must be doing real work — not just cosmetic
- Demo must be functional (no hard-coded values)
- Submit with video or live demo link

### Most Creative Use of ENS — $2,500

| Place | Prize |
|-------|-------|
| 1st | $1,250 |
| 2nd | $750 |
| 3rd | $500 |

**Focus:** Push ENS beyond name→address lookups.

**Ideas from sponsor:**
- Store verifiable credentials or zk proofs in text records
- Privacy features with auto-rotating addresses on resolution
- Subnames as access tokens
- Surprise them

**Qualification:**
- ENS should clearly improve the product
- Demo must be functional (no hard-coded values)
- Submit with video or live demo link

---

## KeeperHub — $5,000

### Best Use of KeeperHub — $4,500

| Place | Prize |
|-------|-------|
| 1st | $2,500 |
| 2nd | $1,500 |
| 3rd | $500 |

**Two focus areas, one ranked pool:**

**Focus Area 1: Best Innovative Use** — Use KeeperHub's execution layer to solve a real problem (agent, workflow, dApp, dev tool).

**Focus Area 2: Best Integration** — Connect KeeperHub to something:
- Payments: x402 or MPP payment rails
- Agent frameworks: ElizaOS, OpenClaw, LangChain, CrewAI plugin/connector

**Qualification:**
- Working demo (live or recorded)
- Public GitHub repo with README (setup + architecture)
- Brief write-up on approach and KeeperHub usage
- Project name, team members, and contact info

### Builder Feedback Bounty — $500

2 winners at $250 each. Separate from main prize pool.

Must cover at least one of:
- UX/UI friction
- Reproducible bugs
- Documentation gaps
- Feature requests

---

## General Rules

- Teams up to 5 people
- Apply to max **3 sponsor prizes**
- All code must be new (written after April 24, 2026)
- Working demo required (video under 3 mins for 0G, 2-4 mins generally)
- Public GitHub repo with README
- Document AI tool usage
- Commit early and often — judges check git history

---

## ENS Fit Analysis for Proof of Thought

> Could ENS be our 3rd sponsor target instead of KeeperHub?

**Natural fit with PoT:** Agents could have ENS names (e.g., `alpha.pot.eth`, `beta.pot.eth`) instead of raw public keys. ENS text records could store agent metadata: model type, TEE attestation hash, reputation score, available topics. Discovery via ENS subnames instead of (or alongside) AXL GossipSub.

**But:** ENS top prize is only $1,250 vs KeeperHub's $2,500. And our KeeperHub integration (x402 payments + audit trails) is deeper than bolting on ENS names. ENS is better as a **stretch goal** — if we have time, add ENS names for agents and apply to ENS prize as a 4th angle (we can only submit to 3, but ENS has 2 separate prizes).

**Recommendation:** Stick with 0G + Gensyn + KeeperHub as primary targets. Add ENS as a stretch goal if time permits.

# Demo Video Script — Proof of Thought

> **Duration**: 3 minutes
> **Target**: ETHGlobal Open Agents 2026 judges
> **Demo Query**: "What are the risks of lending ETH on Aave v3 right now?"

---

## Scene-by-Scene Breakdown

### 0:00 — 0:10 | Opening Hook

**Visual**: Two terminal windows side by side. AXL nodes starting up.

**Narration**:
> "Two AI agents on separate machines have never met. Each runs a different AI model inside a hardware security enclave. Watch what happens when they're asked the same question."

---

### 0:10 — 0:25 | Query Submission

**Visual**: Web dashboard appears. Two agent nodes visible on the Agent Network panel. Query submitted: "What are the risks of lending ETH on Aave v3 right now?"

**Narration**:
> "A question enters the Proof of Thought network. It's dispatched to both agents over Gensyn's AXL peer-to-peer network."

---

### 0:25 — 0:55 | Agent Analysis

**Visual**: Agent Alpha's analysis streams in on the Deliberation Feed. TEE badge appears with green ✓ and proof hash. Then Agent Beta's analysis arrives. Another TEE badge.

**Narration**:
> "Agent Alpha uses Qwen 3.6-Plus. Agent Beta uses DeepSeek V3. Both run inside Intel TDX secure enclaves. These aren't just AI opinions — each response is cryptographically signed by the hardware itself."

---

### 0:55 — 1:25 | Consensus Formation

**Visual**: Consensus View lights up. Claims are cross-referenced live. Green highlights for agreement, amber for divergence. Consensus score animates to 0.87.

**Narration**:
> "The Proof of Thought engine cross-references their claims. Where both models independently converge — that's high-confidence intelligence. Where they disagree — that's where the uncertainty lives. Both are valuable."

---

### 1:25 — 1:50 | PoT Report

**Visual**: Full PoT Report appears. Expandable proof sections. Click on a TEE badge to reveal raw attestation data.

**Narration**:
> "The final report carries a full cryptographic proof chain. Every claim links back to a specific model, a specific hardware enclave, a specific TEE signature. This isn't 'trust me' — it's 'verify me.'"

---

### 1:50 — 2:15 | x402 Payment Flow

**Visual**: Commerce panel. Click "Buy Report". USDC payment transaction on Base Sepolia. KeeperHub audit receipt appears with TEE proof hashes. Report unlocks.

**Narration**:
> "Anyone can access verified intelligence via micropayments. x402 handles the payment, KeeperHub provides the execution and audit trail. The proof chain is included in the receipt — you get cryptographic proof of what you paid for."

---

### 2:15 — 2:40 | Architecture Overview

**Visual**: Architecture diagram zooms in. Highlight 0G Compute + Storage, AXL P2P, x402 + KeeperHub. Show the three sponsor integrations.

**Narration**:
> "Three sponsor technologies, one new primitive. 0G provides verified AI compute and decentralized storage. AXL provides peer-to-peer agent coordination. KeeperHub provides trustless payments. Together they enable something that didn't exist before."

---

### 2:40 — 3:00 | Closing

**Visual**: Dashboard zooms out showing multiple reports, growing knowledge base. Code editor showing `import { ProofOfThought } from '@proof-of-thought/core'`.

**Narration**:
> "Proof of Thought is an open protocol and a reusable library. Any developer can add multi-model verified consensus to their agents. This is Proof of Work for intelligence."

---

## Production Notes

### Recording Setup
- Use OBS or similar for screen recording
- Record at 1080p60
- Split into 3 takes if needed (0-60s, 60-120s, 120-180s)

### Pre-generated Data
- Pre-generate 2-3 PoT Reports for demo reliability
- Use mock TEE signatures if 0G mainnet is unreliable
- Dashboard should show pre-loaded data if live inference fails

### Fallback Plan
- If live demo fails: switch to pre-recorded screenshots
- If TEE verification fails: show mock attestations with clear labeling
- If AXL nodes fail: simulate P2P communication with local mock

### Audio
- Use ElevenLabs or similar for clean narration
- Or record own voice with noise reduction
- Background music: subtle ambient (optional)

---

## Submission Checklist

- [ ] 3-minute demo video recorded
- [ ] Architecture diagram included (vhspace-architecture.html)
- [ ] README with setup instructions (this document)
- [ ] Package as @proof-of-thought/core
- [ ] Contract deployment addresses documented
- [ ] Team info (GitHub + Telegram)
- [ ] FEEDBACK.md for KeeperHub bounty (in PR #11)
- [ ] Final git history review

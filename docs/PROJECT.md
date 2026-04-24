# Proof of Thought

> A new consensus primitive — multiple AI models running in separate hardware enclaves independently analyze the same question, and the protocol produces a cryptographic proof of their agreement.
>
> *It's Proof of Work for intelligence.*

---

## Target Prizes (3 of 4)

| Sponsor | Track | Prize Pool | Our Angle |
|---------|-------|------------|-----------|
| **0G** | Track 1: Frameworks & Tooling | $7,500 (5 winners) | Reusable framework using 0G Compute (TEE inference) + 0G Storage (verified knowledge base) |
| **Gensyn** | Best Use of AXL | $5,000 (3 winners) | Multi-agent consensus across separate P2P nodes — the protocol runs over AXL |
| **KeeperHub** | Best Integration | $5,000 (3 winners) | x402 micropayments for verified intelligence + on-chain audit trails with TEE proof hashes |

**Addressable pool:** $17,500 across 11 prize slots

---

## The Core Insight

A single TEE-verified inference proves: **"Model X said Y."**

Multiple TEE-verified inferences from different models prove: **"Three independent models in separate hardware enclaves all converge on Y."**

That's not social consensus ("trust me, the AI said so"). That's **cryptographic consensus** — hardware-level proof that honest computation happened independently and converged. Remove the TEE and you have nothing — just three chatbots giving opinions. The proof chain IS the product.

This is a genuinely new primitive. "Proof of Work" proves computational effort. "Proof of Stake" proves economic commitment. **"Proof of Thought" proves independent intellectual convergence.**

---

## How It Works

### The Protocol (5 steps)

```
1. QUESTION  →  A query is submitted to the Proof of Thought network
2. DISPATCH  →  The query is sent to N agents on separate AXL nodes
3. REASON    →  Each agent runs a DIFFERENT 0G model in a TEE enclave
4. COLLECT   →  TEE-signed responses are gathered with cryptographic proofs
5. CONSENSUS →  The protocol produces a PoT Report:
                 - Where models agree (high confidence, multi-proof)
                 - Where models disagree (uncertainty signal)
                 - Full TEE proof chain for every claim
```

### What a "Proof of Thought" Contains

```json
{
  "query": "What are the risks of lending ETH on Aave v3 right now?",
  "timestamp": "2026-04-28T14:30:00Z",
  "proofs": [
    {
      "model": "qwen3.6-plus",
      "provider": "0xa48f01...",
      "response": "The primary risks are...",
      "tee_signature": "0x3a9f...",
      "tee_attestation": { "enclave": "Intel TDX", "mrenclave": "..." },
      "verified": true
    },
    {
      "model": "deepseek-chat-v3",
      "provider": "0x1B3AAe...",
      "response": "Key risk factors include...",
      "tee_signature": "0x7b2c...",
      "tee_attestation": { "enclave": "Intel TDX", "mrenclave": "..." },
      "verified": true
    },
    {
      "model": "GLM-5-FP8",
      "provider": "0xd9966e...",
      "response": "Current lending risks are...",
      "tee_signature": "0x1d4e...",
      "tee_attestation": { "enclave": "NVIDIA H200", "mrenclave": "..." },
      "verified": true
    }
  ],
  "consensus": {
    "agreement_score": 0.87,
    "converged_claims": [
      { "claim": "Smart contract risk remains the dominant factor", "models_agreeing": 3 },
      { "claim": "Current utilization rate is elevated above 80%", "models_agreeing": 3 },
      { "claim": "Liquidation cascades are the primary systemic risk", "models_agreeing": 2 }
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

## Why Not Just Use One LLM?

A single LLM call is cheap and fast. Proof of Thought is for the cases where cheap and fast isn't good enough:

1. **High-stakes decisions** — When getting it wrong costs real money. A DeFi position worth $100K deserves more than one model's opinion. Three independent models converging on "high liquidation risk" is the difference between a warning and actionable intelligence.

2. **Adversarial environments** — When someone might try to manipulate the AI's output. TEE signatures make tampering mathematically detectable. A compromised API returning fake analysis can't forge a TEE attestation from an Intel TDX enclave.

3. **Regulatory requirements** — The EU AI Act (Article 12, effective August 2026) requires verifiable audit trails for high-risk AI systems. PoT's TEE proof chain is a cryptographic "flight recorder" for AI decisions — exactly what regulators are starting to demand.

If a single ChatGPT call suffices, don't use PoT. If the answer needs to be **trustworthy, tamper-proof, and independently verifiable**, that's where Proof of Thought lives.

---

## Example Queries

Every query must pass this test: *"Why would someone PAY for this answer, and why does it need independent models to be trustworthy?"*

### DeFi Risk Assessment
*Excites: KeeperHub judges, 0G judges, all crypto judges*

- "Is it safe to lend ETH on Aave v3 right now? What are the liquidation cascade risks?"
- "Compare risk-adjusted yields across Aave, Compound, and Morpho for a 10 ETH position"
- "What's the probability of a liquidation event on MakerDAO DAI vaults in the next 48 hours?"

**Why PoT:** A single model might hallucinate yield numbers or miss a risk factor. Three independent models converging on "high liquidation risk" is actionable intelligence worth paying for. KeeperHub can then execute the hedging strategy.

### Smart Contract Security
*Excites: 0G judges, general judges*

- "Analyze this contract at 0x... for reentrancy, access control, and economic vulnerabilities"
- "Is this new token contract a potential rug pull? Check for owner mint functions, hidden fees, and liquidity lock status"

**Why PoT:** Security audits from a single LLM are unreliable. Three models independently flagging the same vulnerability is a strong signal. TEE proof means the audit is tamper-proof and legally defensible.

### DAO Governance Analysis
*Excites: Gensyn judges, ENS judges*

- "Should Uniswap DAO approve Proposal #42 to reduce LP fee tiers? Analyze economic impact."
- "Summarize and assess the risks of ENS DAO's proposed treasury diversification"

**Why PoT:** DAO voters need unbiased analysis. TEE-verified multi-model consensus prevents manipulation — no one can tamper with the AI's analysis to swing a vote. Connects directly to Gensyn's Delphi information markets narrative.

### Market Intelligence
*Excites: all judges, best for live demo*

- "Is ETH undervalued relative to BTC based on on-chain metrics, derivatives positioning, and macro factors?"
- "What are the top 3 emerging DeFi protocols by TVL growth rate, and what are their risk profiles?"

**Why PoT:** Trading intelligence is the highest-value knowledge. Independent model convergence turns AI speculation into verified signal. Worth paying x402 micropayments for.

### Regulatory Compliance
*Excites: institutional-minded judges, 0G judges*

- "Does this algorithmic trading strategy comply with EU AI Act Article 12 record-keeping requirements?"
- "Generate a verifiable risk assessment for this DeFi lending position, suitable for audit"

**Why PoT:** The EU AI Act (August 2026) requires verifiable AI audit trails for high-risk systems. PoT's TEE proof chain is exactly this — evidence-grade AI reasoning with cryptographic provenance. This is a real-world regulatory use case, not a toy demo.

### On-chain Forensics
*Excites: general judges*

- "Is wallet 0x... associated with known exploit addresses? Trace fund origins."
- "Analyze the last 100 transactions from this address — is this a bot, a whale, or a retail trader?"

**Why PoT:** Forensic claims need to be defensible. A single model might produce false positives. Multi-model TEE consensus provides evidence-grade analysis that could hold up in a dispute.

### Recommended Demo Query

For the live demo, use **DeFi Risk Assessment**:

> "What are the risks of lending ETH on Aave v3 right now?"

This works because it's:
- Immediately understandable to crypto judges
- Produces a substantive, multi-faceted answer (smart contract risk, utilization rates, oracle risk, liquidation cascades)
- Naturally shows disagreement — models may diverge on severity of specific risks
- Directly connects to KeeperHub's execution story ("now execute a hedge based on this analysis")
- Similar to what AgentNexus (ETHGlobal Coinbase 1st place winner) did, but with the TEE verification layer on top

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       PROOF OF THOUGHT                          │
│                                                                 │
│  ┌────────────────┐   AXL P2P    ┌────────────────┐           │
│  │  Agent Alpha   │◄────────────►│  Agent Beta    │           │
│  │  (AXL Node A)  │  GossipSub   │  (AXL Node B)  │           │
│  │                │  + A2A msgs   │                │           │
│  │  Model: Qwen   │              │  Model: DeepSeek│           │
│  │  3.6-Plus      │              │  Chat V3        │           │
│  └───────┬────────┘              └───────┬────────┘           │
│          │                               │                     │
│          ▼                               ▼                     │
│  ┌─────────────────────────────────────────────────┐          │
│  │              0G Compute (TEE Inference)          │          │
│  │                                                   │          │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │          │
│  │  │ Intel TDX│  │ Intel TDX│  │NVIDIA H200│     │          │
│  │  │ Qwen 3.6+│  │DeepSeek  │  │ GLM-5-FP8│     │          │
│  │  │          │  │ V3       │  │ (744B)   │      │          │
│  │  │ TEE Sig ✓│  │ TEE Sig ✓│  │ TEE Sig ✓│     │          │
│  │  └──────────┘  └──────────┘  └──────────┘      │          │
│  └─────────────────────────────────────────────────┘          │
│                          │                                     │
│                          ▼                                     │
│  ┌─────────────────────────────────────────────────┐          │
│  │           PoT Consensus Engine                    │          │
│  │                                                   │          │
│  │  • Collect TEE-signed responses                   │          │
│  │  • Extract claims from each response              │          │
│  │  • Cross-reference: agreement + divergence        │          │
│  │  • Produce PoT Report with proof chain            │          │
│  │  • Score: agreement_score (0.0 - 1.0)            │          │
│  └──────────────┬──────────────────────┘             │          │
│                 │                                     │          │
│          ┌──────┴──────┐                             │          │
│          ▼             ▼                             │          │
│  ┌──────────────┐  ┌──────────────────┐             │          │
│  │ 0G Storage   │  │ x402 Commerce    │             │          │
│  │ (KV Store)   │  │ + KeeperHub      │             │          │
│  │              │  │                  │              │          │
│  │ • PoT Reports│  │ • Pay per report │             │          │
│  │ • Proof chain│  │ • Audit trails   │             │          │
│  │ • Agent state│  │ • TEE hash refs  │             │          │
│  └──────────────┘  └──────────────────┘             │          │
│                                                      │          │
│  ┌─────────────────────────────────────────────────┐│          │
│  │              Web Dashboard                       ││          │
│  │  • Live agent deliberation feed                  ││          │
│  │  • TEE verification badges (green ✓)             ││          │
│  │  • Consensus forming in real-time                ││          │
│  │  • Divergence highlighted as valuable signal     ││          │
│  │  • x402 payment flow for reports                 ││          │
│  └─────────────────────────────────────────────────┘│          │
└─────────────────────────────────────────────────────────────────┘
```

---

## The Three Agents

### Agent Alpha — "The Analyst" (AXL Node A, port 9002)

- **Model:** Qwen 3.6-Plus (1M token context, agentic coding optimized)
- **Role:** Deep research and analysis
- **Strength:** Massive context window for comprehensive analysis
- Generates first-pass research on any submitted query
- Stores TEE-verified findings on 0G Storage
- Advertises analysis availability via AXL GossipSub

### Agent Beta — "The Challenger" (AXL Node B, port 9003)

- **Model:** DeepSeek Chat V3 (optimized conversational reasoning)
- **Role:** Independent verification and challenge
- **Strength:** Different model architecture = truly independent analysis
- Discovers Alpha's claims via AXL
- Independently analyzes the same query using a different model
- Produces its own TEE-verified response
- Highlights agreements AND disagreements

### Consensus Engine — "The Arbiter" (runs on either node or a coordinator process)

- Collects TEE-signed responses from both agents
- Verifies each TEE signature using 0G SDK's `processResponse()`
- Extracts individual claims from each response
- Cross-references claims to find convergence and divergence
- Produces the final PoT Report with full proof chain
- Stores report on 0G Storage, makes it available via x402

### Stretch: Agent Gamma (if time permits)

- **Model:** GLM-5-FP8 (744B parameter reasoning model)
- **Role:** Third independent opinion, breaks ties
- A third model from a completely different architecture
- Turns 2-of-2 consensus into 2-of-3 or 3-of-3, which is dramatically more credible

---

## Sponsor Integration Depth

### 0G — Deep Integration (Track 1: Framework)

| 0G Feature | How We Use It | Why It's Deep |
|------------|---------------|---------------|
| **Compute (TeeML)** | Every inference is TEE-verified. We call multiple models and verify each signature. | TEE verification is THE core product, not a feature |
| **Compute (TeeTLS)** | For centralized-API models (Qwen3.6-Plus via Alibaba Cloud), TeeTLS proves authentic routing | Shows understanding of both TEE modes |
| **Multiple models** | Deliberately use 2-3 different models for independent verification | Deep model catalog usage |
| **Storage (KV)** | Persist PoT Reports, proof chains, agent state, consensus history | Full read/write lifecycle |
| **Storage (files)** | Store complete research documents referenced by reports | Large artifact storage |
| **Browser SDK** | Web dashboard calls 0G Compute directly for live inference display | Full-stack integration |
| **OpenAI-compat API** | Drop-in integration for inference calls | Shows platform maturity |

**Framework deliverable:** `@proof-of-thought/core` — a TypeScript library that any developer can use to add multi-model TEE-verified consensus to their agents.

### Gensyn AXL — Structurally Necessary P2P

**Prize requirements:** AXL across separate nodes, no centralized broker, built during hackathon.

| AXL Feature | How We Use It |
|-------------|---------------|
| **Separate nodes** | Agent Alpha (port 9002) + Agent Beta (port 9003) — physically separate processes with independent state |
| **`/send` + `/recv`** | Query dispatch to agents, TEE-verified response collection back to Arbiter |
| **GossipSub** | Agents advertise capabilities (which models they run, what topics they cover). New agents join by connecting to any peer — no registry server. |
| **MCP Router** | Structured JSON-RPC analysis requests — queries aren't raw bytes, they're typed tool calls that agents' services handle |
| **End-to-end encryption** | TEE proofs transit tamper-proof over Yggdrasil. No middleman can alter a response in flight. |
| **`/topology`** | Dashboard shows live P2P network state — which agents are connected, peer public keys |

**Why AXL is structurally necessary (not bolted on):**

AXL handles four things in the PoT protocol that can't be replaced by a centralized broker:

1. **Query dispatch** — Questions are sent to agents via `POST /send` with `X-Destination-Peer-Id`. Each agent receives it independently on their own node.
2. **Response collection** — Each agent's TEE-verified response flows back over AXL. The P2P transport means no middleman can tamper with responses (Yggdrasil E2E encryption on top of TLS).
3. **Discovery via GossipSub** — Agents advertise their capabilities via pub/sub topics. No central registry. New agents join the network by peering with any existing node.
4. **Independence guarantee** — The entire point of PoT is that agents reason independently. Separate AXL nodes enforce this physically — you can't have independent TEE-verified consensus if agents share a process or an API.

**The pitch for Gensyn judges:** Remove AXL and the protocol breaks. The physical separation over P2P is what makes the TEE proofs meaningful. This isn't "agents chatting over P2P" — it's "P2P as a structural requirement for cryptographic consensus."

### KeeperHub — x402 Payments + Execution Loop

**Prize focus areas:** Focus Area 2 (x402 payment integration) + Focus Area 1 (innovative use).

#### Focus Area 2: x402 Payment Flow

PoT Reports are the product. Accessing them costs micropayments:

1. Consumer agent discovers a verified PoT Report via AXL
2. Requests the full report from the Arbiter
3. Arbiter responds with **HTTP 402** + `PAYMENT-REQUIRED` header (e.g., 0.05 USDC on Base)
4. Consumer signs payment on-chain (USDC on Base Sepolia)
5. KeeperHub **executes** the payment with retry logic, gas optimization, MEV protection
6. Consumer retries with `X-PAYMENT` header containing signed proof
7. Arbiter verifies payment, delivers the full PoT Report
8. KeeperHub logs the **audit trail** — payment hash, PoT report hash, TEE proof hashes, timestamp

The audit trail is the special part: a normal x402 receipt says "you paid for something." A KeeperHub audit trail for PoT says "you paid 0.05 USDC for a report independently verified by Qwen3.6-Plus (TEE sig: 0x3a9f...) and DeepSeek V3 (TEE sig: 0x7b2c...) with 87% consensus." That's provably what you bought.

#### Focus Area 1: Analysis → Execution Loop

| KeeperHub Feature | How We Use It |
|-------------------|---------------|
| **x402 payments** | Pay-per-report micropayments for verified intelligence |
| **Audit trails** | Receipt includes TEE proof hashes — cryptographic proof of what you paid for |
| **Agentic wallets** | Agents provision and manage their own wallets via `kh wallet add/fund` — no human in the loop |
| **`kh execute`** | If a PoT Report recommends action (e.g., "high liquidation risk on Aave"), KeeperHub executes the hedge |
| **DeFi plugins** | Uniswap, Aave, Compound, Morpho plugins — a PoT Report about Aave risk triggers `kh execute contract-call` to withdraw |
| **Builder Feedback** | Document friction points in FEEDBACK.md for the $250 bounty |

The demo query ("risks of lending ETH on Aave v3") is deliberately chosen to connect analysis → verified consensus → automated execution. That's the complete loop.

**The pitch for KeeperHub judges:** *"We connected KeeperHub's payment rails to cryptographically verified AI intelligence. The audit trail doesn't just say 'payment happened' — it says 'you paid for a consensus of independent models in hardware enclaves, here are the proofs, and here's the automated execution that followed.' Pay → verify → act."*

---

## Web Dashboard

### Must-have panels (MVP)

1. **Agent Network** — Live visualization of AXL nodes, their models, connection status
2. **Deliberation Feed** — Real-time stream of agent analysis arriving, with TEE verification badges (green ✓ with proof hash)
3. **Consensus View** — As responses arrive, claims are cross-referenced live. Agreement highlights green, divergence highlights amber.
4. **PoT Report** — Final report with consensus score, converged claims, divergences, and cryptographic proof links
5. **Commerce** — x402 payment button to access full reports, payment receipt with KeeperHub audit link

### Tech stack

- **Next.js 14** + App Router
- **Tailwind CSS** + **shadcn/ui** for clean, modern components
- **Framer Motion** for smooth animations (proof badges appearing, consensus forming)
- **WebSocket or polling** to AXL nodes for real-time updates
- **0G Browser SDK** for direct compute calls from dashboard (optional stretch)

### Visual design principles

- Dark theme (professional, "intelligence agency" feel)
- TEE verification badges are prominent — green shield icons with expandable proof details
- Consensus score displayed as a large, animated gauge
- Divergences are highlighted as valuable, not failures — amber callouts that say "Models disagree here — this is where uncertainty lives"
- Clean typography, minimal decoration, data-forward

---

## Demo Video Script (3 minutes)

| Time | Screen | Narration |
|------|--------|-----------|
| 0:00-0:10 | Two terminal windows: AXL nodes starting | *"Two AI agents on separate machines have never met. Each runs a different AI model inside a hardware security enclave. Watch what happens when they're asked the same question."* |
| 0:10-0:25 | Dashboard appears. Two agent nodes visible. Query submitted: "What are the risks of lending ETH on Aave v3?" | *"A question enters the Proof of Thought network. It's dispatched to both agents over Gensyn's AXL peer-to-peer network."* |
| 0:25-0:55 | Agent Alpha's analysis streams in. TEE badge appears with green ✓. Then Agent Beta's analysis streams in. Another TEE badge. | *"Agent Alpha uses Qwen 3.6-Plus. Agent Beta uses DeepSeek V3. Both run inside Intel TDX secure enclaves. These aren't just AI opinions — each response is cryptographically signed by the hardware itself."* |
| 0:55-1:25 | Consensus view lights up. Claims are cross-referenced. Green highlights for agreement, amber for divergence. Consensus score: 0.87. | *"The Proof of Thought engine cross-references their claims. Where both models independently converge — that's high-confidence intelligence. Where they disagree — that's where the uncertainty lives. Both are valuable."* |
| 1:25-1:50 | Full PoT Report appears. Expandable proof sections. Click on a TEE badge to see the raw attestation. | *"The final report carries a full cryptographic proof chain. Every claim links back to a specific model, a specific hardware enclave, a specific TEE signature. This isn't 'trust me' — it's 'verify me.'"* |
| 1:50-2:15 | x402 payment flow. Click "Buy Report." USDC payment. KeeperHub audit receipt. Report unlocks. | *"Anyone can access verified intelligence via micropayments. x402 handles the payment, KeeperHub provides the execution and audit trail. The proof chain is included in the receipt."* |
| 2:15-2:40 | Architecture diagram. Show 0G Compute + Storage, AXL P2P, x402 + KeeperHub. | *"Three sponsor technologies, one new primitive. 0G provides verified AI compute and decentralized storage. AXL provides peer-to-peer agent coordination. KeeperHub provides trustless payments. Together they enable something that didn't exist before."* |
| 2:40-3:00 | Dashboard zooms out showing multiple reports, growing knowledge base. Code editor showing the library import. | *"Proof of Thought is an open protocol and a reusable library. Any developer can add multi-model verified consensus to their agents. This is Proof of Work for intelligence."* |

---

## Build Plan (Solo Hacker, 10 Days)

| Day | Focus | Deliverable | Risk Level |
|-----|-------|-------------|:----------:|
| **1** | Project scaffold + 0G Compute | TypeScript project, verified inference wrapper. Call 2 models, verify TEE signatures. | Low |
| **2** | Consensus engine | Claim extraction from responses, cross-referencing, agreement scoring. PoT Report structure. | Medium |
| **3** | 0G Storage integration | Store/retrieve PoT Reports on 0G KV. Proof chain persistence. | Low |
| **4** | AXL P2P integration | Two agents on separate nodes. Query dispatch, response collection over AXL. | Low (already tested) |
| **5** | x402 + KeeperHub | Pay-gated access to PoT Reports. Audit trail with TEE proof hashes. | Medium |
| **6** | Web dashboard (core) | Next.js app: agent network view, deliberation feed, PoT Report display. | Medium |
| **7** | Dashboard (TEE + live) | TEE verification badges, consensus animation, x402 payment flow. | Medium |
| **8** | End-to-end integration | Full flow working: query → dispatch → reason → consensus → store → pay → retrieve. | High |
| **9** | Demo video + docs | Record 3-min demo. Write README with architecture. Package as `@proof-of-thought/core`. | Low |
| **10** | Buffer + polish | Edge cases, error handling, FEEDBACK.md for KeeperHub bounty, final commits. | Low |

### Critical path

Days 1-2 are make-or-break. If TEE verification works on Day 1 and consensus logic works on Day 2, everything else is integration. Test 0G Compute TEE verification FIRST.

### Fallback plan

If 0G mainnet models are unreliable:
- Fall back to testnet models (Qwen 2.5 7B) — still TEE-verified
- Pre-generate some PoT Reports for the demo
- The framework and protocol still work; the demo just uses smaller models

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **0G TEE verification API doesn't work as documented** | Critical | Test on Day 1. If broken, file a bug (good for KeeperHub-style feedback bounty). Fall back to showing the protocol with mock TEE proofs. |
| **0G Compute mainnet models are slow/unreliable** | High | Use testnet models as fallback. Cache responses. Pre-generate demo data. |
| **Claim extraction from LLM responses is unreliable** | Medium | Use structured prompts that produce numbered claims. Post-process with regex. Keep it simple. |
| **Web dashboard takes too long** | Medium | Start with minimal shadcn/ui layout on Day 6. A clean single-page app is enough. Animated fancy stuff is stretch. |
| **Running out of 0G tokens** | Low | Have 10.25 0G. Testnet models cost 0.05-0.10 per 1M tokens. Hundreds of calls available. Discord for more if needed. |
| **AXL A2A v1.0 doesn't merge** | Low | Use raw /send + /recv (already working). A2A is nice-to-have. |
| **x402 payment integration is complex** | Medium | Start with simple direct x402 flow. Skip Permit2. KeeperHub handles the hard parts. |

---

## Why This Wins

### For 0G Track 1 judges:
- Uses BOTH Compute and Storage — not just one
- TEE verification is THE product — deepest possible Compute integration
- Multi-model usage shows mastery of their catalog
- Published as a reusable framework (`@proof-of-thought/core`)
- Directly fulfills their ask: "modular agent brain library"

### For Gensyn judges:
- Separate AXL nodes are structurally required — not bolted on
- The consensus protocol only works because agents are independent and communicate P2P
- GossipSub for discovery, /send + /recv for coordination
- Real utility: verified intelligence is something people actually want
- Aligns with Delphi narrative (information markets → verified information)

### For KeeperHub judges:
- x402 payment for verified intelligence — the audit trail includes TEE proof hashes
- Focus Area 2 explicitly wants x402 payment integration — this is exactly that
- Agentic wallets let agents manage their own funds
- FEEDBACK.md for the $250 bounty is free money

### For judges generally:
- **"Proof of Thought"** — the name alone makes them lean forward
- **Web dashboard** — not CLI screenshots
- **Genuinely novel** — multi-model TEE consensus has not been shown at a hackathon before
- **The demo moment is visceral** — watching independent proofs appear and consensus form in real-time
- **It's a primitive, not just an app** — infrastructure that others can build on

---

## Stretch Goals (if time permits)

- [ ] **Third agent (GLM-5-FP8)** — 3-of-3 consensus is dramatically more credible than 2-of-2
- [ ] **Verification depth pricing** — reports verified by more models cost more via x402
- [ ] **Historical PoT dashboard** — browse past reports, filter by topic, see consensus trends
- [ ] **Uniswap pay-with-any-token** — pay for reports in any token, auto-swapped to USDC
- [ ] **Agent reputation** — track how often an agent's TEE-verified claims are confirmed by others
- [ ] **Export PoT proof for on-chain use** — proof chain as calldata for a smart contract that validates consensus

---

## Post-Hackathon: Grant Potential

| Program | Alignment | Potential |
|---------|-----------|-----------|
| **Gensyn Foundation Grant** | Winners fast-tracked. PoT extends AXL ecosystem. Aligns with Delphi information markets. | High — 40% of $AI supply in treasury |
| **0G Apollo Accelerator** | Up to $2M/project. PoT is framework-level infrastructure for 0G's AI ecosystem. | High — $88.8M ecosystem fund |
| **0G Guild** | $8.88M for early-stage teams. Gas credits, prizes. | Medium — easy application |
| **KeeperHub** | No formal grant program yet, but strong relationship from hackathon. | Low — but early ecosystem positioning |

# Vendor GitHub Activity Tracker

> Track vendor repo changes leading up to and during the hackathon.
> Check repos daily — sponsors often push features right before/during the event.
> Last checked: **2026-04-23 evening**

---

## Gensyn AXL — https://github.com/gensyn-ai/axl

**Our binary:** rebuilt from commit `6c216f6` (Apr 22)

### Branches to watch
| Branch | Status | Notes |
|--------|--------|-------|
| `main` | default, protected | Stable |
| `a2a-v1-0-migration` | **Open PR #23** (Apr 22) | Migrating A2A to a2a-sdk v1.0. 70 additions, 64 deletions across 7 files. |
| `go126-gvisor-fix` | **Draft PR #24** (Apr 23) | Fix Go 1.26 builds with patched gVisor snapshot. +115K lines (vendored gVisor). |
| `agent-interface` | unknown | Possibly unreleased agent API surface |
| `judson_tinkering` | experimental | — |

### Recent commits
| Date | Commit | Description |
|------|--------|-------------|
| Apr 23 | — | **PR #24 (draft):** Go 1.26 gVisor fix — eliminates GOTOOLCHAIN workaround |
| Apr 22 | `6c216f6` | Add citation section to README (#22) |
| Apr 10 | — | Switched to `make` build system (#21) |
| Apr 10 | — | Full AXL refactor (#20) |
| Apr 6 | — | GossipSub implementation (#19) — pub/sub over mesh |

### Action items
- [ ] Monitor PR #23 (A2A v1.0) — rebuild binary when merged
- [ ] Monitor PR #24 (Go 1.26 fix) — when merged, rebuild without GOTOOLCHAIN workaround
- [ ] Check `agent-interface` branch for new features

---

## KeeperHub CLI — https://github.com/KeeperHub/cli

**Our version:** v0.9.0 (installed Apr 23)

### Recent commits / releases
| Date | Description |
|------|-------------|
| Apr 23 | **v0.9.0 released** — official release of agentic wallet commands |
| Apr 21 | `kh wallet add/info/fund/link` — agentic wallet wrappers for AI agents |
| Apr 21 | Deprecated `kh serve --mcp` → remote HTTP MCP at `https://app.keeperhub.com/mcp` |
| Mar 25 | v0.8.0 release — `kh read`, `kh plugin`, `kh chain list`, removed auth wall for public commands |

### KeeperHub Main — https://github.com/KeeperHub/keeperhub

| Date | Description |
|------|-------------|
| Apr 23 | **PR #971:** Fix local dev setup — Node 22 req, .env fixes (KEEP-334) |
| Apr 22-23 | KEEP-295 phases 0-3: real-time on-chain event listener infra (LRU cache, Redis dedup, SQS, error resilience) |
| Apr 22 | Wallet export security hardening (TOCTOU, timing-safe, rate limiting) |
| Apr 22 | Turnkey executor environment fixes (KEEP-317) |
| Apr 22 | Uniswap V3 docs URL updates |

### Action items
- [x] ~~Watch for new `kh` release~~ → v0.9.0 installed
- [ ] Check if KEEP-295 event listener becomes available via API/MCP
- [ ] Watch for v0.10.0+ with additional agentic features

---

## Uniswap AI — https://github.com/Uniswap/uniswap-ai

**Stars:** 202 | **Skills installed:** none yet (need API key first)

### Key skills
| Skill | Plugin | Date | Description |
|-------|--------|------|-------------|
| `swap-integration` | uniswap-trading | — | Full swap flow via Trading API |
| `pay-with-any-token` | uniswap-trading | Mar 18 | HTTP 402 / x402 payments via Uniswap swaps |
| `uniswap-v4-hooks` | uniswap-hooks | Apr 8 | MCP-based v4 hook code generation |
| `v4-sdk-integration` | uniswap-hooks | Apr 7 | Direct SDK swap and LP patterns |

### Recent commits
| Date | Description |
|------|-------------|
| Apr 8 | v4-hook-generator skill (MCP-based) |
| Apr 7 | v4-sdk-integration skill |
| Mar 18 | pay-with-any-token skill (x402/MPP). Tempo CLI integration. |
| Mar 10 | Security hardening — PreToolUse hooks to block private key exposure |

### Notes
- Private `uniswap-ai-hackathon` repo may exist (returned 404)
- Ask mentors about access

### Action items
- [ ] Get Uniswap API key from https://developers.uniswap.org
- [ ] Test `pay-with-any-token` skill with x402

---

## 0G TS SDK — https://github.com/0gfoundation/0g-ts-sdk

**Our version:** 1.2.4 (latest)

### Recent commits (very active, hackathon prep)
| Date | Description |
|------|-------------|
| Apr 22 | `skipIfFinalized` — idempotent uploads (skip if file exists) |
| Apr 21 | `onProgress` callback for upload tracking |
| Apr 21 | Full browser compatibility (removed Node.js imports, dynamic imports) |
| Apr 21 | UMD build, Prettier formatting |
| Apr 20 | Browser-safe Indexer, `downloadToBlob`, `nodeForSegment` |

### 0G Starter Kit — https://github.com/0gfoundation/0g-storage-ts-starter-kit

| Date | Description |
|------|-------------|
| Apr 1 | Fresh starter kit: CLI scripts, web UI with MetaMask, turbo/standard mode |
| Mar 30 | Full restructure with SDK gotchas documented |

### Action items
- [ ] Monitor SDK for 1.2.5+ with more browser fixes
- [ ] Check if 0G Compute SDK gets hackathon updates

---

## 0G Serving Broker — https://github.com/0glabs/0g-serving-broker

**Our version:** 0.7.5 (npm) | GitHub latest release: v0.4.4 (version discrepancy — npm may use different versioning)

### Recent commits (Apr 23)
| Date | Description |
|------|-------------|
| Apr 23 | `feat(inference): accept legacy model names via ModelAliases` |
| Apr 23 | `feat(inference): add UpstreamModel to rewrite model id for separated-TEE upstream` |

### Action items
- [ ] Watch for npm package update beyond 0.7.5

---

## Version Matrix

| Package | Installed | Latest | Updated |
|---------|-----------|--------|---------|
| `@0gfoundation/0g-ts-sdk` | 1.2.4 | 1.2.4 | Apr 23 ✅ |
| `@0glabs/0g-serving-broker` | 0.7.5 | 0.7.5 | — ✅ |
| `@uniswap/v4-sdk` | 2.0.0 | 2.0.0 | — ✅ |
| `@uniswap/sdk-core` | 7.13.0 | 7.13.0 | — ✅ |
| `viem` | 2.48.4 | 2.48.4 | Apr 23 ✅ |
| `x402` | 1.2.0 | 1.2.0 | — ✅ |
| `x402-express` | 1.2.0 | 1.2.0 | — ✅ |
| `kh` CLI | v0.9.0 | v0.9.0 | Apr 23 ✅ |
| `axl` binary | 6c216f6 (Apr 22) | 6c216f6 | Apr 23 ✅ |
| `a2a-sdk` (Python) | 1.0.0 | 1.0.1 | — ⚠️ |

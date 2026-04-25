# KEEPERHUB FEEDBACK — Proof of Thought Integration

> **Project**: Proof of Thought (ETHGlobal Open Agents Hackathon)
> **Integration**: x402 Payment Gateway + KeeperHub Audit Trails
> **Date**: 2026-04-26
> **Author**: jshaofa-ui

---

## Feedback Item 1: x402 Payment Flow — Missing Client-Side SDK Documentation

### Problem

The x402 payment flow requires the consumer to sign a USDC payment on Base Sepolia and submit the proof via the `X-PAYMENT` header. However, the documentation for the `x402` and `x402-express` npm packages lacks clear guidance on the **client-side payment signing flow**.

### Reproduction Steps

1. Set up an Express server with `x402-express` middleware
2. Receive a 402 response with `PAYMENT-REQUIRED` header
3. Attempt to construct the payment transaction on the client side
4. No clear documentation on:
   - How to format the `X-PAYMENT` header payload
   - What fields are required (paymentHash, potReportHash, etc.)
   - How to handle ERC-20 USDC approvals before payment

### Improvement Suggestion

Provide a **client-side SDK** or at minimum a **reference implementation** that:
- Parses the `PAYMENT-REQUIRED` header
- Handles ERC-20 approval for USDC
- Signs the payment transaction using viem/wagmi
- Formats the `X-PAYMENT` header correctly
- Retries the original request with the payment proof

This would significantly reduce integration time from ~2 days to ~2 hours.

---

## Feedback Item 2: KeeperHub CLI (`kh`) — Wallet Provisioning Error Messages

### Problem

When provisioning an agent wallet via `kh wallet add`, error messages are not descriptive enough for debugging. For example, if the wallet already exists or if there's a network connectivity issue, the CLI returns a generic error without actionable guidance.

### Reproduction Steps

1. Run `kh wallet add --agent test-agent-1`
2. Run `kh wallet add --agent test-agent-1` again (duplicate)
3. Observe the error message

### Current Behavior

The CLI returns a generic error without indicating:
- Whether the wallet already exists
- What the existing wallet address is
- How to recover or reuse the existing wallet

### Improvement Suggestion

1. **Add specific error codes** for common failure modes:
   - `WALLET_EXISTS` — wallet already provisioned
   - `NETWORK_ERROR` — can't reach KeeperHub network
   - `INSUFFICIENT_FUNDS` — funding failed due to insufficient balance

2. **Provide recovery commands** in error messages:
   ```
   Error: Wallet for agent 'test-agent-1' already exists (0xabc...).
   Use 'kh wallet list' to see all wallets, or 'kh wallet remove <address>' to delete.
   ```

3. **Add `--force` flag** to overwrite existing wallets when intentionally re-provisioning.

---

## Feedback Item 3: Audit Trail — No On-Chain Verification Endpoint

### Problem

The KeeperHub audit trail logs payment + PoT Report + TEE proof hashes, but there's no public endpoint or contract to **verify an audit entry on-chain**. This limits the trustlessness of the system — consumers must trust the KeeperHub backend to have recorded the audit correctly.

### Reproduction Steps

1. Complete an x402 payment for a PoT Report
2. Receive the audit trail entry from KeeperHub
3. Attempt to verify the audit entry on-chain
4. No contract or endpoint exists for on-chain verification

### Improvement Suggestion

1. **Deploy an Audit Registry smart contract** on Base Sepolia that:
   - Accepts audit entries (payment hash, report hash, TEE hashes)
   - Emits events for each logged entry
   - Provides a `verify()` view function

2. **Add a CLI command** for verification:
   ```bash
   kh audit verify --payment-hash 0x... --report-hash 0x...
   ```

3. **Include a verification URL** in the audit receipt:
   ```
   Verify on-chain: https://explorer.base-sepolia.tx/tx/0x...
   ```

This would make the audit trail genuinely trustless and verifiable by any third party, which is essential for regulatory compliance use cases (EU AI Act Article 12).

---

## Summary

| # | Issue | Severity | Impact | Suggested Fix |
|---|-------|----------|--------|---------------|
| 1 | Missing x402 client-side SDK docs | High | Integration time 2→2 days | Client SDK or reference implementation |
| 2 | Kh CLI error messages not actionable | Medium | Debugging friction | Specific error codes + recovery commands |
| 3 | No on-chain audit verification | High | Trustlessness gap | Audit Registry contract + verify CLI |

These three feedback items represent the most significant friction points encountered during the KeeperHub integration for the Proof of Thought project. Each is actionable and would improve the developer experience for future integrators.

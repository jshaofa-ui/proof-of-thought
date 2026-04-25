/**
 * Commerce Module — x402 Payment Gateway, Audit Trail, Agentic Wallet
 *
 * @module commerce
 */

export {
  createPaymentMiddleware,
  DEFAULT_CONFIG,
  type PaymentConfig,
  generateMockPotReport,
} from "./x402-gateway.js";
export {
  AuditTrail,
  type AuditEntry,
  type AuditTrailStats,
} from "./audit-trail.js";
export {
  AgenticWallet,
  type WalletInfo,
  type WalletFundingResult,
} from "./wallet.js";

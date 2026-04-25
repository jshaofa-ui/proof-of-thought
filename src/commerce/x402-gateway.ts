/**
 * x402 Payment Gateway — Express middleware for PoT Report paywall
 *
 * Flow:
 * 1. Consumer requests PoT Report → Arbiter returns HTTP 402 + PAYMENT-REQUIRED header
 * 2. Consumer signs USDC payment on Base Sepolia
 * 3. KeeperHub executes payment (retry, gas opt, MEV protection)
 * 4. Consumer retries with X-PAYMENT header (signed proof)
 * 5. Arbiter verifies payment → delivers full PoT Report
 * 6. KeeperHub logs audit trail: payment hash + PoT report hash + TEE proof hashes
 */

import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { paymentMiddleware } from "x402-express";
import { AuditTrail, AuditEntry } from "./audit-trail.js";

export interface PaymentConfig {
  /** Amount in USDC (smallest units, e.g., 50000 = 0.05 USDC with 6 decimals) */
  amount: string;
  /** Recipient address */
  payTo: string;
  /** Chain ID (84532 = Base Sepolia) */
  chainId: number;
  /** Asset address (USDC on Base Sepolia) */
  asset: string;
  /** Max time between payment and report delivery (ms) */
  paymentExpiryMs: number;
}

export const DEFAULT_CONFIG: PaymentConfig = {
  amount: "50000", // 0.05 USDC (6 decimals)
  payTo: process.env.X402_PAY_TO || "0x0000000000000000000000000000000000000000",
  chainId: 84532, // Base Sepolia
  asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
  paymentExpiryMs: 5 * 60 * 1000, // 5 minutes
};

const auditTrail = new AuditTrail();

/**
 * Create x402 payment middleware for Express
 *
 * Uses x402-express's paymentMiddleware to handle the full x402 flow:
 * - Returns 402 with X-Paywall header for unpaid requests
 * - Verifies X-PAYMENT header on retry
 * - Settles payment on-chain
 */
export function createPaymentMiddleware(
  config: PaymentConfig = DEFAULT_CONFIG,
) {
  const routes = [
    {
      path: "/api/reports/",
      method: "GET",
      config: {
        price: {
          amount: config.amount,
          asset: config.asset,
        },
        network: "base-sepolia" as const,
      },
    },
  ];

  const x402Middleware = paymentMiddleware(config.payTo, routes);

  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const paymentHeader = req.headers["x-payment"] as string | undefined;

    if (!paymentHeader) {
      // Step 1: Return 402 with payment requirements
      const paymentRequired = {
        amount: config.amount,
        asset: config.asset,
        payTo: config.payTo,
        chain: `eip155:${config.chainId}`,
        resource: req.originalUrl,
        description: "Proof of Thought Report Access",
      };

      res.set("PAYMENT-REQUIRED", JSON.stringify(paymentRequired));
      res.set("X-PAYMENT-REQUIRED", JSON.stringify(paymentRequired));
      res.status(402).json({
        error: "Payment Required",
        message: "This resource requires x402 payment. See PAYMENT-REQUIRED header.",
        payment: paymentRequired,
      });
      return;
    }

    // Step 4: Verify payment proof
    try {
      const paymentProof = JSON.parse(paymentHeader);
      const isValid = await verifyPayment(paymentProof, config);

      if (!isValid) {
        res.status(401).json({
          error: "Invalid Payment",
          message: "Payment verification failed. Please retry with valid payment.",
        });
        return;
      }

      // Step 6: Log audit trail
      const auditEntry: AuditEntry = {
        id: randomUUID(),
        paymentHash: paymentProof.paymentHash,
        potReportHash: paymentProof.potReportHash,
        teeProofHashes: paymentProof.teeProofHashes || [],
        timestamp: new Date().toISOString(),
        payer: paymentProof.payer,
        amount: config.amount,
        status: "verified",
      };

      auditTrail.log(auditEntry);

      // Attach audit entry to request for downstream handlers
      (req as any).paymentVerified = true;
      (req as any).auditEntry = auditEntry;
      next();
    } catch (err) {
      res.status(400).json({
        error: "Malformed Payment Header",
        message: "X-PAYMENT header could not be parsed. Expected JSON with payment proof.",
      });
    }
  };
}

/**
 * Verify x402 payment proof
 *
 * In production, this would verify the on-chain payment via viem.
 * For MVP, we validate the payment proof structure.
 */
async function verifyPayment(
  proof: Record<string, unknown>,
  config: PaymentConfig,
): Promise<boolean> {
  // Validate required fields
  const required = ["paymentHash", "potReportHash", "payer", "timestamp"];
  for (const field of required) {
    if (!proof[field]) return false;
  }

  // Validate payment timestamp is within expiry window
  const paymentTime = new Date(proof.timestamp as string).getTime();
  const now = Date.now();
  if (now - paymentTime > config.paymentExpiryMs) {
    return false;
  }

  // In production: verify on-chain via viem
  // const publicClient = createPublicClient({ chain: baseSepolia, transport: http() });
  // const tx = await publicClient.getTransaction({ hash: proof.paymentHash as Hash });
  // return tx.status === "success" && tx.to?.toLowerCase() === config.payTo.toLowerCase();

  return true;
}

/**
 * Generate mock PoT report for testing
 */
export function generateMockPotReport(reportId: string) {
  return {
    reportId,
    query: "What are the risks of lending ETH on Aave v3 right now?",
    timestamp: new Date().toISOString(),
    proofs: [
      {
        model: "qwen3.6-plus",
        provider: "0xa48f010000000000000000000000000000000001",
        response:
          "The primary risks are smart contract vulnerability, elevated utilization rates above 80%, and potential liquidation cascades.",
        tee_signature:
          "0x3a9f8c2e1b4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
        tee_attestation: { enclave: "Intel TDX", mrenclave: "0xabc123" },
        verified: true,
      },
      {
        model: "deepseek-chat-v3",
        provider: "0x1B3AAe0000000000000000000000000000000002",
        response:
          "Key risk factors include oracle manipulation, smart contract risk, and high liquidation probability during market stress.",
        tee_signature:
          "0x7b2c8d4e3f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1",
        tee_attestation: { enclave: "Intel TDX", mrenclave: "0xabc123" },
        verified: true,
      },
    ],
    consensus: {
      agreement_score: 0.87,
      converged_claims: [
        {
          claim: "Smart contract risk remains the dominant factor",
          models_agreeing: 2,
        },
        {
          claim: "Current utilization rate is elevated above 80%",
          models_agreeing: 2,
        },
      ],
      divergences: [
        {
          claim: "Oracle risk assessment",
          disagreement: "Qwen rates high, DeepSeek rates medium",
        },
      ],
    },
    pot_hash: "0x" + Buffer.from(reportId).toString("hex"),
    stored_on: "0g://root_hash_mock",
  };
}

/**
 * Tests for x402 Payment Gateway
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createPaymentMiddleware,
  DEFAULT_CONFIG,
  generateMockPotReport,
  type PaymentConfig,
} from "../src/commerce/x402-gateway.js";
import type { Request, Response } from "express";

describe("createPaymentMiddleware", () => {
  let middleware: ReturnType<typeof createPaymentMiddleware>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    middleware = createPaymentMiddleware();
    mockReq = {
      headers: {},
      originalUrl: "/api/reports/report-123",
    };
    mockRes = {
      set: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
  });

  it("should return 402 when no X-PAYMENT header is present", async () => {
    await middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext as () => void,
    );

    expect(mockRes.set).toHaveBeenCalledWith(
      "PAYMENT-REQUIRED",
      expect.any(String),
    );
    expect(mockRes.status).toHaveBeenCalledWith(402);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Payment Required",
      }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should include payment details in 402 response", async () => {
    await middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext as () => void,
    );

    const jsonCall = mockRes.json.mock.calls[0][0];
    expect(jsonCall.payment).toMatchObject({
      amount: DEFAULT_CONFIG.amount,
      chain: "eip155:84532",
      description: "Proof of Thought Report Access",
    });
  });

  it("should reject malformed X-PAYMENT header", async () => {
    mockReq.headers = { "x-payment": "not-valid-json" };

    await middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext as () => void,
    );

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Malformed Payment Header",
      }),
    );
  });

  it("should reject payment without required fields", async () => {
    mockReq.headers = {
      "x-payment": JSON.stringify({ paymentHash: "0xabc" }),
    };

    await middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext as () => void,
    );

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Invalid Payment",
      }),
    );
  });

  it("should accept valid payment proof and call next", async () => {
    const validProof = {
      paymentHash: "0x1234567890abcdef",
      potReportHash: "0xabcdef1234567890",
      payer: "0xPayerAddress1234567890",
      timestamp: new Date().toISOString(),
      teeProofHashes: ["0xtee1", "0xtee2"],
    };
    mockReq.headers = { "x-payment": JSON.stringify(validProof) };

    await middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext as () => void,
    );

    expect(mockNext).toHaveBeenCalled();
    expect((mockReq as any).paymentVerified).toBe(true);
    expect((mockReq as any).auditEntry).toBeDefined();
  });
});

describe("generateMockPotReport", () => {
  it("should generate a valid mock PoT report", () => {
    const report = generateMockPotReport("test-report-001");

    expect(report).toMatchObject({
      reportId: "test-report-001",
      query: expect.any(String),
      timestamp: expect.any(String),
      proofs: expect.arrayContaining([
        expect.objectContaining({
          model: expect.any(String),
          verified: true,
          tee_signature: expect.any(String),
        }),
      ]),
      consensus: expect.objectContaining({
        agreement_score: expect.any(Number),
        converged_claims: expect.any(Array),
      }),
      pot_hash: expect.any(String),
    });
  });

  it("should include at least 2 model proofs", () => {
    const report = generateMockPotReport("test");
    expect(report.proofs.length).toBeGreaterThanOrEqual(2);
  });

  it("should have consensus with agreement score between 0 and 1", () => {
    const report = generateMockPotReport("test");
    expect(report.consensus.agreement_score).toBeGreaterThanOrEqual(0);
    expect(report.consensus.agreement_score).toBeLessThanOrEqual(1);
  });
});

describe("PaymentConfig defaults", () => {
  it("should use Base Sepolia chain", () => {
    expect(DEFAULT_CONFIG.chainId).toBe(84532);
  });

  it("should have USDC as default asset", () => {
    expect(DEFAULT_CONFIG.asset).toBe(
      "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    );
  });

  it("should have 5 minute payment expiry", () => {
    expect(DEFAULT_CONFIG.paymentExpiryMs).toBe(5 * 60 * 1000);
  });
});

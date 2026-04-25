/**
 * Tests for Audit Trail
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { AuditTrail, type AuditEntry } from "../src/commerce/audit-trail.js";
import { existsSync, rmSync } from "fs";
import { join } from "path";

describe("AuditTrail", () => {
  let auditTrail: AuditTrail;
  const testStorageDir = "./data/test-audit";

  beforeEach(() => {
    // Clean up test storage
    const testPath = join(testStorageDir, "audit-trail.json");
    if (existsSync(testPath)) {
      rmSync(testPath);
    }
    auditTrail = new AuditTrail(testStorageDir);
  });

  afterEach(() => {
    // Clean up
    const testPath = join(testStorageDir, "audit-trail.json");
    if (existsSync(testPath)) {
      rmSync(testPath);
    }
  });

  const createEntry = (overrides: Partial<AuditEntry> = {}): AuditEntry => ({
    id: "test-entry-001",
    paymentHash: "0xpayment123",
    potReportHash: "0xreport456",
    teeProofHashes: ["0xtee1", "0xtee2"],
    timestamp: new Date().toISOString(),
    payer: "0xpayer123",
    amount: "50000",
    status: "verified",
    ...overrides,
  });

  describe("log", () => {
    it("should add an entry to the audit trail", () => {
      const entry = createEntry();
      auditTrail.log(entry);
      expect(auditTrail.getAll().length).toBe(1);
    });

    it("should store multiple entries", () => {
      auditTrail.log(createEntry({ id: "entry-1" }));
      auditTrail.log(createEntry({ id: "entry-2" }));
      auditTrail.log(createEntry({ id: "entry-3" }));
      expect(auditTrail.getAll().length).toBe(3);
    });
  });

  describe("getAll", () => {
    it("should return all entries", () => {
      auditTrail.log(createEntry({ id: "a" }));
      auditTrail.log(createEntry({ id: "b" }));
      const all = auditTrail.getAll();
      expect(all.length).toBe(2);
    });

    it("should return a copy, not the internal array", () => {
      auditTrail.log(createEntry());
      const all = auditTrail.getAll();
      all.push(createEntry({ id: "external" }));
      expect(auditTrail.getAll().length).toBe(1);
    });
  });

  describe("getByPayer", () => {
    it("should filter entries by payer", () => {
      auditTrail.log(createEntry({ id: "1", payer: "0xpayerA" }));
      auditTrail.log(createEntry({ id: "2", payer: "0xpayerB" }));
      auditTrail.log(createEntry({ id: "3", payer: "0xpayerA" }));

      const payerAEntries = auditTrail.getByPayer("0xpayerA");
      expect(payerAEntries.length).toBe(2);
    });

    it("should be case-insensitive", () => {
      auditTrail.log(createEntry({ id: "1", payer: "0xPAYERA" }));
      const entries = auditTrail.getByPayer("0xpayera");
      expect(entries.length).toBe(1);
    });
  });

  describe("getByPaymentHash", () => {
    it("should find entry by payment hash", () => {
      auditTrail.log(createEntry({ id: "1", paymentHash: "0xhash123" }));
      const entry = auditTrail.getByPaymentHash("0xhash123");
      expect(entry?.id).toBe("1");
    });

    it("should return undefined for non-existent hash", () => {
      const entry = auditTrail.getByPaymentHash("0xnonexistent");
      expect(entry).toBeUndefined();
    });
  });

  describe("getByPotReportHash", () => {
    it("should find all entries for a report", () => {
      auditTrail.log(
        createEntry({ id: "1", potReportHash: "0xreport1" }),
      );
      auditTrail.log(
        createEntry({ id: "2", potReportHash: "0xreport1" }),
      );
      auditTrail.log(
        createEntry({ id: "3", potReportHash: "0xreport2" }),
      );

      const reportEntries = auditTrail.getByPotReportHash("0xreport1");
      expect(reportEntries.length).toBe(2);
    });
  });

  describe("getStats", () => {
    it("should return correct statistics", () => {
      auditTrail.log(createEntry({ id: "1", status: "verified" }));
      auditTrail.log(createEntry({ id: "2", status: "verified" }));
      auditTrail.log(createEntry({ id: "3", status: "pending" }));

      const stats = auditTrail.getStats();
      expect(stats.totalEntries).toBe(3);
      expect(stats.verifiedEntries).toBe(2);
    });

    it("should count unique payers", () => {
      auditTrail.log(createEntry({ id: "1", payer: "0xpayerA" }));
      auditTrail.log(createEntry({ id: "2", payer: "0xpayerB" }));
      auditTrail.log(createEntry({ id: "3", payer: "0xpayerA" }));

      const stats = auditTrail.getStats();
      expect(stats.uniquePayers).toBe(2);
    });
  });

  describe("generateReceipt", () => {
    it("should generate a formatted receipt", () => {
      const entry = createEntry();
      const receipt = auditTrail.generateReceipt(entry);

      expect(receipt).toContain("Payment Receipt");
      expect(receipt).toContain(entry.paymentHash);
      expect(receipt).toContain(entry.potReportHash);
      expect(receipt).toContain("TEE Proof Hashes");
      expect(receipt).toContain("KeeperHub");
    });
  });
});

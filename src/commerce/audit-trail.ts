/**
 * Audit Trail — Payment + PoT Report + TEE Proof Hash linkage
 *
 * Every payment for a PoT Report generates an audit entry that links:
 * - Payment hash (on-chain transaction)
 * - PoT Report hash (content hash)
 * - TEE proof hashes (individual model attestation hashes)
 * - Timestamp and payer information
 *
 * Storage: JSON file for MVP, 0G Storage for production
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface AuditEntry {
  /** Unique audit entry ID */
  id: string;
  /** On-chain payment transaction hash */
  paymentHash: string;
  /** PoT Report content hash */
  potReportHash: string;
  /** Array of TEE proof hashes from each model */
  teeProofHashes: string[];
  /** ISO timestamp */
  timestamp: string;
  /** Payer wallet address */
  payer: string;
  /** Payment amount (in smallest units) */
  amount: string;
  /** Verification status */
  status: "pending" | "verified" | "failed";
}

export interface AuditTrailStats {
  totalEntries: number;
  verifiedEntries: number;
  totalAmount: string;
  uniquePayers: number;
}

export class AuditTrail {
  private entries: AuditEntry[] = [];
  private storagePath: string;

  constructor(storageDir: string = "./data/audit") {
    this.storagePath = join(storageDir, "audit-trail.json");
    this.load();
  }

  /**
   * Log a new audit entry
   */
  log(entry: AuditEntry): void {
    this.entries.push(entry);
    this.save();
  }

  /**
   * Get all audit entries
   */
  getAll(): AuditEntry[] {
    return [...this.entries];
  }

  /**
   * Get audit entries by payer address
   */
  getByPayer(payer: string): AuditEntry[] {
    return this.entries.filter((e) => e.payer.toLowerCase() === payer.toLowerCase());
  }

  /**
   * Get audit entry by payment hash
   */
  getByPaymentHash(paymentHash: string): AuditEntry | undefined {
    return this.entries.find(
      (e) => e.paymentHash.toLowerCase() === paymentHash.toLowerCase(),
    );
  }

  /**
   * Get audit entries by PoT Report hash
   */
  getByPotReportHash(potReportHash: string): AuditEntry[] {
    return this.entries.filter((e) => e.potReportHash === potReportHash);
  }

  /**
   * Get audit statistics
   */
  getStats(): AuditTrailStats {
    const verifiedEntries = this.entries.filter((e) => e.status === "verified");
    const uniquePayers = new Set(this.entries.map((e) => e.payer.toLowerCase())).size;

    return {
      totalEntries: this.entries.length,
      verifiedEntries: verifiedEntries.length,
      totalAmount: this.entries.reduce(
        (sum, e) => (BigInt(sum) + BigInt(e.amount)).toString(),
        "0",
      ),
      uniquePayers,
    };
  }

  /**
   * Generate a formatted audit receipt
   */
  generateReceipt(entry: AuditEntry): string {
    return [
      "═══════════════════════════════════════════",
      "       PoT Report Payment Receipt",
      "═══════════════════════════════════════════",
      "",
      `Payment Hash:   ${entry.paymentHash}`,
      `PoT Report:     ${entry.potReportHash}`,
      `Payer:          ${entry.payer}`,
      `Amount:         ${entry.amount} USDC`,
      `Status:         ${entry.status}`,
      `Timestamp:      ${entry.timestamp}`,
      "",
      "TEE Proof Hashes:",
      ...entry.teeProofHashes.map(
        (h, i) => `  [${i + 1}] ${h}`,
      ),
      "",
      "═══════════════════════════════════════════",
      "  Verified by KeeperHub Audit Trail",
      "═══════════════════════════════════════════",
    ].join("\n");
  }

  private save(): void {
    const dir = this.storagePath.split("/").slice(0, -1).join("/");
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(this.storagePath, JSON.stringify(this.entries, null, 2));
  }

  private load(): void {
    if (existsSync(this.storagePath)) {
      try {
        const data = readFileSync(this.storagePath, "utf-8");
        this.entries = JSON.parse(data);
      } catch {
        this.entries = [];
      }
    }
  }
}

/**
 * Agentic Wallet — Wrapper around KeeperHub CLI (kh)
 *
 * Provides agent wallet provisioning, funding, and management.
 * Agents can provision and manage their own wallets via `kh wallet add/fund`
 * — no human in the loop.
 */

import { execSync } from "child_process";

export interface WalletInfo {
  address: string;
  balance: string;
  chain: string;
  status: "active" | "inactive" | "error";
}

export interface WalletFundingResult {
  success: boolean;
  txHash?: string;
  amount: string;
  error?: string;
}

export class AgenticWallet {
  private cliPath: string;

  constructor(cliPath: string = "kh") {
    this.cliPath = cliPath;
  }

  /**
   * Provision a new agent wallet
   * @param agentId - Unique identifier for the agent
   * @returns Wallet address
   */
  provision(agentId: string): WalletInfo {
    try {
      const output = execSync(
        `${this.cliPath} wallet add --agent ${agentId} --json`,
        { encoding: "utf-8" },
      );
      const data = JSON.parse(output);
      return {
        address: data.address,
        balance: "0",
        chain: data.chain || "base-sepolia",
        status: "active",
      };
    } catch (err) {
      return {
        address: "",
        balance: "0",
        chain: "base-sepolia",
        status: "error",
      };
    }
  }

  /**
   * Fund an agent wallet with USDC
   * @param address - Wallet address to fund
   * @param amount - Amount in USDC (smallest units)
   * @returns Funding result with tx hash
   */
  fund(address: string, amount: string): WalletFundingResult {
    try {
      const output = execSync(
        `${this.cliPath} wallet fund ${address} --amount ${amount} --token USDC --json`,
        { encoding: "utf-8" },
      );
      const data = JSON.parse(output);
      return {
        success: true,
        txHash: data.txHash,
        amount,
      };
    } catch (err) {
      const error = err instanceof Error ? err.message : "Unknown error";
      return {
        success: false,
        amount,
        error,
      };
    }
  }

  /**
   * Get wallet balance
   * @param address - Wallet address
   * @returns Wallet info with current balance
   */
  getBalance(address: string): WalletInfo {
    try {
      const output = execSync(
        `${this.cliPath} wallet balance ${address} --json`,
        { encoding: "utf-8" },
      );
      const data = JSON.parse(output);
      return {
        address,
        balance: data.balance || "0",
        chain: data.chain || "base-sepolia",
        status: "active",
      };
    } catch {
      return {
        address,
        balance: "0",
        chain: "base-sepolia",
        status: "error",
      };
    }
  }

  /**
   * List all agent wallets
   * @returns Array of wallet addresses
   */
  list(): string[] {
    try {
      const output = execSync(`${this.cliPath} wallet list --json`, {
        encoding: "utf-8",
      });
      const data = JSON.parse(output);
      return data.wallets || [];
    } catch {
      return [];
    }
  }

  /**
   * Remove an agent wallet
   * @param address - Wallet address to remove
   * @returns Success status
   */
  remove(address: string): boolean {
    try {
      execSync(`${this.cliPath} wallet remove ${address}`, {
        encoding: "utf-8",
      });
      return true;
    } catch {
      return false;
    }
  }
}

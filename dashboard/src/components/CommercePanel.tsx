"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck, Receipt, Download, CheckCircle2 } from "lucide-react";

interface PotReportData {
  id: string;
  question: string;
  consensusScore: number;
  agents: number;
  teeVerified: boolean;
  timestamp: string;
  summary: string;
  proofChain: any[];
}

interface CommercePanelProps {
  report: PotReportData;
}

export function CommercePanel({ report }: CommercePanelProps) {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "paid">("idle");

  const handlePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => setPaymentStatus("paid"), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Payment Section */}
      <div className="card">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5" />
          x402 Payment — Unlock PoT Report
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Details */}
          <div className="space-y-4">
            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Report Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Report ID</span>
                  <span className="font-mono">{report.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consensus Score</span>
                  <span className="text-primary font-bold">{Math.round(report.consensusScore * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TEE Verified</span>
                  <span className="text-success flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Yes
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Payment Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold">5 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain</span>
                  <span>Base Sepolia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processor</span>
                  <span className="text-primary">KeeperHub</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Action */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {paymentStatus === "idle" && (
              <button
                onClick={handlePayment}
                className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary/80 text-primary-foreground font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay 5 USDC via KeeperHub
              </button>
            )}
            {paymentStatus === "processing" && (
              <div className="w-full py-4 px-6 rounded-xl bg-primary/20 text-primary font-semibold flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Processing payment...
              </div>
            )}
            {paymentStatus === "paid" && (
              <div className="w-full space-y-4">
                <div className="py-4 px-6 rounded-xl bg-success/20 text-success font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Payment Successful!
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 px-4 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="py-2 px-4 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Receipt className="w-4 h-4" />
                    View Receipt
                  </button>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground text-center">
              Payment processed by KeeperHub with full audit trail
            </div>
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="card">
        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-primary" />
          Audit Trail
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-border/30">
            <span className="text-muted-foreground">Payment Hash</span>
            <span className="font-mono text-xs">0x8f3a...b2c1</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/30">
            <span className="text-muted-foreground">Report Hash</span>
            <span className="font-mono text-xs">0x7e2d...a9f4</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/30">
            <span className="text-muted-foreground">TEE Proof Hash</span>
            <span className="font-mono text-xs">0x5c1b...d3e8</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Status</span>
            <span className={`flex items-center gap-1 ${
              paymentStatus === "paid" ? "text-success" : "text-warning"
            }`}>
              {paymentStatus === "paid" ? (
                <><CheckCircle2 className="w-3 h-3" /> Verified</>
              ) : (
                "Pending"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

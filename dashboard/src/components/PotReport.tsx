"use client";

import { FileText, ShieldCheck, Hash, Clock, Users, Award } from "lucide-react";

interface ProofStep {
  step: number;
  action: string;
  agent: string;
  hash: string;
}

interface PotReportData {
  id: string;
  question: string;
  consensusScore: number;
  agents: number;
  teeVerified: boolean;
  timestamp: string;
  summary: string;
  proofChain: ProofStep[];
}

interface PotReportProps {
  report: PotReportData;
}

export function PotReport({ report }: PotReportProps) {
  return (
    <div className="space-y-4">
      {/* Report Header */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">PoT Report</h2>
          <span className="ml-auto font-mono text-xs text-muted-foreground">{report.id}</span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Question</h3>
            <p className="text-sm">{report.question}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Score</span>
              </div>
              <div className="text-xl font-bold">{Math.round(report.consensusScore * 100)}%</div>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Agents</span>
              </div>
              <div className="text-xl font-bold">{report.agents}</div>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-xs text-muted-foreground">TEE</span>
              </div>
              <div className="text-xl font-bold text-success">
                {report.teeVerified ? "Verified" : "N/A"}
              </div>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Time</span>
              </div>
              <div className="text-sm font-mono">
                {new Date(report.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{report.summary}</p>
          </div>
        </div>
      </div>

      {/* Proof Chain */}
      <div className="card">
        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Hash className="w-4 h-4 text-primary" />
          Proof Chain
        </h3>
        <div className="space-y-3">
          {report.proofChain.map((step, index) => (
            <div key={step.step} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {step.step}
                </div>
                {index < report.proofChain.length - 1 && (
                  <div className="w-px h-8 bg-border/50 mt-1" />
                )}
              </div>
              <div className="flex-1 py-1">
                <div className="text-sm">{step.action}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">Agent: {step.agent}</span>
                  <span className="font-mono text-xs text-muted-foreground">{step.hash}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

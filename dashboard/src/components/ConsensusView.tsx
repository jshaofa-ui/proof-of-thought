"use client";

import { CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react";

interface Claim {
  text: string;
  agreement: number;
  status: "agreement" | "divergence" | "conflict";
}

interface ConsensusData {
  claims: Claim[];
  overallScore: number;
}

interface ConsensusViewProps {
  consensus: ConsensusData;
}

const statusConfig = {
  agreement: {
    icon: CheckCircle2,
    label: "Agreement",
    badge: "badge-agreement",
    color: "text-success",
    barColor: "bg-success",
  },
  divergence: {
    icon: AlertTriangle,
    label: "Divergence",
    badge: "badge-divergence",
    color: "text-warning",
    barColor: "bg-warning",
  },
  conflict: {
    icon: XCircle,
    label: "Conflict",
    badge: "badge-conflict",
    color: "text-danger",
    barColor: "bg-danger",
  },
};

export function ConsensusView({ consensus }: ConsensusViewProps) {
  const { claims, overallScore } = consensus;

  const agreementCount = claims.filter(c => c.status === "agreement").length;
  const divergenceCount = claims.filter(c => c.status === "divergence").length;
  const conflictCount = claims.filter(c => c.status === "conflict").length;

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Consensus Score
          </h2>
          <div className="text-3xl font-bold text-primary">{Math.round(overallScore * 100)}%</div>
        </div>
        <div className="h-3 bg-border/30 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              overallScore > 0.7 ? "bg-success" :
              overallScore > 0.5 ? "bg-warning" : "bg-danger"
            }`}
            style={{ width: `${overallScore * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{agreementCount}</div>
            <div className="text-xs text-muted-foreground">Agreement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{divergenceCount}</div>
            <div className="text-xs text-muted-foreground">Divergence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-danger">{conflictCount}</div>
            <div className="text-xs text-muted-foreground">Conflict</div>
          </div>
        </div>
      </div>

      {/* Claims */}
      <div className="space-y-3">
        {claims.map((claim, index) => {
          const config = statusConfig[claim.status];
          const Icon = config.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.color}`} />
                  <div>
                    <p className="text-sm">{claim.text}</p>
                    <div className="mt-2">
                      <div className="h-2 bg-border/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${config.barColor}`}
                          style={{ width: `${claim.agreement * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-xs ${config.color}`}>
                          {config.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(claim.agreement * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

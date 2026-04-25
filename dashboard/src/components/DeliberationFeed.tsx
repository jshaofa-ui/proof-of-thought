"use client";

import { ShieldCheck, Clock, MessageSquare } from "lucide-react";

interface Deliberation {
  id: number;
  agent: string;
  model: string;
  response: string;
  tee: boolean;
  timestamp: string;
}

interface DeliberationFeedProps {
  deliberations: Deliberation[];
}

export function DeliberationFeed({ deliberations }: DeliberationFeedProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Deliberation Feed
        </h2>
        <span className="text-sm text-muted-foreground">
          {deliberations.length} responses
        </span>
      </div>

      <div className="space-y-3">
        {deliberations.map((delib, index) => (
          <div
            key={delib.id}
            className="card hover:bg-card/80 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">
                  {delib.model.split(" ")[0][0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm">{delib.agent}</span>
                  <span className="text-xs text-muted-foreground">({delib.model})</span>
                  {delib.tee && (
                    <span className="badge-tee flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      TEE Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{delib.response}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {delib.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

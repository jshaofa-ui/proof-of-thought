"use client";

import { Activity, Cpu, MemoryStick, ShieldCheck } from "lucide-react";

interface AgentNode {
  id: string;
  model: string;
  status: "active" | "idle" | "error";
  enclave: string;
  cpu: number;
  memory: number;
}

interface AgentNetworkProps {
  agents: AgentNode[];
}

export function AgentNetwork({ agents }: AgentNetworkProps) {
  const activeCount = agents.filter(a => a.status === "active").length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Active Nodes</span>
          </div>
          <div className="text-2xl font-bold">{activeCount}/{agents.length}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">TEE Verified</span>
          </div>
          <div className="text-2xl font-bold">{agents.length}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Avg CPU</span>
          </div>
          <div className="text-2xl font-bold">
            {Math.round(agents.reduce((s, a) => s + a.cpu, 0) / agents.length)}%
          </div>
        </div>
      </div>

      {/* Agent Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="card hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  agent.status === "active" ? "bg-success animate-pulse" :
                  agent.status === "idle" ? "bg-warning" : "bg-danger"
                }`} />
                <span className="font-mono text-sm">{agent.id}</span>
              </div>
              <span className="badge-tee">
                <ShieldCheck className="w-3 h-3" />
                TEE
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">{agent.model}</div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> CPU
                  </span>
                  <span>{Math.round(agent.cpu)}%</span>
                </div>
                <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      agent.cpu > 80 ? "bg-danger" :
                      agent.cpu > 60 ? "bg-warning" : "bg-success"
                    }`}
                    style={{ width: `${agent.cpu}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-1">
                    <MemoryStick className="w-3 h-3" /> Memory
                  </span>
                  <span>{Math.round(agent.memory)}%</span>
                </div>
                <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      agent.memory > 80 ? "bg-danger" :
                      agent.memory > 60 ? "bg-warning" : "bg-primary"
                    }`}
                    style={{ width: `${agent.memory}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

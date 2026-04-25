"use client";

import { useState, useEffect } from "react";
import { AgentNetwork } from "@/components/AgentNetwork";
import { DeliberationFeed } from "@/components/DeliberationFeed";
import { ConsensusView } from "@/components/ConsensusView";
import { PotReport } from "@/components/PotReport";
import { CommercePanel } from "@/components/CommercePanel";

// Mock data for demonstration
const mockAgents = [
  { id: "node-1", model: "Qwen 3.6-Plus", status: "active", enclave: "TEE Verified", cpu: 45, memory: 62 },
  { id: "node-2", model: "DeepSeek V3", status: "active", enclave: "TEE Verified", cpu: 38, memory: 55 },
  { id: "node-3", model: "GLM-5", status: "active", enclave: "TEE Verified", cpu: 52, memory: 71 },
  { id: "node-4", model: "Qwen 3.6-Plus", status: "idle", enclave: "TEE Verified", cpu: 12, memory: 30 },
  { id: "node-5", model: "DeepSeek V3", status: "active", enclave: "TEE Verified", cpu: 67, memory: 78 },
];

const mockDeliberations = [
  { id: 1, agent: "node-1", model: "Qwen 3.6-Plus", response: "Analysis complete: 3 novel binding sites identified", tee: true, timestamp: "2m ago" },
  { id: 2, agent: "node-2", model: "DeepSeek V3", response: "Cross-validation: KRAS-G12C pocket confirmed with 94% confidence", tee: true, timestamp: "1m ago" },
  { id: 3, agent: "node-3", model: "GLM-5", response: "Discrepancy detected: Site B shows lower binding affinity than expected", tee: true, timestamp: "45s ago" },
  { id: 4, agent: "node-5", model: "DeepSeek V3", response: "Secondary analysis: p53 interaction pocket shows promising binding profile", tee: true, timestamp: "30s ago" },
];

const mockConsensus = {
  claims: [
    { text: "KRAS-G12C binding pocket identified", agreement: 0.95, status: "agreement" as const },
    { text: "Site B has lower binding affinity", agreement: 0.62, status: "divergence" as const },
    { text: "p53-KRAS interaction confirmed", agreement: 0.88, status: "agreement" as const },
    { text: "Novel drug target validated", agreement: 0.45, status: "conflict" as const },
  ],
  overallScore: 0.73,
};

const mockReport = {
  id: "pot-2026-0426-001",
  question: "Identify novel drug targets for pancreatic cancer",
  consensusScore: 0.73,
  agents: 4,
  teeVerified: true,
  timestamp: "2026-04-26T07:00:00Z",
  summary: "Multi-model consensus identifies 3 potential drug targets with varying confidence levels. Primary target (KRAS-G12C) shows strong consensus across models.",
  proofChain: [
    { step: 1, action: "Query dispatched", agent: "dispatcher", hash: "0x8f3a...b2c1" },
    { step: 2, action: "TEE responses collected", agent: "collector", hash: "0x7e2d...a9f4" },
    { step: 3, action: "Consensus computed", agent: "consensus", hash: "0x5c1b...d3e8" },
    { step: 4, action: "Report signed", agent: "signer", hash: "0x9a4f...e7b2" },
  ],
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("network");
  const [agents, setAgents] = useState(mockAgents);
  const [deliberations, setDeliberations] = useState(mockDeliberations);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(a => ({
        ...a,
        cpu: Math.max(5, Math.min(95, a.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, a.memory + (Math.random() - 0.5) * 5)),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "network", label: "Agent Network", icon: "🌐" },
    { id: "deliberation", label: "Deliberation Feed", icon: "💬" },
    { id: "consensus", label: "Consensus View", icon: "🔍" },
    { id: "report", label: "PoT Report", icon: "📊" },
    { id: "commerce", label: "Commerce", icon: "💰" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "network" && <AgentNetwork agents={agents} />}
        {activeTab === "deliberation" && <DeliberationFeed deliberations={deliberations} />}
        {activeTab === "consensus" && <ConsensusView consensus={mockConsensus} />}
        {activeTab === "report" && <PotReport report={mockReport} />}
        {activeTab === "commerce" && <CommercePanel report={mockReport} />}
      </div>

      {/* Status Bar */}
      <div className="mt-8 border-t border-border/50 pt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>0G Compute: Active</span>
          <span>Gensyn AXL: Connected</span>
          <span>KeeperHub: Ready</span>
        </div>
        <div>
          Dashboard v0.1.0 | {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}

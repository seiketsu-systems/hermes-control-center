import { useState } from "react";

interface SubAgent {
  name: string;
  status: "online" | "busy" | "idle" | "offline";
  task: string;
  output: number;
  efficiency: number;
}

interface AgentPanelProps {
  agentName: string;
  agentTitle: string;
  status: "OPERATIONAL" | "DEGRADED" | "OFFLINE";
  revenue: number;
  subAgents: SubAgent[];
  accentColor: "cyan" | "amber";
  tabs: string[];
  pipeline?: { generate: number; process: number; qa: number; publish: number };
}

const statusStyles = {
  online: "status-online",
  busy: "bg-warning shadow-[0_0_6px_hsl(38_92%_50%/0.6)]",
  idle: "bg-primary/40",
  offline: "status-offline",
};

const AgentPanel = ({ agentName, agentTitle, status, revenue, subAgents, accentColor, tabs, pipeline }: AgentPanelProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const borderClass = accentColor === "cyan" ? "border-glow-cyan" : "border-primary/20";
  const statusColor = status === "OPERATIONAL" ? "text-accent" : status === "DEGRADED" ? "text-warning" : "text-destructive";

  return (
    <div className={`panel ${borderClass}`}>
      <div className="panel-header">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${status === "OPERATIONAL" ? "status-online" : status === "DEGRADED" ? "status-warning" : "status-offline"}`} />
          <span className="text-primary">{agentName}</span>
        </div>
        <span className={`font-mono text-[10px] font-semibold ${statusColor}`}>{status}</span>
      </div>

      <div className="p-4">
        {/* Title bar */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xs tracking-widest text-foreground">{agentTitle}</h3>
            <div className="flex items-center gap-3 mt-1">
              {["MUSIC", "SERVICES", "ASSETS"].map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[9px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full status-online" />
                  <span className="text-muted-foreground">{tag} ONLINE</span>
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] text-muted-foreground">TOTAL REVENUE</p>
            <p className="font-mono text-lg font-bold text-accent text-glow-green tabular-nums">
              ${revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-display text-[10px] tracking-widest transition-colors relative ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Dashboard tab content */}
        {activeTab === "DASHBOARD" && (
          <div className="space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded border border-border bg-secondary/30">
                <p className="font-mono text-[9px] text-muted-foreground">PENDING REVENUE</p>
                <p className="font-mono text-lg font-bold text-warning tabular-nums">$135.00</p>
                <p className="font-mono text-[9px] text-muted-foreground">6 orders in pipeline</p>
              </div>
              <div className="p-3 rounded border border-border bg-secondary/30">
                <p className="font-mono text-[9px] text-muted-foreground">ACTIVE ORDERS</p>
                <p className="font-mono text-lg font-bold text-foreground tabular-nums">6</p>
                <p className="font-mono text-[9px] text-muted-foreground">fiverr/all designs</p>
              </div>
              <div className="p-3 rounded border border-border bg-secondary/30">
                <p className="font-mono text-[9px] text-muted-foreground">AVG RATING</p>
                <div className="flex items-center gap-1">
                  <span className="text-warning">★</span>
                  <span className="font-mono text-lg font-bold text-foreground">5</span>
                </div>
                <p className="font-mono text-[9px] text-muted-foreground">2 reviews</p>
              </div>
            </div>

            {/* Pipeline */}
            {pipeline && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display text-[9px] tracking-widest text-warning">→ ORDER PIPELINE ({Object.values(pipeline).reduce((a, b) => a + b, 0)})</span>
                </div>
                <div className="h-2 rounded-full bg-secondary flex overflow-hidden">
                  <div className="bg-warning h-full" style={{ width: `${(pipeline.generate / 10) * 100}%` }} />
                  <div className="bg-primary h-full" style={{ width: `${(pipeline.process / 10) * 100}%` }} />
                  <div className="bg-accent h-full" style={{ width: `${(pipeline.qa / 10) * 100}%` }} />
                  <div className="bg-[hsl(270_80%_60%)] h-full" style={{ width: `${(pipeline.publish / 10) * 100}%` }} />
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-[8px] font-mono text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-warning" /> GENERATE {pipeline.generate}
                  </span>
                  <span className="flex items-center gap-1 text-[8px] font-mono text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-primary" /> PROCESS {pipeline.process}
                  </span>
                  <span className="flex items-center gap-1 text-[8px] font-mono text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-accent" /> QA {pipeline.qa}
                  </span>
                  <span className="flex items-center gap-1 text-[8px] font-mono text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-[hsl(270_80%_60%)]" /> PUBLISH {pipeline.publish}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub-agents */}
        {activeTab === "AGENTS" && (
          <div className="space-y-2">
            {subAgents.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between p-3 rounded border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`status-dot ${statusStyles[agent.status]}`} />
                  <div>
                    <p className="font-mono text-xs font-medium text-foreground">{agent.name}</p>
                    <p className="font-mono text-[9px] text-muted-foreground">{agent.task}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-foreground tabular-nums">{agent.output} items</p>
                  <div className="flex items-center gap-1 justify-end">
                    <div className="w-16 h-1 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${agent.efficiency > 80 ? "bg-accent" : agent.efficiency > 50 ? "bg-warning" : "bg-destructive"}`}
                        style={{ width: `${agent.efficiency}%` }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-muted-foreground">{agent.efficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "OVERVIEW" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded border border-border bg-secondary/20">
              <p className="font-mono text-[9px] text-muted-foreground mb-1">CONTENT SHIPPED</p>
              <p className="font-mono text-2xl font-bold text-primary tabular-nums">797</p>
            </div>
            <div className="p-3 rounded border border-border bg-secondary/20">
              <p className="font-mono text-[9px] text-muted-foreground mb-1">QUEUE DEPTH</p>
              <p className="font-mono text-2xl font-bold text-warning tabular-nums">23</p>
            </div>
            <div className="p-3 rounded border border-border bg-secondary/20">
              <p className="font-mono text-[9px] text-muted-foreground mb-1">SUCCESS RATE</p>
              <p className="font-mono text-2xl font-bold text-accent tabular-nums">98.7%</p>
            </div>
            <div className="p-3 rounded border border-border bg-secondary/20">
              <p className="font-mono text-[9px] text-muted-foreground mb-1">AVG RESPONSE</p>
              <p className="font-mono text-2xl font-bold text-foreground tabular-nums">1.2s</p>
            </div>
          </div>
        )}

        {(activeTab === "MUSIC" || activeTab === "SERVICES") && (
          <div className="text-center py-8">
            <p className="font-mono text-xs text-muted-foreground">
              {activeTab} MODULE — ALL SYSTEMS NOMINAL
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="status-dot status-online" />
              <span className="font-mono text-[10px] text-accent">ONLINE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentPanel;

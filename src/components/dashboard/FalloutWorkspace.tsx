import WorkspaceRoom from "./WorkspaceRoom";

const FalloutWorkspace = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-3">
          <span className="text-primary">WORKSPACE OVERVIEW</span>
          <span className="font-mono text-[9px] text-muted-foreground">// LIVE AGENT ACTIVITY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot status-online" />
          <span className="font-mono text-[9px] text-accent">ALL ROOMS ACTIVE</span>
        </div>
      </div>

      <div className="p-3">
        {/* Section: HERMES Factory */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-3 h-[2px] bg-primary" />
            <span className="font-display text-[9px] tracking-[0.25em] text-primary text-glow-cyan">HERMES — FACTORY I</span>
            <div className="flex-1 h-px bg-primary/20" />
            <span className="font-mono text-[9px] text-accent">$8,420.14</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <WorkspaceRoom
              title="THUMBNAIL GENERATION"
              subtitle="SCOUT — Batch processing thumbnails for YouTube / social media"
              revenue="$3,240.00"
              status="ACTIVE"
              ordersActive={4}
              accentColor="hsl(187 100% 50%)"
              furniture="desks"
              agents={[
                { name: "SCOUT", color: "hsl(187, 100%, 50%)", action: "typing", startX: 28, startY: 26, speed: 0.8 },
                { name: "SC-02", color: "hsl(187, 80%, 60%)", action: "walking-right", startX: 80, startY: 8, speed: 1.2 },
                { name: "SC-03", color: "hsl(187, 80%, 60%)", action: "carrying", startX: 40, startY: 8, speed: 0.6 },
              ]}
            />
            <WorkspaceRoom
              title="MUSIC PRODUCTION"
              subtitle="FORGE — Lo-fi beats, ambient tracks, production pipeline"
              revenue="$2,180.14"
              status="ACTIVE"
              ordersActive={2}
              accentColor="hsl(270 80% 60%)"
              furniture="studio"
              agents={[
                { name: "FORGE", color: "hsl(270, 80%, 60%)", action: "working", startX: 65, startY: 20, speed: 0 },
                { name: "FG-02", color: "hsl(270, 60%, 70%)", action: "walking-left", startX: 120, startY: 8, speed: 0.9 },
              ]}
            />
            <WorkspaceRoom
              title="PRODUCT PHOTOGRAPHY"
              subtitle="LENS — Queued product shots, editing, retouching"
              revenue="$1,800.00"
              status="BUSY"
              ordersActive={3}
              accentColor="hsl(38 92% 50%)"
              furniture="workshop"
              agents={[
                { name: "LENS", color: "hsl(38, 92%, 50%)", action: "working", startX: 15, startY: 22, speed: 0 },
                { name: "LN-02", color: "hsl(38, 70%, 60%)", action: "carrying", startX: 90, startY: 8, speed: 1 },
              ]}
            />
            <WorkspaceRoom
              title="SEO CONTENT"
              subtitle="SCRIBE — Blog series, keyword research, content optimization"
              revenue="$1,200.00"
              status="ACTIVE"
              ordersActive={1}
              accentColor="hsl(160 100% 50%)"
              furniture="desks"
              agents={[
                { name: "SCRIBE", color: "hsl(160, 100%, 50%)", action: "typing", startX: 105, startY: 26, speed: 0 },
                { name: "SB-02", color: "hsl(160, 70%, 60%)", action: "walking-right", startX: 20, startY: 8, speed: 0.7 },
              ]}
            />
          </div>
        </div>

        {/* Section: OPENCLAW Factory */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-3 h-[2px] bg-warning" />
            <span className="font-display text-[9px] tracking-[0.25em] text-warning text-glow-amber">OPENCLAW — FACTORY II</span>
            <div className="flex-1 h-px bg-warning/20" />
            <span className="font-mono text-[9px] text-accent">$4,427.49</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <WorkspaceRoom
              title="API INTEGRATIONS"
              subtitle="ARCHITECT — Service delivery, API bridging, automation"
              revenue="$1,890.00"
              status="ACTIVE"
              ordersActive={2}
              accentColor="hsl(38 92% 50%)"
              furniture="server"
              agents={[
                { name: "ARCH", color: "hsl(38, 92%, 50%)", action: "typing", startX: 50, startY: 8, speed: 0 },
                { name: "AR-02", color: "hsl(38, 70%, 60%)", action: "walking-right", startX: 10, startY: 8, speed: 1.1 },
              ]}
            />
            <WorkspaceRoom
              title="ORDER ROUTING"
              subtitle="NEXUS — Multi-platform order management and fulfillment"
              revenue="$1,537.49"
              status="ACTIVE"
              ordersActive={5}
              accentColor="hsl(187 100% 50%)"
              furniture="workshop"
              agents={[
                { name: "NEXUS", color: "hsl(187, 100%, 50%)", action: "carrying", startX: 30, startY: 8, speed: 1.3 },
                { name: "NX-02", color: "hsl(187, 80%, 60%)", action: "walking-left", startX: 100, startY: 8, speed: 0.8 },
                { name: "NX-03", color: "hsl(187, 60%, 70%)", action: "carrying", startX: 60, startY: 8, speed: 1 },
              ]}
            />
            <WorkspaceRoom
              title="QUALITY ASSURANCE"
              subtitle="SENTINEL — Revision checking, quality control, delivery approval"
              revenue="$700.00"
              status="BUSY"
              ordersActive={2}
              accentColor="hsl(345 100% 60%)"
              furniture="desks"
              agents={[
                { name: "SNTL", color: "hsl(345, 100%, 60%)", action: "working", startX: 28, startY: 26, speed: 0 },
                { name: "SN-02", color: "hsl(345, 80%, 70%)", action: "walking-right", startX: 80, startY: 8, speed: 0.5 },
              ]}
            />
            <WorkspaceRoom
              title="DEPLOYMENT OPS"
              subtitle="PHANTOM — Standby deployment, scaling, infrastructure"
              revenue="$300.00"
              status="IDLE"
              accentColor="hsl(215 30% 50%)"
              furniture="server"
              agents={[
                { name: "PHNTM", color: "hsl(215, 30%, 60%)", action: "walking-right", startX: 40, startY: 8, speed: 0.4 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FalloutWorkspace;

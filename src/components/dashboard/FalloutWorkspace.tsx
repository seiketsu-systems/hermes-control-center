import WorkspaceRoom from "./WorkspaceRoom";
import SpaceBackground from "./SpaceBackground";

const FalloutWorkspace = () => {
  return (
    <div className="panel relative">
      {/* Space background */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <SpaceBackground />
      </div>

      <div className="panel-header relative z-10" style={{
        background: "linear-gradient(90deg, hsl(220 40% 6% / 0.9), hsl(220 40% 4% / 0.7), hsl(220 40% 6% / 0.9))"
      }}>
        <div className="flex items-center gap-3">
          <span className="text-primary text-glow-cyan">⬡ STATION OVERVIEW</span>
          <span className="font-mono text-[9px] text-muted-foreground">// LIVE AGENT ACTIVITY — ALL DECKS</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="status-dot status-online" />
            <span className="font-mono text-[9px] text-accent">8 ROOMS ONLINE</span>
          </div>
          <div className="font-mono text-[10px] font-bold" style={{
            color: "hsl(160 100% 50%)",
            textShadow: "0 0 8px hsl(160 100% 50% / 0.5)"
          }}>
            $12,847.63
          </div>
        </div>
      </div>

      <div className="p-4 relative z-10">
        {/* HERMES Factory */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-4 h-[2px] bg-primary" style={{ boxShadow: "0 0 8px hsl(187 100% 50% / 0.5)" }} />
            <span className="font-display text-[10px] tracking-[0.3em] text-primary text-glow-cyan font-bold">HERMES — FACTORY I</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, hsl(187 100% 50% / 0.3), transparent)" }} />
            <span className="font-mono text-[9px] text-muted-foreground">DECK A</span>
            <span className="font-mono text-[10px] font-bold text-accent" style={{ textShadow: "0 0 6px hsl(160 100% 50% / 0.4)" }}>$8,420.14</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <WorkspaceRoom
              title="THUMBNAIL GENERATION"
              subtitle="SCOUT — Batch processing thumbnails for YouTube / social media campaigns"
              revenue="$3,240.00"
              status="ACTIVE"
              ordersActive={4}
              accentColor="hsl(187, 100%, 50%)"
              furniture="desks"
              agents={[
                { name: "SCOUT", color: "hsl(187, 100%, 50%)", action: "typing", startX: 28, startY: 28, speed: 0 },
                { name: "SC-02", color: "hsl(187, 80%, 60%)", action: "walking-right", startX: 120, startY: 12, speed: 1.4 },
                { name: "SC-03", color: "hsl(187, 80%, 60%)", action: "carrying", startX: 60, startY: 12, speed: 0.8 },
              ]}
            />
            <WorkspaceRoom
              title="MUSIC PRODUCTION"
              subtitle="FORGE — Lo-fi beats, ambient tracks, full production pipeline active"
              revenue="$2,180.14"
              status="ACTIVE"
              ordersActive={2}
              accentColor="hsl(270, 80%, 60%)"
              furniture="studio"
              agents={[
                { name: "FORGE", color: "hsl(270, 80%, 60%)", action: "working", startX: 80, startY: 28, speed: 0 },
                { name: "FG-02", color: "hsl(270, 60%, 70%)", action: "walking-left", startX: 180, startY: 12, speed: 1.1 },
                { name: "FG-03", color: "hsl(290, 70%, 55%)", action: "carrying", startX: 30, startY: 12, speed: 0.9 },
              ]}
            />
            <WorkspaceRoom
              title="PRODUCT PHOTOGRAPHY"
              subtitle="LENS — Queued product shots, editing pipeline, retouching & delivery"
              revenue="$1,800.00"
              status="BUSY"
              ordersActive={3}
              accentColor="hsl(38, 92%, 50%)"
              furniture="workshop"
              agents={[
                { name: "LENS", color: "hsl(38, 92%, 50%)", action: "hammering", startX: 25, startY: 28, speed: 0 },
                { name: "LN-02", color: "hsl(38, 70%, 60%)", action: "carrying", startX: 140, startY: 12, speed: 1.2 },
                { name: "LN-03", color: "hsl(45, 80%, 55%)", action: "walking-right", startX: 200, startY: 12, speed: 0.7 },
              ]}
            />
            <WorkspaceRoom
              title="SEO CONTENT LAB"
              subtitle="SCRIBE — Blog series, keyword research, content optimization & A/B testing"
              revenue="$1,200.00"
              status="ACTIVE"
              ordersActive={1}
              accentColor="hsl(160, 100%, 50%)"
              furniture="lab"
              agents={[
                { name: "SCRIBE", color: "hsl(160, 100%, 50%)", action: "typing", startX: 165, startY: 28, speed: 0 },
                { name: "SB-02", color: "hsl(160, 70%, 60%)", action: "walking-right", startX: 30, startY: 12, speed: 0.9 },
              ]}
            />
          </div>
        </div>

        {/* OPENCLAW Factory */}
        <div>
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-4 h-[2px] bg-warning" style={{ boxShadow: "0 0 8px hsl(38 92% 50% / 0.5)" }} />
            <span className="font-display text-[10px] tracking-[0.3em] text-warning text-glow-amber font-bold">OPENCLAW — FACTORY II</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, hsl(38 92% 50% / 0.3), transparent)" }} />
            <span className="font-mono text-[9px] text-muted-foreground">DECK B</span>
            <span className="font-mono text-[10px] font-bold text-accent" style={{ textShadow: "0 0 6px hsl(160 100% 50% / 0.4)" }}>$4,427.49</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <WorkspaceRoom
              title="API INTEGRATIONS"
              subtitle="ARCHITECT — Service delivery, API bridging, automation & middleware"
              revenue="$1,890.00"
              status="ACTIVE"
              ordersActive={2}
              accentColor="hsl(38, 92%, 50%)"
              furniture="server"
              agents={[
                { name: "ARCH", color: "hsl(38, 92%, 50%)", action: "typing", startX: 60, startY: 12, speed: 0 },
                { name: "AR-02", color: "hsl(38, 70%, 60%)", action: "walking-right", startX: 10, startY: 12, speed: 1.3 },
                { name: "AR-03", color: "hsl(45, 85%, 55%)", action: "carrying", startX: 180, startY: 12, speed: 0.8 },
              ]}
            />
            <WorkspaceRoom
              title="COMMS & ROUTING"
              subtitle="NEXUS — Multi-platform order management, routing & fulfillment tracking"
              revenue="$1,537.49"
              status="ACTIVE"
              ordersActive={5}
              accentColor="hsl(187, 100%, 50%)"
              furniture="comms"
              agents={[
                { name: "NEXUS", color: "hsl(187, 100%, 50%)", action: "working", startX: 120, startY: 28, speed: 0 },
                { name: "NX-02", color: "hsl(187, 80%, 60%)", action: "walking-left", startX: 200, startY: 12, speed: 1 },
                { name: "NX-03", color: "hsl(187, 60%, 70%)", action: "carrying", startX: 50, startY: 12, speed: 1.2 },
              ]}
            />
            <WorkspaceRoom
              title="QUALITY ASSURANCE"
              subtitle="SENTINEL — Revision checking, quality control, delivery approval & reports"
              revenue="$700.00"
              status="BUSY"
              ordersActive={2}
              accentColor="hsl(345, 100%, 60%)"
              furniture="lab"
              agents={[
                { name: "SNTL", color: "hsl(345, 100%, 60%)", action: "working", startX: 40, startY: 28, speed: 0 },
                { name: "SN-02", color: "hsl(345, 80%, 70%)", action: "walking-right", startX: 120, startY: 12, speed: 0.7 },
              ]}
            />
            <WorkspaceRoom
              title="DEPLOYMENT OPS"
              subtitle="PHANTOM — Deployment pipeline, scaling, infrastructure & monitoring"
              revenue="$300.00"
              status="IDLE"
              accentColor="hsl(215, 30%, 50%)"
              furniture="server"
              agents={[
                { name: "PHNTM", color: "hsl(215, 30%, 60%)", action: "walking-right", startX: 80, startY: 12, speed: 0.5 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FalloutWorkspace;

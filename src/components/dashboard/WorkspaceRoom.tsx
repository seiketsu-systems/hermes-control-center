import PixelAgent from "./PixelAgent";

interface RoomAgent {
  name: string;
  color: string;
  action: "walking-right" | "walking-left" | "working" | "typing" | "carrying";
  startX: number;
  startY: number;
  speed?: number;
}

interface WorkspaceRoomProps {
  title: string;
  subtitle: string;
  revenue: string;
  status: "ACTIVE" | "BUSY" | "IDLE";
  agents: RoomAgent[];
  accentColor: string;
  furniture?: "desks" | "studio" | "server" | "workshop";
  ordersActive?: number;
}

const furnitureLayouts: Record<string, JSX.Element> = {
  desks: (
    <>
      {/* Desk 1 */}
      <div className="absolute" style={{ left: 20, bottom: 4, width: 40, height: 20, background: "hsl(220 30% 18%)", border: "1px solid hsl(215 30% 24%)", borderRadius: 2 }} />
      <div className="absolute" style={{ left: 24, bottom: 22, width: 12, height: 10, background: "hsl(187 100% 50% / 0.3)", border: "1px solid hsl(187 100% 50% / 0.4)", borderRadius: 1 }}>
        <div className="w-full h-full" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(187 100% 50% / 0.1) 2px, hsl(187 100% 50% / 0.1) 3px)" }} />
      </div>
      {/* Desk 2 */}
      <div className="absolute" style={{ left: 100, bottom: 4, width: 40, height: 20, background: "hsl(220 30% 18%)", border: "1px solid hsl(215 30% 24%)", borderRadius: 2 }} />
      <div className="absolute" style={{ left: 104, bottom: 22, width: 12, height: 10, background: "hsl(187 100% 50% / 0.3)", border: "1px solid hsl(187 100% 50% / 0.4)", borderRadius: 1 }}>
        <div className="w-full h-full" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(187 100% 50% / 0.1) 2px, hsl(187 100% 50% / 0.1) 3px)" }} />
      </div>
    </>
  ),
  studio: (
    <>
      {/* Music equipment */}
      <div className="absolute" style={{ left: 15, bottom: 4, width: 30, height: 30, background: "hsl(220 30% 14%)", border: "1px solid hsl(215 30% 22%)", borderRadius: 2 }}>
        {/* Speakers */}
        <div className="absolute" style={{ left: 5, top: 5, width: 8, height: 8, borderRadius: "50%", background: "hsl(220 30% 22%)", border: "1px solid hsl(215 30% 28%)" }} />
        <div className="absolute" style={{ left: 5, top: 16, width: 8, height: 8, borderRadius: "50%", background: "hsl(220 30% 22%)", border: "1px solid hsl(215 30% 28%)" }} />
      </div>
      {/* Mixing desk */}
      <div className="absolute" style={{ left: 60, bottom: 4, width: 50, height: 16, background: "hsl(220 30% 16%)", border: "1px solid hsl(215 30% 24%)", borderRadius: 2 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute" style={{ left: 4 + i * 9, top: 3, width: 3, height: 10, background: `hsl(${160 + i * 20} 80% 50% / 0.5)`, borderRadius: 1 }}>
            <div className="absolute" style={{ bottom: Math.random() * 6, left: 0, width: 3, height: 3, background: `hsl(${160 + i * 20} 100% 60%)`, borderRadius: 1 }} />
          </div>
        ))}
      </div>
      {/* Mic */}
      <div className="absolute" style={{ left: 120, bottom: 4, width: 3, height: 34, background: "hsl(215 30% 30%)" }} />
      <div className="absolute" style={{ left: 116, bottom: 36, width: 10, height: 8, background: "hsl(215 30% 24%)", borderRadius: "50% 50% 30% 30%" }} />
    </>
  ),
  server: (
    <>
      {/* Server racks */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute" style={{ left: 15 + i * 50, bottom: 4, width: 30, height: 40, background: "hsl(220 30% 12%)", border: "1px solid hsl(215 30% 20%)", borderRadius: 2 }}>
          {[0, 1, 2, 3].map((j) => (
            <div key={j} className="absolute" style={{ left: 3, top: 4 + j * 9, width: 24, height: 6, background: "hsl(220 30% 16%)", borderRadius: 1 }}>
              <div className="absolute" style={{ right: 3, top: 2, width: 3, height: 2, borderRadius: "50%", background: j % 2 === 0 ? "hsl(160 100% 50%)" : "hsl(38 92% 50%)", boxShadow: `0 0 4px ${j % 2 === 0 ? "hsl(160 100% 50% / 0.6)" : "hsl(38 92% 50% / 0.6)"}` }} />
            </div>
          ))}
        </div>
      ))}
    </>
  ),
  workshop: (
    <>
      {/* Workbench */}
      <div className="absolute" style={{ left: 10, bottom: 4, width: 60, height: 18, background: "hsl(30 30% 22%)", border: "1px solid hsl(30 20% 30%)", borderRadius: 2 }} />
      {/* Tools on wall */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute" style={{ left: 15 + i * 14, bottom: 50, width: 8, height: 16, background: "hsl(215 30% 25%)", borderRadius: 1 }} />
      ))}
      {/* Conveyor */}
      <div className="absolute" style={{ left: 80, bottom: 4, width: 70, height: 10, background: "hsl(220 30% 15%)", border: "1px solid hsl(215 30% 22%)", borderRadius: 2 }}>
        <div className="absolute" style={{ width: "100%", height: "100%", background: "repeating-linear-gradient(90deg, transparent, transparent 8px, hsl(215 30% 20%) 8px, hsl(215 30% 20%) 10px)" }} />
      </div>
      {/* Boxes on conveyor */}
      <div className="absolute" style={{ left: 90, bottom: 12, width: 8, height: 8, background: "hsl(38 92% 50% / 0.6)", borderRadius: 1 }} />
      <div className="absolute" style={{ left: 110, bottom: 12, width: 8, height: 8, background: "hsl(160 100% 50% / 0.4)", borderRadius: 1 }} />
    </>
  ),
};

const WorkspaceRoom = ({ title, subtitle, revenue, status, agents, accentColor, furniture = "desks", ordersActive = 0 }: WorkspaceRoomProps) => {
  const statusColor = status === "ACTIVE" ? "status-online" : status === "BUSY" ? "status-warning" : "bg-primary/40";

  return (
    <div className="relative border border-border rounded overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(220 40% 7%) 0%, hsl(220 40% 4%) 100%)",
      minHeight: 140,
    }}>
      {/* Room header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border" style={{ background: "hsl(220 40% 6%)" }}>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
          <span className="font-display text-[8px] tracking-[0.2em]" style={{ color: accentColor }}>{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {ordersActive > 0 && (
            <span className="font-mono text-[8px] text-warning">{ordersActive} ORDERS</span>
          )}
          <span className="font-mono text-[9px] font-bold" style={{ color: "hsl(160 100% 50%)", textShadow: "0 0 6px hsl(160 100% 50% / 0.4)" }}>{revenue}</span>
        </div>
      </div>

      {/* Room floor */}
      <div className="relative" style={{ height: 100 }}>
        {/* Floor grid pattern */}
        <div className="absolute inset-0" style={{
          background: `repeating-linear-gradient(90deg, transparent, transparent 19px, hsl(215 30% 16% / 0.15) 19px, hsl(215 30% 16% / 0.15) 20px), repeating-linear-gradient(0deg, transparent, transparent 19px, hsl(215 30% 16% / 0.1) 19px, hsl(215 30% 16% / 0.1) 20px)`,
          backgroundSize: "20px 20px"
        }} />
        {/* Floor line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }} />

        {/* Furniture */}
        {furnitureLayouts[furniture]}

        {/* Agents */}
        {agents.map((agent) => (
          <PixelAgent
            key={agent.name}
            name={agent.name}
            color={agent.color}
            action={agent.action}
            startX={agent.startX}
            startY={agent.startY}
            roomWidth={180}
            speed={agent.speed}
          />
        ))}
      </div>

      {/* Subtitle */}
      <div className="px-3 py-1 border-t border-border/50" style={{ background: "hsl(220 40% 5%)" }}>
        <span className="font-mono text-[7px] text-muted-foreground tracking-wider">{subtitle}</span>
      </div>
    </div>
  );
};

export default WorkspaceRoom;

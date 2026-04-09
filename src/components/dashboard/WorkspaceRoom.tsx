import PixelAgent from "./PixelAgent";
import { useState, useEffect } from "react";

interface RoomAgent {
  name: string;
  color: string;
  action: "walking-right" | "walking-left" | "working" | "typing" | "carrying" | "hammering";
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
  furniture?: "desks" | "studio" | "server" | "workshop" | "lab" | "comms";
  ordersActive?: number;
}

const WorkspaceRoom = ({ title, subtitle, revenue, status, agents, accentColor, furniture = "desks", ordersActive = 0 }: WorkspaceRoomProps) => {
  const statusColor = status === "ACTIVE" ? "status-online" : status === "BUSY" ? "status-warning" : "bg-muted-foreground/40";
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => (p + 1) % 60), 100);
    return () => clearInterval(interval);
  }, []);

  const glowIntensity = Math.sin(pulse * 0.1) * 0.15 + 0.25;

  return (
    <div className="relative border rounded-sm overflow-hidden group" style={{
      borderColor: `${accentColor.replace(")", " / 0.3)")}`,
      background: "linear-gradient(180deg, hsl(220 40% 8%) 0%, hsl(220 45% 4%) 100%)",
      minHeight: 220,
      boxShadow: `0 0 20px ${accentColor.replace(")", ` / ${glowIntensity})`)}`,
      transition: "box-shadow 0.3s",
    }}>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: accentColor }} />

      {/* Room header */}
      <div className="flex items-center justify-between px-3 py-2 border-b relative z-10" style={{
        borderColor: `${accentColor.replace(")", " / 0.2)")}`,
        background: `linear-gradient(90deg, ${accentColor.replace(")", " / 0.08)")}, transparent, ${accentColor.replace(")", " / 0.05)")})`
      }}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
          <span className="font-display text-[9px] tracking-[0.2em] font-bold" style={{ color: accentColor }}>{title}</span>
          <span className="font-mono text-[7px] text-muted-foreground uppercase">{status}</span>
        </div>
        <div className="flex items-center gap-3">
          {ordersActive > 0 && (
            <span className="font-mono text-[8px] px-1.5 py-0.5 rounded" style={{
              background: "hsl(38 92% 50% / 0.15)",
              color: "hsl(38 92% 60%)",
              border: "1px solid hsl(38 92% 50% / 0.3)"
            }}>{ordersActive} ORDERS</span>
          )}
          <span className="font-mono text-[10px] font-bold" style={{
            color: "hsl(160 100% 50%)",
            textShadow: "0 0 8px hsl(160 100% 50% / 0.5)"
          }}>{revenue}</span>
        </div>
      </div>

      {/* Room interior */}
      <div className="relative" style={{ height: 180 }}>
        {/* Floor grid */}
        <div className="absolute inset-0" style={{
          background: `
            repeating-linear-gradient(90deg, transparent, transparent 23px, hsl(215 30% 16% / 0.12) 23px, hsl(215 30% 16% / 0.12) 24px),
            repeating-linear-gradient(0deg, transparent, transparent 23px, hsl(215 30% 16% / 0.08) 23px, hsl(215 30% 16% / 0.08) 24px)
          `,
        }} />

        {/* Ceiling lights */}
        {[0.25, 0.5, 0.75].map((pos, i) => (
          <div key={i}>
            <div className="absolute" style={{
              left: `${pos * 100}%`, top: 0, width: 20, height: 4, marginLeft: -10,
              background: `${accentColor.replace(")", " / 0.6)")}`,
              boxShadow: `0 0 12px ${accentColor.replace(")", " / 0.4)")}`,
              borderRadius: "0 0 2px 2px"
            }} />
            <div className="absolute" style={{
              left: `${pos * 100}%`, top: 0, width: 60, height: 40, marginLeft: -30,
              background: `linear-gradient(180deg, ${accentColor.replace(")", " / 0.06)")}, transparent)`,
            }} />
          </div>
        ))}

        {/* Floor line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{
          background: `linear-gradient(90deg, transparent 5%, ${accentColor.replace(")", " / 0.5)")}, transparent 95%)`,
          boxShadow: `0 0 10px ${accentColor.replace(")", " / 0.3)")}`
        }} />

        {/* Wall base */}
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: 30,
          background: "linear-gradient(180deg, transparent, hsl(220 40% 5% / 0.6))"
        }} />

        {/* Furniture */}
        <RoomFurniture type={furniture} accentColor={accentColor} pulse={pulse} />

        {/* Agents */}
        {agents.map((agent) => (
          <PixelAgent
            key={agent.name}
            name={agent.name}
            color={agent.color}
            action={agent.action}
            startX={agent.startX}
            startY={agent.startY}
            roomWidth={280}
            speed={agent.speed}
            size={1.4}
          />
        ))}

        {/* Ambient particles */}
        {status !== "IDLE" && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: 2, height: 2,
            left: `${20 + i * 20}%`,
            top: `${30 + (pulse * 2 + i * 15) % 40}%`,
            background: accentColor,
            opacity: 0.3 + Math.sin((pulse + i * 10) * 0.15) * 0.3,
            boxShadow: `0 0 4px ${accentColor}`,
            transition: "top 0.3s, opacity 0.3s"
          }} />
        ))}
      </div>

      {/* Subtitle bar */}
      <div className="px-3 py-1.5 border-t relative z-10" style={{
        borderColor: `${accentColor.replace(")", " / 0.15)")}`,
        background: "hsl(220 40% 5%)"
      }}>
        <span className="font-mono text-[7px] text-muted-foreground tracking-wider">{subtitle}</span>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanline opacity-30" />
    </div>
  );
};

const RoomFurniture = ({ type, accentColor, pulse }: { type: string; accentColor: string; pulse: number }) => {
  const blinkOn = pulse % 10 < 7;

  switch (type) {
    case "desks":
      return (
        <>
          {/* Desk 1 with monitor */}
          <div className="absolute" style={{ left: 20, bottom: 3, width: 55, height: 26, background: "hsl(220 30% 14%)", border: "1px solid hsl(215 30% 20%)", borderRadius: 2 }} />
          <div className="absolute" style={{ left: 26, bottom: 27, width: 28, height: 22, background: "hsl(220 30% 8%)", border: "1px solid hsl(215 30% 22%)", borderRadius: 2 }}>
            <div className="absolute inset-1" style={{ background: `linear-gradient(135deg, ${accentColor.replace(")", " / 0.15)")}, hsl(220 30% 10%))`, borderRadius: 1 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="absolute" style={{ left: 3, top: 3 + i * 4, width: `${60 + i * 5}%`, height: 2, background: accentColor.replace(")", " / 0.3)"), borderRadius: 1 }} />
              ))}
            </div>
          </div>
          {/* Monitor glow */}
          <div className="absolute" style={{ left: 20, bottom: 25, width: 44, height: 30, background: `radial-gradient(ellipse, ${accentColor.replace(")", " / 0.06)")}, transparent)`, pointerEvents: "none" }} />
          {/* Keyboard */}
          <div className="absolute" style={{ left: 56, bottom: 27, width: 14, height: 6, background: "hsl(220 30% 16%)", borderRadius: 1 }}>
            {[0, 1, 2].map(r => (
              <div key={r} className="flex gap-px absolute" style={{ left: 1, top: 1 + r * 2 }}>
                {[0, 1, 2, 3, 4].map(k => (
                  <div key={k} style={{ width: 2, height: 1.5, background: "hsl(215 30% 24%)", borderRadius: 0.5 }} />
                ))}
              </div>
            ))}
          </div>

          {/* Desk 2 with monitor */}
          <div className="absolute" style={{ left: 160, bottom: 3, width: 55, height: 26, background: "hsl(220 30% 14%)", border: "1px solid hsl(215 30% 20%)", borderRadius: 2 }} />
          <div className="absolute" style={{ left: 166, bottom: 27, width: 28, height: 22, background: "hsl(220 30% 8%)", border: "1px solid hsl(215 30% 22%)", borderRadius: 2 }}>
            <div className="absolute inset-1" style={{ background: `linear-gradient(135deg, hsl(160 100% 50% / 0.12), hsl(220 30% 10%))`, borderRadius: 1 }}>
              {[0, 1, 2].map(i => (
                <div key={i} className="absolute" style={{ left: 3, top: 4 + i * 5, width: `${50 + i * 10}%`, height: 2, background: "hsl(160 100% 50% / 0.3)", borderRadius: 1 }} />
              ))}
            </div>
          </div>

          {/* Chair */}
          <div className="absolute" style={{ left: 95, bottom: 3, width: 20, height: 30, background: "hsl(220 30% 12%)", borderRadius: "3px 3px 0 0", border: "1px solid hsl(215 30% 18%)" }} />
          {/* Plant */}
          <div className="absolute" style={{ left: 230, bottom: 3, width: 4, height: 20, background: "hsl(120 40% 25%)" }} />
          <div className="absolute" style={{ left: 224, bottom: 20, width: 16, height: 12, background: "hsl(130 60% 30%)", borderRadius: "50% 50% 30% 30%" }} />
        </>
      );

    case "studio":
      return (
        <>
          {/* Large speaker L */}
          <div className="absolute" style={{ left: 10, bottom: 3, width: 32, height: 50, background: "hsl(220 30% 10%)", border: "1px solid hsl(215 30% 18%)", borderRadius: 3 }}>
            <div className="absolute" style={{ left: 6, top: 6, width: 20, height: 20, borderRadius: "50%", background: "hsl(220 30% 14%)", border: "2px solid hsl(215 30% 22%)" }}>
              <div className="absolute inset-2 rounded-full" style={{ background: "hsl(220 30% 18%)" }} />
            </div>
            <div className="absolute" style={{ left: 10, top: 30, width: 12, height: 12, borderRadius: "50%", background: "hsl(220 30% 14%)", border: "1px solid hsl(215 30% 22%)" }} />
          </div>

          {/* Mixing console */}
          <div className="absolute" style={{ left: 60, bottom: 3, width: 90, height: 28, background: "linear-gradient(180deg, hsl(220 30% 14%), hsl(220 30% 10%))", border: "1px solid hsl(215 30% 22%)", borderRadius: 2 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className="absolute" style={{ left: 5 + i * 10, top: 4, width: 4, height: 18, background: "hsl(220 30% 8%)", borderRadius: 1 }}>
                <div className="absolute" style={{
                  bottom: 2 + Math.sin(pulse * 0.1 + i) * 4 + 4, left: 0.5, width: 3, height: 4,
                  background: `hsl(${140 + i * 18} 80% 50%)`,
                  borderRadius: 1,
                  boxShadow: `0 0 4px hsl(${140 + i * 18} 80% 50% / 0.5)`,
                  transition: "bottom 0.3s"
                }} />
              </div>
            ))}
          </div>

          {/* Monitor */}
          <div className="absolute" style={{ left: 75, bottom: 30, width: 50, height: 30, background: "hsl(220 30% 6%)", border: "1px solid hsl(270 60% 40% / 0.4)", borderRadius: 2 }}>
            <div className="absolute inset-1" style={{ background: "linear-gradient(135deg, hsl(270 60% 30% / 0.2), hsl(220 30% 8%))" }}>
              {/* Waveform */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 28">
                <polyline
                  fill="none"
                  stroke="hsl(270, 80%, 60%)"
                  strokeWidth="1"
                  opacity="0.6"
                  points={Array.from({ length: 24 }, (_, i) => `${i * 2},${14 + Math.sin(i * 0.5 + pulse * 0.1) * 8}`).join(" ")}
                />
              </svg>
            </div>
          </div>

          {/* Large speaker R */}
          <div className="absolute" style={{ left: 220, bottom: 3, width: 32, height: 50, background: "hsl(220 30% 10%)", border: "1px solid hsl(215 30% 18%)", borderRadius: 3 }}>
            <div className="absolute" style={{ left: 6, top: 6, width: 20, height: 20, borderRadius: "50%", background: "hsl(220 30% 14%)", border: "2px solid hsl(215 30% 22%)" }} />
            <div className="absolute" style={{ left: 10, top: 30, width: 12, height: 12, borderRadius: "50%", background: "hsl(220 30% 14%)", border: "1px solid hsl(215 30% 22%)" }} />
          </div>

          {/* Mic stand */}
          <div className="absolute" style={{ left: 175, bottom: 3, width: 3, height: 55, background: "hsl(215 30% 25%)" }} />
          <div className="absolute" style={{ left: 169, bottom: 55, width: 14, height: 10, background: "hsl(215 30% 20%)", borderRadius: "50% 50% 30% 30%" }} />
          <div className="absolute rounded-full" style={{ left: 173, bottom: 56, width: 6, height: 6, background: "hsl(345 100% 50% / 0.6)", boxShadow: blinkOn ? "0 0 6px hsl(345 100% 50% / 0.5)" : "none" }} />
        </>
      );

    case "server":
      return (
        <>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="absolute" style={{
              left: 10 + i * 60, bottom: 3, width: 42, height: 70,
              background: "linear-gradient(180deg, hsl(220 30% 10%), hsl(220 30% 7%))",
              border: "1px solid hsl(215 30% 18%)", borderRadius: 2
            }}>
              {[0, 1, 2, 3, 4, 5].map(j => (
                <div key={j} className="absolute" style={{ left: 3, top: 4 + j * 10, width: 36, height: 7, background: "hsl(220 30% 12%)", borderRadius: 1 }}>
                  {/* LED indicators */}
                  <div className="absolute" style={{
                    right: 3, top: 2.5, width: 3, height: 2, borderRadius: "50%",
                    background: blinkOn && (j + i) % 3 === 0 ? "hsl(160 100% 50%)" : j % 2 === 0 ? "hsl(160 100% 50% / 0.7)" : "hsl(38 92% 50% / 0.7)",
                    boxShadow: `0 0 4px ${j % 2 === 0 ? "hsl(160 100% 50% / 0.4)" : "hsl(38 92% 50% / 0.4)"}`
                  }} />
                  <div className="absolute" style={{
                    right: 8, top: 2.5, width: 3, height: 2, borderRadius: "50%",
                    background: blinkOn && (j + i) % 4 === 0 ? "hsl(187 100% 50%)" : "hsl(187 100% 50% / 0.3)",
                    boxShadow: "0 0 3px hsl(187 100% 50% / 0.3)"
                  }} />
                  {/* Drive slots */}
                  <div className="absolute" style={{ left: 3, top: 2, width: 18, height: 3, background: "hsl(220 30% 16%)", borderRadius: 0.5 }} />
                </div>
              ))}
              {/* Rack label */}
              <div className="absolute" style={{ bottom: 3, left: 3, right: 3, height: 6, background: accentColor.replace(")", " / 0.1)"), borderRadius: 1 }}>
                <div style={{ fontSize: 5, color: accentColor, textAlign: "center", lineHeight: "6px", fontFamily: "var(--font-mono)" }}>R{i + 1}</div>
              </div>
            </div>
          ))}
          {/* Cable bundles */}
          <div className="absolute" style={{ left: 50, bottom: 75, width: 160, height: 3, background: "hsl(215 30% 20%)", borderRadius: 1 }} />
          {[60, 110, 160, 210].map((x, i) => (
            <div key={i} className="absolute" style={{ left: x, bottom: 73, width: 2, height: 10, background: "hsl(215 30% 22%)" }} />
          ))}
        </>
      );

    case "workshop":
      return (
        <>
          {/* Workbench */}
          <div className="absolute" style={{ left: 10, bottom: 3, width: 80, height: 24, background: "linear-gradient(180deg, hsl(30 25% 22%), hsl(30 20% 16%))", border: "1px solid hsl(30 20% 28%)", borderRadius: 2 }}>
            {/* Vise */}
            <div className="absolute" style={{ right: 5, top: -8, width: 12, height: 12, background: "hsl(215 20% 30%)", borderRadius: 1 }} />
          </div>
          {/* Tools on pegboard */}
          <div className="absolute" style={{ left: 10, bottom: 30, width: 80, height: 50, background: "hsl(220 30% 8% / 0.5)", border: "1px solid hsl(215 30% 15%)", borderRadius: 1 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="absolute" style={{
                left: 8 + i * 14, top: 8, width: 6, height: 24 - i * 3,
                background: `hsl(${200 + i * 20} 30% 30%)`, borderRadius: 1
              }} />
            ))}
          </div>

          {/* Conveyor belt */}
          <div className="absolute" style={{ left: 110, bottom: 3, width: 140, height: 14, background: "hsl(220 30% 12%)", border: "1px solid hsl(215 30% 18%)", borderRadius: 2 }}>
            <div className="absolute inset-0" style={{
              background: "repeating-linear-gradient(90deg, transparent, transparent 10px, hsl(215 30% 16%) 10px, hsl(215 30% 16%) 12px)"
            }} />
            {/* Rollers */}
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="absolute" style={{ left: 10 + i * 28, bottom: -2, width: 8, height: 8, borderRadius: "50%", background: "hsl(220 30% 18%)", border: "1px solid hsl(215 30% 24%)" }} />
            ))}
          </div>
          {/* Boxes on conveyor */}
          <div className="absolute" style={{ left: 120 + (pulse % 30) * 3, bottom: 15, width: 12, height: 12, background: "hsl(38 92% 50% / 0.7)", borderRadius: 1, border: "1px solid hsl(38 92% 60% / 0.4)", transition: "left 0.3s" }} />
          <div className="absolute" style={{ left: 180 + (pulse % 25) * 2, bottom: 15, width: 10, height: 10, background: "hsl(160 100% 50% / 0.5)", borderRadius: 1, border: "1px solid hsl(160 100% 60% / 0.3)", transition: "left 0.3s" }} />
          <div className="absolute" style={{ left: 145, bottom: 15, width: 14, height: 10, background: "hsl(270 60% 50% / 0.5)", borderRadius: 1, border: "1px solid hsl(270 60% 60% / 0.3)" }} />

          {/* Shelves */}
          <div className="absolute" style={{ left: 105, bottom: 50, width: 50, height: 3, background: "hsl(215 30% 22%)" }} />
          <div className="absolute" style={{ left: 105, bottom: 75, width: 50, height: 3, background: "hsl(215 30% 22%)" }} />
          {[0, 1, 2].map(i => (
            <div key={i} className="absolute" style={{ left: 110 + i * 16, bottom: 53, width: 10, height: 10, background: `hsl(${160 + i * 40} 60% 40% / 0.5)`, borderRadius: 1 }} />
          ))}
        </>
      );

    case "lab":
      return (
        <>
          {/* Lab bench */}
          <div className="absolute" style={{ left: 20, bottom: 3, width: 100, height: 20, background: "hsl(220 20% 18%)", border: "1px solid hsl(215 20% 25%)", borderRadius: 2 }} />
          {/* Microscope */}
          <div className="absolute" style={{ left: 30, bottom: 23, width: 4, height: 30, background: "hsl(215 30% 30%)" }} />
          <div className="absolute" style={{ left: 24, bottom: 50, width: 16, height: 8, background: "hsl(215 30% 25%)", borderRadius: 2 }} />
          <div className="absolute" style={{ left: 26, bottom: 55, width: 3, height: 3, borderRadius: "50%", background: "hsl(187 100% 50% / 0.6)", boxShadow: "0 0 6px hsl(187 100% 50% / 0.4)" }} />
          {/* Beakers */}
          {[0, 1, 2].map(i => (
            <div key={i} className="absolute" style={{
              left: 60 + i * 18, bottom: 23, width: 10, height: 18 + i * 3,
              background: `hsl(${160 + i * 50} 70% 50% / 0.2)`,
              border: `1px solid hsl(${160 + i * 50} 70% 50% / 0.4)`,
              borderRadius: "0 0 3px 3px"
            }}>
              <div className="absolute bottom-0 left-0 right-0" style={{
                height: `${40 + i * 15}%`,
                background: `hsl(${160 + i * 50} 70% 50% / 0.3)`,
                borderRadius: "0 0 2px 2px"
              }} />
            </div>
          ))}
          {/* Hologram display */}
          <div className="absolute" style={{ left: 160, bottom: 3, width: 70, height: 80, background: "hsl(220 30% 7%)", border: "1px solid hsl(187 100% 50% / 0.2)", borderRadius: 3 }}>
            <div className="absolute inset-2" style={{ background: `radial-gradient(circle, hsl(187 100% 50% / 0.08), transparent)` }}>
              {/* DNA helix visualization */}
              <svg className="w-full h-full" viewBox="0 0 66 76">
                {Array.from({ length: 12 }, (_, i) => {
                  const y = i * 6 + 3;
                  const x1 = 33 + Math.sin(i * 0.8 + pulse * 0.05) * 20;
                  const x2 = 33 - Math.sin(i * 0.8 + pulse * 0.05) * 20;
                  return (
                    <g key={i}>
                      <circle cx={x1} cy={y} r="2" fill="hsl(187, 100%, 50%)" opacity="0.6" />
                      <circle cx={x2} cy={y} r="2" fill="hsl(160, 100%, 50%)" opacity="0.6" />
                      <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(200, 80%, 50%)" strokeWidth="0.5" opacity="0.3" />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </>
      );

    case "comms":
      return (
        <>
          {/* Large radar dish */}
          <div className="absolute" style={{ left: 20, bottom: 3, width: 80, height: 80 }}>
            <svg className="w-full h-full" viewBox="0 0 80 80">
              {/* Radar circles */}
              {[1, 2, 3].map(r => (
                <circle key={r} cx="40" cy="40" r={r * 12} fill="none" stroke="hsl(187, 100%, 50%)" strokeWidth="0.5" opacity="0.2" />
              ))}
              {/* Sweep line */}
              <line
                x1="40" y1="40"
                x2={40 + Math.cos(pulse * 0.1) * 36}
                y2={40 + Math.sin(pulse * 0.1) * 36}
                stroke="hsl(187, 100%, 50%)" strokeWidth="1.5" opacity="0.6"
              />
              {/* Blips */}
              {[0, 1, 2].map(i => (
                <circle key={i} cx={40 + Math.cos(i * 2.1) * (15 + i * 8)} cy={40 + Math.sin(i * 2.1) * (15 + i * 8)} r="2"
                  fill="hsl(160, 100%, 50%)" opacity={blinkOn ? "0.8" : "0.3"} />
              ))}
              {/* Center */}
              <circle cx="40" cy="40" r="3" fill="hsl(187, 100%, 50%)" opacity="0.8" />
            </svg>
          </div>

          {/* Comm terminals */}
          {[0, 1].map(i => (
            <div key={i} className="absolute" style={{
              left: 130 + i * 60, bottom: 3, width: 44, height: 55,
              background: "hsl(220 30% 9%)", border: "1px solid hsl(215 30% 18%)", borderRadius: 2
            }}>
              <div className="absolute" style={{ left: 3, top: 3, right: 3, height: 28, background: "hsl(220 30% 6%)", borderRadius: 1 }}>
                {/* Screen content */}
                {[0, 1, 2, 3].map(j => (
                  <div key={j} className="absolute" style={{
                    left: 3, top: 4 + j * 6, width: `${30 + Math.random() * 30}%`, height: 2,
                    background: i === 0 ? "hsl(160 100% 50% / 0.4)" : "hsl(38 92% 50% / 0.4)", borderRadius: 1
                  }} />
                ))}
              </div>
              {/* Buttons */}
              {[0, 1, 2].map(j => (
                <div key={j} className="absolute" style={{
                  left: 6 + j * 12, bottom: 8, width: 8, height: 4,
                  background: j === 0 ? "hsl(160 100% 50% / 0.5)" : "hsl(215 30% 25%)",
                  borderRadius: 1
                }} />
              ))}
            </div>
          ))}

          {/* Antenna */}
          <div className="absolute" style={{ left: 248, bottom: 3, width: 3, height: 80, background: "hsl(215 30% 25%)" }} />
          <div className="absolute" style={{ left: 243, bottom: 75, width: 13, height: 3, background: "hsl(215 30% 30%)" }} />
          <div className="absolute rounded-full" style={{
            left: 247, bottom: 78, width: 5, height: 5,
            background: "hsl(345 100% 50%)",
            boxShadow: blinkOn ? "0 0 8px hsl(345 100% 50% / 0.8)" : "0 0 3px hsl(345 100% 50% / 0.3)"
          }} />
        </>
      );

    default:
      return null;
  }
};

export default WorkspaceRoom;

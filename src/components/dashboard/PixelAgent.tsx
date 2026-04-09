import { useState, useEffect } from "react";

type AgentAction = "walking-right" | "walking-left" | "working" | "typing" | "carrying" | "hammering";

interface PixelAgentProps {
  name: string;
  color: string;
  action: AgentAction;
  startX: number;
  startY: number;
  roomWidth: number;
  speed?: number;
  size?: number;
}

const PixelAgent = ({ name, color, action, startX, startY, roomWidth, speed = 1, size = 1 }: PixelAgentProps) => {
  const [x, setX] = useState(startX);
  const [direction, setDirection] = useState<1 | -1>(action === "walking-left" ? -1 : 1);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 8);

      if (action === "walking-right" || action === "walking-left" || action === "carrying") {
        setX((prev) => {
          const next = prev + direction * speed;
          if (next > roomWidth - 30 * size) {
            setDirection(-1);
            return roomWidth - 30 * size;
          }
          if (next < 8) {
            setDirection(1);
            return 8;
          }
          return next;
        });
      }
    }, 200);
    return () => clearInterval(interval);
  }, [action, direction, speed, roomWidth, size]);

  const isFlipped = direction === -1;
  const walkFrame = frame % 2 === 0;
  const workFrame = frame % 4;
  const s = size;

  // Breath animation for stationary agents
  const breathOffset = action === "working" || action === "typing" || action === "hammering"
    ? Math.sin(frame * Math.PI / 2) * 0.5 : 0;

  return (
    <div
      className="absolute"
      style={{
        left: x,
        bottom: startY,
        transform: isFlipped ? "scaleX(-1)" : "scaleX(1)",
        transition: "left 0.18s linear",
        zIndex: 10,
        imageRendering: "pixelated" as any,
      }}
    >
      {/* Shadow */}
      <div className="absolute" style={{
        width: 14 * s, height: 4 * s, left: 1 * s, bottom: -2 * s,
        background: "rgba(0,0,0,0.4)", borderRadius: "50%",
        filter: "blur(2px)"
      }} />

      <div className="relative" style={{ width: 16 * s, height: 28 * s }}>
        {/* Hard hat / helmet for some agents */}
        <div className="absolute" style={{
          width: 12 * s, height: 5 * s, left: 2 * s, top: (-2 + breathOffset) * s,
          background: color, borderRadius: `${3 * s}px ${3 * s}px ${1 * s}px ${1 * s}px`,
          boxShadow: `0 0 ${6 * s}px ${color}60`
        }} />

        {/* Head */}
        <div className="absolute" style={{
          width: 10 * s, height: 10 * s, left: 3 * s, top: (1 + breathOffset) * s,
          background: "#F5D6A8", borderRadius: `${2 * s}px`
        }} />

        {/* Eyes */}
        <div className="absolute" style={{
          width: 2 * s, height: 3 * s, left: 5 * s, top: (4 + breathOffset) * s,
          background: "#1a1a2e", borderRadius: 1
        }} />
        <div className="absolute" style={{
          width: 2 * s, height: 3 * s, left: 9 * s, top: (4 + breathOffset) * s,
          background: "#1a1a2e", borderRadius: 1
        }} />
        {/* Eye glow */}
        <div className="absolute" style={{
          width: 1 * s, height: 1 * s, left: 5.5 * s, top: (4.5 + breathOffset) * s,
          background: color, borderRadius: "50%",
          boxShadow: `0 0 ${3 * s}px ${color}`
        }} />
        <div className="absolute" style={{
          width: 1 * s, height: 1 * s, left: 9.5 * s, top: (4.5 + breathOffset) * s,
          background: color, borderRadius: "50%",
          boxShadow: `0 0 ${3 * s}px ${color}`
        }} />

        {/* Body / Suit */}
        <div className="absolute" style={{
          width: 12 * s, height: 10 * s, left: 2 * s, top: (11 + breathOffset) * s,
          background: `linear-gradient(180deg, ${color}, ${color}cc)`,
          borderRadius: `${1 * s}px`,
          boxShadow: `inset 0 0 ${4 * s}px rgba(255,255,255,0.1)`
        }} />
        {/* Belt / utility detail */}
        <div className="absolute" style={{
          width: 12 * s, height: 2 * s, left: 2 * s, top: (17 + breathOffset) * s,
          background: "rgba(0,0,0,0.3)", borderRadius: 1
        }} />
        {/* Chest badge */}
        <div className="absolute" style={{
          width: 3 * s, height: 3 * s, left: 6.5 * s, top: (12 + breathOffset) * s,
          background: `${color}40`, border: `1px solid ${color}80`,
          borderRadius: 1
        }} />

        {/* Arms */}
        {(action === "working" || action === "typing" || action === "hammering") ? (
          <>
            <div className="absolute" style={{
              width: 4 * s, height: 8 * s, left: -2 * s, top: (12 + breathOffset) * s,
              background: color, borderRadius: `${1 * s}px`,
              transform: `rotate(${workFrame < 2 ? -40 : -60}deg)`,
              transformOrigin: "top right",
              transition: "transform 0.15s"
            }} />
            <div className="absolute" style={{
              width: 4 * s, height: 8 * s, left: 14 * s, top: (12 + breathOffset) * s,
              background: color, borderRadius: `${1 * s}px`,
              transform: `rotate(${workFrame < 2 ? 40 : 60}deg)`,
              transformOrigin: "top left",
              transition: "transform 0.15s"
            }} />
            {/* Sparks for hammering */}
            {action === "hammering" && workFrame === 0 && (
              <>
                <div className="absolute" style={{ width: 2 * s, height: 2 * s, left: -6 * s, top: 8 * s, background: "hsl(38 92% 70%)", borderRadius: "50%", boxShadow: "0 0 4px hsl(38 92% 50%)" }} />
                <div className="absolute" style={{ width: 1.5 * s, height: 1.5 * s, left: -4 * s, top: 6 * s, background: "hsl(38 92% 80%)", borderRadius: "50%" }} />
              </>
            )}
          </>
        ) : (
          <>
            <div className="absolute" style={{
              width: 4 * s, height: 8 * s, left: -2 * s, top: 12 * s,
              background: color, borderRadius: `${1 * s}px`,
              transform: walkFrame ? "rotate(-25deg)" : "rotate(25deg)",
              transformOrigin: "top right",
              transition: "transform 0.15s"
            }} />
            <div className="absolute" style={{
              width: 4 * s, height: 8 * s, left: 14 * s, top: 12 * s,
              background: color, borderRadius: `${1 * s}px`,
              transform: walkFrame ? "rotate(25deg)" : "rotate(-25deg)",
              transformOrigin: "top left",
              transition: "transform 0.15s"
            }} />
          </>
        )}

        {/* Legs */}
        <div className="absolute" style={{
          width: 5 * s, height: 8 * s, left: 2 * s, top: (20 + breathOffset) * s,
          background: "#2A2A4C", borderRadius: `${1 * s}px`,
          transform: walkFrame && speed > 0 ? "rotate(-18deg)" : speed > 0 ? "rotate(18deg)" : "none",
          transformOrigin: "top center",
          transition: "transform 0.15s"
        }} />
        <div className="absolute" style={{
          width: 5 * s, height: 8 * s, left: 9 * s, top: (20 + breathOffset) * s,
          background: "#2A2A4C", borderRadius: `${1 * s}px`,
          transform: walkFrame && speed > 0 ? "rotate(18deg)" : speed > 0 ? "rotate(-18deg)" : "none",
          transformOrigin: "top center",
          transition: "transform 0.15s"
        }} />
        {/* Boots */}
        <div className="absolute" style={{
          width: 6 * s, height: 3 * s, left: 1 * s, bottom: 0,
          background: "#1a1a2e", borderRadius: `0 0 ${1 * s}px ${1 * s}px`
        }} />
        <div className="absolute" style={{
          width: 6 * s, height: 3 * s, left: 9 * s, bottom: 0,
          background: "#1a1a2e", borderRadius: `0 0 ${1 * s}px ${1 * s}px`
        }} />

        {/* Carrying item */}
        {action === "carrying" && (
          <div className="absolute" style={{
            width: 8 * s, height: 8 * s, left: -6 * s, top: 8 * s,
            background: "linear-gradient(135deg, hsl(38 92% 50%), hsl(38 92% 40%))",
            borderRadius: `${1 * s}px`,
            boxShadow: "0 0 8px hsl(38 92% 50% / 0.5)",
            border: "1px solid hsl(38 92% 60% / 0.5)"
          }} />
        )}
      </div>

      {/* Name tag */}
      <div
        className="absolute font-mono text-center whitespace-nowrap"
        style={{
          fontSize: 7 * s,
          bottom: -12 * s,
          left: "50%",
          transform: `translateX(-50%) ${isFlipped ? "scaleX(-1)" : ""}`,
          color,
          textShadow: `0 0 6px ${color}`,
          letterSpacing: 1.5,
          fontWeight: 700
        }}
      >
        {name}
      </div>

      {/* Activity indicator glow */}
      {(action === "working" || action === "typing" || action === "hammering") && (
        <div className="absolute" style={{
          width: 20 * s, height: 20 * s,
          left: -2 * s, top: 4 * s,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          animation: "pulse-glow 2s ease-in-out infinite"
        }} />
      )}
    </div>
  );
};

export default PixelAgent;

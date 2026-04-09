import { useState, useEffect } from "react";

type AgentAction = "walking-right" | "walking-left" | "working" | "typing" | "carrying";

interface PixelAgentProps {
  name: string;
  color: string;
  action: AgentAction;
  startX: number;
  startY: number;
  roomWidth: number;
  speed?: number;
}

const PixelAgent = ({ name, color, action, startX, startY, roomWidth, speed = 1 }: PixelAgentProps) => {
  const [x, setX] = useState(startX);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);

      if (action === "walking-right" || action === "walking-left" || action === "carrying") {
        setX((prev) => {
          const next = prev + direction * speed;
          if (next > roomWidth - 24) {
            setDirection(-1);
            return roomWidth - 24;
          }
          if (next < 8) {
            setDirection(1);
            return 8;
          }
          return next;
        });
      }
    }, 250);
    return () => clearInterval(interval);
  }, [action, direction, speed, roomWidth]);

  const isFlipped = direction === -1;
  const walkFrame = frame % 2 === 0;
  const workFrame = frame;

  return (
    <div
      className="absolute transition-all duration-200"
      style={{ left: x, bottom: startY, transform: isFlipped ? "scaleX(-1)" : "scaleX(1)" }}
    >
      {/* Agent body - pixel art style */}
      <div className="relative" style={{ width: 16, height: 24, imageRendering: "pixelated" }}>
        {/* Head */}
        <div className="absolute" style={{ width: 8, height: 8, left: 4, top: 0, background: "#F5D6A8", borderRadius: 1 }} />
        {/* Eyes */}
        <div className="absolute" style={{ width: 2, height: 2, left: 6, top: 3, background: "#222" }} />
        <div className="absolute" style={{ width: 2, height: 2, left: 10, top: 3, background: "#222" }} />
        {/* Hair */}
        <div className="absolute" style={{ width: 10, height: 3, left: 3, top: -1, background: color, borderRadius: "1px 1px 0 0" }} />
        {/* Body */}
        <div className="absolute" style={{ width: 10, height: 8, left: 3, top: 8, background: color, borderRadius: 1 }} />
        {/* Arms */}
        {(action === "working" || action === "typing") ? (
          <>
            <div className="absolute" style={{
              width: 3, height: 6, left: 0, top: 9,
              background: color, borderRadius: 1,
              transform: `rotate(${workFrame % 2 === 0 ? -30 : -50}deg)`,
              transformOrigin: "top right",
              transition: "transform 0.2s"
            }} />
            <div className="absolute" style={{
              width: 3, height: 6, left: 13, top: 9,
              background: color, borderRadius: 1,
              transform: `rotate(${workFrame % 2 === 0 ? 30 : 50}deg)`,
              transformOrigin: "top left",
              transition: "transform 0.2s"
            }} />
          </>
        ) : (
          <>
            <div className="absolute" style={{
              width: 3, height: 6, left: 0, top: 10,
              background: color, borderRadius: 1,
              transform: walkFrame ? "rotate(-20deg)" : "rotate(20deg)",
              transformOrigin: "top right",
              transition: "transform 0.2s"
            }} />
            <div className="absolute" style={{
              width: 3, height: 6, left: 13, top: 10,
              background: color, borderRadius: 1,
              transform: walkFrame ? "rotate(20deg)" : "rotate(-20deg)",
              transformOrigin: "top left",
              transition: "transform 0.2s"
            }} />
          </>
        )}
        {/* Legs */}
        <div className="absolute" style={{
          width: 4, height: 6, left: 3, top: 16,
          background: "#3A3A5C", borderRadius: 1,
          transform: walkFrame ? "rotate(-15deg)" : "rotate(15deg)",
          transformOrigin: "top center",
          transition: "transform 0.2s"
        }} />
        <div className="absolute" style={{
          width: 4, height: 6, left: 9, top: 16,
          background: "#3A3A5C", borderRadius: 1,
          transform: walkFrame ? "rotate(15deg)" : "rotate(-15deg)",
          transformOrigin: "top center",
          transition: "transform 0.2s"
        }} />
        {/* Carrying item */}
        {action === "carrying" && (
          <div className="absolute" style={{
            width: 6, height: 6, left: -4, top: 6,
            background: "hsl(38 92% 50%)",
            borderRadius: 1,
            boxShadow: "0 0 4px hsl(38 92% 50% / 0.5)"
          }} />
        )}
      </div>
      {/* Name tag */}
      <div
        className="absolute font-mono text-center whitespace-nowrap"
        style={{
          fontSize: 7,
          bottom: -10,
          left: "50%",
          transform: `translateX(-50%) ${isFlipped ? "scaleX(-1)" : ""}`,
          color: color,
          textShadow: `0 0 4px ${color}`,
          letterSpacing: 1
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default PixelAgent;

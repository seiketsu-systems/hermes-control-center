import { useState, useEffect } from "react";

const MissionControlHeader = () => {
  const [time, setTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setUptime((p) => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${d}d ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const stats = [
    { label: "REVENUE", value: "$12,847.63", color: "text-accent text-glow-green" },
    { label: "ORDERS", value: "247", color: "text-warning text-glow-amber" },
    { label: "PRODUCTS", value: "34 LIVE", color: "text-primary text-glow-cyan" },
    { label: "AGENTS", value: "7/8 ACTIVE", color: "text-accent text-glow-green" },
  ];

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm relative">
      {/* Top scanline accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left - Logo & Timer */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full status-online animate-pulse-glow" />
            <h1 className="font-display text-sm tracking-[0.3em] text-primary text-glow-cyan">
              MISSION CONTROL
            </h1>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded border border-border bg-secondary/50">
            <span className="font-mono text-xs text-muted-foreground">UPTIME</span>
            <span className="font-mono text-xs text-primary">{formatUptime(uptime + 518400)}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded border border-border bg-secondary/50">
            <span className="font-mono text-xs text-muted-foreground">UTC</span>
            <span className="font-mono text-xs text-foreground">
              {time.toUTCString().slice(17, 25)}
            </span>
          </div>
        </div>

        {/* Center - Stats */}
        <div className="hidden lg:flex items-center gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider">{stat.label}:</span>
              <span className={`font-mono text-xs font-semibold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded border border-primary/30 bg-primary/10 font-display text-[10px] tracking-widest text-primary hover:bg-primary/20 transition-colors">
            DEPLOY
          </button>
          <button className="px-3 py-1.5 rounded border border-warning/30 bg-warning/10 font-display text-[10px] tracking-widest text-warning hover:bg-warning/20 transition-colors">
            ALERTS (3)
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
    </header>
  );
};

export default MissionControlHeader;

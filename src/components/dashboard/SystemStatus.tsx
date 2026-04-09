import { useState, useEffect } from "react";

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  status: "nominal" | "warning" | "critical";
}

const SystemStatus = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: "CPU LOAD", value: 34, max: 100, unit: "%", status: "nominal" },
    { name: "MEMORY", value: 6.2, max: 16, unit: "GB", status: "nominal" },
    { name: "BANDWIDTH", value: 847, max: 1000, unit: "Mbps", status: "warning" },
    { name: "STORAGE", value: 234, max: 500, unit: "GB", status: "nominal" },
    { name: "API CALLS", value: 12847, max: 50000, unit: "/day", status: "nominal" },
    { name: "QUEUE", value: 23, max: 100, unit: "tasks", status: "nominal" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: Math.max(0, Math.min(m.max, m.value + (Math.random() - 0.5) * (m.max * 0.05))),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getBarColor = (m: SystemMetric) => {
    const pct = m.value / m.max;
    if (pct > 0.85) return "bg-destructive";
    if (pct > 0.7) return "bg-warning";
    return "bg-accent";
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="text-primary">System Telemetry</span>
        <span className="flex items-center gap-1">
          <span className="status-dot status-online" />
          <span className="font-mono text-[9px] text-accent">ALL NOMINAL</span>
        </span>
      </div>

      <div className="p-4 space-y-3">
        {metrics.map((m) => (
          <div key={m.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-muted-foreground tracking-wider">{m.name}</span>
              <span className="font-mono text-[10px] text-foreground tabular-nums">
                {typeof m.value === "number" && m.value % 1 !== 0 ? m.value.toFixed(1) : Math.round(m.value)}
                <span className="text-muted-foreground">/{m.max}{m.unit}</span>
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${getBarColor(m)}`}
                style={{ width: `${(m.value / m.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="border-t border-border px-4 py-3">
        <p className="font-display text-[9px] tracking-widest text-muted-foreground mb-2">RECENT EVENTS</p>
        <div className="space-y-1.5">
          {[
            { time: "00:14:32", msg: "Agent SCOUT completed thumbnail batch #47", type: "success" },
            { time: "00:12:18", msg: "Order OC-1247 moved to QA pipeline", type: "info" },
            { time: "00:08:45", msg: "Bandwidth spike detected — auto-scaling", type: "warning" },
            { time: "00:05:11", msg: "Agent FORGE deployed new music track #312", type: "success" },
          ].map((evt, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="font-mono text-[8px] text-muted-foreground shrink-0">{evt.time}</span>
              <span className={`w-1 h-1 rounded-full mt-1 shrink-0 ${
                evt.type === "success" ? "bg-accent" : evt.type === "warning" ? "bg-warning" : "bg-primary"
              }`} />
              <span className="font-mono text-[9px] text-foreground/70">{evt.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;

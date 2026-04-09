import { useState, useEffect } from "react";

const RevenueCommand = () => {
  const [totalRevenue, setTotalRevenue] = useState(12847.63);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRevenue((p) => p + Math.random() * 2.5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const factories = [
    { name: "HERMES", revenue: 8420.14, label: "Primary Revenue", color: "text-primary" },
    { name: "OPENCLAW", revenue: totalRevenue - 8420.14, label: "Secondary Revenue", color: "text-warning" },
  ];

  return (
    <div className="panel border-glow-cyan">
      <div className="panel-header">
        <span className="text-primary">Revenue Command</span>
        <span className="status-dot status-online" />
      </div>

      <div className="p-6 text-center relative">
        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline pointer-events-none" />

        <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground mb-2">
          TOTAL STATION REVENUE
        </p>
        <p className="font-display text-4xl md:text-5xl font-bold text-accent text-glow-green tabular-nums">
          ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>

        <div className="flex justify-center gap-8 mt-4">
          {factories.map((f) => (
            <div key={f.name} className="text-center">
              <p className={`font-mono text-lg font-semibold ${f.color} tabular-nums`}>
                ${f.revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="font-display text-[9px] tracking-widest text-muted-foreground mt-1">{f.name}</p>
            </div>
          ))}
        </div>

        {/* Mini chart placeholder */}
        <div className="mt-4 mx-auto max-w-xs h-12 relative">
          <svg viewBox="0 0 200 40" className="w-full h-full">
            <polyline
              fill="none"
              stroke="hsl(160 100% 50%)"
              strokeWidth="1.5"
              opacity="0.6"
              points="0,35 15,30 30,32 45,25 60,28 75,20 90,22 105,15 120,18 135,12 150,14 165,8 180,10 200,5"
            />
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(160 100% 50%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(160 100% 50%)" stopOpacity="0" />
            </linearGradient>
            <polygon
              fill="url(#chartGrad)"
              points="0,35 15,30 30,32 45,25 60,28 75,20 90,22 105,15 120,18 135,12 150,14 165,8 180,10 200,5 200,40 0,40"
            />
          </svg>
        </div>

        <div className="flex justify-center gap-4 mt-3">
          <div className="px-3 py-1.5 rounded border border-accent/20 bg-accent/5">
            <p className="font-mono text-sm font-semibold text-accent tabular-nums">$1,247.32</p>
            <p className="font-mono text-[9px] text-muted-foreground">TODAY</p>
          </div>
          <div className="px-3 py-1.5 rounded border border-accent/20 bg-accent/5">
            <p className="font-mono text-sm font-semibold text-accent tabular-nums">$4,892.18</p>
            <p className="font-mono text-[9px] text-muted-foreground">THIS WEEK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCommand;

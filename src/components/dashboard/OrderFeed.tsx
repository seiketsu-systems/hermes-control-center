interface Order {
  id: string;
  title: string;
  buyer: string;
  amount: number;
  status: "in_progress" | "delivered" | "revision" | "completed";
  timeAgo: string;
  platform: string;
}

const orders: Order[] = [
  { id: "OC-1247", title: "20 Deep Sea Creatures That Will Blow Your Mind", buyer: "Marcus Williams", amount: 25.00, status: "in_progress", timeAgo: "4h ago", platform: "fiverr" },
  { id: "OC-1246", title: "I Built an ENTIRE City in Minecraft (Speedrun)", buyer: "Emily Park", amount: 25.00, status: "delivered", timeAgo: "2.5h ago", platform: "fiverr" },
  { id: "OC-1245", title: "Ambient Lo-Fi Mix — Rain & Thunder 3hr", buyer: "Jake Torres", amount: 15.00, status: "completed", timeAgo: "8h ago", platform: "direct" },
  { id: "OC-1244", title: "Product Photography — Sneaker Collection x12", buyer: "Alina Chen", amount: 45.00, status: "revision", timeAgo: "1d ago", platform: "fiverr" },
  { id: "OC-1243", title: "YouTube Thumbnail Pack x5 — Gaming Niche", buyer: "DarkNova", amount: 25.00, status: "completed", timeAgo: "1d ago", platform: "etsy" },
];

const statusColors: Record<string, string> = {
  in_progress: "bg-primary/20 text-primary border-primary/30",
  delivered: "bg-warning/20 text-warning border-warning/30",
  revision: "bg-destructive/20 text-destructive border-destructive/30",
  completed: "bg-accent/20 text-accent border-accent/30",
};

const statusLabels: Record<string, string> = {
  in_progress: "IN PROGRESS",
  delivered: "DELIVERED",
  revision: "REVISION",
  completed: "COMPLETED",
};

const OrderFeed = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="text-primary">Live Order Feed</span>
        <span className="font-mono text-[10px] text-muted-foreground">{orders.length} ACTIVE</span>
      </div>

      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="px-4 py-3 hover:bg-secondary/20 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs text-foreground truncate">{order.title}</p>
                  <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold border ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-[9px] text-accent">■</span>
                  <span className="font-mono text-[9px] text-muted-foreground">{order.buyer}</span>
                  <span className="font-mono text-[9px] text-muted-foreground">${order.amount.toFixed(2)}</span>
                  <span className="font-mono text-[9px] text-muted-foreground">{order.timeAgo}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {["●", "●", "●", "●"].map((dot, i) => (
                  <span key={i} className={`text-[6px] ${i < 2 ? "text-accent" : i < 3 ? "text-warning" : "text-muted-foreground/30"}`}>{dot}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderFeed;

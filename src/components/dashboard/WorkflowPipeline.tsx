const stages = [
  { name: "GENERATE", count: 4, color: "bg-warning", borderColor: "border-warning/40" },
  { name: "PROCESS", count: 3, color: "bg-primary", borderColor: "border-primary/40" },
  { name: "QA", count: 2, color: "bg-accent", borderColor: "border-accent/40" },
  { name: "PUBLISH", count: 1, color: "bg-[hsl(270_80%_60%)]", borderColor: "border-[hsl(270_80%_60%/0.4)]" },
];

const WorkflowPipeline = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="text-primary">Workflow Pipeline</span>
        <span className="font-mono text-[10px] text-warning">10 IN TRANSIT</span>
      </div>

      <div className="p-4">
        {/* Pipeline visualization */}
        <div className="flex items-center gap-1 mb-4">
          {stages.map((stage, i) => (
            <div key={stage.name} className="flex items-center flex-1">
              <div className={`flex-1 p-3 rounded border ${stage.borderColor} bg-secondary/20 text-center`}>
                <p className="font-display text-[9px] tracking-widest text-muted-foreground">{stage.name}</p>
                <p className="font-mono text-xl font-bold text-foreground mt-1">{stage.count}</p>
              </div>
              {i < stages.length - 1 && (
                <div className="px-1">
                  <span className="text-muted-foreground text-xs">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Combined progress bar */}
        <div className="h-3 rounded-full bg-secondary flex overflow-hidden gap-px">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className={`${stage.color} transition-all duration-500`}
              style={{ flex: stage.count }}
            />
          ))}
        </div>

        {/* Throughput stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center">
            <p className="font-mono text-[9px] text-muted-foreground">THROUGHPUT</p>
            <p className="font-mono text-sm font-semibold text-foreground">47/hr</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-[9px] text-muted-foreground">AVG TIME</p>
            <p className="font-mono text-sm font-semibold text-foreground">12m 34s</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-[9px] text-muted-foreground">FAIL RATE</p>
            <p className="font-mono text-sm font-semibold text-accent">1.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowPipeline;

import MissionControlHeader from "@/components/dashboard/MissionControlHeader";
import RevenueCommand from "@/components/dashboard/RevenueCommand";
import AgentPanel from "@/components/dashboard/AgentPanel";
import FalloutWorkspace from "@/components/dashboard/FalloutWorkspace";
import OrderFeed from "@/components/dashboard/OrderFeed";
import SystemStatus from "@/components/dashboard/SystemStatus";
import WorkflowPipeline from "@/components/dashboard/WorkflowPipeline";

const hermesSubAgents = [
  { name: "SCOUT", status: "online" as const, task: "Thumbnail generation — batch #48", output: 1245, efficiency: 94 },
  { name: "FORGE", status: "online" as const, task: "Music production — lo-fi series", output: 312, efficiency: 87 },
  { name: "LENS", status: "busy" as const, task: "Product photography — queued x3", output: 558, efficiency: 72 },
  { name: "SCRIBE", status: "online" as const, task: "SEO content — blog series #12", output: 891, efficiency: 91 },
];

const openclawSubAgents = [
  { name: "ARCHITECT", status: "online" as const, task: "Service delivery — API integration", output: 234, efficiency: 96 },
  { name: "NEXUS", status: "online" as const, task: "Order routing — multi-platform", output: 1847, efficiency: 89 },
  { name: "SENTINEL", status: "busy" as const, task: "Quality assurance — revision check", output: 445, efficiency: 78 },
  { name: "PHANTOM", status: "idle" as const, task: "Standby — awaiting deployment", output: 0, efficiency: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <MissionControlHeader />

      <main className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1800px] mx-auto">
        {/* Revenue Command - full width */}
        <RevenueCommand />

        {/* Fallout Shelter Style Workspace */}
        <FalloutWorkspace />

        {/* Agent Panels - two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <AgentPanel
            agentName="HERMES"
            agentTitle="FACTORY I — AUTOMATED OPERATIONS"
            status="OPERATIONAL"
            revenue={8420.14}
            subAgents={hermesSubAgents}
            accentColor="cyan"
            tabs={["DASHBOARD", "AGENTS", "OVERVIEW", "MUSIC", "SERVICES"]}
            pipeline={{ generate: 4, process: 3, qa: 2, publish: 1 }}
          />
          <AgentPanel
            agentName="OPENCLAW"
            agentTitle="FACTORY II — MULTI-OPS"
            status="OPERATIONAL"
            revenue={4427.49}
            subAgents={openclawSubAgents}
            accentColor="amber"
            tabs={["DASHBOARD", "AGENTS", "OVERVIEW", "SERVICES"]}
            pipeline={{ generate: 2, process: 4, qa: 1, publish: 3 }}
          />
        </div>

        {/* Bottom row - Pipeline, Orders, System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <WorkflowPipeline />
          <OrderFeed />
          <SystemStatus />
        </div>
      </main>

      {/* Bottom accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};

export default Index;

import { HealthAssistant } from "@/components/health-assistant";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Health Assistant</h1>
      <HealthAssistant />
    </div>
  );
}
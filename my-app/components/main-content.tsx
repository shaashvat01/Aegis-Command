import IndividualMetrics from "./individual-metrics"
import SquadHealthOverview from "./squad-health-overview"
import AIChatInterface from "./ai-chat-interface"
import RealTimeHealthMetrics from "./real-time-health-metrics"

export default function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4">
        <RealTimeHealthMetrics />
        <IndividualMetrics />
        <SquadHealthOverview />
        <AIChatInterface />
      </div>
    </main>
  )
}


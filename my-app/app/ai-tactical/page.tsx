"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { useWebSocket } from "@/hooks/use-websocket"

// Mock data for demonstration
const mockSuggestions = [
  { id: 1, text: "Suggest hydration break for Squad Alpha", severity: "low" },
  { id: 2, text: "Recommend mission delay due to extreme weather conditions", severity: "high" },
  { id: 3, text: "Advise formation swap to improve defensive posture", severity: "medium" },
]

export default function AITacticalAdjustments() {
  const [readiness, setReadiness] = useState(75)
  const [activeSuggestion, setActiveSuggestion] = useState(mockSuggestions[0])
  const { isConnected, lastMessage } = useWebSocket("wss://your-websocket-server.com/ai-tactical")

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === "readiness") {
        setReadiness(lastMessage.value)
      } else if (lastMessage.type === "suggestion") {
        setActiveSuggestion(lastMessage.value)
      }
    }
  }, [lastMessage])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setReadiness((prev) => Math.max(0, Math.min(100, prev + Math.random() * 10 - 5)))
      setActiveSuggestion(mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 text-high-contrast">
      <h1 className="text-3xl font-bold mb-6">AI Tactical Adjustments</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl text-high-contrast">Live Tactical Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-high-contrast rounded-lg border border-border mb-4">
              <h3 className="text-lg font-semibold mb-2">Current Suggestion:</h3>
              <p className="text-muted-foreground">{activeSuggestion.text}</p>
              <div
                className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeSuggestion.severity === "high"
                    ? "bg-destructive text-destructive-foreground"
                    : activeSuggestion.severity === "medium"
                      ? "bg-yellow-600 text-yellow-100"
                      : "bg-green-600 text-green-100"
                }`}
              >
                {activeSuggestion.severity.charAt(0).toUpperCase() + activeSuggestion.severity.slice(1)} Priority
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="default" className="military-btn military-btn-primary">
                Accept AI Suggestion
              </Button>
              <Button variant="destructive" className="military-btn military-btn-danger">
                Override
              </Button>
              <Button variant="outline" className="military-btn military-btn-secondary">
                Request More Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl text-high-contrast">Mission Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <span className="text-2xl font-bold">{readiness.toFixed(1)}%</span>
            </div>
            <Progress value={readiness} className="w-full h-4" />
            <div className="mt-4">
              <ReadinessIndicator readiness={readiness} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-high-contrast">Tactical Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <TacticalRecommendations />
        </CardContent>
      </Card>
    </div>
  )
}

function ReadinessIndicator({ readiness }: { readiness: number }) {
  if (readiness >= 80) {
    return (
      <div className="flex items-center text-green-400">
        <CheckCircle className="w-5 h-5 mr-2" />
        <span>High Readiness</span>
      </div>
    )
  } else if (readiness >= 50) {
    return (
      <div className="flex items-center text-yellow-400">
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span>Moderate Readiness</span>
      </div>
    )
  } else {
    return (
      <div className="flex items-center text-destructive">
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span>Low Readiness - Caution Advised</span>
      </div>
    )
  }
}

function TacticalRecommendations() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-high-contrast rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2">Hydration Status</h3>
        <p className="text-muted-foreground">
          Squad Bravo showing signs of dehydration. Recommend immediate water break.
        </p>
      </div>
      <div className="p-4 bg-high-contrast rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2">Weather Impact</h3>
        <p className="text-muted-foreground">
          Incoming sandstorm detected. Suggest postponing non-critical operations for 2 hours.
        </p>
      </div>
      <div className="p-4 bg-high-contrast rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2">Equipment Status</h3>
        <p className="text-muted-foreground">
          Night vision goggles for Squad Charlie malfunctioning. Advise immediate replacement.
        </p>
      </div>
    </div>
  )
}


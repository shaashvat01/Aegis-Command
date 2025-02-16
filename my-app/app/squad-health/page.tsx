"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for fallback
const mockSquadMembers = [
  { id: 1, name: "Alex", fatigue: 30 },
  { id: 2, name: "Blake", fatigue: 45 },
  { id: 3, name: "Casey", fatigue: 60 },
  { id: 4, name: "Dana", fatigue: 20 },
  { id: 5, name: "Eddie", fatigue: 75 },
  { id: 6, name: "Frankie", fatigue: 50 },
  { id: 7, name: "Glenn", fatigue: 40 },
  { id: 8, name: "Harper", fatigue: 55 },
]

const mockCriticalAlerts = [
  { id: 1, type: "Dehydration Risk", soldier: "Eddie", severity: "High" },
  { id: 2, type: "Injury Detection", soldier: "Casey", severity: "Medium" },
  { id: 3, type: "Exhaustion Warning", soldier: "Blake", severity: "Low" },
]

const mockPerformanceMetrics = [
  { name: "Accuracy", value: 75 },
  { name: "Speed", value: 82 },
  { name: "Endurance", value: 68 },
  { name: "Teamwork", value: 90 },
  { name: "Decision Making", value: 78 },
]

export default function SquadHealthOverview() {
  const [squadData, setSquadData] = useState(mockSquadMembers)
  const [performanceData, setPerformanceData] = useState(mockPerformanceMetrics)
  const [criticalAlerts, setCriticalAlerts] = useState(mockCriticalAlerts)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attempt to fetch real data
        const squadResponse = await fetch("/api/squad-health")
        if (!squadResponse.ok) throw new Error("Failed to fetch squad health data")
        const squadJson = await squadResponse.json()
        setSquadData(squadJson)

        const performanceResponse = await fetch("/api/performance-metrics")
        if (!performanceResponse.ok) throw new Error("Failed to fetch performance metrics")
        const performanceJson = await performanceResponse.json()
        setPerformanceData(performanceJson)

        const alertsResponse = await fetch("/api/critical-alerts")
        if (!alertsResponse.ok) throw new Error("Failed to fetch critical alerts")
        const alertsJson = await alertsResponse.json()
        setCriticalAlerts(alertsJson)

        setError(null) // Clear any previous errors
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to fetch latest data. Displaying mock data.")
        // Fallback to mock data
        setSquadData(mockSquadMembers)
        setPerformanceData(mockPerformanceMetrics)
        setCriticalAlerts(mockCriticalAlerts)
      }
    }

    fetchData() // Initial fetch

    const interval = setInterval(fetchData, 30000) // Polling every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 text-high-contrast">
      <h1 className="text-3xl font-bold mb-6">Squad Health Overview</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl text-high-contrast">Squad Readiness Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {squadData.map((member) => (
                <SoldierReadinessCard key={member.id} soldier={member} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl text-high-contrast">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <CriticalAlertsList alerts={criticalAlerts} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-high-contrast">Squad Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} labelStyle={{ color: "#fff" }} />
                <Bar dataKey="value" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SoldierReadinessCard({ soldier }) {
  const getFatigueColor = (fatigue) => {
    if (fatigue < 30) return "bg-green-500"
    if (fatigue < 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-24 w-full p-2 flex flex-col items-center justify-center hover:bg-primary/10"
        >
          <div className={`w-4 h-4 rounded-full mb-2 ${getFatigueColor(soldier.fatigue)}`}></div>
          <span className="text-sm font-medium">{soldier.name}</span>
          <span className="text-xs text-muted-foreground">Fatigue: {soldier.fatigue.toFixed(0)}%</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card text-high-contrast">
        <DialogHeader>
          <DialogTitle>{soldier.name}'s Profile</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Real-time Vitals</h3>
          <p>Heart Rate: 75 bpm</p>
          <p>Blood Pressure: 120/80 mmHg</p>
          <p>Body Temperature: 98.6°F</p>
          <p>Oxygen Saturation: 98%</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Performance Logs</h3>
          <p>Last Mission Accuracy: 92%</p>
          <p>Physical Fitness Score: 85/100</p>
          <p>Team Coordination Rating: 4.5/5</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CriticalAlertsList({ alerts }) {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start p-3 bg-high-contrast rounded-lg border border-border">
          <AlertCircle className="w-5 h-5 mt-0.5 mr-3 text-destructive" />
          <div>
            <h4 className="font-semibold">{alert.type}</h4>
            <p className="text-sm text-muted-foreground">Soldier: {alert.soldier}</p>
            <p className="text-sm text-muted-foreground">Severity: {alert.severity}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


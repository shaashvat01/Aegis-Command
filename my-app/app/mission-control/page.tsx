"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Shield,
  Thermometer,
  Siren,
  Send,
  CloudRain,
  Wind,
  Eye,
  KeyIcon as Strategy,
  AlertTriangle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useWebSocket } from "@/hooks/use-websocket"
import { formatText } from "@/utils/formatText"
import { AlertCircle } from "lucide-react" // Import AlertCircle

interface Message {
  id: number
  role: "user" | "assistant" | "error"
  content: string
}

interface SquadFormation {
  alpha: { readiness: number; formation: string; pace: number }
  bravo: { readiness: number; formation: string; pace: number }
  charlie: { readiness: number; formation: string; pace: number }
}

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  forecast: string
}

const initialSquadFormation: SquadFormation = {
  alpha: { readiness: 75, formation: "Diamond", pace: 70 },
  bravo: { readiness: 60, formation: "Line", pace: 60 },
  charlie: { readiness: 90, formation: "Wedge", pace: 80 },
}

const initialWeatherData: WeatherData = {
  temperature: 28,
  humidity: 65,
  windSpeed: 15,
  forecast: "Storm approaching in 3 hours",
}

export default function MissionControl() {
  const [alerts, setAlerts] = useState<string[]>([])
  const [squadFormation, setSquadFormation] = useState<SquadFormation>(initialSquadFormation)
  const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { status, lastMessage } = useWebSocket("wss://your-websocket-server.com/mission-control")

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === "alert") {
        setAlerts((prev) => [lastMessage.value, ...prev].slice(0, 5))
      } else if (lastMessage.type === "squadUpdate") {
        setSquadFormation(lastMessage.value)
      }
    }
  }, [lastMessage])

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/api/weather")
        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const json = await response.json()
        if (json.error) {
          throw new Error(json.error)
        }
        setWeatherData(json)
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch weather data")
      }
    }

    fetchWeatherData()
    const interval = setInterval(fetchWeatherData, 60000)
    return () => clearInterval(interval)
  }, [])

  // Simulate real-time updates and AI-generated alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Update squad readiness
      setSquadFormation((prev) => ({
        ...prev,
        alpha: { ...prev.alpha, readiness: Math.max(0, Math.min(100, prev.alpha.readiness + Math.random() * 10 - 5)) },
        bravo: { ...prev.bravo, readiness: Math.max(0, Math.min(100, prev.bravo.readiness + Math.random() * 10 - 5)) },
        charlie: {
          ...prev.charlie,
          readiness: Math.max(0, Math.min(100, prev.charlie.readiness + Math.random() * 10 - 5)),
        },
      }))

      // Generate AI alerts
      if (Math.random() > 0.7) {
        const newAlert = generateAIAlert(squadFormation, weatherData)
        setAlerts((prev) => [newAlert, ...prev].slice(0, 5))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [squadFormation, weatherData])

  const handleFormationChange = (squad: keyof SquadFormation, value: string) => {
    setSquadFormation((prev) => ({
      ...prev,
      [squad]: { ...prev[squad], formation: value },
    }))
  }

  const handlePaceChange = (squad: keyof SquadFormation, value: number) => {
    setSquadFormation((prev) => ({
      ...prev,
      [squad]: { ...prev[squad], pace: value },
    }))
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setError(null)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return

      setIsStreaming(true)
      setError(null)
      const newMessage: Message = { id: Date.now(), role: "user", content: input }
      setMessages((prev) => [...prev, newMessage])
      setInput("")

      try {
        const response = await fetch("/api/perplexity-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        if (!data.result) {
          throw new Error("No response received from AI")
        }

        const aiResponse: Message = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.result,
        }
        setMessages((prev) => [...prev, aiResponse])
      } catch (err) {
        console.error("Error fetching search results:", err)
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
        setError(errorMessage)
        const errorResponse: Message = {
          id: Date.now() + 1,
          role: "error",
          content: "I apologize, but I'm having trouble responding right now. Please try again.",
        }
        setMessages((prev) => [...prev, errorResponse])
      } finally {
        setIsStreaming(false)
      }
    },
    [input],
  )

  return (
    <div className="container mx-auto px-4 py-8 text-high-contrast">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mission Control</h1>
          <p className="text-muted-foreground mt-1">Real-time mission monitoring and control</p>
        </div>
        <Shield className="h-8 w-8 text-primary" />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" /> {/* AlertCircle is now used here */}
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-high-contrast">Mission Simulation</CardTitle>
              <Badge variant="outline">Live Updates</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <MissionSimulation
              squadFormation={squadFormation}
              onFormationChange={handleFormationChange}
              onPaceChange={handlePaceChange}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-high-contrast">AI Alerts</CardTitle>
              <Badge variant="destructive">{alerts.length} Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <AIAlertsList alerts={alerts} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="col-span-1 lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-high-contrast">Commander Chat Interface</CardTitle>
              {/* Remove the Badge component */}
              <>{/* Connection status removed */}</>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[500px]">
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : m.role === "error"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <div className="whitespace-pre-wrap">{formatText(m.content)}</div>
                      ) : (
                        m.content
                      )}
                    </div>
                  </div>
                ))}
                {isStreaming && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-lg bg-secondary text-secondary-foreground">
                      <span className="animate-pulse">Processing your request...</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-x-2 mb-4">
                <Button
                  onClick={() => handleQuickAction("viewReadiness")}
                  variant="outline"
                  size="sm"
                  className="military-btn military-btn-secondary"
                >
                  <Eye className="w-4 h-4 mr-2" /> View Readiness
                </Button>
                <Button
                  onClick={() => handleQuickAction("requestStrategy")}
                  variant="outline"
                  size="sm"
                  className="military-btn military-btn-secondary"
                >
                  <Strategy className="w-4 h-4 mr-2" /> Request Strategy
                </Button>
                <Button
                  onClick={() => handleQuickAction("overrideAI")}
                  variant="outline"
                  size="sm"
                  className="military-btn military-btn-secondary"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" /> Override AI Decision
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  disabled={isStreaming}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isStreaming || !input.trim()}>
                  {isStreaming ? <span className="animate-spin">⌛</span> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-high-contrast">Weather & Terrain</CardTitle>
              <Badge variant="outline">Auto-updating</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <WeatherTerrainInfo weatherData={weatherData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MissionSimulation({ squadFormation, onFormationChange, onPaceChange }) {
  const formationOptions = ["Line", "Column", "Wedge", "Diamond"]

  return (
    <div className="space-y-6">
      {Object.entries(squadFormation).map(([squad, data]) => (
        <div key={squad} className="bg-high-contrast p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Squad {squad.charAt(0).toUpperCase() + squad.slice(1)}</h3>
          <div className="flex items-center mb-2">
            <span className="w-24">Readiness:</span>
            <div className={`h-4 w-full rounded ${getReadinessColor(data.readiness)}`}>
              <div
                className={`h-full rounded ${getReadinessColor(data.readiness, true)}`}
                style={{ width: `${data.readiness}%` }}
              ></div>
            </div>
            <span className="ml-2">{data.readiness.toFixed(0)}%</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="w-24">Formation:</span>
            <select
              value={data.formation}
              onChange={(e) => onFormationChange(squad, e.target.value)}
              className="bg-card text-high-contrast rounded p-1"
            >
              {formationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <span className="w-24">Pace:</span>
            <Slider
              value={[data.pace]}
              onValueChange={(value) => onPaceChange(squad, value[0])}
              max={100}
              step={1}
              className="flex-grow"
            />
            <span className="ml-2">{data.pace}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function AIAlertsList({ alerts }) {
  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div key={index} className="flex items-start p-3 bg-high-contrast rounded-lg border border-border">
          <Siren className="w-5 h-5 mt-0.5 mr-3 text-destructive" />
          <div>
            <p className="text-sm">{alert}</p>
          </div>
        </div>
      ))}
      {alerts.length === 0 && (
        <div className="text-center text-muted-foreground p-4">No active alerts at this time</div>
      )}
    </div>
  )
}

function WeatherTerrainInfo({ weatherData }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Thermometer className="w-5 h-5 mr-2" />
        <span>Temperature: {weatherData?.temperature ?? "--"}°C</span>
      </div>
      <div className="flex items-center">
        <CloudRain className="w-5 h-5 mr-2" />
        <span>Humidity: {weatherData?.humidity ?? "--"}%</span>
      </div>
      <div className="flex items-center">
        <Wind className="w-5 h-5 mr-2" />
        <span>Wind Speed: {weatherData?.windSpeed ?? "--"} km/h</span>
      </div>
      {weatherData?.forecast && (
        <div className="mt-4 p-3 bg-high-contrast rounded-lg border border-border">
          <p className="text-yellow-400 font-semibold">Weather Alert:</p>
          <p>{weatherData.forecast}</p>
        </div>
      )}
    </div>
  )
}

function getReadinessColor(readiness: number, isFill = false) {
  if (readiness < 50) return isFill ? "bg-destructive" : "bg-destructive/20"
  if (readiness < 75) return isFill ? "bg-yellow-500" : "bg-yellow-500/20"
  return isFill ? "bg-green-500" : "bg-green-500/20"
}

function generateAIAlert(squadFormation: SquadFormation, weatherData: WeatherData): string {
  const alerts = [
    `Squad Alpha readiness below 50%! Consider delaying mission.`,
    `Storm approaching in 3 hours, suggest retreat to safe zone.`,
    `Squad Bravo's current formation is suboptimal for terrain. Recommend switching to Wedge formation.`,
    `High wind speeds detected. Adjust long-range weapon calculations.`,
    `Squad Charlie's pace is unsustainable. Reduce to 70% to maintain readiness.`,
  ]
  return alerts[Math.floor(Math.random() * alerts.length)]
}

function handleQuickAction(action: string) {
  let message = ""
  switch (action) {
    case "viewReadiness":
      message = "Show me the current readiness levels for all squads."
      break
    case "requestStrategy":
      message = "What's the best strategy for our current situation?"
      break
    case "overrideAI":
      message = "I want to override the AI's last decision. What are the implications?"
      break
  }
  // Note: This function would typically be connected to the chat interface
  console.log("Quick action:", message)
}


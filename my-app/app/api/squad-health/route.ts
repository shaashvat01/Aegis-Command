import { NextResponse } from "next/server"

// Add proper type definitions
interface HealthData {
  timestamp: string
  fatigue: number
  mentalState: number
  hydration: number
}

interface SoldierData {
  name: string
  fatigue: number
  mentalState: number
  hydration: number
  temperature: number
  healthOverTime: HealthData[]
  color: string
}

interface Alert {
  type: string
  soldier: string
  severity: string
}

interface PerformanceMetric {
  attribute: string
  value: number
}

interface SquadStats {
  combatReadiness: number
  averageFatigue: number
  squadMorale: number
  alertLevel: string
}

interface ApiResponse {
  squadSummary: SoldierData[]
  criticalAlerts: Alert[]
  performanceMetrics: PerformanceMetric[]
  overallStats: SquadStats
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const colors = ["#ff4500", "#4ade80", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"]

    const squadSummary: SoldierData[] = [
      {
        name: "Alex",
        fatigue: 30,
        mentalState: 85,
        hydration: 90,
        temperature: 36.8,
        healthOverTime: generateHealthData(),
        color: colors[0],
      },
      {
        name: "Blake",
        fatigue: 45,
        mentalState: 75,
        hydration: 80,
        temperature: 37.1,
        healthOverTime: generateHealthData(),
        color: colors[1],
      },
      {
        name: "Casey",
        fatigue: 60,
        mentalState: 65,
        hydration: 70,
        temperature: 37.3,
        healthOverTime: generateHealthData(),
        color: colors[2],
      },
      {
        name: "Dana",
        fatigue: 20,
        mentalState: 90,
        hydration: 95,
        temperature: 36.7,
        healthOverTime: generateHealthData(),
        color: colors[3],
      },
      {
        name: "Eddie",
        fatigue: 75,
        mentalState: 55,
        hydration: 65,
        temperature: 37.5,
        healthOverTime: generateHealthData(),
        color: colors[4],
      },
      {
        name: "Frankie",
        fatigue: 50,
        mentalState: 80,
        hydration: 85,
        temperature: 36.9,
        healthOverTime: generateHealthData(),
        color: colors[5],
      },
    ]

    const criticalAlerts: Alert[] = [
      { type: "Dehydration Risk", soldier: "Eddie", severity: "High" },
      { type: "Mental Fatigue", soldier: "Casey", severity: "Medium" },
      { type: "Physical Exhaustion", soldier: "Blake", severity: "Low" },
    ]

    const performanceMetrics: PerformanceMetric[] = [
      { attribute: "Combat Readiness", value: 85 },
      { attribute: "Team Cohesion", value: 90 },
      { attribute: "Equipment Status", value: 75 },
      { attribute: "Mission Knowledge", value: 80 },
      { attribute: "Physical Fitness", value: 88 },
      { attribute: "Tactical Awareness", value: 82 },
    ]

    const overallStats: SquadStats = {
      combatReadiness: 85,
      averageFatigue: Math.round(squadSummary.reduce((sum, soldier) => sum + soldier.fatigue, 0) / squadSummary.length),
      squadMorale: 78,
      alertLevel: "Moderate",
    }

    return NextResponse.json({
      squadSummary,
      criticalAlerts,
      performanceMetrics,
      overallStats,
    })
  } catch (error) {
    console.error("Error in squad health API:", error)
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

function generateHealthData(): HealthData[] {
  const data: HealthData[] = []
  let fatigue = Math.random() * 30 + 20
  let mentalState = Math.random() * 20 + 70
  let hydration = Math.random() * 20 + 70
  const now = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      timestamp: date.toISOString(),
      fatigue: Math.round(fatigue),
      mentalState: Math.round(mentalState),
      hydration: Math.round(hydration),
    })
    fatigue += Math.random() * 10 - 3
    mentalState += Math.random() * 10 - 5
    hydration += Math.random() * 10 - 5
    fatigue = Math.max(0, Math.min(100, fatigue))
    mentalState = Math.max(0, Math.min(100, mentalState))
    hydration = Math.max(0, Math.min(100, hydration))
  }
  return data
}


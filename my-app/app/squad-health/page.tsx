"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Battery,
  Flame,
  Heart,
  HeartPulse,
  Loader2,
  Shield,
  Zap,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell,
} from "recharts"

interface SoldierData {
  id: string
  name: string
  avgHeartRate: number
  maxHeartRate: number
  minHeartRate: number
  totalSteps: number
  caloriesBurned: number
  fatigueOnset: string
}

interface SquadMetrics {
  combatReadiness: number
  averageFatigue: number
  squadMorale: number
  alertLevel: number
}

interface BestSquadResult {
  filter: string
  squadSize: number
  selectedSoldiers: string
  score: number
}

const bestSquadData: BestSquadResult[] = [
  { filter: "Endurance Score", squadSize: 1, selectedSoldiers: "John Doe", score: 8.91 },
  { filter: "Recovery Rate", squadSize: 1, selectedSoldiers: "Jane Smith", score: 6.42 },
  { filter: "Heart Rate Stability", squadSize: 1, selectedSoldiers: "Mike Johnson", score: 3.87 },
  { filter: "Fatigue Resistance", squadSize: 1, selectedSoldiers: "Sarah Williams", score: 7.92 },
  { filter: "Endurance Score", squadSize: 2, selectedSoldiers: "John Doe, Chris Brown", score: 8.12 },
  { filter: "Recovery Rate", squadSize: 2, selectedSoldiers: "Jane Smith, Emily Davis", score: 6.88 },
  { filter: "Heart Rate Stability", squadSize: 2, selectedSoldiers: "Mike Johnson, Sarah Williams", score: 4.22 },
  { filter: "Fatigue Resistance", squadSize: 2, selectedSoldiers: "Sarah Williams, Chris Brown", score: 7.34 },
  { filter: "Endurance Score", squadSize: 3, selectedSoldiers: "John Doe, Chris Brown, Emily Davis", score: 7.99 },
  { filter: "Recovery Rate", squadSize: 3, selectedSoldiers: "Jane Smith, Emily Davis, Mike Johnson", score: 6.72 },
  {
    filter: "Heart Rate Stability",
    squadSize: 3,
    selectedSoldiers: "Mike Johnson, Sarah Williams, Chris Brown",
    score: 4.41,
  },
  {
    filter: "Fatigue Resistance",
    squadSize: 3,
    selectedSoldiers: "Sarah Williams, Chris Brown, John Doe",
    score: 7.01,
  },
  {
    filter: "Endurance Score",
    squadSize: 4,
    selectedSoldiers: "John Doe, Chris Brown, Emily Davis, Jane Smith",
    score: 7.85,
  },
  {
    filter: "Recovery Rate",
    squadSize: 4,
    selectedSoldiers: "Jane Smith, Emily Davis, Mike Johnson, Sarah Williams",
    score: 6.55,
  },
  {
    filter: "Heart Rate Stability",
    squadSize: 4,
    selectedSoldiers: "Mike Johnson, Sarah Williams, Chris Brown, John Doe",
    score: 4.31,
  },
  {
    filter: "Fatigue Resistance",
    squadSize: 4,
    selectedSoldiers: "Sarah Williams, Chris Brown, John Doe, Jane Smith",
    score: 6.89,
  },
  {
    filter: "Endurance Score",
    squadSize: 5,
    selectedSoldiers: "John Doe, Chris Brown, Emily Davis, Jane Smith, Mike Johnson",
    score: 7.72,
  },
  {
    filter: "Recovery Rate",
    squadSize: 5,
    selectedSoldiers: "Jane Smith, Emily Davis, Mike Johnson, Sarah Williams, Chris Brown",
    score: 6.38,
  },
  {
    filter: "Heart Rate Stability",
    squadSize: 5,
    selectedSoldiers: "Mike Johnson, Sarah Williams, Chris Brown, John Doe, Jane Smith",
    score: 4.29,
  },
  {
    filter: "Fatigue Resistance",
    squadSize: 5,
    selectedSoldiers: "Sarah Williams, Chris Brown, John Doe, Jane Smith, Emily Davis",
    score: 6.72,
  },
]

export default function SquadHealthOverview() {
  const [squadData, setSquadData] = useState<SoldierData[]>([])
  const [squadMetrics, setSquadMetrics] = useState<SquadMetrics>({
    combatReadiness: 0,
    averageFatigue: 0,
    squadMorale: 0,
    alertLevel: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>("Endurance Score")
  const [selectedSquadSize, setSelectedSquadSize] = useState<number>(1)
  const [bestSquadResult, setBestSquadResult] = useState<BestSquadResult | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockSquadData: SoldierData[] = [
          {
            id: "254183cf-4c15-4062-ac53-8953ba3f4768",
            name: "John Doe",
            avgHeartRate: 152.78,
            maxHeartRate: 165.5,
            minHeartRate: 79.0,
            totalSteps: 1847,
            caloriesBurned: 1304.13,
            fatigueOnset: "Not Reached",
          },
          {
            id: "b03f6bbb-74c2-4925-b781-4a56eebec337",
            name: "Jane Smith",
            avgHeartRate: 81.11,
            maxHeartRate: 115.65,
            minHeartRate: 62.0,
            totalSteps: 5979,
            caloriesBurned: 1378.16,
            fatigueOnset: "2025-01-09",
          },
          {
            id: "65cf37dc-5d3e-471f-9ff6-3f557d233ae2",
            name: "Mike Johnson",
            avgHeartRate: 149.71,
            maxHeartRate: 137.83,
            minHeartRate: 60.0,
            totalSteps: 11488,
            caloriesBurned: 529.69,
            fatigueOnset: "Not Reached",
          },
          {
            id: "91aa9c86-7e5b-44ba-bf2c-87c8772f2270",
            name: "Sarah Williams",
            avgHeartRate: 78.05,
            maxHeartRate: 170.17,
            minHeartRate: 63.0,
            totalSteps: 9350,
            caloriesBurned: 1226.43,
            fatigueOnset: "2025-01-07",
          },
          {
            id: "4f4260ff-ddfa-4f8b-9758-08d327b19a2c",
            name: "Chris Brown",
            avgHeartRate: 117.49,
            maxHeartRate: 174.6,
            minHeartRate: 86.0,
            totalSteps: 3606,
            caloriesBurned: 762.44,
            fatigueOnset: "Not Reached",
          },
          {
            id: "7188a438-f308-47fd-b595-983bea675a89",
            name: "Emily Davis",
            avgHeartRate: 78.32,
            maxHeartRate: 131.67,
            minHeartRate: 80.0,
            totalSteps: 12437,
            caloriesBurned: 952.22,
            fatigueOnset: "Not Reached",
          },
        ]

        setSquadData(mockSquadData)
        setSquadMetrics({
          combatReadiness: 80.84,
          averageFatigue: 1.92,
          squadMorale: 100,
          alertLevel: 0,
        })
        setLoading(false)
      } catch (err) {
        console.error("Error fetching squad data:", err)
        setError("Failed to fetch squad data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const result = bestSquadData.find((data) => data.filter === selectedFilter && data.squadSize === selectedSquadSize)
    setBestSquadResult(result || null)
  }, [selectedFilter, selectedSquadSize])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading squad health data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Squad Health Overview</h1>
        <Shield className="h-8 w-8 text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Combat Readiness"
          value={squadMetrics.combatReadiness}
          icon={<Activity className="h-6 w-6" />}
          trend="up"
        />
        <MetricCard
          title="Average Fatigue"
          value={squadMetrics.averageFatigue}
          icon={<Battery className="h-6 w-6" />}
          trend="down"
          reverseColor
        />
        <MetricCard
          title="Squad Morale"
          value={squadMetrics.squadMorale}
          icon={<Zap className="h-6 w-6" />}
          trend="up"
        />
        <MetricCard
          title="Alert Level"
          value={squadMetrics.alertLevel}
          icon={<AlertTriangle className="h-6 w-6" />}
          trend="down"
          reverseColor
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Soldiers</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="best-squad">Best Squad</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <SquadOverview squadData={squadData} />
        </TabsContent>
        <TabsContent value="individual" className="space-y-4">
          <IndividualSoldiers squadData={squadData} />
        </TabsContent>
        <TabsContent value="comparison" className="space-y-4">
          <SquadComparison squadData={squadData} />
        </TabsContent>
        <TabsContent value="best-squad" className="space-y-4">
          <BestSquadSelector
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedSquadSize={selectedSquadSize}
            setSelectedSquadSize={setSelectedSquadSize}
            bestSquadResult={bestSquadResult}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({ title, value, icon, trend, reverseColor = false }) {
  const trendColor = reverseColor
    ? trend === "up"
      ? "text-destructive"
      : "text-green-500"
    : trend === "up"
      ? "text-green-500"
      : "text-destructive"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{typeof value === "number" ? value.toFixed(2) : value}</div>
        <p className={`text-xs ${trendColor} flex items-center`}>
          {trend === "up" ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
          {trend === "up" ? "Increase" : "Decrease"}
        </p>
      </CardContent>
    </Card>
  )
}

function SquadOverview({ squadData }) {
  const performanceData = [
    { attribute: "Readiness", value: 80 },
    { attribute: "Endurance", value: 75 },
    { attribute: "Teamwork", value: 90 },
    { attribute: "Skill", value: 85 },
    { attribute: "Morale", value: 95 },
    { attribute: "Equipment", value: 70 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Squad Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="attribute" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Squad" dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fatigue Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={squadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgHeartRate" fill="#3b82f6">
                {squadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fatigueOnset !== "Not Reached" ? "#ef4444" : "#3b82f6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function IndividualSoldiers({ squadData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {squadData.map((soldier) => (
        <Card key={soldier.id}>
          <CardHeader>
            <CardTitle>{soldier.name}</CardTitle>
            <Badge variant={soldier.fatigueOnset === "Not Reached" ? "secondary" : "destructive"}>
              {soldier.fatigueOnset === "Not Reached" ? "No Fatigue" : `Fatigue: ${soldier.fatigueOnset}`}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-destructive" />
                  Avg Heart Rate
                </span>
                <span>{soldier.avgHeartRate} bpm</span>
              </div>
              <Progress value={soldier.avgHeartRate} max={200} className="h-2" />
              <div className="flex justify-between">
                <span className="flex items-center">
                  <HeartPulse className="mr-2 h-4 w-4 text-destructive" />
                  Max Heart Rate
                </span>
                <span>{soldier.maxHeartRate} bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-green-500" />
                  Total Steps
                </span>
                <span>{soldier.totalSteps}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center">
                  <Flame className="mr-2 h-4 w-4 text-orange-500" />
                  Calories Burned
                </span>
                <span>{soldier.caloriesBurned.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SquadComparison({ squadData }) {
  const comparisonData = squadData.map((soldier) => ({
    name: soldier.name,
    heartRate: soldier.avgHeartRate,
    steps: soldier.totalSteps,
    calories: soldier.caloriesBurned,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Squad Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#ef4444" name="Avg Heart Rate" />
            <Line yAxisId="right" type="monotone" dataKey="steps" stroke="#3b82f6" name="Total Steps" />
            <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#22c55e" name="Calories Burned" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function BestSquadSelector({
  selectedFilter,
  setSelectedFilter,
  selectedSquadSize,
  setSelectedSquadSize,
  bestSquadResult,
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle>Best Squad Selector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="filter">Filter</label>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger id="filter">
                <SelectValue placeholder="Select a filter" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Endurance Score">Endurance Score</SelectItem>
                <SelectItem value="Recovery Rate">Recovery Rate</SelectItem>
                <SelectItem value="Heart Rate Stability">Heart Rate Stability</SelectItem>
                <SelectItem value="Fatigue Resistance">Fatigue Resistance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="squadSize">Squad Size</label>
            <Select value={selectedSquadSize.toString()} onValueChange={(value) => setSelectedSquadSize(Number(value))}>
              <SelectTrigger id="squadSize">
                <SelectValue placeholder="Select squad size" />
              </SelectTrigger>
              <SelectContent position="popper">
                {[1, 2, 3, 4, 5].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {bestSquadResult && (
            <div className="mt-4 p-4 bg-secondary rounded-lg relative">
              <h3 className="text-lg font-semibold mb-2">Best Squad Result</h3>
              <p>
                <strong>Selected Soldiers:</strong> {bestSquadResult.selectedSoldiers}
              </p>
              <p>
                <strong>Score:</strong> {bestSquadResult.score.toFixed(2)}
              </p>
              <div className="absolute top-0 right-0 p-2">
                <Badge variant="outline" className="bg-primary text-primary-foreground">
                  {selectedFilter}
                </Badge>
              </div>
            </div>
          )}
          <div className="mt-4">
            <SquadFormationAnimation squadSize={selectedSquadSize} />
          </div>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary">
        <div
          className="h-full bg-secondary transition-all duration-500 ease-in-out"
          style={{ width: `${(bestSquadResult?.score || 0) * 10}%` }}
        ></div>
      </div>
    </Card>
  )
}

function SquadFormationAnimation({ squadSize }: { squadSize: number }) {
  const formations = {
    1: [{ x: 50, y: 50 }],
    2: [
      { x: 35, y: 50 },
      { x: 65, y: 50 },
    ],
    3: [
      { x: 50, y: 30 },
      { x: 35, y: 70 },
      { x: 65, y: 70 },
    ],
    4: [
      { x: 35, y: 35 },
      { x: 65, y: 35 },
      { x: 35, y: 65 },
      { x: 65, y: 65 },
    ],
    5: [
      { x: 50, y: 30 },
      { x: 30, y: 50 },
      { x: 70, y: 50 },
      { x: 40, y: 70 },
      { x: 60, y: 70 },
    ],
  }

  return (
    <div className="w-full h-32 relative">
      <div className="absolute inset-0">
        {formations[squadSize].map((position, index) => (
          <div
            key={index}
            className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              animation: `pulse 2s infinite ${index * 0.2}s`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-primary-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  )
}


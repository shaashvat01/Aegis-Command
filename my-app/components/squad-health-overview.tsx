"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Dummy data generator
const generateSquadData = () => {
  const squadSize = 10
  return Array.from({ length: squadSize }, (_, index) => ({
    id: index + 1,
    name: `Soldier ${index + 1}`,
    readiness: Math.floor(Math.random() * 101),
    performanceScore: Math.floor(Math.random() * (100 - 70 + 1) + 70),
    healthStatus: Math.random() > 0.9 ? "critical" : "normal",
  }))
}

const getReadinessColor = (readiness: number) => {
  if (readiness >= 80) return "bg-green-500"
  if (readiness >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

export default function SquadHealthOverview() {
  const [squadData, setSquadData] = useState(generateSquadData())

  useEffect(() => {
    const interval = setInterval(() => {
      setSquadData(generateSquadData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const averagePerformance = Math.round(
    squadData.reduce((sum, soldier) => sum + soldier.performanceScore, 0) / squadData.length,
  )

  const criticalAlerts = squadData.filter((soldier) => soldier.healthStatus === "critical")

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Squad Health Overview</h2>

      {/* Readiness Heatmap */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Squad Readiness</h3>
        <div className="grid grid-cols-5 gap-2">
          {squadData.map((soldier) => (
            <div
              key={soldier.id}
              className={`h-10 rounded-md ${getReadinessColor(soldier.readiness)} flex items-center justify-center text-white font-medium`}
              title={`${soldier.name}: ${soldier.readiness}%`}
            >
              {soldier.readiness}%
            </div>
          ))}
        </div>
      </div>

      {/* Average Performance Bar Chart */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Average Performance: {averagePerformance}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={squadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performanceScore" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Critical Health Alerts */}
      <div>
        <h3 className="text-md font-medium mb-2">Critical Health Alerts</h3>
        {criticalAlerts.length > 0 ? (
          <ul className="list-disc pl-5">
            {criticalAlerts.map((soldier) => (
              <li key={soldier.id} className="text-red-600">
                {soldier.name} is in critical condition
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">No critical health issues detected</p>
        )}
      </div>
    </div>
  )
}


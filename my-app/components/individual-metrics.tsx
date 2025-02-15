"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Dummy data generator
const generateDummyData = () => ({
  heartRate: Math.floor(Math.random() * (100 - 60 + 1) + 60),
  steps: Math.floor(Math.random() * (10000 - 5000 + 1) + 5000),
  sleepQuality: Math.floor(Math.random() * (100 - 50 + 1) + 50),
  performanceScore: Math.floor(Math.random() * (100 - 70 + 1) + 70),
})

const generateChartData = () => {
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      time: `${i}:00`,
      heartRate: Math.floor(Math.random() * (100 - 60 + 1) + 60),
    })
  }
  return data
}

export default function IndividualMetrics() {
  const [metrics, setMetrics] = useState(generateDummyData())
  const [chartData, setChartData] = useState(generateChartData())

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateDummyData())
      setChartData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}`,
            heartRate: Math.floor(Math.random() * (100 - 60 + 1) + 60),
          },
        ]
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Individual Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Heart Rate" value={`${metrics.heartRate} bpm`} />
        <MetricCard title="Steps" value={metrics.steps.toLocaleString()} />
        <MetricCard title="Sleep Quality" value={`${metrics.sleepQuality}%`} />
        <MetricCard title="Performance Score" value={metrics.performanceScore} />
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="heartRate" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}


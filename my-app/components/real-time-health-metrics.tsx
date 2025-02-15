"use client"

import { useState, useEffect, useCallback } from "react"

type HealthMetrics = {
  heartRate: number
  stepsCount: number
  sleepQuality: number
}

// Simulated WebSocket class
class MockWebSocket {
  onmessage: ((event: { data: string }) => void) | null = null
  onclose: (() => void) | null = null

  constructor(url: string) {
    console.log(`MockWebSocket connected to ${url}`)
    this.startSendingData()
  }

  startSendingData() {
    const sendData = () => {
      if (this.onmessage) {
        const data: HealthMetrics = {
          heartRate: Math.floor(Math.random() * (100 - 60 + 1) + 60),
          stepsCount: Math.floor(Math.random() * 1000),
          sleepQuality: Math.floor(Math.random() * 101),
        }
        this.onmessage({ data: JSON.stringify(data) })
      }
      setTimeout(sendData, 2000 + Math.random() * 1000) // Random interval between 2-3 seconds
    }
    sendData()
  }

  close() {
    console.log("MockWebSocket connection closed")
    if (this.onclose) this.onclose()
  }
}

export default function RealTimeHealthMetrics() {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    heartRate: 0,
    stepsCount: 0,
    sleepQuality: 0,
  })

  const connectWebSocket = useCallback(() => {
    // In a real application, you would use the actual WebSocket class
    // const socket = new WebSocket('wss://your-websocket-server-url');
    const socket = new MockWebSocket("wss://dummy-websocket-server-url")

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMetrics(data)
    }

    socket.onclose = () => {
      console.log("WebSocket connection closed")
    }

    return socket
  }, [])

  useEffect(() => {
    const socket = connectWebSocket()

    return () => {
      socket.close()
    }
  }, [connectWebSocket])

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Real-Time Health Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Heart Rate" value={`${metrics.heartRate} bpm`} />
        <MetricCard title="Steps Count" value={metrics.stepsCount.toLocaleString()} />
        <MetricCard title="Sleep Quality" value={`${metrics.sleepQuality}%`} />
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


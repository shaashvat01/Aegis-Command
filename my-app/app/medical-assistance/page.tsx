"use client"

import { useState, useEffect } from "react"
import { useWebSocket } from "@/hooks/use-websocket"
import { StatusPanel } from "@/components/medical-assistance/status-panel"
import { EmergencyAssistance } from "@/components/medical-assistance/emergency-assistance"
import { SymptomDescriptionChat } from "@/components/medical-assistance/symptom-description-chat"

// Mock data for demonstration
const initialMedicalData = {
  availableMedics: 3,
  emergencySupplies: 75,
  vaccinationStatus: 92,
}

const mockMedicalReports = [
  { id: 1, date: "2025-01-15", description: "Annual check-up - All clear" },
  { id: 2, date: "2025-03-22", description: "Minor sprain during training - Treated" },
  { id: 3, date: "2025-06-10", description: "Routine vaccination update" },
]

const mockNearbyMedics = [
  { id: 1, name: "Medic Team Alpha", distance: "0.5 km", eta: "3 mins" },
  { id: 2, name: "Field Hospital Bravo", distance: "2.1 km", eta: "8 mins" },
  { id: 3, name: "Medevac Charlie", distance: "5.0 km", eta: "15 mins" },
]

export default function MedicalAssistancePage() {
  const [medicalData, setMedicalData] = useState(initialMedicalData)
  const [isEmergency, setIsEmergency] = useState(false)
  const { isConnected, lastMessage, sendMessage } = useWebSocket("wss://your-websocket-server.com/medical-assistance")

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === "medicalUpdate") {
        setMedicalData(lastMessage.value)
      } else if (lastMessage.type === "emergencyStatus") {
        setIsEmergency(lastMessage.value)
      }
    }
  }, [lastMessage])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMedicalData((prev) => ({
        ...prev,
        availableMedics: Math.max(0, prev.availableMedics + Math.floor(Math.random() * 3) - 1),
        emergencySupplies: Math.max(0, Math.min(100, prev.emergencySupplies + Math.floor(Math.random() * 5) - 2)),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleRequestAssistance = () => {
    setIsEmergency(true)
    sendMessage({ type: "emergencyRequest", value: true })
    // In a real application, this would trigger alerts to commanders and medics
    alert("Emergency medical assistance requested. Medics have been alerted.")
  }

  return (
    <div className="container mx-auto px-4 py-8 text-high-contrast">
      <h1 className="text-3xl font-bold mb-6">Medical Assistance</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatusPanel medicalData={medicalData} medicalReports={mockMedicalReports} />
        <EmergencyAssistance
          isEmergency={isEmergency}
          onRequestAssistance={handleRequestAssistance}
          nearbyMedics={mockNearbyMedics}
        />
      </div>

      <SymptomDescriptionChat />
    </div>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface NearbyMedic {
  id: number
  name: string
  distance: string
  eta: string
}

interface EmergencyAssistanceProps {
  isEmergency: boolean
  onRequestAssistance: () => void
  nearbyMedics: NearbyMedic[]
}

export function EmergencyAssistance({ isEmergency, onRequestAssistance, nearbyMedics }: EmergencyAssistanceProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-high-contrast">Emergency Assistance</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onRequestAssistance}
          className="w-full mb-4 military-btn military-btn-danger"
          disabled={isEmergency}
        >
          {isEmergency ? "Assistance Requested" : "Request Medical Assistance"}
        </Button>
        <div className="space-y-2">
          <h3 className="font-semibold">Nearby Medical Response:</h3>
          {nearbyMedics.map((medic) => (
            <div key={medic.id} className="flex items-center justify-between bg-high-contrast p-2 rounded">
              <span>{medic.name}</span>
              <div className="text-sm text-muted-foreground">
                <MapPin className="inline w-4 h-4 mr-1" />
                {medic.distance} ({medic.eta})
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


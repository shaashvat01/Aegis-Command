import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserRound, FileText } from "lucide-react"

interface MedicalData {
  availableMedics: number
  emergencySupplies: number
  vaccinationStatus: number
}

interface MedicalReport {
  id: number
  date: string
  description: string
}

interface StatusPanelProps {
  medicalData: MedicalData
  medicalReports: MedicalReport[]
}

export function StatusPanel({ medicalData, medicalReports }: StatusPanelProps) {
  return (
    <Card className="col-span-1 lg:col-span-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-high-contrast">Status Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>On-site Medics Available:</span>
            <Badge variant="outline" className="text-green-400">
              <UserRound className="w-4 h-4 mr-1" />
              {medicalData.availableMedics}
            </Badge>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Emergency Supplies:</span>
              <span>{medicalData.emergencySupplies}%</span>
            </div>
            <Progress value={medicalData.emergencySupplies} className="w-full" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Vaccination Status:</span>
              <span>{medicalData.vaccinationStatus}%</span>
            </div>
            <Progress value={medicalData.vaccinationStatus} className="w-full" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Past Medical Reports:</h3>
            <ScrollArea className="h-32 rounded border border-border p-2">
              {medicalReports.map((report) => (
                <div key={report.id} className="mb-2">
                  <p className="text-sm">
                    <FileText className="inline w-4 h-4 mr-1" />
                    {report.date}: {report.description}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


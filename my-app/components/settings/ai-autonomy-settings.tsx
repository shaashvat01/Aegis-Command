"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

export function AIAutonomySettings() {
  const [autonomyLevel, setAutonomyLevel] = useState("semi-auto")
  const [riskDetection, setRiskDetection] = useState(true)

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving AI & Autonomy settings...")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AI Autonomy Level</h3>
        <RadioGroup value={autonomyLevel} onValueChange={setAutonomyLevel}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual">Manual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="semi-auto" id="semi-auto" />
            <Label htmlFor="semi-auto">Semi-Auto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fully-auto" id="fully-auto" />
            <Label htmlFor="fully-auto">Fully Auto</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Risk Detection</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="risk-detection">Enable AI alerts for risk detection</Label>
          <Switch id="risk-detection" checked={riskDetection} onCheckedChange={setRiskDetection} />
        </div>
      </div>
      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  )
}


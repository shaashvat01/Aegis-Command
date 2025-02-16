"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function SquadMissionSettings() {
  const [squadMembers, setSquadMembers] = useState([
    { name: "Alice", role: "Soldier", accessLevel: "Standard" },
    { name: "Bob", role: "Medic", accessLevel: "High" },
    { name: "Charlie", role: "Soldier", accessLevel: "Standard" },
  ])
  const [restPeriod, setRestPeriod] = useState(6)
  const [fatigueWarning, setFatigueWarning] = useState(75)

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving Squad & Mission settings...")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Squad Roles & Access Levels</h3>
        {squadMembers.map((member, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <Input
              value={member.name}
              onChange={(e) => {
                const newSquadMembers = [...squadMembers]
                newSquadMembers[index].name = e.target.value
                setSquadMembers(newSquadMembers)
              }}
            />
            <Select
              value={member.role}
              onValueChange={(value) => {
                const newSquadMembers = [...squadMembers]
                newSquadMembers[index].role = value
                setSquadMembers(newSquadMembers)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Soldier">Soldier</SelectItem>
                <SelectItem value="Medic">Medic</SelectItem>
                <SelectItem value="Commander">Commander</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={member.accessLevel}
              onValueChange={(value) => {
                const newSquadMembers = [...squadMembers]
                newSquadMembers[index].accessLevel = value
                setSquadMembers(newSquadMembers)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rest & Fatigue Settings</h3>
        <div className="space-y-2">
          <Label htmlFor="rest-period">Enforced Rest Period (hours)</Label>
          <Slider
            id="rest-period"
            min={1}
            max={12}
            step={1}
            value={[restPeriod]}
            onValueChange={(value) => setRestPeriod(value[0])}
          />
          <div className="text-right">{restPeriod} hours</div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatigue-warning">Fatigue Warning Threshold (%)</Label>
          <Slider
            id="fatigue-warning"
            min={50}
            max={90}
            step={5}
            value={[fatigueWarning]}
            onValueChange={(value) => setFatigueWarning(value[0])}
          />
          <div className="text-right">{fatigueWarning}%</div>
        </div>
      </div>
      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserProfileSettings() {
  const [name, setName] = useState("John Doe")
  const [role, setRole] = useState("Commander")
  const [email, setEmail] = useState("john.doe@example.com")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [inAppAlerts, setInAppAlerts] = useState(true)

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving user profile settings...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder.svg" alt="Profile picture" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button>Change Picture</Button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commander">Commander</SelectItem>
                <SelectItem value="Soldier">Soldier</SelectItem>
                <SelectItem value="Medic">Medic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications">SMS Notifications</Label>
          <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="in-app-alerts">In-App Alerts</Label>
          <Switch id="in-app-alerts" checked={inAppAlerts} onCheckedChange={setInAppAlerts} />
        </div>
      </div>
      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  )
}


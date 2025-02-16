"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">User Profile</TabsTrigger>
          <TabsTrigger value="ai">AI & Autonomy</TabsTrigger>
          <TabsTrigger value="squad">Squad & Mission</TabsTrigger>
          <TabsTrigger value="display">Display & Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile Settings</CardTitle>
              <CardDescription>Manage your personal information and notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button>Change Picture</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="commander">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commander">Commander</SelectItem>
                      <SelectItem value="soldier">Soldier</SelectItem>
                      <SelectItem value="medic">Medic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-notifications" />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="in-app-notifications" />
                  <Label htmlFor="in-app-notifications">In-App Alerts</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI & Autonomy Settings</CardTitle>
              <CardDescription>Configure AI assistance and autonomy levels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-autonomy">AI Autonomy Level</Label>
                <Select defaultValue="semi-auto">
                  <SelectTrigger id="ai-autonomy">
                    <SelectValue placeholder="Select autonomy level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="semi-auto">Semi-Auto</SelectItem>
                    <SelectItem value="fully-auto">Fully Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>AI Alert Settings</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="fatigue-detection" />
                  <Label htmlFor="fatigue-detection">Fatigue Detection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="health-issues" />
                  <Label htmlFor="health-issues">Health Issues</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="squad">
          <Card>
            <CardHeader>
              <CardTitle>Squad & Mission Preferences</CardTitle>
              <CardDescription>Manage squad roles and mission settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="access-level">Default Access Level</Label>
                <Select defaultValue="squad-leader">
                  <SelectTrigger id="access-level">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="squad-member">Squad Member</SelectItem>
                    <SelectItem value="squad-leader">Squad Leader</SelectItem>
                    <SelectItem value="commander">Commander</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rest-period">Enforced Rest Period (hours)</Label>
                <Slider id="rest-period" defaultValue={[8]} max={12} step={1} className="w-[60%]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatigue-warning">Fatigue Warning Threshold (%)</Label>
                <Slider id="fatigue-warning" defaultValue={[70]} max={100} step={5} className="w-[60%]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display & Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label>Theme</Label>
                <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Slider id="font-size" defaultValue={[16]} max={24} min={12} step={1} className="w-[60%]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <AlertCircle className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfileSettings } from "@/components/settings/user-profile-settings"
import { AIAutonomySettings } from "@/components/settings/ai-autonomy-settings"
import { SquadMissionSettings } from "@/components/settings/squad-mission-settings"
import { DisplayThemeSettings } from "@/components/settings/display-theme-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("user-profile")

  return (
    <div className="container mx-auto px-4 py-8 text-high-contrast">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-high-contrast">Aegis Command Dashboard Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="user-profile">User Profile</TabsTrigger>
              <TabsTrigger value="ai-autonomy">AI & Autonomy</TabsTrigger>
              <TabsTrigger value="squad-mission">Squad & Mission</TabsTrigger>
              <TabsTrigger value="display-theme">Display & Theme</TabsTrigger>
            </TabsList>
            <TabsContent value="user-profile">
              <UserProfileSettings />
            </TabsContent>
            <TabsContent value="ai-autonomy">
              <AIAutonomySettings />
            </TabsContent>
            <TabsContent value="squad-mission">
              <SquadMissionSettings />
            </TabsContent>
            <TabsContent value="display-theme">
              <DisplayThemeSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


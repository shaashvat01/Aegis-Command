"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"

export function DisplayThemeSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [fontSize, setFontSize] = useState("medium")
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving Display & Theme settings...")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Theme Settings</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accessibility Settings</h3>
        <div className="space-y-2">
          <Label htmlFor="font-size">Font Size</Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger id="font-size">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  )
}


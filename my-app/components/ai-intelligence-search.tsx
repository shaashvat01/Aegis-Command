"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Loader2 } from "lucide-react"

export function AIIntelligenceSearch() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/perplexity-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch from API")
      }

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error("Error fetching search results:", error)
      setResult("An error occurred while fetching results. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-high-contrast">AI Intelligence Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading} className="military-btn military-btn-primary">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </form>
        <ScrollArea className="h-64 mt-4 rounded border border-border p-4">
          {result && (
            <div className="text-high-contrast">
              <h3 className="font-semibold mb-2">Search Result:</h3>
              <p>{result}</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}


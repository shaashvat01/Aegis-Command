"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, AlertCircle } from "lucide-react"
import { formatText } from "@/utils/formatText"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  id: number
  role: "user" | "assistant" | "error"
  content: string
}

export function SymptomDescriptionChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setError(null) // Clear any previous errors when input changes
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return

      setIsStreaming(true)
      setError(null)
      const newMessage: Message = { id: Date.now(), role: "user", content: input }
      setMessages((prev) => [...prev, newMessage])
      setInput("")

      try {
        const response = await fetch("/api/perplexity-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to get AI response")
        }

        if (!data.result) {
          throw new Error("No response received from AI")
        }

        const aiResponse: Message = { id: Date.now() + 1, role: "assistant", content: data.result }
        setMessages((prev) => [...prev, aiResponse])
      } catch (error) {
        console.error("Error fetching AI response:", error)
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
        setError(errorMessage)
        const errorResponse: Message = {
          id: Date.now() + 1,
          role: "error",
          content: "I apologize, but I'm having trouble responding right now. Please try again.",
        }
        setMessages((prev) => [...prev, errorResponse])
      } finally {
        setIsStreaming(false)
      }
    },
    [input],
  )

  return (
    <Card className="mt-6 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-high-contrast">Symptom Description Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[500px]">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <ScrollArea ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 space-y-4 p-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : m.role === "error"
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="whitespace-pre-wrap formatted-response">{formatText(m.content)}</div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {isStreaming && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg bg-secondary text-secondary-foreground">
                  <span className="animate-pulse">AI is thinking...</span>
                </div>
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Describe your symptoms or ask a medical question..."
              className="flex-grow mr-2"
            />
            <Button type="submit" disabled={isStreaming} className="military-btn military-btn-primary">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}


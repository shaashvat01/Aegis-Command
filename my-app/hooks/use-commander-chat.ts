"use client"

import type React from "react"

import { useState, useCallback } from "react"

interface SquadFormation {
  alpha: { readiness: number; formation: string; pace: number }
  bravo: { readiness: number; formation: string; pace: number }
  charlie: { readiness: number; formation: string; pace: number }
}

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

export function useCommanderChat(initialSquadFormation: SquadFormation) {
  const [squadFormation, setSquadFormation] = useState(initialSquadFormation)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsStreaming(true)
      const newMessage: Message = { id: Date.now(), role: "user", content: input }
      setMessages([...messages, newMessage])
      setInput("")

      // Simulate AI response (replace with actual AI call)
      setTimeout(() => {
        const aiResponse: Message = { id: Date.now() + 1, role: "assistant", content: "AI response based on: " + input }
        setMessages([...messages, newMessage, aiResponse])
        setIsStreaming(false)
      }, 1000)
    },
    [input, messages],
  )

  return { messages, input, handleInputChange, handleSubmit, isStreaming }
}


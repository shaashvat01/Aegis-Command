"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

type Message = {
  id: number
  text: string
  sender: "user" | "ai"
}

const dummyResponses = [
  "Your performance today is 85/100. Great job!",
  "Based on your recent metrics, I recommend increasing your hydration levels.",
  "Your sleep quality last night was 92%. Keep up the good work!",
  "Your heart rate during the last mission peaked at 150 bpm. This is within normal range for high-intensity activities.",
  "Compared to last week, your overall performance has improved by 7%.",
]

export default function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now(),
        text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
        sender: "ai",
      }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    }, 1000)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef])

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">AI Agent Chat</h2>
      <div className="h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 rounded-lg ${
                message.sender === "user" ? "bg-blue-200 ml-auto" : "bg-green-200"
              } max-w-[80%]`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your command..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}


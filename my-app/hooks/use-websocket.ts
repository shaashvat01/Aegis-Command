"use client"

import { useState, useEffect, useCallback } from "react"

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>(null)

  useEffect(() => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      setIsConnected(true)
    }

    ws.onclose = () => {
      setIsConnected(false)
    }

    ws.onmessage = (event) => {
      setLastMessage(JSON.parse(event.data))
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [url])

  const sendMessage = useCallback(
    (message: any) => {
      if (socket && isConnected) {
        socket.send(JSON.stringify(message))
      }
    },
    [socket, isConnected],
  )

  return { isConnected, lastMessage, sendMessage }
}


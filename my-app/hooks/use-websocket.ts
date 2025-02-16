"use client"

import { useState, useEffect, useCallback } from "react"

export enum WebSocketStatus {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTED = 2,
}

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [status, setStatus] = useState<WebSocketStatus>(WebSocketStatus.CONNECTING)
  const [lastMessage, setLastMessage] = useState<any>(null)

  useEffect(() => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      setStatus(WebSocketStatus.CONNECTED)
    }

    ws.onclose = () => {
      setStatus(WebSocketStatus.DISCONNECTED)
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
      if (socket && status === WebSocketStatus.CONNECTED) {
        socket.send(JSON.stringify(message))
      }
    },
    [socket, status],
  )

  return { status, lastMessage, sendMessage }
}


import WebSocket from "ws"

const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", (ws) => {
  console.log("New client connected")

  ws.on("message", (message) => {
    console.log("Received:", message)
    // Handle incoming messages and broadcast to relevant clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  ws.on("close", () => {
    console.log("Client disconnected")
  })

  // Simulate periodic updates
  setInterval(() => {
    const updates = [
      { type: "readiness", value: Math.floor(Math.random() * 100) },
      { type: "suggestion", value: { id: Date.now(), text: "New AI suggestion", severity: "medium" } },
      { type: "alert", value: "New mission alert: Enemy movement detected" },
      {
        type: "medicalUpdate",
        value: {
          availableMedics: Math.floor(Math.random() * 5) + 1,
          emergencySupplies: Math.floor(Math.random() * 100),
        },
      },
    ]
    const randomUpdate = updates[Math.floor(Math.random() * updates.length)]
    ws.send(JSON.stringify(randomUpdate))
  }, 5000)
})

console.log("WebSocket server is running on port 8080")


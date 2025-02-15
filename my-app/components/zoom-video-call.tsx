"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dummy Zoom SDK and API (replace with actual Zoom SDK when implementing)
const dummyZoomSDK = {
  init: () => Promise.resolve(),
  join: (meetingNumber: string, userName: string) => Promise.resolve(),
}

const dummyZoomAPI = {
  createMeeting: () => Promise.resolve({ id: Math.random().toString(36).substring(7) }),
  fetchMeetingDetails: (meetingId: string) =>
    Promise.resolve({
      participants: ["John Doe", "Jane Smith"],
      status: "In Progress",
    }),
}

type Meeting = {
  id: string
  participants: string[]
  status: string
}

export default function ZoomVideoCall() {
  const [meetingId, setMeetingId] = useState("")
  const [recentCalls, setRecentCalls] = useState<Meeting[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    // Initialize Zoom SDK
    dummyZoomSDK.init().catch((error) => {
      setError("Failed to initialize Zoom SDK")
      console.error(error)
    })
  }, [])

  const startZoomCall = async () => {
    try {
      const { id } = await dummyZoomAPI.createMeeting()
      setMeetingId(id)
      await dummyZoomSDK.join(id, "Commander") // Replace with actual user name
      const meetingDetails = await dummyZoomAPI.fetchMeetingDetails(id)
      setRecentCalls((prev) => [{ id, ...meetingDetails }, ...prev])
    } catch (error) {
      setError("Failed to start Zoom call")
      console.error(error)
    }
  }

  const joinZoomCall = async () => {
    if (!meetingId) {
      setError("Please enter a valid Meeting ID")
      return
    }
    try {
      await dummyZoomSDK.join(meetingId, "Soldier") // Replace with actual user name
      const meetingDetails = await dummyZoomAPI.fetchMeetingDetails(meetingId)
      setRecentCalls((prev) => [{ id: meetingId, ...meetingDetails }, ...prev])
    } catch (error) {
      setError("Failed to join Zoom call")
      console.error(error)
    }
  }

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Zoom Video Call</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <Button onClick={startZoomCall} className="w-full">
                Start Zoom Call
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={joinZoomCall}>Join Call</Button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div id="zoomMeetingContainer" className="mt-4 h-64 bg-gray-200 flex items-center justify-center">
              {meetingId ? `Zoom meeting ${meetingId} in progress` : "No active Zoom meeting"}
            </div>
          </div>
          <div className="w-full md:w-64">
            <h3 className="text-md font-medium mb-2">Recent Calls</h3>
            <ul className="space-y-2">
              {recentCalls.map((call) => (
                <li key={call.id} className="bg-gray-100 p-2 rounded">
                  <p className="font-medium">Meeting ID: {call.id}</p>
                  <p className="text-sm">Status: {call.status}</p>
                  <p className="text-sm">Participants: {call.participants.join(", ")}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


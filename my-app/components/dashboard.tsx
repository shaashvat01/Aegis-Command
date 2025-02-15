"use client"

import { useState } from "react"
import TopNavBar from "./top-nav-bar"
import Sidebar from "./sidebar"
import MainContent from "./main-content"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent />
      </div>
    </div>
  )
}


import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import TopNavbar from "@/components/top-navbar"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Aegis Command Dashboard",
  description: "Real-time health metrics and AI-powered decision-making",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopNavbar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

import "./globals.css"


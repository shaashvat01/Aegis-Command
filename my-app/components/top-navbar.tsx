import type React from "react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const TopNavbar = () => {
  return (
    <nav className="bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SidebarTrigger className="mr-2 md:hidden">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <span className="font-bold text-xl text-high-contrast">Aegis Command</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/squad-health">Squad Health</NavLink>
              <NavLink href="/ai-tactical">AI Tactical</NavLink>
              <NavLink href="/mission-control">Mission Control</NavLink>
              <NavLink href="/medical-assistance">Medical Assistance</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="text-muted-foreground hover:bg-primary hover:text-primary-foreground">
      {children}
    </Button>
  </Link>
)

export default TopNavbar


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { FileText, Settings, Home, Activity, Briefcase, AmbulanceIcon as FirstAid } from "lucide-react"
import Link from "next/link"

const AppSidebar = () => {
  return (
    <Sidebar className="bg-card border-r border-border">
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2 text-high-contrast">Aegis Command</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" className="flex items-center text-muted-foreground hover:text-primary">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/squad-health" className="flex items-center text-muted-foreground hover:text-primary">
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Squad Health</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/ai-tactical" className="flex items-center text-muted-foreground hover:text-primary">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>AI Tactical</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/mission-control" className="flex items-center text-muted-foreground hover:text-primary">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Mission Control</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/medical-assistance"
                    className="flex items-center text-muted-foreground hover:text-primary"
                  >
                    <FirstAid className="mr-2 h-4 w-4" />
                    <span>Medical Assistance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings" className="flex items-center text-muted-foreground hover:text-primary">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar


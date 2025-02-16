import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Briefcase, FileText, AmbulanceIcon as FirstAid } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-high-contrast">Aegis Command Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Squad Health"
          description="Real-time health metrics for your squad."
          icon={<Activity className="h-6 w-6" />}
          link="/squad-health"
        />
        <DashboardCard
          title="AI Tactical"
          description="AI-powered tactical adjustments and recommendations."
          icon={<Briefcase className="h-6 w-6" />}
          link="/ai-tactical"
        />
        <DashboardCard
          title="Mission Control"
          description="Current mission status and objectives."
          icon={<FileText className="h-6 w-6" />}
          link="/mission-control"
        />
        <DashboardCard
          title="Medical Assistance"
          description="Request and manage medical support."
          icon={<FirstAid className="h-6 w-6" />}
          link="/medical-assistance"
        />
      </div>
    </div>
  )
}

function DashboardCard({ title, description, icon, link }) {
  return (
    <Link href={link}>
      <Card className="hover:bg-primary/10 transition-colors duration-200">
        <CardHeader>
          <CardTitle className="flex items-center text-high-contrast">
            {icon}
            <span className="ml-2">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}


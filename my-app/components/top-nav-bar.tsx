import Link from "next/link"
import { Menu } from "lucide-react"

export default function TopNavBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">Terra Super Soldier</span>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Individual Metrics
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Squad Overview
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Agent Recommendations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}


import { Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Wallet, MessageSquarePlus, User, CalendarRange } from 'lucide-react'
import { AppSidebar } from '@/components/AppSidebar'
import { Topbar } from '@/components/Topbar'

const studentLinks = [
  { href: '/student/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: '/student/fees', label: 'Fees & Invoices', icon: <Wallet className="w-5 h-5" /> },
  { href: '/student/complaints', label: 'Complaints', icon: <MessageSquarePlus className="w-5 h-5" /> },
  { href: '/student/leave', label: 'Leave Application', icon: <CalendarRange className="w-5 h-5" /> },
  { href: '/student/profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
]

export default function StudentLayout() {
  const location = useLocation()
  
  const currentPath = location.pathname.split('/').pop()
  const pageTitle = currentPath 
      ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace('-', ' ') 
      : 'Dashboard'

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <AppSidebar links={studentLinks} roleName="Student" />
      
      <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
        <Topbar pageTitle={pageTitle} />
        
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

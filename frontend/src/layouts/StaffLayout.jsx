import { Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, MessageSquarePlus, Home } from 'lucide-react'
import { AppSidebar } from '@/components/AppSidebar'
import { Topbar } from '@/components/Topbar'

const staffLinks = [
  { href: '/staff/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: '/staff/tasks', label: 'My Tasks', icon: <CheckSquare className="w-5 h-5" /> },
  { href: '/staff/complaints', label: 'Complaint Queue', icon: <MessageSquarePlus className="w-5 h-5" /> },
  { href: '/staff/rooms', label: 'Room Maintenance', icon: <Home className="w-5 h-5" /> },
]

export default function StaffLayout() {
  const location = useLocation()
  
  const currentPath = location.pathname.split('/').pop()
  const pageTitle = currentPath 
      ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace('-', ' ') 
      : 'Dashboard'

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <AppSidebar links={staffLinks} roleName="Staff" />
      
      <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
        <Topbar pageTitle={pageTitle} />
        
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

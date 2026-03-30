import { Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, UserCog, Building, DollarSign, BellRing, Settings } from 'lucide-react'
import { AppSidebar } from '@/components/AppSidebar'
import { Topbar } from '@/components/Topbar'

const adminLinks = [
  { href: '/admin/dashboard', label: 'CRM Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: '/admin/students', label: 'Tenant Directory', icon: <Users className="w-5 h-5" /> },
  { href: '/admin/staff', label: 'Staff Management', icon: <UserCog className="w-5 h-5" /> },
  { href: '/admin/rooms', label: 'Room Allocation', icon: <Building className="w-5 h-5" /> },
  { href: '/admin/payments', label: 'Payments ledger', icon: <DollarSign className="w-5 h-5" /> },
  { href: '/admin/notifications', label: 'Notifications', icon: <BellRing className="w-5 h-5" /> },
  { href: '/admin/settings', label: 'System Settings', icon: <Settings className="w-5 h-5" /> },
]

export default function AdminLayout() {
  const location = useLocation()
  
  const currentPath = location.pathname.split('/').pop()
  const pageTitle = currentPath 
      ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace('-', ' ') 
      : 'Dashboard'

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <AppSidebar links={adminLinks} roleName="Administrator" />
      
      <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
        <Topbar pageTitle={pageTitle} />
        
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, LogOut } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export function AppSidebar({ links, roleName }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-64 border-r border-border/50 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-xl hidden md:flex flex-col min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-border/50 shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">HostelLite</span>
        </Link>
      </div>

      <div className="px-6 py-4">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          {roleName} Portal
        </div>
        <nav className="space-y-1.5 flex-1">
          {links.map((link) => {
            const isActive = location.pathname.includes(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-foreground'
                }`}
              >
                {link.icon}
                {link.label}
                {isActive && (
                   <motion.div 
                     layoutId="sidebar-active"
                     className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-border/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}

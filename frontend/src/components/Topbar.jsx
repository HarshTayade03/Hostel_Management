import { Bell, Menu, UserCircle, LogOut, Settings } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'

export function Topbar({ pageTitle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Determine base path based on location
  const basePath = location.pathname.split('/')[1] || 'student'

  const handleNotificationClick = () => {
    navigate(`/${basePath}/notifications`)
  }

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleSettings = () => {
    setDropdownOpen(false)
    navigate(`/${basePath}/settings`)
  }

  const handleLogout = () => {
    setDropdownOpen(false)
    logout()
    navigate('/')
  }

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-heading font-semibold tracking-tight">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={handleNotificationClick}
          className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-muted-foreground"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
        </button>
        <ThemeToggle />
        
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-border cursor-pointer transition-transform hover:scale-105"
          >
             <UserCircle className="w-full h-full text-muted-foreground" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-border/50">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || 'email@example.com'}</p>
              </div>
              <button 
                onClick={handleSettings}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-500/10 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

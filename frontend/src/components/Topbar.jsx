import { Bell, Menu, UserCircle } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export function Topbar({ pageTitle }) {
  return (
    <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-heading font-semibold tracking-tight">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-muted-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
        </button>
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-border cursor-pointer">
           <UserCircle className="w-full h-full text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}

import { Link } from "react-router-dom"
import { ThemeToggle } from "./theme-toggle"
import { Building2 } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">
            HostelLite
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            to="/login" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

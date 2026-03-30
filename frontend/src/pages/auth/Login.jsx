import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Building, User, Mail, Lock } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('student@example.com')
  const [password, setPassword] = useState('password123')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock login based on email
    setTimeout(() => {
      if (email.includes('admin')) {
        navigate('/admin/dashboard')
      } else if (email.includes('staff')) {
        navigate('/staff/dashboard')
      } else {
        navigate('/student/dashboard')
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" />
      
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl">HostelLite</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md glass-card p-8 md:p-12 shadow-2xl relative"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link to="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 mt-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
             Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Apply for admission
            </Link>
          </div>
          
          {/* Quick Mock Login Hints */}
          <div className="mt-8 pt-6 border-t border-border/50 text-xs text-center text-muted-foreground space-y-2">
            <p>Mock login hints:</p>
            <div className="flex justify-center gap-4">
              <button type="button" onClick={() => { setEmail('student@example.com'); setTimeout(() => navigate('/student/dashboard'), 300); }} className="hover:text-primary transition-colors">Student</button>
              <button type="button" onClick={() => { setEmail('staff@example.com'); setTimeout(() => navigate('/staff/dashboard'), 300); }} className="hover:text-primary transition-colors">Staff</button>
              <button type="button" onClick={() => { setEmail('admin@example.com'); setTimeout(() => navigate('/admin/dashboard'), 300); }} className="hover:text-primary transition-colors">Admin</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Branding Sidebar for larger viewports */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-100 dark:bg-slate-900/50 p-12 items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="relative z-10 max-w-lg">
            <div className="glass-card p-8 rotate-[-2deg] mb-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <div className="font-bold">Student Portal</div>
                   <div className="text-sm text-muted-foreground">Manage your stay seamlessly</div>
                 </div>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full mb-3" />
              <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>

            <div className="glass-card p-8 rotate-[2deg] ml-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-purple-500" />
                 </div>
                 <div>
                   <div className="font-bold">Admin CRM</div>
                   <div className="text-sm text-muted-foreground">Complete facility overview</div>
                 </div>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full mb-3" />
              <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
         </div>
      </div>
    </div>
  )
}

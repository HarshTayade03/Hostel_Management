import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ArrowRight, ArrowLeft, Building, User, Phone, Mail } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => setStep(s => Math.min(s + 1, 3))
  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      // Mock account creation and login
      navigate('/student/dashboard')
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 relative">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl">HostelLite</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Apply for Admission</h1>
            <p className="text-muted-foreground text-lg">Join us and experience seamless hostel living.</p>
          </div>

          <div className="glass-card shadow-2xl overflow-hidden relative border-t-[3px] border-t-primary">
            {/* Progress Bar */}
            <div className="h-1 bg-slate-100 dark:bg-slate-800 w-full absolute top-0 left-0">
               <motion.div 
                 initial={{ width: '33%' }}
                 animate={{ width: `${(step / 3) * 100}%` }}
                 className="h-full bg-gradient-to-r from-primary to-purple-500"
               />
            </div>

            <div className="p-8 md:p-10">
               <div className="flex justify-between items-center mb-8">
                 <div className="font-medium text-sm text-primary uppercase tracking-wider">Step {step} of 3</div>
                 <div className="text-sm font-medium text-muted-foreground">
                   {step === 1 && "Personal Details"}
                   {step === 2 && "Contact & Address"}
                   {step === 3 && "Preferences & Documents"}
                 </div>
               </div>

               <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                 <AnimatePresence>
                   {step === 1 && (
                     <motion.div 
                       key="step1"
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                       className="space-y-6"
                     >
                       <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-sm font-medium">First Name</label>
                           <input type="text" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="John" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-sm font-medium">Last Name</label>
                           <input type="text" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="Doe" />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                           <label className="text-sm font-medium">Email Address</label>
                           <input type="email" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="name@example.com" />
                       </div>

                       <div className="space-y-2">
                           <label className="text-sm font-medium">Password</label>
                           <input type="password" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="Create a secure password" />
                       </div>
                     </motion.div>
                   )}

                   {step === 2 && (
                     <motion.div 
                       key="step2"
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                       className="space-y-6"
                     >
                        <div className="space-y-2">
                           <label className="text-sm font-medium">Phone Number</label>
                           <input type="tel" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="+1 (555) 000-0000" />
                       </div>

                       <div className="space-y-2">
                           <label className="text-sm font-medium">Emergency Contact</label>
                           <div className="grid md:grid-cols-2 gap-4">
                              <input type="text" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="Relation (e.g., Father)" />
                              <input type="tel" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="Phone Number" />
                           </div>
                       </div>

                       <div className="space-y-2">
                           <label className="text-sm font-medium">Residential Address</label>
                           <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" required placeholder="Your permanent address" />
                       </div>
                     </motion.div>
                   )}

                   {step === 3 && (
                     <motion.div 
                       key="step3"
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                       className="space-y-6"
                     >
                       <div className="space-y-4">
                         <label className="text-sm font-medium">Room Type Preference</label>
                         <div className="grid grid-cols-2 gap-4">
                           <label className="relative flex cursor-pointer rounded-xl border border-input bg-background/50 p-4 hover:bg-slate-50 dark:hover:bg-slate-900 focus-within:ring-2 focus-within:ring-primary">
                             <input type="radio" name="roomType" className="sr-only" defaultChecked />
                             <span className="flex flex-col">
                               <span className="block text-sm font-medium">Single Room</span>
                               <span className="block text-sm text-muted-foreground mt-1">Private space</span>
                             </span>
                           </label>
                           <label className="relative flex cursor-pointer rounded-xl border border-input bg-background/50 p-4 hover:bg-slate-50 dark:hover:bg-slate-900 focus-within:ring-2 focus-within:ring-primary">
                             <input type="radio" name="roomType" className="sr-only" />
                             <span className="flex flex-col">
                               <span className="block text-sm font-medium">Shared (2-Bed)</span>
                               <span className="block text-sm text-muted-foreground mt-1">Cost effective</span>
                             </span>
                           </label>
                         </div>
                       </div>

                       <div className="space-y-2">
                           <label className="text-sm font-medium">ID Proof Upload (Optional Mock)</label>
                           <div className="border-2 border-dashed border-input rounded-xl p-6 flex flex-col items-center justify-center text-center bg-background/20 hover:bg-background/50 transition-colors cursor-pointer">
                             <User className="w-8 h-8 text-muted-foreground mb-2" />
                             <div className="text-sm font-medium">Click to upload</div>
                             <div className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</div>
                           </div>
                       </div>

                     </motion.div>
                   )}
                 </AnimatePresence>

                 <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/50">
                   {step > 1 ? (
                     <button type="button" onClick={handlePrev} className="px-6 py-2.5 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-muted-foreground">
                       <ArrowLeft className="w-4 h-4" /> Back
                     </button>
                   ) : (
                     <Link to="/login" className="text-sm text-primary hover:underline font-medium">Already have an account?</Link>
                   )}
                   
                   <button 
                     type="submit"
                     disabled={isLoading}
                     className="px-8 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 ml-auto"
                   >
                     {step === 3 ? (
                        isLoading ? <span className="animate-pulse">Submitting...</span> : 'Submit Application'
                     )  : 'Next Step'}
                     {step !== 3 && <ArrowRight className="w-4 h-4" />}
                   </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

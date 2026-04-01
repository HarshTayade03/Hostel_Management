import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ArrowRight, ArrowLeft, User, AlertCircle } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { AuthContext } from '@/context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useContext(AuthContext)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: 'OTHER',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => setStep(s => Math.min(s + 1, 3))
  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
        role: 'STUDENT'
      }
      
      await register(payload)
      navigate('/student/dashboard')
    } catch (err) {
      setErrorMsg(err)
      setStep(1) // Return to first step to show error
    } finally {
      setIsLoading(false)
    }
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

          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mb-6 p-4 rounded-xl mx-auto max-w-lg bg-destructive/15 border border-destructive/30 flex items-start gap-3 text-destructive"
            >
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </motion.div>
          )}

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
                   {step === 2 && "Contact & Profile"}
                   {step === 3 && "Preferences"}
                 </div>
               </div>

               <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                 <AnimatePresence mode="wait">
                   {step === 1 && (
                     <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                       <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-sm font-medium">First Name</label>
                           <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="John" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-sm font-medium">Last Name</label>
                           <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="Doe" />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                           <label className="text-sm font-medium">Email Address</label>
                           <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="name@example.com" />
                       </div>

                       <div className="space-y-2">
                           <label className="text-sm font-medium">Password</label>
                           <input type="password" name="password" value={formData.password} onChange={handleChange} minLength="8" className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="8+ characters" />
                       </div>
                     </motion.div>
                   )}

                   {step === 2 && (
                     <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-sm font-medium">Phone Number</label>
                           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required placeholder="+1 (555) 000-0000" />
                       </div>

                        <div className="space-y-2">
                           <label className="text-sm font-medium">Gender</label>
                           <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required>
                             <option value="MALE">Male</option>
                             <option value="FEMALE">Female</option>
                             <option value="OTHER">Other</option>
                           </select>
                        </div>
                     </motion.div>
                   )}

                   {step === 3 && (
                     <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                       <div className="space-y-4">
                         <label className="text-sm font-medium">Room Type Preference (Optional)</label>
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
                               <span className="block text-sm font-medium">Shared</span>
                               <span className="block text-sm text-muted-foreground mt-1">Cost effective</span>
                             </span>
                           </label>
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

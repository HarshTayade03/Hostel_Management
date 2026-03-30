import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, User, FileText, Send, AlertTriangle } from 'lucide-react'

export default function LeaveApplication() {
  const [formData, setFormData] = useState({ type: 'Outpass', reason: '', start: '', end: '', destination: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 glass-card p-6 md:p-8 rounded-3xl">
          <h2 className="text-2xl font-heading font-bold mb-6">New Application</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-2">
                 <label className="text-sm font-medium">Leave Type</label>
                 <div className="grid grid-cols-2 gap-4">
                   <label className={`relative flex cursor-pointer rounded-xl border p-4 transition-all ${formData.type === 'Outpass' ? 'bg-primary/5 border-primary ring-2 ring-primary/20' : 'bg-background/50 border-input hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                     <input type="radio" name="type" className="sr-only" checked={formData.type === 'Outpass'} onChange={() => setFormData({...formData, type: 'Outpass'})} />
                     <span className="flex flex-col">
                       <span className="block text-sm font-medium text-foreground">Outpass</span>
                       <span className="block text-xs text-muted-foreground mt-1">Few hours, return same day</span>
                     </span>
                   </label>
                   <label className={`relative flex cursor-pointer rounded-xl border p-4 transition-all ${formData.type === 'Leave' ? 'bg-primary/5 border-primary ring-2 ring-primary/20' : 'bg-background/50 border-input hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                     <input type="radio" name="type" className="sr-only" checked={formData.type === 'Leave'} onChange={() => setFormData({...formData, type: 'Leave'})} />
                     <span className="flex flex-col">
                       <span className="block text-sm font-medium text-foreground">Night Leave</span>
                       <span className="block text-xs text-muted-foreground mt-1">Overnight stay outside</span>
                     </span>
                   </label>
                 </div>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departure Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input type="datetime-local" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Return Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input type="datetime-local" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" required />
                  </div>
                </div>
             </div>

             <div className="space-y-2">
                 <label className="text-sm font-medium">Destination Details</label>
                 <div className="relative">
                   <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                   <input type="text" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" placeholder="City, Area or Relative's Address" required />
                 </div>
             </div>

             <div className="space-y-2">
                 <label className="text-sm font-medium">Reason for Leave</label>
                 <div className="relative">
                   <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                   <textarea rows={3} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none" placeholder="Elaborate briefly..." required />
                 </div>
             </div>

             <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="w-full py-3 mt-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2"
              >
                 {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                 ) : showSuccess ? (
                    'Application Submitted!'
                 ) : (
                    <><Send className="w-4 h-4" /> Send Request</>
                 )}
              </button>
          </form>
        </div>

        <div className="space-y-6">
           <div className="glass-card p-6 rounded-3xl border-amber-500/20 bg-amber-500/5">
             <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium mb-2">
               <AlertTriangle className="w-5 h-5" />
               Hostel Guidelines
             </div>
             <ul className="text-sm text-amber-700/80 dark:text-amber-500/80 space-y-2 list-disc list-inside">
               <li>Outpasses must be submitted 2 hours prior.</li>
               <li>Night leaves require parental consent verification.</li>
               <li>Late returns will incur a strike on your profile.</li>
             </ul>
           </div>

           <div className="glass-card p-6 rounded-3xl">
             <h3 className="font-heading font-semibold mb-4">Past Requests</h3>
             
             <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-background border border-border">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-sm font-bold">Outpass</span>
                     <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">Approved</span>
                   </div>
                   <div className="text-xs text-muted-foreground flex items-center gap-2">
                     <Calendar className="w-3 h-3" /> Today, 2:00 PM
                   </div>
                </div>

                <div className="p-4 rounded-2xl bg-background border border-border">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-sm font-bold">Night Leave</span>
                     <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-medium">Rejected</span>
                   </div>
                   <div className="text-xs text-muted-foreground flex items-center gap-2">
                     <Calendar className="w-3 h-3" /> 10 Mar 2026
                   </div>
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  )
}

import { useState } from 'react'
import { Plus, MessageSquare, AlertCircle, Clock, CheckCircle2 } from 'lucide-react'

export default function StudentComplaints() {
  const [complaintText, setComplaintText] = useState('')
  const [category, setCategory] = useState('Maintenance')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit
    setComplaintText('')
  }

  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
      
      <div className="lg:col-span-2 space-y-8">
        <div className="glass-card p-6 md:p-8 rounded-3xl">
           <h2 className="text-2xl font-heading font-bold mb-6">Raise a Complaint</h2>
           <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <div className="flex gap-4">
                  {['Maintenance', 'Cleaning', 'Noise', 'Other'].map(cat => (
                     <label key={cat} className={`flex-1 flex cursor-pointer items-center justify-center p-3 rounded-xl border text-sm font-medium transition-all ${category === cat ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-background hover:bg-slate-50 dark:hover:bg-slate-900 border-input'}`}>
                       <input type="radio" className="sr-only" checked={category === cat} onChange={() => setCategory(cat)} />
                       {cat}
                     </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  rows={4} 
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  className="w-full p-4 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
                  placeholder="Explain the issue in detail..."
                  required
                />
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                 <Plus className="w-5 h-5" /> Submit Complaint
              </button>
           </form>
        </div>
      </div>

      <div className="space-y-6">
         <div className="glass-card p-6 rounded-3xl sticky top-24">
            <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
               <MessageSquare className="w-5 h-5 text-primary" /> Active Tickets
            </h3>
            
            <div className="space-y-4">
               {/* Ticket Card */}
               <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 px-2 py-0.5 bg-amber-500/10 rounded-full">Maintenance</span>
                    <span className="text-xs font-mono text-muted-foreground">#1058</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2">Leaking sink in bathroom</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> Reported 2 days ago
                  </div>
               </div>

               {/* Ticket Card */}
               <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded-full">Cleaning</span>
                    <span className="text-xs font-mono text-muted-foreground">#1042</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-2">Corridor needs sweeping</h4>
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-500 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Resolved yesterday
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  )
}

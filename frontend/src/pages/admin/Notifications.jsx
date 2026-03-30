import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Megaphone, Clock, Users, ShieldAlert, CheckCircle2 } from 'lucide-react'

const initialHistory = [
  { id: 1, title: 'Server Maintenance', desc: 'The hostel WiFi will be down from 2 AM to 4 AM tonight.', audience: 'All Residents', type: 'Warning', time: 'Yesterday, 14:00' },
  { id: 2, title: 'New Cleaning Protocol', desc: 'Staff must ensure deep cleaning of all common areas every weekend.', audience: 'Staff Only', type: 'Info', time: 'Mon, 09:15' },
  { id: 3, title: 'Rent Reminder', desc: 'Please clear your pending dues before the 5th to avoid late fees.', audience: 'All Residents', type: 'Alert', time: '01 Nov, 10:00' }
]

export default function AdminNotifications() {
  const [history, setHistory] = useState(initialHistory)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [audience, setAudience] = useState('All Residents')
  const [type, setType] = useState('Info')
  const [isSending, setIsSending] = useState(false)

  const handleBroadcast = (e) => {
    e.preventDefault()
    if (!title || !desc) return
    setIsSending(true)
    
    setTimeout(() => {
      setHistory([{
         id: Date.now(),
         title,
         desc,
         audience,
         type,
         time: 'Just now'
      }, ...history])
      setTitle('')
      setDesc('')
      setIsSending(false)
    }, 800)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Broadcast Notifications</h2>
            <p className="text-sm text-muted-foreground">Send real-time alerts to staff and residents.</p>
         </div>
       </div>

       <div className="grid lg:grid-cols-2 gap-8">
         {/* Composer Panel */}
         <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden h-fit">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-10 -mt-10" />
            
            <h3 className="text-lg font-heading font-bold mb-6 flex items-center gap-2 relative z-10">
               <Megaphone className="w-5 h-5 text-primary" /> New Broadcast
            </h3>
            
            <form onSubmit={handleBroadcast} className="space-y-6 relative z-10">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject Line</label>
                  <input 
                     value={title} onChange={e => setTitle(e.target.value)}
                     className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                     placeholder="e.g., Emergency Water Cut"
                     required
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message Body</label>
                  <textarea 
                     value={desc} onChange={e => setDesc(e.target.value)}
                     rows={4}
                     className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                     placeholder="Type your announcement here..."
                     required
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Audience</label>
                     <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                        <option>All Residents</option>
                        <option>Staff Only</option>
                        <option>Block A Only</option>
                        <option>Block B Only</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Alert Type</label>
                     <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                        <option>Info</option>
                        <option>Warning</option>
                        <option>Alert</option>
                     </select>
                  </div>
               </div>

               <button disabled={isSending} type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-4 shadow-xl shadow-primary/20 disabled:opacity-70 disabled:animate-pulse">
                  {isSending ? 'Transmitting...' : <><Send className="w-4 h-4" /> Send Broadcast Now</>}
               </button>
            </form>
         </div>

         {/* History Panel */}
         <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold flex items-center gap-2">
                   Broadcast History
                </h3>
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-muted-foreground rounded-lg">{history.length} Sent</span>
             </div>

             <div className="relative border-l-2 border-border/50 ml-4 space-y-8 pb-4">
               <AnimatePresence>
                  {history.map((item, idx) => (
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        key={item.id} className="relative pl-6"
                     >
                        {/* Timeline dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center ${
                           item.type === 'Info' ? 'bg-primary' : item.type === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'
                        }`}>
                           {idx === 0 && <span className="absolute w-6 h-6 rounded-full bg-primary/20 animate-ping" />}
                        </div>

                        <div className="glass-card p-5 rounded-2xl hover:shadow-lg transition-all group">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> {item.time}
                              </span>
                           </div>
                           <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                           
                           <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
                                 <Users className="w-3.5 h-3.5" /> {item.audience}
                              </div>
                              <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${
                                 item.type === 'Info' ? 'text-primary bg-primary/10' : item.type === 'Warning' ? 'text-amber-500 bg-amber-500/10' : 'text-rose-500 bg-rose-500/10'
                              }`}>
                                 {item.type === 'Alert' ? <ShieldAlert className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />} {item.type}
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
             </div>
         </div>
       </div>
    </div>
  )
}

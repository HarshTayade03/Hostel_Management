import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Megaphone, AlertCircle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react'
import api from '@/lib/api'

export default function StaffNotifications() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
     try {
        const { data } = await api.get('/notifications')
        // Filter out notifications strictly for students if desired, or show all. The admin currently sets audience to 'All Residents' or 'Staff Only'. 
        // For now, Staff sees 'All Residents' and 'Staff Only'
        const relevant = data.data.notifications.filter(n => n.audience !== 'Students Only')
        setHistory(relevant)
     } catch (err) {
        console.error('Failed to fetch notifications', err)
     } finally {
        setLoading(false)
     }
  }

  useEffect(() => {
     fetchNotifications()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Notice Board</h2>
            <p className="text-sm text-muted-foreground">Recent announcements and important updates from administration.</p>
         </div>
       </div>

       <div className="glass-card p-6 md:p-8 rounded-3xl">
          {loading ? (
             <div className="text-center py-12 text-muted-foreground">Loading announcements...</div>
          ) : history.length === 0 ? (
             <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
                 <CheckCircle2 className="w-12 h-12 mb-3 text-emerald-500 opacity-80" />
                 <h3 className="font-heading text-lg font-medium text-foreground">You're all caught up!</h3>
                 <p>No new announcements at this time.</p>
             </div>
          ) : (
             <div className="space-y-6 border-l-2 border-border/50 ml-4">
                <AnimatePresence>
                  {history.map((item, idx) => (
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        key={item._id} className="relative pl-6"
                     >
                        {/* Timeline dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center ${
                           item.type === 'Info' ? 'bg-primary' : item.type === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'
                        }`}>
                           {idx === 0 && <span className="absolute w-6 h-6 rounded-full bg-primary/20 animate-ping" />}
                        </div>

                         <div className="glass-card p-5 rounded-2xl hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-3 border-b border-border/50 pb-3">
                               <div className="flex items-center gap-2">
                                  {item.type === 'Info' ? <Info className="w-4 h-4 text-primary" /> : 
                                   item.type === 'Warning' ? <AlertCircle className="w-4 h-4 text-amber-500" /> : 
                                   <ShieldAlert className="w-4 h-4 text-rose-500" />}
                                  <h4 className="font-heading font-bold text-foreground">{item.title}</h4>
                               </div>
                               <span className="text-[10px] uppercase font-bold text-muted-foreground bg-background px-2 py-1 rounded-md">{item.time || new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            
                            <p className="text-sm text-foreground leading-relaxed mb-4">{item.desc}</p>
                            
                            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                               <span className="text-muted-foreground flex items-center gap-1.5">
                                 <Megaphone className="w-3 h-3" /> Audience: <span className="text-primary">{item.audience}</span>
                               </span>
                               <span className={`${
                                  item.type === 'Info' ? 'text-primary' : item.type === 'Warning' ? 'text-amber-500' : 'text-rose-500'
                               }`}>
                                  {item.type}
                               </span>
                            </div>
                         </div>
                     </motion.div>
                  ))}
                </AnimatePresence>
             </div>
          )}
       </div>
    </div>
  )
}

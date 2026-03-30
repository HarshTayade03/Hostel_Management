import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, MessageSquare, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

const mockComplaints = [
  { id: 'TKT-1042', student: 'Alex Johnson', room: 'A-101', category: 'Maintenance', priority: 'High', status: 'Pending', desc: 'Leaking sink in the bathroom causing water pool', time: '2 hours ago' },
  { id: 'TKT-1043', student: 'Maria Garcia', room: 'B-205', category: 'Cleaning', priority: 'Medium', status: 'In Progress', desc: 'Corridor outside my room needs deep cleaning', time: '5 hours ago' },
  { id: 'TKT-1044', student: 'James Smith', room: 'A-102', category: 'Noise', priority: 'Low', status: 'Resolved', desc: 'Loud music from A-103 during study hours', time: 'Yesterday' },
  { id: 'TKT-1045', student: 'William Brown', room: 'C-305', category: 'Maintenance', priority: 'High', status: 'Pending', desc: 'Air conditioning not cooling properly', time: 'Just now' },
]

export default function StaffComplaints() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const handleStatusChange = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
  }

  const filtered = complaints.filter(c => {
    const matchesFilter = filter === 'All' || c.status === filter
    const matchesSearch = c.student.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Complaint Queue</h2>
            <p className="text-sm text-muted-foreground">Manage and resolve tenant issues efficiently.</p>
         </div>
         
         <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <input 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search tickets or names"
                  className="pl-9 pr-4 py-2 w-full rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm"
               />
            </div>
            <div className="flex items-center gap-2 bg-background border border-border rounded-xl p-1 shrink-0 overflow-x-auto">
               {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-primary text-primary-foreground shadow shadow-primary/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground'}`}
                  >
                    {f}
                  </button>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <AnimatePresence>
            {filtered.map(ticket => (
              <motion.div 
                 key={ticket.id}
                 layout
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className={`glass-card flex flex-col p-6 rounded-3xl transition-all border-l-4 ${
                   ticket.priority === 'High' ? 'border-l-rose-500' :
                   ticket.priority === 'Medium' ? 'border-l-amber-500' :
                   'border-l-emerald-500'
                 }`}
              >
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold text-muted-foreground">{ticket.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                       ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' :
                       ticket.status === 'In Progress' ? 'bg-primary/10 text-primary' :
                       'bg-rose-500/10 text-rose-600 dark:text-rose-500'
                    }`}>
                       {ticket.status}
                    </span>
                 </div>

                 <div className="mb-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-foreground">{ticket.category}</span>
                       <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {ticket.priority}
                       </span>
                    </div>
                    <p className="font-medium text-sm leading-relaxed text-foreground">{ticket.desc}</p>
                 </div>

                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-4 text-xs flex justify-between items-center text-muted-foreground">
                    <div className="font-medium text-foreground">{ticket.student}</div>
                    <div className="font-mono">{ticket.room}</div>
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {ticket.time}
                    </span>
                    
                    {ticket.status !== 'Resolved' && (
                       <select 
                         className="text-xs bg-background border border-border rounded-lg px-2 py-1 font-medium text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer"
                         value={ticket.status}
                         onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                       >
                         <option value="Pending">Pending</option>
                         <option value="In Progress">In Progress</option>
                         <option value="Resolved">Resolved</option>
                       </select>
                    )}
                    {ticket.status === 'Resolved' && (
                       <div className="text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                          <CheckCircle2 className="w-3 h-3" /> Closed
                       </div>
                    )}
                 </div>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {filtered.length === 0 && (
         <div className="text-center py-20 flex flex-col items-center">
           <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
             <MessageSquare className="w-8 h-8 opacity-50" />
           </div>
           <h3 className="text-xl font-heading font-medium mb-2">No complaints found</h3>
           <p className="text-muted-foreground">Queue is clear for this filter.</p>
         </div>
      )}
    </div>
  )
}

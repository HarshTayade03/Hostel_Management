import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, MessageSquare, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import api from '@/lib/api'

export default function StaffComplaints() {
  const [complaints, setComplaints] = useState([])
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchComplaints = async () => {
     try {
        const { data } = await api.get('/complaints')
        setComplaints(data.data.complaints)
     } catch (err) {
        console.error('Error fetching complaints:', err)
     }
  }

  useEffect(() => {
     fetchComplaints()
  }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/complaints/${id}`, { status: newStatus.toUpperCase() })
      setComplaints(prev => prev.map(c => c._id === id ? { ...c, status: newStatus.toUpperCase() } : c))
    } catch(err) {
      console.error('Error updating status:', err)
    }
  }

  const filtered = complaints.filter(c => {
    // Normalise status mapping (DB stores uppercase typically)
    const normalizedStatus = c.status === 'IN_PROGRESS' ? 'In Progress' : c.status === 'RESOLVED' ? 'Resolved' : 'Pending'
    const matchesFilter = filter === 'All' || normalizedStatus === filter
    
    // Safely retrieve properties for searching
    const studentName = typeof c.student === 'object' ? (c.student?.name || '') : String(c.student || '')
    const idVal = c._id || ''
    
    const matchesSearch = studentName.toLowerCase().includes(searchQuery.toLowerCase()) || idVal.toLowerCase().includes(searchQuery.toLowerCase())
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
             {filtered.map(ticket => {
               // Normalize for frontend
               const tStatus = ticket.status === 'IN_PROGRESS' ? 'In Progress' : ticket.status === 'RESOLVED' ? 'Resolved' : 'Pending';
               const tId = ticket._id || '';
               
               return (
              <motion.div 
                 key={ticket._id}
                 layout
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className={`glass-card flex flex-col p-6 rounded-3xl transition-all border-l-4 ${
                   ticket.category === 'MAINTENANCE' ? 'border-l-rose-500' :
                   ticket.category === 'CLEANING' ? 'border-l-amber-500' :
                   'border-l-emerald-500'
                 }`}
              >
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold text-muted-foreground">{tId.substring(0,8)}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                       tStatus === 'Resolved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' :
                       tStatus === 'In Progress' ? 'bg-primary/10 text-primary' :
                       'bg-rose-500/10 text-rose-600 dark:text-rose-500'
                    }`}>
                       {tStatus}
                    </span>
                 </div>

                 <div className="mb-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-foreground">{ticket.category}</span>
                    </div>
                    <p className="font-medium text-sm leading-relaxed text-foreground">{ticket.description || ticket.desc}</p>
                 </div>

                 <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-4 text-xs flex justify-between items-center text-muted-foreground">
                    <div className="font-medium text-foreground">{ticket.studentId?.name || ticket.student}</div>
                    <div className="font-mono">{ticket.studentId?.roomNumber || ticket.room}</div>
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {new Date(ticket.createdAt || ticket.time).toLocaleDateString()}
                    </span>
                    
                    {tStatus !== 'Resolved' && (
                       <select 
                         className="text-xs bg-background border border-border rounded-lg px-2 py-1 font-medium text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer"
                         value={tStatus}
                         onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                       >
                         <option value="Pending">Pending</option>
                         <option value="In Progress">In Progress</option>
                         <option value="Resolved">Resolved</option>
                       </select>
                    )}
                    {tStatus === 'Resolved' && (
                       <div className="text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                          <CheckCircle2 className="w-3 h-3" /> Closed
                       </div>
                    )}
                 </div>
              </motion.div>
            )})}
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

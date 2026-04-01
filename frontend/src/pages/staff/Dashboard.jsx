import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, MessageSquarePlus, Home, Clock } from 'lucide-react'
import api from '@/lib/api'

function TaskCard({ title, priority, location, time }) {
  return (
    <div className="glass-card p-4 rounded-2xl flex justify-between items-start transition-all hover:scale-[1.02]">
      <div>
         <div className="flex items-center gap-2 mb-1">
           <h4 className="font-heading font-semibold">{title}</h4>
           <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
             priority === 'High' ? 'bg-rose-500/10 text-rose-500' :
             priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
             'bg-emerald-500/10 text-emerald-500'
           }`}>{priority}</span>
         </div>
         <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1"><Home className="w-3 h-3" /> {location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {time}</span>
         </div>
      </div>
      <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-colors">
         <CheckSquare className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function StaffDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsRes = await api.get('/complaints')
        setComplaints(complaintsRes.data.data.complaints || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  const openComplaints = complaints.filter(c => c.status !== 'RESOLVED')

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 text-primary"><CheckSquare className="w-6 h-6" /></div>
          <h3 className="text-3xl font-heading font-bold">{openComplaints.length}</h3>
          <p className="text-sm font-medium text-muted-foreground">Open Complaints</p>
        </div>
        <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center mb-3 text-rose-500"><MessageSquarePlus className="w-6 h-6" /></div>
          <h3 className="text-3xl font-heading font-bold">{complaints.length}</h3>
          <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
        </div>
        <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3 text-emerald-500"><Home className="w-6 h-6" /></div>
          <h3 className="text-3xl font-heading font-bold">{complaints.filter(c => c.status === 'RESOLVED').length}</h3>
          <p className="text-sm font-medium text-muted-foreground">Resolved Complaints</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <div className="glass-card p-6 md:p-8 rounded-3xl">
           <div className="mb-6 flex justify-between items-center">
             <div>
               <h3 className="text-xl font-heading font-semibold">Today's Tasks</h3>
               <p className="text-sm text-muted-foreground">Assigned to you</p>
             </div>
             <button className="text-sm font-medium text-primary hover:underline">View All</button>
           </div>
           
           <div className="space-y-4">
              {openComplaints.length > 0 ? openComplaints.map((complaint, i) => (
                <TaskCard 
                  key={i} 
                  title={complaint.title} 
                  priority="High" 
                  location={`Hostel ${complaint.hostelId?.name || 'Unknown'}`} 
                  time={new Date(complaint.createdAt).toLocaleDateString()} 
                />
              )) : (
                <p className="text-muted-foreground">No pending tasks</p>
              )}
           </div>
         </div>
         
         <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-primary/5 to-purple-500/5">
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">Staff Announcements</h3>
            
            <div className="space-y-4">
               <div className="p-4 rounded-xl bg-background border border-border">
                 <h4 className="font-bold text-sm mb-1">New Cleaning Protocol</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">Please follow the updated sanitation guidelines provided by the admin team starting Monday.</p>
                 <div className="text-[10px] uppercase font-bold text-primary mt-2">Posted 2 hrs ago</div>
               </div>
               <div className="p-4 rounded-xl bg-background border border-border">
                 <h4 className="font-bold text-sm mb-1">Staff Meeting Reminder</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">Monthly review meeting this Friday at 4 PM in the main hall.</p>
                 <div className="text-[10px] uppercase font-bold text-primary mt-2">Posted Yesterday</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

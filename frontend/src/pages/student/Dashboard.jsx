import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Megaphone, Home, CheckCircle2 } from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'

// Basic custom card layout for clean aesthetics
function GlassWidget({ title, value, subtext, icon, gradient }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-3xl overflow-hidden glass-card shadow-lg ${gradient}`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
           {icon}
        </div>
        <div>
          <h3 className="text-3xl font-heading font-black mb-1">{value}</h3>
          <p className="text-sm font-medium text-foreground/80 mb-2">{title}</p>
          {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </div>
      </div>
    </motion.div>
  )
}

export default function StudentDashboard() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [payments, setPayments] = useState([])
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, paymentsRes, complaintsRes] = await Promise.all([
          api.get('/rooms/my-room'),
          api.get('/payments/my-transactions'),
          api.get('/complaints')
        ])
        
        setRoom(roomRes.data.data.room)
        setPayments(paymentsRes.data.data.payments)
        setComplaints(complaintsRes.data.data.complaints)
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

  // Calculate pending payments
  const pendingPayments = payments.filter(p => p.status === 'PENDING')
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0)

  // Recent activities from payments and complaints
  const activities = [
    ...payments.slice(0, 2).map(p => ({
      time: new Date(p.createdAt).toLocaleDateString(),
      desc: `Payment ${p.status.toLowerCase()}: ₹${p.amount}`,
      status: p.status === 'SUCCESS' ? 'primary' : 'amber'
    })),
    ...complaints.slice(0, 1).map(c => ({
      time: new Date(c.createdAt).toLocaleDateString(),
      desc: `Complaint #${c._id.slice(-4)} ${c.status.toLowerCase()}`,
      status: c.status === 'RESOLVED' ? 'emerald' : 'amber'
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time))

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassWidget 
           title="Next Due Date" 
           value={pendingPayments.length > 0 ? new Date(pendingPayments[0].createdAt).toLocaleDateString() : "No dues"} 
           subtext={totalPending > 0 ? `₹${totalPending} Pending` : "All paid"} 
           icon={<CreditCard className="w-8 h-8 text-rose-500" />} 
           gradient="border-t-rose-500/50"
        />
        <GlassWidget 
           title="Room Status" 
           value={room ? `${room.hostelId.name}, ${room.roomNumber}` : "Not allocated"} 
           subtext={room ? `Floor ${room.floor} • ${room.capacity}-Bed` : ""} 
           icon={<Home className="w-8 h-8 text-primary" />} 
           gradient="border-t-primary/50"
        />
        <GlassWidget 
           title="Open Complaints" 
           value={complaints.filter(c => c.status !== 'RESOLVED').length} 
           subtext="Pending resolution" 
           icon={<CheckCircle2 className="w-8 h-8 text-emerald-500" />} 
           gradient="border-t-emerald-500/50"
        />
        <GlassWidget 
           title="Recent Notice" 
           value="System" 
           subtext="Welcome to HostelLite" 
           icon={<Megaphone className="w-8 h-8 text-amber-500" />} 
           gradient="border-t-amber-500/50"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl">
           <h3 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
             Recent Activity
           </h3>
           <div className="space-y-6">
              {activities.length > 0 ? activities.map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full bg-${act.status === 'primary' ? 'primary' : act.status === 'emerald' ? 'emerald-500' : 'amber-500'} ring-4 ring-background z-10`} />
                    {i !== activities.length - 1 && <div className="w-[1px] h-full bg-border mt-1 relative -top-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-sm font-medium">{act.desc}</div>
                    <div className="text-xs text-muted-foreground mt-1">{act.time}</div>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground">No recent activity</p>
              )}
           </div>
         </div>
         
         <div className="glass-card p-6 md:p-8 rounded-3xl border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="text-lg font-heading font-semibold mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground mb-6">Need something? Jump right to it.</p>
            
            <div className="space-y-3">
               <button onClick={() => navigate('/student/leave')} className="w-full text-left px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all font-medium text-sm">
                 Apply for Leave / Outpass
               </button>
               <button onClick={() => navigate('/student/complaints')} className="w-full text-left px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all font-medium text-sm">
                 Raise new complaint
               </button>
               <button onClick={() => navigate('/student/fees')} className="w-full text-left px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all font-medium text-sm">
                 Pay outstanding fees
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}

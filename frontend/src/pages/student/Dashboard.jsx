import { motion } from 'framer-motion'
// Removed unused import for shadcn cards
import { CreditCard, Megaphone, Home, CheckCircle2 } from 'lucide-react'

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
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassWidget 
           title="Next Due Date" 
           value="15 Oct" 
           subtext="$450 Pending Rent" 
           icon={<CreditCard className="w-8 h-8 text-rose-500" />} 
           gradient="border-t-rose-500/50"
        />
        <GlassWidget 
           title="Room Status" 
           value="Block B, 302" 
           subtext="Shared (2-Bed) • Good condition" 
           icon={<Home className="w-8 h-8 text-primary" />} 
           gradient="border-t-primary/50"
        />
        <GlassWidget 
           title="Open Complaints" 
           value="0" 
           subtext="All issues resolved" 
           icon={<CheckCircle2 className="w-8 h-8 text-emerald-500" />} 
           gradient="border-t-emerald-500/50"
        />
        <GlassWidget 
           title="Recent Notice" 
           value="Water Main" 
           subtext="Maintenance tomorrow 10AM" 
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
              {[
                { time: "Today, 09:41 AM", desc: "Outpass approved by Warden", status: "success" },
                { time: "Yesterday", desc: "Rent payment $450 processed", status: "primary" },
                { time: "12 Mar 2026", desc: "Complaint #1042 resolved by maintenance", status: "emerald" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full bg-${act.status === 'primary' ? 'primary' : act.status === 'success' ? 'amber-500' : 'emerald-500'} ring-4 ring-background z-10`} />
                    {i !== 2 && <div className="w-[1px] h-full bg-border mt-1 relative -top-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-sm font-medium">{act.desc}</div>
                    <div className="text-xs text-muted-foreground mt-1">{act.time}</div>
                  </div>
                </div>
              ))}
           </div>
         </div>
         
         <div className="glass-card p-6 md:p-8 rounded-3xl border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="text-lg font-heading font-semibold mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground mb-6">Need something? Jump right to it.</p>
            
            <div className="space-y-3">
               <button className="w-full text-left px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all font-medium text-sm">
                 Apply for Leave / Outpass
               </button>
               <button className="w-full text-left px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all font-medium text-sm">
                 Raise new complaint
               </button>
               <button className="w-full text-left px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all font-medium text-sm">
                 Pay outstanding fees
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}

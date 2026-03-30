import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Clock, AlertTriangle, AlertCircle, Filter } from 'lucide-react'

const tasksInit = [
  { id: 1, title: 'Fix Leaky Faucet', room: 'A-302', priority: 'High', status: 'Pending', time: 'Today, 2:00 PM' },
  { id: 2, title: 'Deep Clean Corridors', room: 'Block C (all)', priority: 'Medium', status: 'In Progress', time: 'Today, 10:00 AM' },
  { id: 3, title: 'Replace Window Screen', room: 'B-114', priority: 'Low', status: 'Completed', time: 'Yesterday' },
  { id: 4, title: 'Sanitize Washrooms', room: 'A-Ground', priority: 'High', status: 'Pending', time: 'Tomorrow, 8:00 AM' },
]

export default function StaffTasks() {
  const [tasks, setTasks] = useState(tasksInit)
  const [filter, setFilter] = useState('All')

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
      }
      return t
    }))
  }

  const filteredTasks = tasks.filter(t => filter === 'All' || t.status === filter)

  return (
    <div className="max-w-6xl mx-auto">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl font-heading font-bold">Task Management</h2>
          <div className="flex items-center gap-2 bg-background border border-border rounded-xl p-1">
             {['All', 'Pending', 'In Progress', 'Completed'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-primary text-white shadow shadow-primary/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground'}`}
                >
                  {f}
                </button>
             ))}
          </div>
       </div>

       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <motion.div 
               key={task.id}
               layout
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className={`glass-card p-6 rounded-3xl transition-all border-l-[4px] ${
                 task.priority === 'High' ? 'border-l-rose-500' :
                 task.priority === 'Medium' ? 'border-l-amber-500' :
                 'border-l-emerald-500'
               }`}
            >
               <div className="flex justify-between items-start mb-4">
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                     task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' :
                     task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500' :
                     'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                  }`}>
                     {task.status}
                  </div>
                  
                  <button 
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border text-transparent hover:border-emerald-500 hover:text-emerald-500'
                    }`}
                  >
                     <CheckSquare className="w-4 h-4" />
                  </button>
               </div>

               <h3 className={`text-lg font-semibold mb-2 ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>
                 {task.title}
               </h3>
               
               <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${task.priority === 'High' ? 'text-rose-500' : ''}`} /> 
                    {task.priority} Priority
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {task.time}
                  </div>
                  <div className="flex items-center gap-2 font-medium text-foreground bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-lg mt-4">
                    Location: {task.room}
                  </div>
               </div>
            </motion.div>
          ))}
       </div>
       
       {filteredTasks.length === 0 && (
         <div className="text-center py-20">
           <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
             <CheckSquare className="w-8 h-8" />
           </div>
           <h3 className="text-xl font-heading font-medium mb-2">No tasks found</h3>
           <p className="text-muted-foreground">You're all caught up for this filter.</p>
         </div>
       )}
    </div>
  )
}

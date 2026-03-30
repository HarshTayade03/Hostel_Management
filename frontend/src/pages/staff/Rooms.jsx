import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react'

// Generate mock rooms (3 floors, 6 rooms each)
const generateMockRooms = () => {
  const rooms = []
  for (let floor = 1; floor <= 3; floor++) {
    for (let i = 1; i <= 6; i++) {
       // Randomize status
       const rand = Math.random()
       const status = rand > 0.8 ? 'Needs Cleaning' : (rand > 0.6 ? 'Maintenance' : 'Clean')
       rooms.push({ id: `A-${floor}0${i}`, floor, status, type: i % 2 === 0 ? 'Shared' : 'Single' })
    }
  }
  return rooms
}

const mockRooms = generateMockRooms()

export default function StaffRooms() {
  const [rooms, setRooms] = useState(mockRooms)
  const [selectedBlock, setSelectedBlock] = useState('Block A')

  const toggleStatus = (id) => {
    setRooms(prev => prev.map(r => {
       if (r.id === id) {
          if (r.status === 'Needs Cleaning') return { ...r, status: 'Clean' }
          if (r.status === 'Clean') return { ...r, status: 'Maintenance' }
          return { ...r, status: 'Needs Cleaning' }
       }
       return r
    }))
  }

  // Group by floors
  const floors = [1, 2, 3]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Room Maintenance</h2>
            <p className="text-sm text-muted-foreground">Manage cleaning and maintenance schedules per block.</p>
         </div>
         
         <div className="flex items-center gap-2 bg-background border border-border rounded-xl p-1 shrink-0 overflow-x-auto">
            {['Block A', 'Block B', 'Block C'].map(b => (
               <button 
                 key={b}
                 onClick={() => setSelectedBlock(b)}
                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedBlock === b ? 'bg-primary text-primary-foreground shadow shadow-primary/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground'}`}
               >
                 {b}
               </button>
            ))}
         </div>
       </div>

       <div className="grid lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-8">
             {floors.map(floor => (
                <div key={floor} className="glass-card p-6 md:p-8 rounded-3xl">
                   <h3 className="text-lg font-heading font-bold mb-6 flex items-center gap-2 border-b border-border/50 pb-4">
                      Floor {floor} Overview
                   </h3>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                     {rooms.filter(r => r.floor === floor).map(room => (
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => toggleStatus(room.id)}
                           key={room.id}
                           className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                              room.status === 'Clean' ? 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/50' :
                              room.status === 'Needs Cleaning' ? 'border-rose-500/40 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:border-rose-500' :
                              'border-amber-500/40 bg-amber-500/5 hover:border-amber-500'
                           }`}
                        >
                           {room.status === 'Clean' && <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />}
                           {room.status === 'Needs Cleaning' && <Sparkles className="w-6 h-6 text-rose-500 mb-2" />}
                           {room.status === 'Maintenance' && <AlertTriangle className="w-6 h-6 text-amber-500 mb-2" />}
                           <div className="font-mono font-bold text-foreground">{room.id}</div>
                           <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">{room.type}</div>
                        </motion.button>
                     ))}
                   </div>
                </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="glass-card p-6 rounded-3xl sticky top-24">
                <h4 className="font-heading font-semibold mb-4 text-lg">Legend & Stats</h4>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-500">
                         <ShieldCheck className="w-4 h-4" /> Clean
                      </div>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-500">{rooms.filter(r => r.status === 'Clean').length}</div>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-500">
                         <Sparkles className="w-4 h-4" /> Needs Cleaning
                      </div>
                      <div className="font-mono font-bold text-rose-600 dark:text-rose-500">{rooms.filter(r => r.status === 'Needs Cleaning').length}</div>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-500">
                         <AlertTriangle className="w-4 h-4" /> Maintenance
                      </div>
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-500">{rooms.filter(r => r.status === 'Maintenance').length}</div>
                   </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/50 text-xs text-muted-foreground leading-relaxed">
                   <p className="mb-2"><strong className="text-foreground">Instructions:</strong> Tap any room tile on the left to manually override and cycle its current maintenance status.</p>
                </div>
             </div>
          </div>
       </div>

    </div>
  )
}

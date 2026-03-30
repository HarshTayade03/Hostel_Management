import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, BedDouble, ArrowRight, UserPlus, Info } from 'lucide-react'

// Generate mock room data for allocation map
const generateMockRooms = () => {
  const rooms = []
  for (let i = 1; i <= 10; i++) {
     const isOccupied = Math.random() > 0.4
     rooms.push({ 
       id: `A-1${i < 10 ? '0'+i : i}`, 
       type: i % 2 === 0 ? 'Shared' : 'Single',
       capacity: i % 2 === 0 ? 2 : 1,
       occupied: isOccupied ? (i % 2 === 0 ? Math.floor(Math.random() * 2) + 1 : 1) : 0,
       tenants: isOccupied ? ['ST-1002'] : []
     })
  }
  return rooms
}

const roomsData = generateMockRooms()

export default function AdminRooms() {
  const [selectedBlock, setSelectedBlock] = useState('Block A')
  const [selectedFloor, setSelectedFloor] = useState('Floor 1')

  return (
    <div className="max-w-6xl mx-auto space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Room Allocation</h2>
            <p className="text-sm text-muted-foreground">Manage bed assignments and capacity visually.</p>
         </div>
         
         <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1 bg-background border border-border rounded-xl p-1 shrink-0">
               {['Block A', 'Block B', 'Block C'].map(b => (
                  <button 
                    key={b}
                    onClick={() => setSelectedBlock(b)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedBlock === b ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {b}
                  </button>
               ))}
            </div>
            <div className="flex items-center gap-1 bg-background border border-border rounded-xl p-1 shrink-0">
               {['Floor 1', 'Floor 2', 'Floor 3'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setSelectedFloor(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedFloor === f ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-black shadow' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {f}
                  </button>
               ))}
            </div>
         </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-heading font-bold flex items-center gap-2">
                   {selectedBlock} - {selectedFloor}
                </h3>
                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500" /> Available</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500" /> Partially Full</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800 border border-border" /> Full</div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {roomsData.map(room => {
                  const isFull = room.occupied === room.capacity
                  const isEmpty = room.occupied === 0
                  const isPartial = !isFull && !isEmpty

                  return (
                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        key={room.id}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                           isEmpty ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60' :
                           isPartial ? 'border-amber-500/40 bg-amber-500/5 hover:border-amber-500/70' :
                           'border-border bg-slate-50 dark:bg-slate-900/50 hover:border-slate-400'
                        }`}
                     >
                        <BedDouble className={`w-6 h-6 mb-2 ${isEmpty ? 'text-emerald-500' : isPartial ? 'text-amber-500' : 'text-muted-foreground'}`} />
                        <div className="font-mono font-bold text-foreground">{room.id}</div>
                        
                        <div className="mt-2 flex gap-1">
                           {Array.from({ length: room.capacity }).map((_, i) => (
                              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < room.occupied ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
                           ))}
                        </div>
                     </motion.div>
                  )
               })}
             </div>
          </div>

          <div className="space-y-6">
             <div className="glass-card p-6 md:p-8 rounded-3xl bg-primary/5 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
                   <UserPlus className="w-5 h-5 text-primary" /> Quick Allocate
                </h4>
                
                <div className="space-y-4 relative z-10">
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Tenant</label>
                      <select className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50">
                         <option value="">Search by ID or Name...</option>
                         <option value="T-204">T-204 - Jane Doe</option>
                         <option value="T-205">T-205 - Mark Smith</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Room</label>
                      <select className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50">
                         <option value="">Select available room...</option>
                         <option value="A-101">A-101 (Single)</option>
                         <option value="A-102">A-102 (Shared, 1 Bed free)</option>
                      </select>
                   </div>
                   
                   <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/20">
                      Assign Bed <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
             </div>

             <div className="glass-card p-6 rounded-3xl border-border">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                   <Info className="w-5 h-5 shrink-0 text-amber-500" />
                   <p>Clicking on any room tile opens the detailed tenancy panel, where you can move out students or alter fee structures specific to that room.</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}

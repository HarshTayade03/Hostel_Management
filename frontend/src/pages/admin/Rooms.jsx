import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, BedDouble, ArrowRight, UserPlus, Info } from 'lucide-react'
import api from '@/lib/api'

export default function AdminRooms() {
  const [hostels, setHostels] = useState([])
  const [rooms, setRooms] = useState([])
  const [selectedBlock, setSelectedBlock] = useState('')
  const [selectedFloor, setSelectedFloor] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const [hostelsRes, roomsRes] = await Promise.all([
          api.get('/hostels'),
          api.get('/rooms')
        ])
        
        const fetchedHostels = hostelsRes.data.data.hostels || []
        const fetchedRooms = roomsRes.data.data.rooms || []
        
        setHostels(fetchedHostels)
        setRooms(fetchedRooms)
        
        if (fetchedHostels.length > 0) {
          setSelectedBlock(fetchedHostels[0]._id)
        }
        
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  useEffect(() => {
    if (selectedBlock) {
      const blockRooms = rooms.filter(r => (r.hostelId?._id || r.hostelId) === selectedBlock)
      const floors = [...new Set(blockRooms.map(r => r.floor))].sort()
      if (floors.length > 0) {
        setSelectedFloor(floors[0])
      } else {
        setSelectedFloor('')
      }
    }
  }, [selectedBlock, rooms])

  if (loading) return <div className="flex justify-center items-center h-64 text-foreground">Loading room data...</div>

  const blockRooms = rooms.filter(r => (r.hostelId?._id || r.hostelId) === selectedBlock && r.floor === selectedFloor)
  const floors = selectedBlock ? [...new Set(rooms.filter(r => (r.hostelId?._id || r.hostelId) === selectedBlock).map(r => r.floor))].sort() : []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1 text-foreground">Room Allocation</h2>
            <p className="text-sm text-muted-foreground">Manage bed assignments and capacity visually.</p>
         </div>
         
         <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {hostels.length > 0 && (
              <div className="flex items-center gap-1 bg-background border border-border rounded-xl p-1 shrink-0">
                 {hostels.map(h => (
                    <button 
                      key={h._id}
                      onClick={() => setSelectedBlock(h._id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedBlock === h._id ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground'}`}
                    >
                      {h.name}
                    </button>
                 ))}
              </div>
            )}
            
            {floors.length > 0 && (
              <div className="flex items-center gap-1 bg-background border border-border rounded-xl p-1 shrink-0">
                 {floors.map(f => (
                    <button 
                      key={f}
                      onClick={() => setSelectedFloor(f)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedFloor === f ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-black shadow' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground'}`}
                    >
                      Floor {f}
                    </button>
                 ))}
              </div>
            )}
         </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-heading font-bold flex items-center gap-2 text-foreground">
                   {hostels.find(h => h._id === selectedBlock)?.name || 'Block'} - Floor {selectedFloor || '-'}
                </h3>
                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500" /> Available</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500" /> Partially Full</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800 border border-border" /> Full</div>
                </div>
             </div>
             
             {blockRooms.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No rooms found for this floor.</div>
             ) : (
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {blockRooms.map(room => {
                  const isFull = room.status === 'FULL' || room.occupancy >= room.capacity
                  const isEmpty = room.occupancy === 0
                  const isPartial = !isFull && !isEmpty

                  return (
                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        key={room._id}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                           isEmpty ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60' :
                           isPartial ? 'border-amber-500/40 bg-amber-500/5 hover:border-amber-500/70' :
                           'border-border bg-slate-50 dark:bg-slate-900/50 hover:border-slate-400'
                        }`}
                     >
                        <BedDouble className={`w-6 h-6 mb-2 ${isEmpty ? 'text-emerald-500' : isPartial ? 'text-amber-500' : 'text-muted-foreground'}`} />
                        <div className="font-mono font-bold text-foreground">{room.roomNumber}</div>
                        
                        <div className="mt-2 flex gap-1">
                           {Array.from({ length: room.capacity }).map((_, i) => (
                              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < room.occupancy ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
                           ))}
                        </div>
                     </motion.div>
                  )
               })}
             </div>
             )}
          </div>

          <div className="space-y-6">
             <div className="glass-card p-6 md:p-8 rounded-3xl bg-primary/5 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-2 text-foreground">
                   <UserPlus className="w-5 h-5 text-primary" /> Quick Allocate
                </h4>
                
                <div className="space-y-4 relative z-10">
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Tenant</label>
                      <select className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50">
                         <option value="">Search by ID or Name...</option>
                         <option value="T-204">T-204 - Jane Doe</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Room</label>
                      <select className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50">
                         <option value="">Select available room...</option>
                         {blockRooms.filter(r => r.status !== 'FULL').map(r => (
                           <option key={r._id} value={r._id}>{r.roomNumber} ({r.capacity} Bed{r.capacity > 1 ? 's' : ''})</option>
                         ))}
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

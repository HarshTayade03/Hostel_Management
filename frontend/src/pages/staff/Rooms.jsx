import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react'
import api from '@/lib/api'

export default function StaffRooms() {
  const [hostels, setHostels] = useState([])
  const [rooms, setRooms] = useState([])
  const [selectedBlock, setSelectedBlock] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
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
    } catch (err) {
      console.error('Error fetching data for rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleStatus = async (id, currentStatus) => {
    try {
       const newStatus = currentStatus === 'MAINTENANCE' ? 'AVAILABLE' : 'MAINTENANCE'
       // Optimistic update
       setRooms(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r))
       // Real API update
       await api.patch(`/rooms/${id}`, { status: newStatus })
    } catch (err) {
       console.error('Error toggling room status:', err)
       // Rollback on error
       fetchData()
    }
  }

  if (loading) return <div className="flex justify-center items-center h-64 text-foreground">Loading rooms...</div>

  // Filter current block rooms
  const blockRooms = rooms.filter(r => {
     const hId = r.hostelId?._id || r.hostelId;
     return hId === selectedBlock;
  })
  const blockFloors = [...new Set(blockRooms.map(r => r.floor))].sort()

  return (
    <div className="max-w-6xl mx-auto space-y-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Room Maintenance</h2>
            <p className="text-sm text-muted-foreground">Manage cleaning and maintenance schedules per block.</p>
         </div>
         
         <div className="flex items-center gap-2 bg-background border border-border rounded-xl p-1 shrink-0 overflow-x-auto">
            {hostels.map(h => (
               <button 
                 key={h._id}
                 onClick={() => setSelectedBlock(h._id)}
                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedBlock === h._id ? 'bg-primary text-primary-foreground shadow shadow-primary/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground'}`}
               >
                 {h.name}
               </button>
            ))}
         </div>
       </div>

       <div className="grid lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-8">
             {blockFloors.map(floor => (
                <div key={floor} className="glass-card p-6 md:p-8 rounded-3xl">
                   <h3 className="text-lg font-heading font-bold mb-6 flex items-center gap-2 border-b border-border/50 pb-4">
                      Floor {floor} Overview
                   </h3>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                     {blockRooms.filter(r => r.floor === floor).map(room => (
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => toggleStatus(room._id, room.status)}
                           key={room._id}
                           className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                              room.status !== 'MAINTENANCE' ? 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/50' :
                              'border-amber-500/40 bg-amber-500/5 hover:border-amber-500'
                           }`}
                        >
                           {room.status !== 'MAINTENANCE' && <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />}
                           {room.status === 'MAINTENANCE' && <AlertTriangle className="w-6 h-6 text-amber-500 mb-2" />}
                           <div className="font-mono font-bold text-foreground">{room.roomNumber}</div>
                           <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">Capacity: {room.capacity}</div>
                        </motion.button>
                     ))}
                   </div>
                </div>
             ))}
             {blockFloors.length === 0 && (
                <div className="text-center text-muted-foreground py-10">No rooms available in this block.</div>
             )}
          </div>

          <div className="space-y-6">
             <div className="glass-card p-6 rounded-3xl sticky top-24">
                <h4 className="font-heading font-semibold mb-4 text-lg">Legend & Stats</h4>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-500">
                         <ShieldCheck className="w-4 h-4" /> Clean / Active
                      </div>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-500">{blockRooms.filter(r => r.status !== 'MAINTENANCE').length}</div>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-500">
                         <AlertTriangle className="w-4 h-4" /> Maintenance
                      </div>
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-500">{blockRooms.filter(r => r.status === 'MAINTENANCE').length}</div>
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

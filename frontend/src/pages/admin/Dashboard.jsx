import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Building, DollarSign, Activity } from 'lucide-react'
import api from '@/lib/api'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 2780 },
  { month: "May", revenue: 1890 },
  { month: "Jun", revenue: 2390 },
  { month: "Jul", revenue: 3490 },
]

function StatCard({ title, value, subtext, icon, trend }) {
  return (
    <div className="glass-card p-6 flex items-center justify-between">
       <div>
         <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
         <h3 className="text-3xl font-heading font-bold">{value}</h3>
         {subtext && (
           <p className={`text-xs mt-2 font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
             {subtext}
           </p>
         )}
       </div>
       <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
         {icon}
       </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [hostels, setHostels] = useState([])
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Note: Assuming we add endpoints for admin to get all data
        // For now, using existing endpoints
        const [hostelsRes, roomsRes] = await Promise.all([
          api.get('/hostels'), // Need to add this endpoint
          api.get('/rooms')
        ])
        
        setHostels(hostelsRes.data.data.hostels || [])
        setRooms(roomsRes.data.data.rooms || [])
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

  const totalCapacity = hostels.reduce((sum, h) => sum + h.totalCapacity, 0)
  const totalOccupancy = hostels.reduce((sum, h) => sum + h.currentOccupancy, 0)
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0

  const occupancyData = hostels.map(h => ({
    name: h.name,
    assigned: h.currentOccupancy,
    total: h.totalCapacity
  }))
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Capacity" value={totalCapacity} subtext={occupancyRate + "% occupied"} trend="up" icon={<Building className="w-6 h-6" />} />
        <StatCard title="Active Tenants" value={totalOccupancy} subtext={`${hostels.length} hostels`} trend="up" icon={<Users className="w-6 h-6" />} />
        <StatCard title="Total Rooms" value={rooms.length} subtext={`${rooms.filter(r => r.status === 'AVAILABLE').length} available`} trend="up" icon={<Building className="w-6 h-6" />} />
        <StatCard title="Hostels" value={hostels.length} subtext="Active facilities" trend="up" icon={<Activity className="w-6 h-6" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Revenue Chart */}
        <div className="glass-card p-6 md:p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-lg font-heading font-semibold">Revenue Overview</h3>
            <p className="text-sm text-muted-foreground">Monthly rent collections</p>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                   itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="glass-card p-6 md:p-8 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-lg font-heading font-semibold">Block Occupancy</h3>
            <p className="text-sm text-muted-foreground">Assigned vs Total Beds</p>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="assigned" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}

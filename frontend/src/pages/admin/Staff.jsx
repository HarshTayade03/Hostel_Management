import { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, ChevronDown, MoreHorizontal, UserCheck, UserX, UserPlus, Trash2, X } from 'lucide-react'
import api from '@/lib/api'

export default function AdminStaff() {
  const [data, setData] = useState([])
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  // Add Staff Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Janitor', shift: '09:00 AM - 05:00 PM', phone: '', status: 'Active' })

  const fetchStaff = async () => {
     try {
        const res = await api.get('/users?role=STAFF')
        setData(res.data.data.users)
     } catch (err) {
        console.error('Failed to fetch staff', err)
     }
  }

  useEffect(() => {
     fetchStaff()
  }, [])

  const handleDelete = async (id) => {
     try {
        await api.delete(`/users/${id}`)
        setData(data.filter(t => t._id !== id))
     } catch (err) {
        console.error('Failed to delete staff', err)
     }
  }

  const handleAddStaff = async (e) => {
     e.preventDefault()
     if(!newStaff.name || !newStaff.phone) return
     
     try {
       const res = await api.post('/users', {
         name: newStaff.name,
         role: 'STAFF', // Actually enforce this backend side or here
         phone: newStaff.phone
         // Mock additional details in real life we would save shift/role internally perhaps as metadata
       })
       setData([{ ...res.data.data.user, ...newStaff }, ...data])
       setNewStaff({ name: '', role: 'Janitor', shift: '09:00 AM - 05:00 PM', phone: '', status: 'Active' })
       setIsModalOpen(false)
     } catch (err) {
       console.error('Failed to add staff', err)
     }
  }

  const columns = [
    {
       accessorKey: '_id',
       header: 'Employee ID',
       cell: info => <span className="font-mono text-xs font-semibold">{(info.getValue() || '').substring(0,8)}</span>
    },
    {
       accessorKey: 'name',
       header: 'Full Name',
       cell: info => <span className="font-medium text-foreground">{info.getValue()}</span>
    },
    {
       accessorKey: 'role',
       header: 'Role',
       cell: info => (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
             {info.getValue()}
          </span>
       )
    },
    {
       accessorKey: 'shift',
       header: 'Shift Timing',
    },
    {
       accessorKey: 'phone',
       header: 'Contact',
    },
    {
       accessorKey: 'status',
       header: 'Status',
       cell: info => {
          const status = info.getValue()
          return (
             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 
                status === 'On Leave' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
             }`}>
                {status === 'Active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                {status}
             </span>
          )
       }
    },
    {
       id: 'actions',
       cell: (info) => (
          <div className="flex items-center justify-end gap-2 pr-4 relative group">
             <button onClick={() => handleDelete(info.row.original._id)} className="p-2 text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100" title="Remove Staff">
                <Trash2 className="w-4 h-4" />
             </button>
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-muted-foreground transition-colors group">
                <MoreHorizontal className="w-4 h-4 group-hover:text-primary" />
             </button>
          </div>
       )
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      
      {/* Modal for adding staff */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-md p-6 rounded-3xl shadow-xl border border-border relative">
               <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
               </button>
               <h3 className="text-xl font-bold font-heading mb-6 text-foreground">Add New Staff</h3>
               <form onSubmit={handleAddStaff} className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
                     <input value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground" required />
                  </div>
                  <div className="flex gap-4">
                     <div className="space-y-2 w-1/2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Role</label>
                        <select value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer">
                           <option>Chief Warden</option>
                           <option>Security</option>
                           <option>Janitor</option>
                           <option>Maintenance</option>
                        </select>
                     </div>
                     <div className="space-y-2 w-1/2">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Phone</label>
                        <input value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} placeholder="+1 555-0000" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground" required />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-muted-foreground">Shift Timing</label>
                     <select value={newStaff.shift} onChange={e => setNewStaff({...newStaff, shift: e.target.value})} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer">
                        <option>09:00 AM - 05:00 PM</option>
                        <option>06:00 AM - 06:00 PM</option>
                        <option>06:00 PM - 06:00 AM</option>
                        <option>03:00 PM - 11:00 PM</option>
                     </select>
                  </div>
                  <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl mt-4 hover:opacity-90">Verify & Add Staff</button>
               </form>
            </div>
         </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Staff Management</h2>
            <p className="text-sm text-muted-foreground">Manage employees, track shifts, and update roles.</p>
         </div>
         
         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-64">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <input 
                  value={globalFilter ?? ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                  placeholder="Search staff members..."
                  className="pl-9 pr-4 py-2 w-full rounded-full border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm"
               />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="h-10 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all shrink-0 flex items-center gap-2">
               <UserPlus className="w-4 h-4" /> Add Staff
            </button>
         </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-border/50">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
               <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                     <tr key={headerGroup.id} className="border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/50">
                        {headerGroup.headers.map(header => (
                           <th 
                              key={header.id} 
                              onClick={header.column.getToggleSortingHandler()}
                              className="px-6 py-4 font-semibold text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                           >
                              <div className="flex items-center gap-2">
                                 {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                                 {{
                                    asc: <ChevronDown className="w-4 h-4 rotate-180" />,
                                    desc: <ChevronDown className="w-4 h-4" />,
                                 }[header.column.getIsSorted()] ?? null}
                              </div>
                           </th>
                        ))}
                     </tr>
                  ))}
               </thead>
               <tbody className="divide-y divide-border/50 bg-background/20 backdrop-blur-xl">
                  {table.getRowModel().rows.map(row => (
                     <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        {row.getVisibleCells().map(cell => (
                           <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-4 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground bg-slate-50/50 dark:bg-slate-900/50">
            <div>
               Showing {table.getRowModel().rows.length} of {data.length} employees
            </div>
            <div className="flex gap-2">
               <button 
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 rounded-md border border-border bg-background hover:bg-slate-50 disabled:opacity-50 transition-colors"
               >
                  Previous
               </button>
               <button 
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 rounded-md border border-border bg-background hover:bg-slate-50 disabled:opacity-50 transition-colors"
               >
                  Next
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}

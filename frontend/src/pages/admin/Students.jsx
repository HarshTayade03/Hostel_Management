import { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, ChevronDown, MoreHorizontal, UserCheck, UserX, Trash2, X } from 'lucide-react'
import api from '@/lib/api'

export default function AdminStudents() {
  const [data, setData] = useState([])
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  
  // Add Tenant Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTenant, setNewTenant] = useState({ name: '', block: 'A', room: '', status: 'Active', balance: '$0' })

  const fetchStudents = async () => {
    try {
      const res = await api.get('/users?role=STUDENT')
      setData(res.data.data.users)
    } catch (err) {
      console.error('Failed to fetch students', err)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleDelete = async (id) => {
     try {
       await api.delete(`/users/${id}`)
       setData(data.filter(t => t._id !== id))
     } catch (err) {
       console.error('Failed to delete student', err)
     }
  }

  const handleAddTenant = async (e) => {
     e.preventDefault()
     if(!newTenant.name || !newTenant.room) return
     
     try {
       const res = await api.post('/users', {
         name: newTenant.name,
         role: 'STUDENT',
         phone: '555-5555' 
       })
       // Mock injected extra frontend properties to avoid breaking generic UI views
       setData([{ ...res.data.data.user, ...newTenant }, ...data])
       setNewTenant({ name: '', block: 'A', room: '', status: 'Active', balance: '$0' })
       setIsModalOpen(false)
     } catch (err) {
       console.error('Failed to create student', err)
     }
  }

  const columns = [
    {
       accessorKey: '_id',
       header: 'Tenant ID',
       cell: info => <span className="font-mono text-xs">#{String(info.getValue()).slice(-6)}</span>
    },
    {
       accessorKey: 'name',
       header: 'Full Name',
       cell: info => <span className="font-medium text-foreground">{info.getValue()}</span>
    },
    {
       accessorKey: 'email',
       header: 'Email',
       cell: info => <span className="text-muted-foreground text-xs">{info.getValue()}</span>
    },
    {
       accessorFn: row => row.hostelId?.name || '—',
       id: 'hostel',
       header: 'Hostel',
       cell: info => <span className="text-muted-foreground">{info.getValue()}</span>
    },
    {
       accessorKey: 'gender',
       header: 'Gender',
       cell: info => <span className="text-muted-foreground">{info.getValue()}</span>
    },
    {
       accessorKey: 'isActive',
       header: 'Status',
       cell: info => {
          const active = info.getValue()
          return (
             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
             }`}>
                {active ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                {active ? 'Active' : 'Inactive'}
             </span>
          )
       }
    },
    {
       id: 'actions',
       cell: (info) => (
          <div className="flex items-center justify-end gap-2 pr-4 relative group">
             <button onClick={() => handleDelete(info.row.original._id)} className="p-2 text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100" title="Delete Tenant">
                <Trash2 className="w-4 h-4" />
             </button>
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-muted-foreground transition-colors">
                <MoreHorizontal className="w-4 h-4" />
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
      
      {/* Modal for adding tenant */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-md p-6 rounded-3xl shadow-xl border border-border relative">
               <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
               </button>
               <h3 className="text-xl font-bold font-heading mb-6 text-foreground">Add New Tenant</h3>
               <form onSubmit={handleAddTenant} className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
                     <input value={newTenant.name} onChange={e => setNewTenant({...newTenant, name: e.target.value})} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground" required />
                  </div>
                  <div className="flex gap-4">
                     <div className="space-y-2 w-1/3">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Block</label>
                        <select value={newTenant.block} onChange={e => setNewTenant({...newTenant, block: e.target.value})} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer">
                           <option>A</option>
                           <option>B</option>
                           <option>C</option>
                        </select>
                     </div>
                     <div className="space-y-2 flex-1">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Room</label>
                        <input value={newTenant.room} onChange={e => setNewTenant({...newTenant, room: e.target.value})} placeholder="e.g. 101" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground" required />
                     </div>
                  </div>
                  <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl mt-4 hover:opacity-90">Register Tenant</button>
               </form>
            </div>
         </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Tenant Directory</h2>
            <p className="text-sm text-muted-foreground">Manage and overview all registered tenants.</p>
         </div>
         
         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-64">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <input 
                  value={globalFilter ?? ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                  placeholder="Search tenants..."
                  className="pl-9 pr-4 py-2 w-full rounded-full border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm"
               />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="h-10 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow hover:shadow-primary/20 transition-all shrink-0">
               + Add Tenant
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
               Showing {table.getRowModel().rows.length} of {data.length} records
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

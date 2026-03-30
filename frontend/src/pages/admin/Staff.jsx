import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, ChevronDown, MoreHorizontal, UserCheck, UserX, UserPlus } from 'lucide-react'

// Mock Data
const data = [
  { id: 'ADM-101', name: 'Dr. Aisha Khan', role: 'Chief Warden', shift: '09:00 AM - 05:00 PM', status: 'Active', phone: '+1 555-0101' },
  { id: 'STF-204', name: 'Marcus Chen', role: 'Security', shift: '06:00 PM - 06:00 AM', status: 'Active', phone: '+1 555-0204' },
  { id: 'STF-205', name: 'Sarah Miller', role: 'Janitor', shift: '07:00 AM - 03:00 PM', status: 'Active', phone: '+1 555-0205' },
  { id: 'STF-206', name: 'David Wilson', role: 'Maintenance', shift: '09:00 AM - 05:00 PM', status: 'On Leave', phone: '+1 555-0206' },
  { id: 'STF-207', name: 'Emily Davis', role: 'Janitor', shift: '03:00 PM - 11:00 PM', status: 'Active', phone: '+1 555-0207' },
  { id: 'STF-208', name: 'Michael Brown', role: 'Security', shift: '06:00 AM - 06:00 PM', status: 'Inactive', phone: '+1 555-0208' },
]

export default function AdminStaff() {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = [
    {
       accessorKey: 'id',
       header: 'Employee ID',
       cell: info => <span className="font-mono text-xs font-semibold">{info.getValue()}</span>
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
       cell: () => (
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-muted-foreground transition-colors group">
             <MoreHorizontal className="w-4 h-4 group-hover:text-primary" />
          </button>
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
    <div className="max-w-6xl mx-auto space-y-6">
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
            <button className="h-10 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all shrink-0 flex items-center gap-2">
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

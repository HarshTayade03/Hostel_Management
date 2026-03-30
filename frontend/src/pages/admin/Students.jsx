import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, ChevronDown, MoreHorizontal, UserCheck, UserX } from 'lucide-react'

// Mock Data
const data = [
  { id: 'ST-1001', name: 'Alex Johnson', block: 'A', room: '101', status: 'Active', balance: '$0' },
  { id: 'ST-1002', name: 'Maria Garcia', block: 'B', room: '205', status: 'Active', balance: '$450' },
  { id: 'ST-1003', name: 'James Smith', block: 'A', room: '102', status: 'Inactive', balance: '$0' },
  { id: 'ST-1004', name: 'Linda Martinez', block: 'C', room: '304', status: 'Active', balance: '$120' },
  { id: 'ST-1005', name: 'Robert Davis', block: 'B', room: '205', status: 'Active', balance: '$0' },
  { id: 'ST-1006', name: 'William Brown', block: 'C', room: '305', status: 'Active', balance: '$450' },
]

export default function AdminStudents() {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = [
    {
       accessorKey: 'id',
       header: 'Tenant ID',
       cell: info => <span className="font-mono text-xs">{info.getValue()}</span>
    },
    {
       accessorKey: 'name',
       header: 'Full Name',
       cell: info => <span className="font-medium text-foreground">{info.getValue()}</span>
    },
    {
       accessorKey: 'block',
       header: 'Block',
    },
    {
       accessorKey: 'room',
       header: 'Room',
    },
    {
       accessorKey: 'status',
       header: 'Status',
       cell: info => {
          const status = info.getValue()
          return (
             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
             }`}>
                {status === 'Active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                {status}
             </span>
          )
       }
    },
    {
       accessorKey: 'balance',
       header: 'Due Balance',
       cell: info => {
          const bal = info.getValue()
          return (
             <span className={`font-bold ${bal !== '$0' ? 'text-rose-500' : 'text-emerald-500'}`}>
                {bal}
             </span>
          )
       }
    },
    {
       id: 'actions',
       cell: () => (
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-muted-foreground transition-colors">
             <MoreHorizontal className="w-4 h-4" />
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
            <button className="h-10 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 shadow hover:shadow-primary/20 transition-all shrink-0">
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

import { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, ChevronDown, Download, IndianRupee, AlertCircle, FileText } from 'lucide-react'
import api from '@/lib/api'

export default function AdminPayments() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get('/payments/all')
        setData(res.data.data.payments)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  const columns = [
    {
       accessorKey: '_id',
       header: 'Invoice ID',
       cell: info => <span className="font-mono text-xs font-semibold">#{String(info.getValue()).slice(-6)}</span>
    },
    {
       accessorFn: row => row.studentId?.name || 'Unknown',
       id: 'student',
       header: 'Student Name',
       cell: info => <span className="font-medium text-foreground">{info.getValue()}</span>
    },
    {
       accessorKey: 'type',
       header: 'Fee Type',
       cell: info => <span className="text-muted-foreground">{String(info.getValue()).replace(/_/g,' ')}</span>
    },
    {
       accessorKey: 'amount',
       header: 'Amount',
       cell: info => (
          <span className="font-mono font-bold flex items-center">
             <IndianRupee className="w-3 h-3 mr-0.5" />{Number(info.getValue()).toLocaleString()}
          </span>
       )
    },
    {
       accessorKey: 'createdAt',
       header: 'Date',
       cell: info => new Date(info.getValue()).toLocaleDateString()
    },
    {
       accessorKey: 'status',
       header: 'Status',
       cell: info => {
          const status = info.getValue()
          return (
             <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 
                status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
             }`}>
                {status}
             </span>
          )
       }
    },
    {
       id: 'actions',
       cell: () => (
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20 group">
             <FileText className="w-3.5 h-3.5" /> View
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
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  })

  // Calculate live totals
  const totalCollected = data.filter(d => d.status === 'SUCCESS').reduce((acc, curr) => acc + curr.amount, 0)
  const totalPending = data.filter(d => d.status === 'PENDING').reduce((acc, curr) => acc + curr.amount, 0)

  if (loading) return <div className="flex justify-center items-center h-64 text-muted-foreground">Loading payment ledger...</div>

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">Payments Ledger</h2>
            <p className="text-sm text-muted-foreground">Monitor collections, generate invoices, and track dues.</p>
         </div>
         
         <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="h-10 px-6 py-2 rounded-full border border-border bg-background text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shrink-0 flex items-center gap-2">
               <Download className="w-4 h-4" /> Export CSV
            </button>
            <button className="h-10 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all shrink-0">
               + Generate Invoice
            </button>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
         <div className="glass-card p-6 flex flex-col justify-center rounded-3xl border-l-4 border-l-emerald-500">
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Total Collected</span>
            <span className="text-3xl font-heading font-bold flex items-center"><IndianRupee className="w-6 h-6 mr-1" />{totalCollected.toLocaleString()}</span>
         </div>
         <div className="glass-card p-6 flex flex-col justify-center rounded-3xl border-l-4 border-l-rose-500">
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">Outstanding Dues <AlertCircle className="w-4 h-4 text-rose-500" /></span>
            <span className="text-3xl font-heading font-bold flex items-center"><IndianRupee className="w-6 h-6 mr-1" />{totalPending.toLocaleString()}</span>
         </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-border/50">
         <div className="p-4 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50 border-b border-border/50">
            <div className="relative flex-1 max-w-sm">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <input 
                  value={globalFilter ?? ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                  placeholder="Search invoice or student..."
                  className="pl-9 pr-4 py-2 w-full rounded-2xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm"
               />
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
               <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                     <tr key={headerGroup.id} className="border-b border-border/50 bg-slate-50/20 dark:bg-slate-900/20">
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
         
         <div className="p-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground bg-slate-50/50 dark:bg-slate-900/50">
            <div>
               Showing {table.getRowModel().rows.length} of {data.length} transactions
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

import { Download, CreditCard, Clock, CheckCircle } from 'lucide-react'

export default function StudentFees() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:p-8 rounded-3xl bg-primary text-white border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <h3 className="text-xl font-heading mb-2 text-white/90">Total Payable</h3>
          <div className="text-5xl font-bold font-heading mb-6">$450.00</div>
          <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20">
             <CreditCard className="w-5 h-5" /> Pay Now
          </button>
        </div>
        
        <div className="md:col-span-2 glass-card p-6 md:p-8 rounded-3xl flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-2">Next Due Date</h3>
             <div className="text-4xl text-primary font-bold font-heading mb-4">15 Oct, 2026</div>
             <p className="text-sm text-muted-foreground flex items-center gap-2">
               <Clock className="w-4 h-4 text-amber-500" /> Payment is due in 15 days
             </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-3xl overflow-hidden">
        <h3 className="text-xl font-heading font-semibold mb-6">Payment History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider font-semibold">
                <th className="pb-4 pr-4">Invoice ID</th>
                <th className="pb-4 pr-4">Date</th>
                <th className="pb-4 pr-4">Description</th>
                <th className="pb-4 pr-4">Amount</th>
                <th className="pb-4 pr-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              <tr className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="py-4 pr-4 font-mono text-sm">#INV-2041</td>
                <td className="py-4 pr-4 text-sm whitespace-nowrap">01 Oct, 2026</td>
                <td className="py-4 pr-4 font-medium text-sm">October Rent</td>
                <td className="py-4 pr-4 font-bold text-sm">$450.00</td>
                <td className="py-4 pr-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                    <Clock className="w-3 h-3" /> Pending
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-primary hover:text-primary/70 font-medium text-sm">Pay</button>
                </td>
              </tr>
              <tr className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="py-4 pr-4 font-mono text-sm">#INV-1988</td>
                <td className="py-4 pr-4 text-sm whitespace-nowrap">01 Sep, 2026</td>
                <td className="py-4 pr-4 font-medium text-sm">September Rent</td>
                <td className="py-4 pr-4 font-bold text-sm">$450.00</td>
                <td className="py-4 pr-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3" /> Paid
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm bg-background border px-3 py-1 rounded-md">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

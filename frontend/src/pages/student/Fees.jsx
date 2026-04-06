import { useState, useEffect } from 'react'
import { Download, CreditCard, Clock, CheckCircle } from 'lucide-react'
import api from '@/lib/api'

export default function StudentFees() {
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPaying, setIsPaying] = useState(false)
  
  const fetchPayments = async () => {
    try {
      const { data } = await api.get('/payments/my-transactions')
      setPayments(data.data.payments)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  // Dynamic calculations
  const totalPaid = payments
    .filter(p => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0)
    
  const pendingPayments = payments.filter(p => p.status === 'PENDING')
  const amountDue = pendingPayments.reduce((sum, p) => sum + p.amount, 0)

  // Razorpay Handle 
  const handlePayment = async () => {
    if (amountDue === 0) return alert('No pending dues!')
    setIsPaying(true)

    try {
      // Create new fresh order from API or loop through. Here we'll create a lump sum hostel fee order for demo mapping
      const { data } = await api.post('/payments/create-order', {
        amount: amountDue,
        type: 'HOSTEL_FEE' 
      })

      const { order, paymentId } = data.data

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YourKeyID', // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: "HostelLite Payment",
        description: "Hostel Fee Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            await api.post('/payments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })
            alert('Payment Verified and Completed!')
            fetchPayments() // Refresh UI
          } catch (err) {
            alert('Verification Failed')
          }
        },
        theme: {
          color: "#0f172a"
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp1.open();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to initialize payment order. Check your Razorpay keys.';
      alert(msg);
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:p-8 rounded-3xl bg-primary text-white border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <h3 className="text-xl font-heading mb-2 text-white/90">Pending Dues</h3>
          <div className="text-5xl font-bold font-heading mb-6">₹{amountDue}</div>
          <button 
            onClick={handlePayment} 
            disabled={isPaying || amountDue === 0}
            className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20 disabled:opacity-75 disabled:cursor-not-allowed"
          >
             <CreditCard className="w-5 h-5" /> {isPaying ? 'Processing...' : 'Pay All Dues'}
          </button>
        </div>
        
        <div className="md:col-span-2 glass-card p-6 md:p-8 rounded-3xl flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-2">Total Amount Paid</h3>
             <div className="text-4xl text-emerald-500 font-bold font-heading mb-4">₹{totalPaid}</div>
             <p className="text-sm text-muted-foreground flex items-center gap-2">
               <CheckCircle className="w-4 h-4 text-emerald-500" /> Account is in good standing
             </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-3xl overflow-hidden">
        <h3 className="text-xl font-heading font-semibold mb-6">Live Payment Ledger</h3>
        
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading ledger...</div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No transactions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider font-semibold">
                  <th className="pb-4 pr-4">Log ID</th>
                  <th className="pb-4 pr-4">Date</th>
                  <th className="pb-4 pr-4">Type</th>
                  <th className="pb-4 pr-4">Amount</th>
                  <th className="pb-4 pr-4">Status</th>
                  <th className="pb-4">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {payments.map(payment => (
                  <tr key={payment._id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 pr-4 font-mono text-sm max-w-[100px] truncate" title={payment._id}>#{payment._id.slice(-6)}</td>
                    <td className="py-4 pr-4 text-sm whitespace-nowrap">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 pr-4 font-medium text-sm">{payment.type.replace('_', ' ')}</td>
                    <td className="py-4 pr-4 font-bold text-sm">₹{payment.amount}</td>
                    <td className="py-4 pr-4">
                      {payment.status === 'SUCCESS' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
                          <CheckCircle className="w-3 h-3" /> SUCCESS
                        </span>
                      ) : payment.status === 'FAILED' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-destructive/10 text-destructive uppercase tracking-wider">
                           FAILED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                          <Clock className="w-3 h-3" /> PENDING
                        </span>
                      )}
                    </td>
                    <td className="py-4 font-mono text-xs text-muted-foreground truncate max-w-[120px]">
                      {payment.razorpayPaymentId || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

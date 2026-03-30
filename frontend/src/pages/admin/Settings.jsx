import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings2, Building, Plus, Tag, Banknote, ShieldAlert, CheckCircle2, Copy } from 'lucide-react'

// Tab definitions
const TABS = ['Infrastructure', 'Financials', 'Tags & Amenities', 'Operations']

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('Infrastructure')
  
  // States for Infrastructure
  const [blocks, setBlocks] = useState([{ id: 1, name: 'Block A', type: 'Boys' }, { id: 2, name: 'Block B', type: 'Girls' }])
  const [newBlock, setNewBlock] = useState({ name: '', type: 'Unrestricted' })
  
  const [roomForm, setRoomForm] = useState({
     block: 'Block A',
     floor: '1',
     prefix: 'A',
     startNum: 101,
     count: 1,
     capacity: 2,
     type: 'Shared'
  })

  // States for Financials
  const [fees, setFees] = useState({ deposit: 10000, mess: 4500, lateFeePercent: 5 })

  // States for Tags
  const [tags, setTags] = useState(['AC / Air Conditioned', 'Attached Bathroom', 'Balcony', 'Pool View'])
  const [newTag, setNewTag] = useState('')

  // Toast mockup
  const [toast, setToast] = useState(null)
  const showToast = (msg) => {
     setToast(msg)
     setTimeout(() => setToast(null), 3000)
  }

  // Handlers
  const handleAddBlock = (e) => {
     e.preventDefault()
     if(!newBlock.name) return
     setBlocks([...blocks, { id: Date.now(), ...newBlock }])
     setNewBlock({ name: '', type: 'Unrestricted' })
     showToast('Block created successfully.')
  }

  const handleAddRooms = (e) => {
     e.preventDefault()
     showToast(`Successfully generated ${roomForm.count} room(s) on ${roomForm.floor}.`)
  }

  const handleAddTag = (e) => {
     e.preventDefault()
     if(newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
        setNewTag('')
     }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
       
       {/* Mock Toast */}
       <AnimatePresence>
         {toast && (
            <motion.div 
               initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
               className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500/10 border border-emerald-500 text-emerald-500 font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl shadow-emerald-500/10"
            >
               <CheckCircle2 className="w-5 h-5" /> {toast}
            </motion.div>
         )}
       </AnimatePresence>

       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-heading font-bold mb-1">System Configuration</h2>
            <p className="text-sm text-muted-foreground">Manage hierarchy, automated billing constraints, and global properties.</p>
         </div>
       </div>

       {/* Tab Navigation */}
       <div className="flex items-center gap-2 bg-background border border-border rounded-2xl p-1.5 overflow-x-auto">
         {TABS.map(tab => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 min-w-[140px] px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                  activeTab === tab ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-muted-foreground'
               }`}
            >
               {tab}
            </button>
         ))}
       </div>

       <div className="glass-card p-6 md:p-8 rounded-3xl min-h-[500px]">
         <AnimatePresence mode="wait">
            
            {/* INFRASTRUCTURE TAB */}
            {activeTab === 'Infrastructure' && (
               <motion.div key="infra" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                     <Building className="w-6 h-6 text-primary" />
                     <h3 className="text-xl font-heading font-bold">Structural Configuration</h3>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                     
                     {/* Add Block Form */}
                     <div className="space-y-6">
                        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-border/50">
                           <h4 className="font-heading font-bold mb-4 flex items-center justify-between">
                              Create New Building Block
                              <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md uppercase">Structural</span>
                           </h4>
                           <form onSubmit={handleAddBlock} className="space-y-4">
                              <div className="space-y-1.5">
                                 <label className="text-xs font-bold text-muted-foreground uppercase">Block Name / Code</label>
                                 <input value={newBlock.name} onChange={e => setNewBlock({...newBlock, name: e.target.value})} placeholder="e.g. Block C" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-sm" required />
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-xs font-bold text-muted-foreground uppercase">Resident Restriction</label>
                                 <select value={newBlock.type} onChange={e => setNewBlock({...newBlock, type: e.target.value})} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                                    <option>Unrestricted</option>
                                    <option>Boys Only</option>
                                    <option>Girls Only</option>
                                    <option>Staff Only</option>
                                 </select>
                              </div>
                              <button type="submit" className="w-full py-2.5 bg-background border border-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                 <Plus className="w-4 h-4" /> Add Block
                              </button>
                           </form>
                        </div>

                        {/* Existing Blocks List */}
                        <div className="space-y-3">
                           <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2">Active Blocks</h4>
                           {blocks.map(b => (
                              <div key={b.id} className="flex justify-between items-center p-3 rounded-xl border border-border bg-slate-50/30 dark:bg-slate-900/20">
                                 <span className="font-bold text-sm">{b.name}</span>
                                 <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">{b.type}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Add Room(s) Form w/ Bulk Generation */}
                     <div className="p-6 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-border/50 h-fit">
                        <h4 className="font-heading font-bold mb-4 flex items-center justify-between">
                           Room Allocation Generator
                           <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md uppercase">Bulk Enabled</span>
                        </h4>
                        <p className="text-xs text-muted-foreground mb-6">Generate a single room or bulk-create multiple rooms across a specific floor instantly.</p>
                        
                        <form onSubmit={handleAddRooms} className="space-y-5">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                 <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target Block</label>
                                 <select value={roomForm.block} onChange={e => setRoomForm({...roomForm, block: e.target.value})} className="w-full bg-background border border-input rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                                    {blocks.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                                 </select>
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target Floor</label>
                                 <select value={roomForm.floor} onChange={e => setRoomForm({...roomForm, floor: e.target.value})} className="w-full bg-background border border-input rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                                    <option value="Ground Floor">Ground Floor</option>
                                    <option value="Floor 1">Floor 1</option>
                                    <option value="Floor 2">Floor 2</option>
                                 </select>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-5">
                              <div className="col-span-1 space-y-1.5">
                                 <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Prefix</label>
                                 <input value={roomForm.prefix} onChange={e => setRoomForm({...roomForm, prefix: e.target.value})} placeholder="A-" className="w-full bg-background border border-input rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono" />
                              </div>
                              <div className="col-span-1 space-y-1.5">
                                 <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Start #</label>
                                 <input type="number" value={roomForm.startNum} onChange={e => setRoomForm({...roomForm, startNum: parseInt(e.target.value) || 0})} className="w-full bg-background border border-input rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono" />
                              </div>
                              <div className="col-span-1 space-y-1.5 relative">
                                 <label className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">Quantity <Copy className="w-3 h-3" /></label>
                                 <input type="number" min="1" max="50" value={roomForm.count} onChange={e => setRoomForm({...roomForm, count: parseInt(e.target.value) || 1})} className="w-full bg-primary/10 border border-primary/30 text-primary font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4 pb-2">
                              <div className="space-y-1.5">
                                 <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Bed Capacity</label>
                                 <select value={roomForm.capacity} onChange={e => setRoomForm({...roomForm, capacity: parseInt(e.target.value)})} className="w-full bg-background border border-input rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                                    <option value={1}>1 Bed (Single)</option>
                                    <option value={2}>2 Beds (Shared)</option>
                                    <option value={3}>3 Beds (Shared)</option>
                                    <option value={4}>4 Beds (Dorm)</option>
                                 </select>
                              </div>
                              <div className="space-y-1.5">
                                 <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Preset Type</label>
                                 <select value={roomForm.type} onChange={e => setRoomForm({...roomForm, type: e.target.value})} className="w-full bg-background border border-input rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                                    <option>Standard Non-AC</option>
                                    <option>Premium AC</option>
                                    <option>VIP Suite</option>
                                 </select>
                              </div>
                           </div>

                           <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                              Generate {roomForm.count} Room{roomForm.count > 1 ? 's' : ''}
                           </button>
                        </form>
                     </div>

                  </div>
               </motion.div>
            )}

            {/* FINANCIALS TAB */}
            {activeTab === 'Financials' && (
               <motion.div key="fin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                     <Banknote className="w-6 h-6 text-emerald-500" />
                     <h3 className="text-xl font-heading font-bold">Financial Automation Settings</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-6 max-w-sm">
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Standard Security Deposit (₹)</label>
                           <input type="number" value={fees.deposit} onChange={e => setFees({...fees, deposit: parseInt(e.target.value)})} className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 font-mono font-bold text-lg" />
                           <p className="text-[10px] text-muted-foreground">Charged automatically to new tenants on onboarding.</p>
                        </div>
                        
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Mess Fee (₹)</label>
                           <input type="number" value={fees.mess} onChange={e => setFees({...fees, mess: parseInt(e.target.value)})} className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 font-mono font-bold text-lg" />
                           <p className="text-[10px] text-muted-foreground">Added to the recurring monthly invoice if opted.</p>
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Late Fee Penalty (%)</label>
                           <input type="number" value={fees.lateFeePercent} onChange={e => setFees({...fees, lateFeePercent: parseInt(e.target.value)})} className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 font-mono font-bold text-lg text-rose-500" />
                           <p className="text-[10px] text-muted-foreground">Applied progressively every 30 days past the due date.</p>
                        </div>

                        <button onClick={() => showToast("Financial settings saved securely.")} className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-black font-bold rounded-xl mt-4">Save Configuration</button>
                     </div>
                  </div>
               </motion.div>
            )}

            {/* TAGS TAB */}
            {activeTab === 'Tags & Amenities' && (
               <motion.div key="tags" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                     <Tag className="w-6 h-6 text-amber-500" />
                     <h3 className="text-xl font-heading font-bold">Amenities & Features Dictionary</h3>
                  </div>

                  <div className="max-w-2xl space-y-8">
                     <p className="text-sm text-muted-foreground">These tags will appear as assignable properties when creating new rooms in the Infrastructure setup.</p>
                     
                     <form onSubmit={handleAddTag} className="flex gap-4">
                        <input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Type a new amenity tag..." className="flex-1 bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" />
                        <button type="submit" className="px-6 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2">
                           <Plus className="w-4 h-4" /> Add Tag
                        </button>
                     </form>

                     <div className="flex flex-wrap gap-3">
                        {tags.map((t, idx) => (
                           <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-border rounded-xl text-sm font-semibold">
                              <Tag className="w-3.5 h-3.5 text-muted-foreground" /> {t}
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}

            {/* OPERATIONS TAB */}
            {activeTab === 'Operations' && (
               <motion.div key="ops" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                     <Settings2 className="w-6 h-6 text-rose-500" />
                     <h3 className="text-xl font-heading font-bold">Operational Protocols</h3>
                  </div>
                  <div className="max-w-xl text-center py-20 bg-slate-50/50 dark:bg-slate-900/20 border border-dashed border-border/50 rounded-2xl mx-auto">
                     <ShieldAlert className="w-12 h-12 text-muted-foreground opacity-50 mx-auto mb-4" />
                     <h4 className="font-heading font-bold text-lg mb-2">Advanced Security Settings</h4>
                     <p className="text-sm text-muted-foreground">Options to configure Complaint Routing, Gate Passes, and Staff RBAC (Role Based Access Control) are restricted to super-admin terminal only.</p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
       </div>
    </div>
  )
}

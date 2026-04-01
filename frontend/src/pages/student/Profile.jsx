import { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, MapPin, Mail, Camera, Edit2, ShieldCheck, Check } from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'
import api from '@/lib/api'

export default function Profile() {
  const { user } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    hostel: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        gender: user.gender || '',
        hostel: user.hostelId?.name || 'Not assigned'
      })
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // TODO: Add API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
      setIsEditing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-purple-600">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80')] opacity-20 mix-blend-overlay object-cover" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-8 relative -mt-20">
         
         {/* Profile Picture */}
         <div className="flex-shrink-0 relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-slate-200 dark:bg-slate-800 overflow-hidden relative shadow-2xl">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=John&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
               </div>
            </div>
         </div>

         {/* Basic Info */}
         <div className="flex-1 mt-4 md:mt-24 flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
               <h1 className="text-3xl font-heading font-bold">{profile.name}</h1>
               <div className="text-muted-foreground flex items-center gap-2 mt-1">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> {profile.hostel} (Verified)
               </div>
            </div>
            
            <button 
              onClick={() => isEditing ? null : setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white font-medium transition-all"
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Editing...' : 'Edit Profile'}
            </button>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        
        {/* Personal details form */}
        <div className="md:col-span-2 glass-card p-6 md:p-8 rounded-3xl">
           <h3 className="text-xl font-heading font-semibold mb-6">Personal Details</h3>
           
           <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                     <User className="w-4 h-4" /> Full Name
                   </label>
                   <input 
                     disabled={!isEditing}
                     value={profile.name}
                     onChange={(e) => setProfile({...profile, name: e.target.value})}
                     className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-70 disabled:bg-slate-50 dark:disabled:bg-slate-900"
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                     <Mail className="w-4 h-4" /> Email
                   </label>
                   <input 
                     disabled={!isEditing}
                     type="email"
                     value={profile.email}
                     onChange={(e) => setProfile({...profile, email: e.target.value})}
                     className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-70 disabled:bg-slate-50 dark:disabled:bg-slate-900"
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                     <Phone className="w-4 h-4" /> Phone Number
                   </label>
                   <input 
                     disabled={!isEditing}
                     value={profile.phone}
                     onChange={(e) => setProfile({...profile, phone: e.target.value})}
                     className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-70 disabled:bg-slate-50 dark:disabled:bg-slate-900"
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm font-medium text-muted-foreground">Gender</label>
                   <input 
                     disabled={!isEditing}
                     value={profile.gender}
                     onChange={(e) => setProfile({...profile, gender: e.target.value})}
                     className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-70 disabled:bg-slate-50 dark:disabled:bg-slate-900"
                   />
                 </div>
              </div>

              <div className="space-y-2 flex-1">
                 <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                   <MapPin className="w-4 h-4" /> Hostel
                 </label>
                 <input 
                   disabled
                   value={profile.hostel}
                   className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-70 disabled:bg-slate-50 dark:disabled:bg-slate-900"
                 />
              </div>

              <div className="space-y-2 flex-1">
                 <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                   <Phone className="w-4 h-4 text-rose-500" /> Joined Date
                 </label>
                 <input 
                   disabled
                   value={user ? new Date(user.createdAt).toLocaleDateString() : ''}
                   className="w-full px-4 py-3 rounded-xl border border-input bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium disabled:opacity-70 disabled:bg-slate-50 dark:disabled:bg-slate-900"
                 />
              </div>

              {isEditing && (
                 <div className="flex justify-end pt-4 border-t border-border">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 font-medium mr-4">
                      Cancel
                    </button>
                    <button type="submit" disabled={isLoading} className="px-8 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center gap-2">
                      {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Profile'}
                    </button>
                 </div>
              )}
           </form>
        </div>

        {/* Status panel */}
        <div className="space-y-6">
           <div className="glass-card p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/40">
              <h3 className="font-heading font-semibold mb-4 text-lg">Account Status</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground text-sm">Tenant ID</span>
                    <span className="font-mono font-medium">{user ? user._id.slice(-6).toUpperCase() : ''}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground text-sm">Joined Date</span>
                    <span className="font-medium">{user ? new Date(user.createdAt).toLocaleDateString() : ''}</span>
                 </div>
                 <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground text-sm">Role</span>
                    <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">{user ? user.role : ''}</div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}

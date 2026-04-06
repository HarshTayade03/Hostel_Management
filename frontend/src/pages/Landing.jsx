import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { ShieldCheck, BedDouble, Zap, TrendingUp, Smartphone, Users, CheckCircle2, Building2 } from 'lucide-react'

const features = [
  {
    icon: <BedDouble className="w-6 h-6 text-primary" />,
    title: "Smart Room Allocation",
    description: "Automate check-ins, check-outs, and room assignments with real-time availability tracking."
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Automated Workflows",
    description: "Handle leave applications, complaints, and maintenance requests without paper forms."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Secure Access",
    description: "Role-based access control ensuring students, staff, and admins see only what they need."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: "Analytics Dashboard",
    description: "Get insights into occupancy rates, pending fees, and maintenance resolution times."
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Tenant Profiles",
    description: "Comprehensive profiles for tenants to manage their rent, documents, and meal preferences."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: "Mobile Optimized",
    description: "Works perfectly on desktop and mobile, so students can apply for leaves from anywhere."
  }
]

const pricing = [
  {
    name: "Starter",
    price: "₹1,999",
    period: "/mo",
    features: ["Up to 50 beds", "Basic room management", "Leave application form", "Email support"],
    popular: false
  },
  {
    name: "Pro",
    price: "₹4,999",
    period: "/mo",
    features: ["Up to 250 beds", "Advanced analytics", "Complaint tracking dashboard", "Payment summaries", "Priority 24/7 support"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Unlimited beds", "Custom branding", "API Access & Webhooks", "Dedicated account manager", "On-site onboarding"],
    popular: false
  }
]

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          
          <div className="container mx-auto relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-8">
                Manage your living spaces with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">intelligent software.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                HostelLite bridges the gap between traditional college hostels and modern co-living spaces, offering zero-friction management for tenants and admins.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="h-14 px-8 w-full sm:w-auto flex items-center justify-center rounded-full bg-primary text-white font-medium text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]">
                  Start for free
                </Link>
                <Link to="/login" className="h-14 px-8 w-full sm:w-auto flex items-center justify-center rounded-full bg-secondary/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-foreground font-medium text-lg hover:bg-secondary transition-colors">
                  View Live Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50/50 dark:bg-slate-900/20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Everything you need to scale</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From admissions to daily operations, our specialized features replace clunky spreadsheets and paper forms.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-4 relative">
          <div className="container mx-auto max-w-6xl">
             <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground">Start small, upgrade as your facility grows.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {pricing.map((tier, i) => (
                <div 
                  key={i} 
                  className={`relative p-8 rounded-3xl border ${tier.popular ? 'bg-primary/5 border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10' : 'glass-card border-border/50'} flex flex-col`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-500 text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/register" 
                    className={`w-full py-3 rounded-xl font-medium text-center transition-all ${tier.popular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
                  >
                    Choose {tier.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-slate-50/50 dark:bg-slate-900/30 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-16">Trusted by administrators</h2>
              
              <div className="glass-card p-10 md:p-14 relative">
                <p className="text-xl md:text-3xl font-medium leading-relaxed mb-8 italic">
                  "HostelLite modernized our 300-bed university hostel. The leave application workflow alone saved our staff over 20 hours a week from tracking paper slips."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-purple-400" />
                  <div className="text-left">
                    <div className="font-bold text-lg">Dr. Aisha Khan</div>
                    <div className="text-muted-foreground">Chief Warden, State University</div>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-xl">HostelLite</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              The modern operating system for real estate, co-living spaces, and student hostels.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HostelLite Technologies. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

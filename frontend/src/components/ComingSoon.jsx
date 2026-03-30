import { Construction } from 'lucide-react'

export function ComingSoon({ title }) {
  return (
    <div className="max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 border border-primary/20">
         <Construction className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-heading font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground max-w-md">
        This module is currently under development. Stay tuned for updates!
      </p>
    </div>
  )
}

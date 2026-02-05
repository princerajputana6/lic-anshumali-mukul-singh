import { Card, CardContent } from '@/components/ui'
import { 
  DollarSign, 
  Clock, 
  Award, 
  Home, 
  TrendingUp, 
  Handshake 
} from 'lucide-react'

const valueProps = [
  {
    icon: DollarSign,
    title: 'Unlimited Earning Potential',
    description: 'Commission-based income with no salary cap. Top performers earn ₹1+ lakh monthly.',
    highlight: 'No income limit'
  },
  {
    icon: Clock,
    title: 'Flexible Work Hours',
    description: 'Be your own boss and decide your schedule. Work part-time or full-time as per your convenience.',
    highlight: 'Work-life balance'
  },
  {
    icon: Award,
    title: 'Rewards & Recognition',
    description: 'Earn incentives, awards, and foreign trips based on your performance and achievements.',
    highlight: 'Performance rewards'
  },
  {
    icon: Home,
    title: 'Housing Loan Benefits',
    description: 'Get concessional rates on housing loans and other financial benefits as an LIC agent.',
    highlight: 'Financial perks'
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Continuous training, skill development, and opportunities to build your own team.',
    highlight: 'Professional development'
  },
  {
    icon: Handshake,
    title: 'Financial Independence',
    description: 'Build your own insurance business and create multiple income streams for long-term wealth.',
    highlight: 'Business ownership'
  }
]

export function ValuePropositions() {
  return (
    <section id="value-props" className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
            Why Choose LIC Agent Career?
          </h2>
          <p className="mt-4 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
            Join thousands of successful agents who have transformed their lives with LIC's 
            comprehensive support system and unlimited growth opportunities.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {valueProps.map((prop, index) => {
            const IconComponent = prop.icon
            return (
              <Card 
                key={index} 
                className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-0 shadow-medium"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 group-hover:bg-primary-500 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 group-hover:text-white transition-colors duration-300" style={{color: '#1e40af'}} />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-medium" style={{color: '#1e40af'}}>
                      {prop.highlight}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-black mb-3" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                    {prop.title}
                  </h3>
                  
                  <p className="font-bold leading-relaxed" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Benefits */}
        <div className="mt-20 rounded-2xl p-8 sm:p-12" style={{backgroundColor: '#ffc908'}}>
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="font-heading text-2xl font-bold sm:text-3xl" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              Start Your Journey Today
            </h3>
            <p className="mt-4 text-lg font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              No prior experience required • Complete training provided • Start earning immediately
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold" style={{color: '#1e40af'}}>0</div>
                <div className="text-sm mt-1 font-semibold" style={{color: '#1e40af'}}>Investment Required</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold" style={{color: '#1e40af'}}>25hrs</div>
                <div className="text-sm mt-1 font-semibold" style={{color: '#1e40af'}}>Training Duration</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold" style={{color: '#1e40af'}}>Day 1</div>
                <div className="text-sm mt-1 font-semibold" style={{color: '#1e40af'}}>Start Earning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

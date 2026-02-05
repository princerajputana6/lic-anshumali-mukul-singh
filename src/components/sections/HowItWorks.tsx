import { Card, CardContent } from '@/components/ui'
import { 
  FileText, 
  GraduationCap, 
  Award, 
  UserCheck, 
  DollarSign,
  ArrowRight 
} from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: FileText,
    title: 'Submit Application',
    description: 'Complete our simple application form with your basic details and required documents.',
    details: [
      'Aadhaar Card & PAN Card',
      'Educational certificates',
      'Passport size photographs',
      'Bank account details'
    ],
    timeframe: '5 minutes'
  },
  {
    step: 2,
    icon: GraduationCap,
    title: 'Complete Training',
    description: 'Attend our comprehensive 25-hour training program covering insurance fundamentals.',
    details: [
      'Insurance basics & products',
      'Sales techniques & customer service',
      'Legal compliance & ethics',
      'Digital tools & processes'
    ],
    timeframe: '1-2 weeks'
  },
  {
    step: 3,
    icon: Award,
    title: 'Pass IRDA Exam',
    description: 'Take the online IRDA examination with our free preparation materials and support.',
    details: [
      'Online exam format',
      'Passing marks: 17/50',
      'Free study materials provided',
      'Multiple attempt opportunities'
    ],
    timeframe: '1 day'
  },
  {
    step: 4,
    icon: UserCheck,
    title: 'Get Certified',
    description: 'Receive your official LIC agent appointment letter and start your career.',
    details: [
      'Official LIC agent certification',
      'Agent code assignment',
      'Access to LIC systems',
      'Marketing materials provided'
    ],
    timeframe: '2-3 days'
  },
  {
    step: 5,
    icon: DollarSign,
    title: 'Start Earning',
    description: 'Begin selling policies and earning commissions from your very first sale.',
    details: [
      '25% first-year commission',
      'Renewal income for life',
      'Performance bonuses',
      'Immediate payment processing'
    ],
    timeframe: 'Day 1'
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
            How to Become an LIC Agent
          </h2>
          <p className="mt-4 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
            Follow our simple 5-step process to start your rewarding career as an LIC insurance advisor. 
            We'll guide you through every step of the journey.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-600 transform -translate-y-1/2"></div>
              
              <div className="relative grid grid-cols-5 gap-8">
                {steps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <div key={index} className="relative">
                      {/* Step Circle */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 shadow-lg">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {step.step}
                        </div>
                      </div>
                      
                      {/* Step Card */}
                      <Card className="mt-24 shadow-medium hover:shadow-strong transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <h3 className="font-heading text-lg font-semibold text-neutral-900">
                              {step.title}
                            </h3>
                            <span className="inline-flex items-center rounded-full bg-accent-100 px-2 py-1 text-xs font-medium mt-2" style={{color: '#1e40af'}}>
                              {step.timeframe}
                            </span>
                          </div>
                          
                          <p className="text-sm text-neutral-600 mb-4 text-center">
                            {step.description}
                          </p>
                          
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start text-xs text-neutral-600">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 bg-primary-300"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    {/* Step Circle */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 shadow-lg flex-shrink-0 relative">
                      <IconComponent className="h-8 w-8 text-white" />
                      <div className="absolute -bottom-2 -right-2 bg-accent-500 text-neutral-900 text-xs font-bold px-2 py-1 rounded-full">
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <Card className="flex-1 shadow-medium">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-heading text-lg font-semibold text-neutral-900">
                              {step.title}
                            </h3>
                            <span className="inline-flex items-center rounded-full bg-accent-100 px-2 py-1 text-xs font-medium" style={{color: '#1e40af'}}>
                              {step.timeframe}
                            </span>
                          </div>
                          
                          <p className="text-sm text-neutral-600 mb-4">
                            {step.description}
                          </p>
                          
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start text-sm text-neutral-600">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-2 text-primary-600 font-medium mb-4">
            <span style={{color: '#1e40af'}}>Ready to get started?</span>
            <ArrowRight className="h-4 w-4" />
          </div>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            The entire process takes just 2-3 weeks from application to earning your first commission. 
            Join thousands of successful LIC agents who started their journey with us.
          </p>
        </div>
      </div>
    </section>
  )
}

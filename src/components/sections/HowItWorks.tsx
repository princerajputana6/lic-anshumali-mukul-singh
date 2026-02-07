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
      'Commission-based income',
      'Renewal income for life',
      'Performance bonuses',
      'Immediate payment processing'
    ],
    timeframe: 'Day 1'
  }
]

export function HowItWorks() {
  const stepColors = [
    'bg-blue-600',
    'bg-violet-600',
    'bg-amber-500',
    'bg-emerald-600',
    'bg-rose-600',
  ]

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl" style={{color: '#1e40af'}}>
            How to Become an LIC Agent
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-7 text-neutral-600">
            Follow our simple 5-step process to start your rewarding career as an LIC insurance advisor.
          </p>
        </div>

        {/* Steps Grid - works on both desktop and mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="relative group">
                {/* Connector arrow - desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10">
                    <ArrowRight className="h-5 w-5 text-neutral-300" />
                  </div>
                )}

                <Card className="h-full border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Colored top bar */}
                  <div className={`h-1.5 ${stepColors[index]}`}></div>

                  <CardContent className="p-5 sm:p-6">
                    {/* Step number + Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stepColors[index]} shadow-md flex-shrink-0`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Step {step.step}</div>
                        <h3 className="font-heading text-base font-bold text-neutral-900 leading-tight">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Timeframe badge */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${stepColors[index]}`}>
                        {step.timeframe}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Details */}
                    <ul className="space-y-1.5">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-xs text-neutral-500">
                          <div className={`w-1.5 h-1.5 ${stepColors[index]} rounded-full mt-1.5 mr-2 flex-shrink-0`}></div>
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

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base">
            The entire process takes just <strong className="text-neutral-900">2-3 weeks</strong> from application to earning your first commission.
          </p>
        </div>
      </div>
    </section>
  )
}

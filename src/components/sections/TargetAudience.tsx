import { Card, CardContent } from '@/components/ui'
import { 
  Briefcase, 
  Building2, 
  Home, 
  GraduationCap, 
  Users, 
  ArrowRight 
} from 'lucide-react'

const targetGroups = [
  {
    icon: Briefcase,
    title: 'Working Professionals',
    description: 'Perfect part-time opportunity to supplement your current income',
    benefits: [
      'Work evenings and weekends',
      'No conflict with day job',
      'Additional income stream',
      'Skill development'
    ],
    highlight: 'Part-time opportunity'
  },
  {
    icon: Building2,
    title: 'Business Owners',
    description: 'Expand your network and create additional revenue streams',
    benefits: [
      'Leverage existing contacts',
      'Cross-sell opportunities',
      'Business networking',
      'Financial diversification'
    ],
    highlight: 'Network expansion'
  },
  {
    icon: Home,
    title: 'Homemakers',
    description: 'Work from home with flexible hours that fit your schedule',
    benefits: [
      'Work from home',
      'Flexible timing',
      'Financial independence',
      'Personal growth'
    ],
    highlight: 'Work from home'
  },
  {
    icon: GraduationCap,
    title: 'Students & Fresh Graduates',
    description: 'Launch your career in the financial services industry',
    benefits: [
      'Early career start',
      'Industry experience',
      'Communication skills',
      'Financial literacy'
    ],
    highlight: 'Career launch'
  },
  {
    icon: Users,
    title: 'Retirees',
    description: 'Stay active and earn post-retirement income with your experience',
    benefits: [
      'Utilize life experience',
      'Stay socially active',
      'Supplemental income',
      'Meaningful work'
    ],
    highlight: 'Post-retirement income'
  }
]

export function TargetAudience() {
  return (
    <section id="target-audience" className="py-20 sm:py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl" style={{color: '#000000', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            Who Can Become an LIC Agent?
          </h2>
          <p className="mt-4 text-lg leading-8 font-bold" style={{color: '#000000', textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
            LIC agent career is perfect for people from all walks of life. Whether you're looking for 
            a full-time career or part-time income, we have opportunities for everyone.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {targetGroups.map((group, index) => {
            const IconComponent = group.icon
            return (
              <Card 
                key={index} 
                className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-0 shadow-medium relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-bl-full opacity-50"></div>
                
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 group-hover:bg-primary-500 transition-colors duration-300">
                      <IconComponent className="h-7 w-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-800">
                      {group.highlight}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-black mb-3" style={{color: '#000000', textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                    {group.title}
                  </h3>
                  
                  <p className="font-bold leading-relaxed mb-6" style={{color: '#000000', textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                    {group.description}
                  </p>

                  <div className="space-y-2">
                    {group.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm font-bold" style={{color: '#000000', textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Success Stories Preview */}
        <div className="mt-20 bg-white rounded-2xl shadow-medium p-8 sm:p-12">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              Success Stories from Our Community
            </h3>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Meet some of our successful agents who transformed their lives with LIC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">RS</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Rajesh Sharma</h4>
              <p className="text-sm text-neutral-600 mb-3">Former IT Professional, Mumbai</p>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">₹85,000</div>
                <div className="text-green-600 text-sm">Monthly Income</div>
              </div>
              <p className="text-xs text-neutral-500 mt-3 italic">
                "Started part-time, now earning more than my previous job"
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">PK</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Priya Kumari</h4>
              <p className="text-sm text-neutral-600 mb-3">Homemaker, Delhi</p>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">₹45,000</div>
                <div className="text-green-600 text-sm">Monthly Income</div>
              </div>
              <p className="text-xs text-neutral-500 mt-3 italic">
                "Perfect work-from-home opportunity for mothers"
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-neutral-900 font-bold text-lg">AM</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Amit Mehta</h4>
              <p className="text-sm text-neutral-600 mb-3">Recent Graduate, Pune</p>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">₹32,000</div>
                <div className="text-green-600 text-sm">Monthly Income</div>
              </div>
              <p className="text-xs text-neutral-500 mt-3 italic">
                "Great way to start my career in financial services"
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 text-primary-600 font-medium">
              <span>Join thousands of successful agents</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-16 text-center">
          <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-8">
            Basic Requirements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <div className="text-2xl font-bold text-primary-500 mb-2">18+</div>
              <div className="text-sm text-neutral-600">Minimum Age</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <div className="text-2xl font-bold text-primary-500 mb-2">10th</div>
              <div className="text-sm text-neutral-600">Education Required</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <div className="text-2xl font-bold text-primary-500 mb-2">₹0</div>
              <div className="text-sm text-neutral-600">Investment Needed</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <div className="text-2xl font-bold text-primary-500 mb-2">Any</div>
              <div className="text-sm text-neutral-600">Background Welcome</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

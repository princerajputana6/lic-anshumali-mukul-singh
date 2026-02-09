import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Calculator, TrendingUp, Repeat, Gift, Award } from 'lucide-react'

const commissionTiers = [
  {
    type: 'First Year Commission',
    percentage: 25,
    description: 'Earn 25% commission on the first year premium of every policy you sell',
    example: '₹1,00,000 premium = ₹25,000 commission',
    icon: TrendingUp,
    color: 'bg-violet-500'
  },
  {
    type: 'Bonus Commission',
    percentage: 40,
    description: 'Additional 40% commission for achieving monthly targets and performance goals',
    example: 'Extra ₹40,000 on ₹1,00,000 premium',
    icon: Gift,
    color: 'bg-[#1e40af]'
  },
  {
    type: 'Renewal Income',
    // percentage: 5,
    description: 'Passive income from policy renewals for the lifetime of the policy',
    example: '₹5,000 annually for life',
    icon: Repeat,
    color: 'bg-green-500'
  }
]

const earningExamples = [
  {
    policies: 5,
    premium: 50000,
    firstYear: 62500,
    renewal: 12500,
    total: 75000
  },
  {
    policies: 10,
    premium: 75000,
    firstYear: 187500,
    renewal: 37500,
    total: 225000
  },
  {
    policies: 20,
    premium: 100000,
    firstYear: 500000,
    renewal: 100000,
    total: 600000
  }
]

export function CommissionStructure() {
  return (
    <section id="commission" className="py-16 sm:py-24 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight lg:text-4xl" style={{color: '#1e40af'}}>
            Commission Structure
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-7 text-neutral-600">
            Transparent and rewarding. The more you sell, the more you earn — no upper limit.
          </p>
        </div> */}

        {/* Commission Types */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {commissionTiers.map((tier, index) => {
            const IconComponent = tier.icon
            return (
              <Card key={index} className="border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className={`h-1.5 ${tier.color}`}></div>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tier.color} shadow-md flex-shrink-0`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-900">{tier.type}</h3>
                  </div>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-3 sm:p-4">
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Example</div>
                    <div className="text-sm sm:text-base font-bold" style={{color: '#1e40af'}}>{tier.example}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div> */}

        {/* Earning Potential */}
        <div className="mt-10 sm:mt-16">
          <Card className="border border-neutral-200 shadow-sm overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600"></div>
            <CardContent className="p-5 sm:p-8">
              {/* Section title */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-md flex-shrink-0">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-900">Monthly Earning Potential</h3>
                  <p className="text-xs sm:text-sm text-neutral-500">Based on number of policies sold monthly</p>
                </div>
              </div>

              {/* Earning cards - works on all screen sizes */}
              <div className="space-y-4">
                {earningExamples.map((example, index) => (
                  <div key={index} className="border border-neutral-200 rounded-xl p-4 sm:p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                    {/* Top row: policies count */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{backgroundColor: '#1e40af'}}>
                          {example.policies}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900 text-sm sm:text-base">{example.policies} Policies/Month</div>
                          <div className="text-xs text-neutral-500">Avg ₹{example.premium.toLocaleString()} premium</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg sm:text-xl font-black" style={{color: '#1e40af'}}>₹{example.total.toLocaleString()}</div>
                        <div className="text-xs font-medium text-neutral-500">total/month</div>
                      </div>
                    </div>
                    {/* Bottom row: breakdown */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                      <div>
                        <div className="text-xs text-neutral-400 font-medium">Avg Premium</div>
                        <div className="font-semibold text-neutral-900 text-sm">₹{example.premium.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 font-medium">First Year</div>
                        <div className="font-semibold text-green-600 text-sm">₹{example.firstYear.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 font-medium">Annual Renewal</div>
                        <div className="font-semibold text-blue-600 text-sm">₹{example.renewal.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 font-medium">Total Monthly</div>
                        <div className="font-bold text-sm" style={{color: '#1e40af'}}>₹{example.total.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Highlights */}
              <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 sm:p-5 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-green-700">No Cap</div>
                  <div className="text-green-600 text-xs sm:text-sm mt-0.5">On earnings</div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 sm:p-5 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-700">Hereditary</div>
                  <div className="text-blue-600 text-xs sm:text-sm mt-0.5">Renewal income</div>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 sm:p-5 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-purple-700">Fortnightly</div>
                  <div className="text-purple-600 text-xs sm:text-sm mt-0.5">Payment cycle</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Benefits */}
        <div className="mt-10 sm:mt-16">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-900 text-center mb-6 sm:mb-8">
            Additional Benefits & Incentives
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Gift, label: 'Performance Bonus', desc: 'Extra rewards for top performers', color: 'bg-violet-600' },
              { icon: TrendingUp, label: 'Foreign Trips', desc: 'International incentive tours', color: 'bg-blue-600' },
              { icon: Calculator, label: 'Loan Benefits', desc: 'Concessional housing loans and Intrest free Auto Loan', color: 'bg-emerald-600' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 text-center hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="font-semibold text-neutral-900 text-sm sm:text-base">{item.label}</div>
                  <div className="text-xs sm:text-sm text-neutral-500 mt-1">{item.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Calculator, TrendingUp, Repeat, Gift } from 'lucide-react'

const commissionTiers = [
  {
    type: 'First Year Commission',
    percentage: 25,
    description: 'Earn 25% commission on the first year premium of every policy you sell',
    example: '₹1,00,000 premium = ₹25,000 commission',
    icon: TrendingUp,
    color: 'bg-primary-500'
  },
  {
    type: 'Bonus Commission',
    percentage: 40,
    description: 'Additional 40% commission for achieving monthly targets and performance goals',
    example: 'Extra ₹40,000 on ₹1,00,000 premium',
    icon: Gift,
    color: 'bg-accent-500'
  },
  {
    type: 'Renewal Income',
    percentage: 5,
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
    <section id="commission" className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
            Commission Structure
          </h2>
          <p className="mt-4 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
            Understand how you can earn with LIC's transparent and rewarding commission structure. 
            The more you sell, the more you earn - with no upper limit.
          </p>
        </div>

        {/* Commission Types */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {commissionTiers.map((tier, index) => {
            const IconComponent = tier.icon
            return (
              <Card key={index} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-0 shadow-medium">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tier.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-neutral-900">{tier.percentage}%</div>
                      <div className="text-sm text-neutral-500">Commission</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tier.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="text-sm font-medium mb-1" style={{color: '#1e40af'}}>Example:</div>
                    <div className="text-lg font-semibold" style={{color: '#1e40af'}}>{tier.example}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Earning Calculator */}
        <div className="mt-20">
          <Card className="shadow-strong border-0">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-secondary-600">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">Monthly Earning Potential</CardTitle>
              <p className="text-neutral-600 mt-2">
                See how much you can earn based on the number of policies you sell monthly
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-4 px-4 font-semibold" style={{color: '#000000'}}>Policies/Month</th>
                      <th className="text-left py-4 px-4 font-semibold" style={{color: '#000000'}}>Avg Premium</th>
                      <th className="text-left py-4 px-4 font-semibold" style={{color: '#000000'}}>First Year</th>
                      <th className="text-left py-4 px-4 font-semibold" style={{color: '#000000'}}>Annual Renewal</th>
                      <th className="text-left py-4 px-4 font-semibold" style={{color: '#000000'}}>Total Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earningExamples.map((example, index) => (
                      <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                              <span className="font-semibold text-sm" style={{color: '#1e40af'}}>{example.policies}</span>
                            </div>
                            <span style={{color: '#000000'}}>{example.policies} policies</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium" style={{color: '#000000'}}>₹{example.premium.toLocaleString()}</td>
                        <td className="py-4 px-4 font-medium text-green-600">₹{example.firstYear.toLocaleString()}</td>
                        <td className="py-4 px-4 font-medium text-blue-600">₹{example.renewal.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-lg text-primary-600">₹{example.total.toLocaleString()}</div>
                          <div className="text-xs font-semibold" style={{color: '#000000'}}>per month</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                  <div className="text-2xl font-bold text-green-700">No Cap</div>
                  <div className="text-green-600 text-sm mt-1">On your earnings</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="text-2xl font-bold text-blue-700">Lifetime</div>
                  <div className="text-blue-600 text-sm mt-1">Renewal income</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="text-2xl font-bold text-purple-700">Weekly</div>
                  <div className="text-purple-600 text-sm mt-1">Payment cycle</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-4">
              Additional Benefits & Incentives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <div className="font-medium text-neutral-900">Performance Bonus</div>
                <div className="text-sm text-neutral-600 mt-1">Extra rewards for top performers</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6" style={{color: '#1e40af'}} />
                </div>
                <div className="font-medium text-neutral-900">Foreign Trips</div>
                <div className="text-sm text-neutral-600 mt-1">International incentive tours</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div className="font-medium text-neutral-900">Loan Benefits</div>
                <div className="text-sm text-neutral-600 mt-1">Concessional housing loans</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Repeat className="h-6 w-6 text-white" />
                </div>
                <div className="font-medium text-neutral-900">Team Building</div>
                <div className="text-sm text-neutral-600 mt-1">Build and lead your own team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

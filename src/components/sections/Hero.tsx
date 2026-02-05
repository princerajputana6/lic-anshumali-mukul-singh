'use client'

import { Button } from '@/components/ui'
import { ArrowRight, Star, Users, TrendingUp } from 'lucide-react'
import { scrollToElement } from '@/lib/utils'

export function Hero() {
  const handleApplyNowClick = () => {
    scrollToElement('application-form')
  }

  const handleLearnMoreClick = () => {
    scrollToElement('value-props')
  }

  return (
    <section className="relative py-20 sm:py-32" style={{backgroundColor: '#ffc908'}}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-secondary-100/20"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-8 text-sm font-bold">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#1e40af'}}>
                <span className="text-white font-bold text-xs">LIC</span>
              </div>
              <span style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>Official Partner</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" style={{color: '#1e40af'}} />
              <span style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>10,000+ Active Agents</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-current" style={{color: '#1e40af'}} />
              <span style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>4.8/5 Rating</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
            Build Your Career as an{' '}
            <span style={{color: '#1e40af'}}>LIC Insurance Advisor</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 font-bold sm:text-xl max-w-3xl mx-auto" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
            Join India's most trusted insurance company and earn unlimited income with flexible work hours. 
            No investment required, complete training provided, and start earning from day one.
          </p>

          {/* Key Benefits */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg border-2" style={{borderColor: '#1e40af'}}>
              <TrendingUp className="h-4 w-4" style={{color: '#1e40af'}} />
              <span className="font-black" style={{color: '#1e40af'}}>Unlimited Earning Potential</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg border-2" style={{borderColor: '#1e40af'}}>
              <Star className="h-4 w-4" style={{color: '#1e40af'}} />
              <span className="font-black" style={{color: '#1e40af'}}>Flexible Work Hours</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg border-2" style={{borderColor: '#1e40af'}}>
              <Users className="h-4 w-4" style={{color: '#1e40af'}} />
              <span className="font-black" style={{color: '#1e40af'}}>Complete Training Provided</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              onClick={handleApplyNowClick}
              className="group shadow-strong hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-bold hover:bg-blue-800"
              style={{backgroundColor: '#1e40af', color: '#ffffff'}}
            >
              Submit Details
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={handleLearnMoreClick}
              className="group font-bold hover:bg-blue-700 hover:text-white"
              style={{borderColor: '#1e40af', borderWidth: '2px', color: '#1e40af'}}
            >
              Learn More About Benefits
            </Button>
          </div>

          {/* Success Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>₹50,000+</div>
              <div className="text-sm font-bold mt-1" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>Average Monthly Income</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>25%</div>
              <div className="text-sm font-bold mt-1" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>First Year Commission</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>100%</div>
              <div className="text-sm font-bold mt-1" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>Job Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{borderColor: '#1e40af'}}>
          <div className="w-1 h-3 rounded-full mt-2 animate-pulse" style={{backgroundColor: '#1e40af'}}></div>
        </div>
      </div>
    </section>
  )
}

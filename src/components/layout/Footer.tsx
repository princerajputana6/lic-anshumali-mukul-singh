import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Logo } from '@/components/ui'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

const services = [
  { name: 'Become LIC Agent', href: '/#application-form' },
  { name: 'Training Program', href: '/#how-it-works' },
  { name: 'Commission Structure', href: '/#commission' },
  { name: 'Career Growth', href: '/#value-props' },
  { name: 'Blog & Tips', href: '/blog' },
]

export function Footer() {
  return (
    <footer className="text-white" style={{backgroundColor: '#1f2937'}}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Address */}
          <div className="space-y-4">
            <Logo size="md" />
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#1e40af'}} />
                <div>
                  <p className="font-bold text-sm" style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                    Branch 327 1/28 Second Floor<br />
                    Asfali Road, New Delhi 110002<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" style={{color: '#1e40af'}} />
                <a
                  href="tel:+918800674722"
                  className="font-bold text-sm hover:text-primary-400 transition-colors"
                  style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
                >
                  +91 88006 74722
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" style={{color: '#1e40af'}} />
                <a
                  href="mailto:anshuali.msingh@gmail.com"
                  className="font-bold text-sm hover:text-primary-400 transition-colors"
                  style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
                >
                  anshuali.msingh@gmail.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#1e40af'}} />
                <div>
                  <p className="font-bold text-sm" style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                    Available 24/7<br />
                    All Days of the Week
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-black text-lg" style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>About LICNCR</h3>
            <p className="font-bold text-sm leading-relaxed" style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
              Build your career as a Life Insurance Corporation of India agent. 
              Join thousands of successful agents earning unlimited income with flexible work hours.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-primary-400 transition-colors"
                style={{color: '#ffffff'}}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only" style={{color: '#1e40af'}}>Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-primary-400 transition-colors"
                style={{color: '#ffffff'}}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only" style={{color: '#1e40af'}}>Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-primary-400 transition-colors"
                style={{color: '#ffffff'}}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only" style={{color: '#1e40af'}}>LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-black text-lg" style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-bold text-sm hover:text-primary-400 transition-colors"
                    style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-black text-lg" style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="font-bold text-sm hover:text-primary-400 transition-colors"
                    style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-bold text-sm" style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
              © 2024 LICNCR. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="font-bold text-sm hover:text-primary-400 transition-colors"
                style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-bold text-sm hover:text-primary-400 transition-colors"
                style={{color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

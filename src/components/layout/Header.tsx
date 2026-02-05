'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Logo } from '@/components/ui'
import { Menu, X, Phone } from 'lucide-react'
import { scrollToElement } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleApplyNowClick = () => {
    scrollToElement('application-form')
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-800" style={{backgroundColor: '#1e40af'}}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo size="lg" />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            style={{color: '#ffffff'}}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only" style={{color: '#1e40af'}}>Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 hover:text-yellow-300 transition-colors"
              style={{color: '#ffffff'}}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-yellow-400 hover:text-blue-800"
            style={{color: '#ffffff'}}
            onClick={() => window.open('tel:+918800674722', '_self')}
          >
            <Phone className="h-4 w-4" />
            Call Now
          </Button>
          <Button 
            onClick={handleApplyNowClick}
            className="hover:bg-blue-800"
            style={{backgroundColor: '#ffc908', color: '#1e40af'}}
          >
            Apply Now
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10" style={{backgroundColor: '#1e40af'}}>
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Logo size="sm" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                style={{color: '#ffffff'}}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-neutral-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-yellow-400 hover:text-blue-800"
                      style={{color: '#ffffff'}}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-center gap-2 hover:bg-yellow-400 hover:text-blue-800"
                    style={{color: '#ffffff'}}
                    onClick={() => {
                      window.open('tel:+918800674722', '_self')
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                  <Button
                    className="w-full hover:bg-blue-800"
                    style={{backgroundColor: '#ffc908', color: '#1e40af'}}
                    onClick={handleApplyNowClick}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

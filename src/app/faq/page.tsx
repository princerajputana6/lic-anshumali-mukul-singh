import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FAQ } from '@/components/sections/FAQ'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | LIC Career',
  description: 'Get answers to common questions about becoming an LIC insurance advisor. Learn about requirements, earnings, training, and more.',
  openGraph: {
    title: 'FAQ - LIC Career Questions Answered',
    description: 'Find answers to all your questions about becoming an LIC insurance advisor.',
  },
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 max-w-2xl mx-auto">
              Find answers to the most common questions about becoming an LIC insurance advisor. 
              If you don't find what you're looking for, feel free to contact us directly.
            </p>
            <div className="mt-8">
              <a href="/#application-form">
                <Button size="lg">
                  Apply Now
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Component */}
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}

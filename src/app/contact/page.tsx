'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle, Input, Textarea, Button, Label } from '@/components/ui'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.')
        reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 max-w-2xl mx-auto">
              Have questions about becoming an LIC agent? We're here to help! 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-8">
                    We're here to answer your questions and help you start your journey as an LIC insurance advisor. 
                    Contact us through any of the methods below.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Office Address</h3>
                      <p className="text-neutral-600">
                        123 Business District<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Phone Number</h3>
                      <p className="text-neutral-600">
                        <a href="tel:+919876543210" className="hover:text-primary-600 transition-colors">
                          +91 98765 43210
                        </a>
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">Available 24/7 for calls</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Email Address</h3>
                      <p className="text-neutral-600">
                        <a href="mailto:contact@liccareer.com" className="hover:text-primary-600 transition-colors">
                          contact@liccareer.com
                        </a>
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Office Hours</h3>
                      <p className="text-neutral-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="pt-6 space-y-4">
                  <h3 className="font-semibold text-neutral-900">Quick Contact</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open('tel:+919876543210', '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                    >
                      💬 WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="shadow-strong border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-neutral-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>

                <CardContent>
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-green-800">Message Sent!</h3>
                          <p className="text-green-700 text-sm mt-1">{submitMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-red-800">Error</h3>
                          <p className="text-red-700 text-sm mt-1">{submitMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          error={errors.name?.message}
                          {...register('name')}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="mb-2 block">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Your phone number"
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="mb-2 block">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        placeholder="What is your message about?"
                        error={errors.subject?.message}
                        {...register('subject')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        error={errors.message?.message}
                        {...register('message')}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
                Visit Our Office
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Located in the heart of Mumbai's business district, our office is easily accessible 
                by public transport and has ample parking facilities.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-medium overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-neutral-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-neutral-700 mb-2">Interactive Map</h3>
                  <p className="text-neutral-500 text-sm mb-4">
                    Google Maps integration would be embedded here in production
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://maps.google.com/?q=Mumbai+Maharashtra+India', '_blank')}
                  >
                    View on Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Select, Textarea, RadioGroup, Label } from '@/components/ui'
import { applicationFormSchema, type ApplicationFormData } from '@/lib/validations'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const occupationOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-employed' },
  { value: 'homemaker', label: 'Homemaker' },
  { value: 'student', label: 'Student' },
  { value: 'retired', label: 'Retired' }
]

const educationOptions = [
  { value: '10th', label: '10th Pass' },
  { value: '12th', label: '12th Pass' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'post-graduate', label: 'Post Graduate' }
]

const salesExperienceOptions = [
  { value: 'yes', label: 'Yes', description: 'I have prior sales experience' },
  { value: 'no', label: 'No', description: 'I am new to sales' }
]

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema)
  })

  const watchedOccupation = watch('occupation')
  const watchedEducation = watch('education')
  const watchedSalesExperience = watch('salesExperience')

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you! Your application has been submitted successfully. We will contact you within 24 hours with your free study materials and next steps.')
        reset()
      } else {
        throw new Error('Failed to submit application')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error submitting your application. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="application-form" className="py-20 sm:py-32 bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-black tracking-tight text-black sm:text-4xl">
            Start Your LIC Career Journey
          </h2>
          <p className="mt-4 text-lg leading-8 text-black font-semibold">
            Answer 5 quick questions to get your free study materials and begin your path to financial success
          </p>
        </div>

        <Card className="shadow-strong border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-t-xl">
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <p className="text-primary-100 mt-2">
              Takes less than 3 minutes • Completely free • No obligations
            </p>
          </CardHeader>

          <CardContent className="p-8">
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">Application Submitted Successfully!</h3>
                    <p className="text-green-700 text-sm">{submitMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Submission Error</h3>
                    <p className="text-red-700 text-sm">{submitMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    error={errors.fullName?.message}
                    {...register('fullName')}
                  />
                </div>

                <div>
                  <Label htmlFor="mobile" className="mb-2 block">
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    error={errors.mobile?.message}
                    {...register('mobile')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="mb-2 block">
                    City/Location *
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    error={errors.city?.message}
                    {...register('city')}
                  />
                </div>
              </div>

              {/* Current Occupation */}
              <div>
                <Label htmlFor="occupation" className="mb-3 block">
                  Current Occupation *
                </Label>
                <Select
                  placeholder="Select your current occupation"
                  value={watchedOccupation}
                  onChange={(e) => setValue('occupation', e.target.value as any)}
                  error={errors.occupation?.message}
                >
                  {occupationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Educational Qualification */}
              <div>
                <Label htmlFor="education" className="mb-3 block">
                  Educational Qualification *
                </Label>
                <Select
                  placeholder="Select your educational qualification"
                  value={watchedEducation}
                  onChange={(e) => setValue('education', e.target.value as any)}
                  error={errors.education?.message}
                >
                  {educationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Reason for Interest */}
              <div>
                <Label htmlFor="reason" className="mb-3 block">
                  Why do you want to become an LIC Agent? *
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Tell us what motivates you to join LIC as an insurance advisor..."
                  rows={4}
                  error={errors.reason?.message}
                  {...register('reason')}
                />
              </div>

              {/* Sales Experience */}
              <div>
                <Label className="mb-4 block">
                  Do you have prior sales experience? *
                </Label>
                <RadioGroup
                  name="salesExperience"
                  options={salesExperienceOptions}
                  value={watchedSalesExperience}
                  onChange={(value) => setValue('salesExperience', value as any)}
                  error={errors.salesExperience?.message}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="xl"
                  className="w-full group shadow-strong hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 hover:bg-blue-800"
                  style={{backgroundColor: '#1e40af', color: '#ffffff'}}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Details...' : 'Submit Details'}
                  {!isSubmitting && <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
                
                <p className="text-center text-sm text-neutral-500 mt-4">
                  By submitting this form, you agree to be contacted by our team regarding LIC agent opportunities.
                  We respect your privacy and will never share your information with third parties.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-soft">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="font-medium text-neutral-900">100% Free</div>
            <div className="text-sm text-neutral-600 mt-1">No hidden charges or fees</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-soft">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="font-medium text-neutral-900">Quick Response</div>
            <div className="text-sm text-neutral-600 mt-1">We'll contact you within 24 hours</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-soft">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary-600" />
            </div>
            <div className="font-medium text-neutral-900">No Obligation</div>
            <div className="text-sm text-neutral-600 mt-1">Learn first, decide later</div>
          </div>
        </div>
      </div>
    </section>
  )
}

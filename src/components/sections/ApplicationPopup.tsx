'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationFormSchema, type ApplicationFormData } from '@/lib/validations'
import { X, Send, CheckCircle, AlertCircle, UserPlus } from 'lucide-react'

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
  { value: 'yes', label: 'Yes, I have sales experience' },
  { value: 'no', label: 'No, I am new to sales' }
]

export function ApplicationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  useEffect(() => {
    const dismissed = sessionStorage.getItem('popup_dismissed')
    if (dismissed) return

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('popup_dismissed', 'true')
  }

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'popup' }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => { handleClose() }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const inputClass = (hasError: boolean) =>
    `w-full px-3.5 py-2.5 rounded-xl border-2 text-sm transition-colors focus:outline-none focus:ring-0 ${
      hasError
        ? 'border-red-300 focus:border-red-500 bg-red-50/50'
        : 'border-neutral-200 focus:border-blue-500'
    }`

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex-shrink-0" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}}>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#ffc908'}}>
              <UserPlus className="h-5 w-5" style={{color: '#1e40af'}} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">
                APPLY NOW
              </h3>
              <p className="text-blue-200 text-xs sm:text-sm">
                Takes less than 3 minutes • Completely free
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="px-5 sm:px-6 py-5 sm:py-6 overflow-y-auto flex-1">
          {submitStatus === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-neutral-900 text-xl mb-2">Application Submitted!</h4>
              <p className="text-sm text-neutral-600">
                Thank you! We'll contact you within 24 hours with your free study materials and next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
                </div>
              )}

              {/* Name & Mobile - side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register('fullName')}
                    className={inputClass(!!errors.fullName)}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    {...register('mobile')}
                    className={inputClass(!!errors.mobile)}
                  />
                  {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile.message}</p>}
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className={inputClass(!!errors.email)}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">City *</label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    {...register('city')}
                    className={inputClass(!!errors.city)}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                </div>
              </div>

              {/* Occupation & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Occupation *</label>
                  <select
                    value={watchedOccupation || ''}
                    onChange={(e) => setValue('occupation', e.target.value as any)}
                    className={inputClass(!!errors.occupation)}
                  >
                    <option value="" disabled>Select occupation</option>
                    {occupationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Education *</label>
                  <select
                    value={watchedEducation || ''}
                    onChange={(e) => setValue('education', e.target.value as any)}
                    className={inputClass(!!errors.education)}
                  >
                    <option value="" disabled>Select education</option>
                    {educationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.education && <p className="text-xs text-red-500 mt-1">{errors.education.message}</p>}
                </div>
              </div>

              {/* Sales Experience */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Sales Experience *</label>
                <div className="flex gap-3">
                  {salesExperienceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue('salesExperience', opt.value as any)}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                        watchedSalesExperience === opt.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.salesExperience && <p className="text-xs text-red-500 mt-1">{errors.salesExperience.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                style={{backgroundColor: isSubmitting ? '#6b7280' : '#1e40af'}}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-center text-xs text-neutral-400">
                By submitting, you agree to be contacted about LIC agent opportunities.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

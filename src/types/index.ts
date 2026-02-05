export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface ValueProposition {
  icon: string
  title: string
  description: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  details: string[]
}

export interface CommissionTier {
  type: string
  percentage: number
  description: string
  conditions?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  photo: string
  journey: string
  monthlyIncome: string
  rating: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  whatsapp: string
  officeHours: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
}

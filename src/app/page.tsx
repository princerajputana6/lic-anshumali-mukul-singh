import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ValuePropositions } from '@/components/sections/ValuePropositions'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { CommissionStructure } from '@/components/sections/CommissionStructure'
import { TargetAudience } from '@/components/sections/TargetAudience'
import { ApplicationForm } from '@/components/sections/ApplicationForm'
import { FAQ } from '@/components/sections/FAQ'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ValuePropositions />
        <HowItWorks />
        <CommissionStructure />
        <TargetAudience />
        <ApplicationForm />
        <FAQ />
      </main>
      <Footer />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://liccareer.com/#organization",
                "name": "LIC Career",
                "url": "https://liccareer.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://liccareer.com/images/logo.png"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-98765-43210",
                  "contactType": "customer service",
                  "availableLanguage": ["English", "Hindi"]
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "123 Business District",
                  "addressLocality": "Mumbai",
                  "addressRegion": "Maharashtra",
                  "postalCode": "400001",
                  "addressCountry": "IN"
                }
              },
              {
                "@type": "JobPosting",
                "@id": "https://liccareer.com/#jobposting",
                "title": "LIC Insurance Advisor",
                "description": "Join LIC as an insurance advisor and earn unlimited income with flexible work hours. No investment required, complete training provided.",
                "hiringOrganization": {
                  "@id": "https://liccareer.com/#organization"
                },
                "jobLocation": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN"
                  }
                },
                "employmentType": ["FULL_TIME", "PART_TIME"],
                "baseSalary": {
                  "@type": "MonetaryAmount",
                  "currency": "INR",
                  "value": {
                    "@type": "QuantitativeValue",
                    "minValue": 25000,
                    "maxValue": 100000,
                    "unitText": "MONTH"
                  }
                },
                "qualifications": "Minimum 10th standard education, Age 18+",
                "responsibilities": "Sell insurance policies, provide customer service, build client relationships"
              },
              {
                "@type": "WebSite",
                "@id": "https://liccareer.com/#website",
                "url": "https://liccareer.com",
                "name": "LIC Career",
                "description": "Build your career as an LIC insurance advisor with unlimited earning potential",
                "publisher": {
                  "@id": "https://liccareer.com/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://liccareer.com/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}

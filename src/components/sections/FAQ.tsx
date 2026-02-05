'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqData = [
  {
    id: '1',
    question: 'What qualifications do I need to become an LIC agent?',
    answer: 'You need to be at least 18 years old and have completed 10th standard education. No prior experience in insurance or sales is required. We provide complete training to get you started.',
    category: 'requirements'
  },
  {
    id: '2',
    question: 'How much can I earn as an LIC agent?',
    answer: 'Your earnings depend on your sales performance. You earn 25% commission on first-year premiums, plus renewal income for life. Top performers earn ₹50,000+ monthly. There is no upper limit on your earnings.',
    category: 'earnings'
  },
  {
    id: '3',
    question: 'Is there any investment required to become an LIC agent?',
    answer: 'No, there is absolutely no investment required. The training, study materials, and certification process are completely free. You only start earning after you begin selling policies.',
    category: 'investment'
  },
  {
    id: '4',
    question: 'How long is the training program?',
    answer: 'The mandatory training program is 25 hours, typically completed over 1-2 weeks. This includes insurance fundamentals, product knowledge, sales techniques, and compliance training.',
    category: 'training'
  },
  {
    id: '5',
    question: 'Can I do this part-time along with my current job?',
    answer: 'Yes, absolutely! Many of our successful agents work part-time. You can work evenings, weekends, or any schedule that suits you. The flexible nature makes it perfect for working professionals.',
    category: 'flexibility'
  },
  {
    id: '6',
    question: 'What is the IRDA exam and how difficult is it?',
    answer: 'The IRDA exam is an online test with 50 questions. You need to score 17/50 to pass. We provide free study materials and preparation support. Most candidates pass on their first attempt.',
    category: 'exam'
  },
  {
    id: '7',
    question: 'Do you provide study materials?',
    answer: 'Yes, we provide comprehensive study materials including books, online resources, practice tests, and video tutorials. All materials are provided free of cost to help you prepare for the IRDA exam.',
    category: 'materials'
  },
  {
    id: '8',
    question: 'How soon can I start earning after joining?',
    answer: 'You can start earning immediately after receiving your agent certification, which typically takes 2-3 weeks from application. Your first commission is paid within a week of your first policy sale.',
    category: 'timeline'
  },
  {
    id: '9',
    question: 'What support do I get after becoming an agent?',
    answer: 'You get continuous support including marketing materials, lead generation assistance, ongoing training, technical support, and a dedicated mentor to guide your growth.',
    category: 'support'
  },
  {
    id: '10',
    question: 'Are there any age restrictions for becoming an LIC agent?',
    answer: 'You must be at least 18 years old to become an LIC agent. There is no upper age limit, making it suitable for people at any stage of their career, including retirees.',
    category: 'requirements'
  }
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section id="faq" className="py-20 sm:py-32 bg-neutral-50">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
            Get answers to the most common questions about becoming an LIC insurance advisor
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openItems.includes(faq.id)
            
            return (
              <Card key={faq.id} className="shadow-soft border-0 overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-6 hover:bg-neutral-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg pr-4" style={{color: '#1e40af'}}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5" style={{color: '#1e40af'}} />
                      ) : (
                        <ChevronDown className="h-5 w-5" style={{color: '#1e40af'}} />
                      )}
                    </div>
                  </div>
                </button>
                
                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="border-t border-neutral-200 pt-4">
                      <p className="font-semibold leading-relaxed" style={{color: '#1e40af'}}>
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Still have questions section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary-500 to-secondary-600 border-0 shadow-strong">
            <CardContent className="p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Our team is here to help you understand everything about becoming an LIC agent. 
                Get personalized answers to your specific questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                >
                  📞 Call: +91 98765 43210
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  💬 WhatsApp Chat
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

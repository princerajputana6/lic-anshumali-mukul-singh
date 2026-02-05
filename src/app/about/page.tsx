import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, Button } from '@/components/ui'
import { Award, Users, TrendingUp, Shield, Heart, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - LIC Career | Leading Insurance Career Platform',
  description: 'Learn about LIC Career, your trusted partner for building successful insurance careers. We have helped thousands of agents achieve financial independence.',
  openGraph: {
    title: 'About LIC Career - Your Insurance Career Partner',
    description: 'Learn about our mission to help people build successful insurance careers with LIC.',
  },
}

const stats = [
  { label: 'Active Agents', value: '10,000+', icon: Users },
  { label: 'Years of Experience', value: '15+', icon: Award },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
  { label: 'Training Programs', value: '500+', icon: Target },
]

const values = [
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'We maintain the highest standards of honesty and transparency in all our dealings.'
  },
  {
    icon: Heart,
    title: 'People First',
    description: 'Our agents success is our success. We are committed to your growth and prosperity.'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in training, support, and service delivery.'
  },
]

const team = [
  {
    name: 'Rajesh Kumar',
    position: 'Regional Manager',
    experience: '12 years',
    description: 'Leading our team with extensive experience in insurance and agent development.'
  },
  {
    name: 'Priya Sharma',
    position: 'Training Head',
    experience: '8 years',
    description: 'Expert trainer specializing in insurance products and sales techniques.'
  },
  {
    name: 'Amit Patel',
    position: 'Business Development',
    experience: '10 years',
    description: 'Focused on expanding opportunities and supporting agent growth.'
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
                About LIC Career
              </h1>
              <p className="mt-6 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                We are dedicated to helping individuals build successful careers as LIC insurance advisors. 
                With over 15 years of experience, we have guided thousands of agents to financial independence.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8" style={{color: '#1e40af'}} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold" style={{color: '#1e40af'}}>{stat.value}</div>
                    <div className="text-sm mt-1 font-semibold" style={{color: '#1e40af'}}>{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="shadow-medium border-0">
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-bold mb-4" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                    Our Mission
                  </h2>
                  <p className="leading-relaxed mb-6 font-semibold" style={{color: '#1e40af'}}>
                    To empower individuals from all backgrounds to build successful and sustainable careers 
                    in the insurance industry through comprehensive training, ongoing support, and proven 
                    business strategies.
                  </p>
                  <p className="leading-relaxed font-semibold" style={{color: '#1e40af'}}>
                    We believe that everyone deserves the opportunity to achieve financial independence, 
                    and we are committed to providing the tools, knowledge, and support needed to make 
                    that dream a reality.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium border-0">
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-bold mb-4" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                    Our Vision
                  </h2>
                  <p className="leading-relaxed mb-6 font-semibold" style={{color: '#1e40af'}}>
                    To be the leading platform for insurance career development in India, recognized 
                    for our commitment to agent success, innovative training methods, and exceptional 
                    support services.
                  </p>
                  <p className="leading-relaxed font-semibold" style={{color: '#1e40af'}}>
                    We envision a future where every motivated individual has access to the resources 
                    and opportunities needed to build a thriving insurance career and achieve their 
                    financial goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
                Our Values
              </h2>
              <p className="mt-4 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index} className="text-center shadow-medium border-0 hover:shadow-strong transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                          <IconComponent className="h-8 w-8" style={{color: '#1e40af'}} />
                        </div>
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-4" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                        {value.title}
                      </h3>
                      <p className="leading-relaxed font-semibold" style={{color: '#1e40af'}}>
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                Experienced professionals dedicated to your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center shadow-medium border-0">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                      {member.name}
                    </h3>
                    <p className="font-medium mb-2" style={{color: '#1e40af'}}>{member.position}</p>
                    <p className="text-sm mb-4 font-semibold" style={{color: '#1e40af'}}>{member.experience} experience</p>
                    <p className="leading-relaxed text-sm font-semibold" style={{color: '#1e40af'}}>
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" style={{backgroundColor: '#ffc908'}}>
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              Join thousands of successful agents who have built their careers with our support. 
              Take the first step towards financial independence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#application-form">
                <Button
                  size="xl"
                  variant="accent"
                  className="hover:bg-blue-800"
                  style={{backgroundColor: '#1e40af', color: '#ffffff'}}
                >
                  Apply Now
                </Button>
              </a>
              <a href="/contact">
                <Button
                  size="xl"
                  variant="outline"
                  className="hover:bg-blue-800"
                  style={{backgroundColor: '#1e40af', color: '#ffffff', borderColor: '#1e40af'}}
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

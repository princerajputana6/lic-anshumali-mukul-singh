import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, Button } from '@/components/ui'
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Insurance Career Tips & Success Stories | LIC Career',
  description: 'Read expert tips, success stories, and career guidance for insurance advisors. Learn from experienced LIC agents and grow your insurance career.',
  openGraph: {
    title: 'LIC Career Blog - Insurance Career Tips & Success Stories',
    description: 'Expert advice and success stories for insurance career growth.',
  },
}

// Fetch blogs from API
async function getBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/blogs?published=true`, {
      cache: 'no-store' // Always fetch fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch blogs')
    }
    
    const data = await response.json()
    return {
      blogs: data.blogs || [],
      pagination: data.pagination || { page: 1, totalPages: 1, total: 0 }
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return {
      blogs: [],
      pagination: { page: 1, totalPages: 1, total: 0 }
    }
  }
}

const categories = [
  'All',
  'Career Guidance',
  'Success Stories', 
  'Training',
  'Insurance Tips',
  'Industry News',
  'Sales Techniques'
]

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  featuredImage?: string
  publishedAt?: string
  readTime: number
  views: number
}

export default async function BlogPage() {
  const { blogs } = await getBlogs()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
                LIC Career Blog
              </h1>
              <p className="mt-6 text-lg leading-8 font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
                Expert tips, success stories, and career guidance to help you build a successful 
                insurance career. Learn from experienced agents and industry professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-12 bg-white border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'primary' : 'outline'}
                  size="lg"
                  className="rounded-full hover:bg-blue-800 px-6 py-3"
                  style={{backgroundColor: '#1e40af', color: '#ffffff', borderColor: '#1e40af'}}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: Blog) => (
                <Card key={blog._id} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-0 shadow-medium overflow-hidden">
                  {/* Featured Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-neutral-200 overflow-hidden">
                    {blog.featuredImage ? (
                      <img 
                        src={blog.featuredImage} 
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <span className="text-neutral-500 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium" style={{color: '#1e40af'}}>
                        {blog.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-primary-600 transition-colors" style={{color: '#1e40af'}}>
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="leading-relaxed mb-4 line-clamp-3 font-semibold" style={{color: '#000000'}}>
                      {blog.excerpt}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm mb-4" style={{color: '#000000'}}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" style={{color: '#1e40af'}} />
                          <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" style={{color: '#1e40af'}} />
                          <span>{blog.readTime} min read</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" style={{color: '#1e40af'}} />
                          <span>{blog.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold" style={{color: '#000000'}}>By {blog.author}</span>
                      <Link href={`/blog/${blog.slug}`}>
                        <Button variant="ghost" size="sm" className="group/btn">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                variant="outline"
                className="hover:bg-blue-800"
                style={{backgroundColor: '#1e40af', color: '#ffc908', borderColor: '#1e40af'}}
              >
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20" style={{backgroundColor: '#ffc908'}}>
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              Stay Updated with Latest Tips
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              Get the latest career tips, success stories, and industry insights delivered 
              straight to your inbox. Join thousands of successful LIC agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-300 focus:outline-none font-semibold placeholder:text-blue-600"
                style={{borderColor: '#1e40af', color: '#1e40af'}}
              />
              <Button 
                variant="accent" 
                size="lg"
                className="hover:bg-blue-800"
                style={{backgroundColor: '#1e40af', color: '#ffc908'}}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui'
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
    // Always use the Vercel URL in production
    const baseUrl = 'https://lic-anshumali-mukul-singh-zff5.vercel.app'
    const apiUrl = `${baseUrl}/api/blogs?published=true`
    
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    
    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText)
      return {
        blogs: [],
        pagination: { page: 1, totalPages: 1, total: 0 }
      }
    }
    
    const data = await response.json()
    console.log('API Response:', JSON.stringify(data, null, 2))
    
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
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 sm:py-20" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                LIC Career Blog
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-blue-100">
                Expert tips, success stories, and career guidance to help you build a successful 
                insurance career.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-4 sm:py-6 bg-white border-b border-neutral-200 sticky top-0 z-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-1 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    category === 'All'
                      ? 'text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                  style={category === 'All' ? {backgroundColor: '#1e40af'} : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {blogs.map((blog: Blog) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`} className="group">
                  <Card className="h-full border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white">
                    {/* Featured Image */}
                    <div className="relative overflow-hidden">
                      {blog.featuredImage ? (
                        <img 
                          src={blog.featuredImage} 
                          alt={blog.title}
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-40 sm:h-48 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)'}}>
                          <span className="text-blue-400 text-sm font-medium">No Image</span>
                        </div>
                      )}
                      {/* Category badge on image */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm" style={{backgroundColor: '#1e40af'}}>
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 sm:p-5">
                      {/* Title */}
                      <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                        {blog.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-sm text-neutral-600 mb-3 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                      
                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{blog.readTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{blog.views}</span>
                        </div>
                      </div>
                      
                      {/* Author + Read More */}
                      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                        <span className="text-xs font-semibold text-neutral-500">By {blog.author}</span>
                        <span className="flex items-center text-xs font-semibold gap-1 group-hover:gap-2 transition-all" style={{color: '#1e40af'}}>
                          Read More
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* No Blogs Message */}
            {blogs.length === 0 && (
              <div className="text-center py-16 sm:py-24">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1e40af'}}>
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <p className="text-lg font-bold text-neutral-900 mb-1">No blog posts yet</p>
                <p className="text-sm text-neutral-500">Check back soon for new content!</p>
              </div>
            )}
            
            {/* Load More Button */}
            {blogs.length > 0 && (
              <div className="text-center mt-8 sm:mt-12">
                <button 
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  style={{backgroundColor: '#1e40af'}}
                >
                  Load More Articles
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 sm:py-16" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              Stay Updated with Latest Tips
            </h2>
            <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
              Get career tips, success stories, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder:text-blue-200 focus:ring-2 focus:ring-white/50 focus:outline-none focus:bg-white/20 text-sm sm:text-base transition-colors"
              />
              <button 
                className="px-6 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
                style={{backgroundColor: '#ffc908', color: '#1e40af'}}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

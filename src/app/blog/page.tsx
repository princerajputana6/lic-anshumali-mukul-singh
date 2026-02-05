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

// This would typically fetch from your API
async function getBlogs() {
  // For now, return mock data - replace with actual API call
  return {
    blogs: [
      {
        _id: '1',
        title: '10 Essential Tips for New LIC Insurance Advisors',
        slug: '10-essential-tips-new-lic-advisors',
        excerpt: 'Starting your career as an LIC insurance advisor? Here are the top 10 tips that will help you succeed from day one and build a thriving practice.',
        author: 'Rajesh Kumar',
        category: 'Career Guidance',
        tags: ['tips', 'beginners', 'success'],
        featuredImage: '/images/blog/tips-advisors.jpg',
        publishedAt: '2024-01-15T10:00:00Z',
        readTime: 8,
        views: 245
      },
      {
        _id: '2',
        title: 'Success Story: From Homemaker to Top LIC Agent',
        slug: 'homemaker-to-top-lic-agent-success-story',
        excerpt: 'Meet Priya Sharma, who transformed her life by becoming an LIC agent. Learn how she built a successful career while managing her family responsibilities.',
        author: 'LIC Career Team',
        category: 'Success Stories',
        tags: ['success-story', 'homemaker', 'inspiration'],
        featuredImage: '/images/blog/success-story.jpg',
        publishedAt: '2024-01-10T14:30:00Z',
        readTime: 6,
        views: 189
      },
      {
        _id: '3',
        title: 'Understanding LIC Commission Structure: A Complete Guide',
        slug: 'lic-commission-structure-complete-guide',
        excerpt: 'Confused about LIC commission rates? This comprehensive guide explains everything you need to know about earning potential as an LIC insurance advisor.',
        author: 'Amit Patel',
        category: 'Training',
        tags: ['commission', 'earnings', 'guide'],
        featuredImage: '/images/blog/commission-guide.jpg',
        publishedAt: '2024-01-05T09:15:00Z',
        readTime: 12,
        views: 567
      }
    ],
    pagination: {
      page: 1,
      totalPages: 1,
      total: 3
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
              <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                LIC Career Blog
              </h1>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
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
                  size="sm"
                  className="rounded-full"
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
              {blogs.map((blog) => (
                <Card key={blog._id} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-0 shadow-medium overflow-hidden">
                  {/* Featured Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-neutral-200 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <span className="text-neutral-500 text-sm">Featured Image</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800">
                        {blog.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{blog.readTime} min read</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{blog.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">By {blog.author}</span>
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
              <Button size="lg" variant="outline">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-600">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Stay Updated with Latest Tips
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest career tips, success stories, and industry insights delivered 
              straight to your inbox. Join thousands of successful LIC agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button variant="accent" size="lg">
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

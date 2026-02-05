import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui'
import { Calendar, Clock, Eye, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogPost {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  featuredImage?: string
  publishedAt: string
  readTime: number
  views: number
}

// This would typically fetch from your API
async function getBlog(slug: string): Promise<BlogPost | null> {
  // Mock data - replace with actual API call
  const mockBlogs: Record<string, BlogPost> = {
    '10-essential-tips-new-lic-advisors': {
      _id: '1',
      title: '10 Essential Tips for New LIC Insurance Advisors',
      slug: '10-essential-tips-new-lic-advisors',
      content: `
        <h2>Starting Your Journey as an LIC Insurance Advisor</h2>
        <p>Becoming a successful LIC insurance advisor requires more than just passing the IRDA exam. Here are 10 essential tips that will help you build a thriving practice from day one.</p>
        
        <h3>1. Build Strong Relationships</h3>
        <p>Success in insurance is built on trust. Focus on building genuine relationships with your clients rather than just making sales. Listen to their needs, understand their financial goals, and provide solutions that truly benefit them.</p>
        
        <h3>2. Master Product Knowledge</h3>
        <p>Know LIC's products inside and out. Understanding the features, benefits, and ideal use cases for each policy will help you make better recommendations and answer client questions confidently.</p>
        
        <h3>3. Develop a Systematic Approach</h3>
        <p>Create a structured process for prospecting, presenting, and following up. Having a system ensures you don't miss opportunities and helps you scale your business effectively.</p>
        
        <h3>4. Leverage Technology</h3>
        <p>Use LIC's digital tools and mobile apps to streamline your work. From policy illustrations to premium calculations, technology can save you time and improve accuracy.</p>
        
        <h3>5. Focus on Referrals</h3>
        <p>Happy clients are your best source of new business. Always ask satisfied customers for referrals and maintain relationships with your existing client base.</p>
        
        <h3>6. Continuous Learning</h3>
        <p>The insurance industry is constantly evolving. Stay updated with new products, regulations, and market trends through regular training and professional development.</p>
        
        <h3>7. Time Management</h3>
        <p>Plan your day effectively. Allocate specific time blocks for prospecting, client meetings, administrative work, and personal development.</p>
        
        <h3>8. Professional Presentation</h3>
        <p>Your appearance and communication style reflect your professionalism. Dress appropriately, speak clearly, and always be punctual for appointments.</p>
        
        <h3>9. Handle Objections Gracefully</h3>
        <p>Learn common objections and prepare thoughtful responses. Remember, objections often indicate interest - they're opportunities to provide more information.</p>
        
        <h3>10. Stay Persistent but Respectful</h3>
        <p>Follow up consistently without being pushy. Respect your prospects' time and decisions while maintaining regular, valuable contact.</p>
        
        <h2>Conclusion</h2>
        <p>Success as an LIC insurance advisor doesn't happen overnight, but by following these essential tips and staying committed to your goals, you can build a rewarding and profitable career in the insurance industry.</p>
      `,
      excerpt: 'Starting your career as an LIC insurance advisor? Here are the top 10 tips that will help you succeed from day one and build a thriving practice.',
      author: 'Rajesh Kumar',
      category: 'Career Guidance',
      tags: ['tips', 'beginners', 'success'],
      featuredImage: '/images/blog/tips-advisors.jpg',
      publishedAt: '2024-01-15T10:00:00Z',
      readTime: 8,
      views: 245
    }
  }
  
  return mockBlogs[slug] || null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlog(params.slug)
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found | LIC Career',
      description: 'The requested blog post could not be found.'
    }
  }
  
  return {
    title: `${blog.title} | LIC Career Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author],
      tags: blog.tags,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug)
  
  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <section className="py-8 bg-neutral-50 border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800">
                {blog.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-6">
              {blog.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {blog.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="font-medium">By {blog.author}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime} min read</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{blog.views} views</span>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-sm font-medium text-neutral-700">Share:</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mb-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl overflow-hidden shadow-medium">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <span className="text-neutral-500">Featured Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div 
              className="prose prose-lg prose-neutral max-w-none
                prose-headings:font-heading prose-headings:font-semibold prose-headings:text-neutral-900
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-neutral-900 prose-strong:font-semibold
                prose-ul:my-6 prose-li:my-2
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:text-primary-700 hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-600">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Ready to Start Your LIC Career?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Apply the tips you've learned and take the first step towards building a successful 
              insurance career with comprehensive training and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#application-form">
                <Button variant="accent" size="xl">
                  Apply Now
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

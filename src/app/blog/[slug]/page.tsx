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

// Fetch blog from API
async function getBlog(slug: string, isPreview: boolean = false): Promise<BlogPost | null> {
  try {
    // Always use the Vercel URL in production
    const baseUrl = 'https://lic-anshumali-mukul-singh-zff5.vercel.app'
    const url = isPreview 
      ? `${baseUrl}/api/blogs/${slug}?admin=true`
      : `${baseUrl}/api/blogs/${slug}`
    
    console.log('Fetching blog from:', url)
    
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    
    console.log('Blog API Response status:', response.status)
    
    if (!response.ok) {
      console.error('Blog fetch failed:', response.status, response.statusText)
      return null
    }
    
    const data = await response.json()
    console.log('Blog data received:', JSON.stringify(data, null, 2))
    
    return data.blog || null
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function generateMetadata({ params, searchParams }: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ preview?: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const blog = await getBlog(slug, isPreview)
  
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

export default async function BlogPostPage({ params, searchParams }: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ preview?: string }>
}) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const blog = await getBlog(slug, isPreview)
  
  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Preview Banner */}
        {isPreview && (
          <div className="py-3 text-center font-bold" style={{backgroundColor: '#ffc908', color: '#1e40af'}}>
            ⚠️ PREVIEW MODE - This is an unpublished blog (only visible to admins)
          </div>
        )}
        
        {/* Breadcrumb */}
        <section className="py-8 bg-gradient-to-br from-primary-50 to-secondary-50 border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center font-bold hover:underline" style={{color: '#1e40af'}}>
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
              <span className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold" style={{backgroundColor: '#ffc908', color: '#1e40af'}}>
                {blog.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-6" style={{color: '#1e40af', textShadow: '2px 2px 4px rgba(255,255,255,0.5)'}}>
              {blog.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8" style={{color: '#000000'}}>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#1e40af'}}>
                  <span className="text-white font-bold text-sm">
                    {blog.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="font-bold">By {blog.author}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" style={{color: '#1e40af'}} />
                <span className="font-semibold">{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" style={{color: '#1e40af'}} />
                <span className="font-semibold">{blog.readTime} min read</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" style={{color: '#1e40af'}} />
                <span className="font-semibold">{blog.views} views</span>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-sm font-bold" style={{color: '#000000'}}>Share:</span>
              <Button variant="outline" size="sm" className="gap-2 hover:bg-blue-800" style={{backgroundColor: '#1e40af', color: '#ffffff', borderColor: '#1e40af'}}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md px-3 py-1 text-sm font-bold transition-colors cursor-pointer hover:opacity-80"
                  style={{backgroundColor: '#1e40af', color: '#ffffff'}}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {blog.featuredImage && (
          <section className="mb-12">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="rounded-xl overflow-hidden shadow-medium">
                <img 
                  src={blog.featuredImage} 
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                  style={{maxHeight: '500px'}}
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <article 
              className="prose prose-lg max-w-none"
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {blog.content.split('\n').map((paragraph, index) => {
                if (!paragraph.trim()) return null
                return (
                  <p key={index} className="mb-6 text-xl leading-relaxed font-semibold" style={{color: '#000000'}}>
                    {paragraph}
                  </p>
                )
              })}
            </article>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16" style={{backgroundColor: '#ffc908'}}>
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              Ready to Start Your LIC Career?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-bold" style={{color: '#1e40af', textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
              Apply the tips you've learned and take the first step towards building a successful 
              insurance career with comprehensive training and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#application-form">
                <Button size="xl" className="hover:bg-blue-800" style={{backgroundColor: '#1e40af', color: '#ffc908'}}>
                  Apply Now
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="xl" className="hover:bg-blue-800" style={{backgroundColor: '#1e40af', color: '#ffffff', borderColor: '#1e40af'}}>
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

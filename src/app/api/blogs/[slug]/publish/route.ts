import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

// PATCH /api/blogs/[slug]/publish - Toggle publish status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    
    const { published } = await request.json()
    const { slug } = await params
    
    const blog = await Blog.findOne({ slug })
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    blog.published = published
    
    // Set publishedAt date when publishing for the first time
    if (published && !blog.publishedAt) {
      blog.publishedAt = new Date()
    }
    
    await blog.save()
    
    return NextResponse.json({
      success: true,
      data: blog,
      message: published ? 'Blog published successfully' : 'Blog unpublished successfully'
    })
    
  } catch (error: any) {
    console.error('Error toggling publish status:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update blog status',
        error: error.message
      },
      { status: 500 }
    )
  }
}

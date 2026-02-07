import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

// GET /api/blogs/[slug] - Get single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    
    const { slug } = await params
    
    // For admin, don't filter by published status
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('admin') === 'true'
    
    const query = includeUnpublished ? { slug } : { slug, published: true }
    const blog = await Blog.findOne(query)
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    // Only increment views for public requests
    if (!includeUnpublished) {
      await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } })
    }
    
    return NextResponse.json({
      success: true,
      blog: blog
    })
    
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT /api/blogs/[slug] - Update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { slug } = await params
    
    const blog = await Blog.findOneAndUpdate(
      { slug },
      {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        author: body.author,
        category: body.category,
        tags: body.tags,
        featuredImage: body.featuredImage,
        published: body.published
      },
      { new: true }
    )
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog updated successfully'
    })
    
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE /api/blogs/[slug] - Delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    
    const { slug } = await params
    const blog = await Blog.findOneAndDelete({ slug })
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

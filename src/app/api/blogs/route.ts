import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

// GET /api/blogs - Get all published blogs
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    
    const skip = (page - 1) * limit
    
    // Build query
    let query: any = { published: true }
    
    if (category) {
      query.category = category
    }
    
    if (tag) {
      query.tags = tag
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }
    
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content') // Exclude full content for listing
    
    const total = await Blog.countDocuments(query)
    const totalPages = Math.ceil(total / limit)
    
    return NextResponse.json({
      success: true,
      data: {
        blogs,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST /api/blogs - Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Basic validation
    if (!body.title || !body.content || !body.excerpt) {
      return NextResponse.json(
        { success: false, message: 'Title, content, and excerpt are required' },
        { status: 400 }
      )
    }
    
    // Create blog
    const blog = new Blog({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      author: body.author || 'LIC Career Team',
      category: body.category || 'Career Guidance',
      tags: body.tags || [],
      featuredImage: body.featuredImage,
      published: body.published || false
    })
    
    await blog.save()
    
    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog created successfully'
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('Error creating blog:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Blog with this slug already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

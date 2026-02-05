'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle, Input, Textarea, Select, Button, Label } from '@/components/ui'
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react'

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt too long'),
  author: z.string().min(1, 'Author is required'),
  category: z.enum([
    'Insurance Tips',
    'Career Guidance', 
    'Success Stories',
    'Training',
    'Industry News',
    'Sales Techniques',
    'Financial Planning'
  ]),
  tags: z.string(),
  featuredImage: z.string().optional(),
  published: z.boolean()
})

type BlogFormData = z.infer<typeof blogSchema>

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  published: boolean
  publishedAt?: string
  views: number
  readTime: number
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      author: 'LIC Career Team',
      category: 'Career Guidance',
      published: false
    }
  })

  // Mock data for demonstration
  useEffect(() => {
    setBlogs([
      {
        _id: '1',
        title: '10 Essential Tips for New LIC Insurance Advisors',
        slug: '10-essential-tips-new-lic-advisors',
        excerpt: 'Starting your career as an LIC insurance advisor? Here are the top 10 tips...',
        author: 'Rajesh Kumar',
        category: 'Career Guidance',
        tags: ['tips', 'beginners', 'success'],
        published: true,
        publishedAt: '2024-01-15T10:00:00Z',
        views: 245,
        readTime: 8
      },
      {
        _id: '2',
        title: 'Success Story: From Homemaker to Top LIC Agent',
        slug: 'homemaker-to-top-lic-agent-success-story',
        excerpt: 'Meet Priya Sharma, who transformed her life by becoming an LIC agent...',
        author: 'LIC Career Team',
        category: 'Success Stories',
        tags: ['success-story', 'homemaker', 'inspiration'],
        published: true,
        publishedAt: '2024-01-10T14:30:00Z',
        views: 189,
        readTime: 6
      }
    ])
  }, [])

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true)
    try {
      const blogData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      }

      if (editingBlog) {
        // Update existing blog
        const response = await fetch(`/api/blogs/${editingBlog.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        })

        if (response.ok) {
          // Update local state
          setBlogs(blogs.map(blog => 
            blog._id === editingBlog._id 
              ? { ...blog, ...blogData, tags: blogData.tags }
              : blog
          ))
          alert('Blog updated successfully!')
        } else {
          alert('Failed to update blog')
        }
      } else {
        // Create new blog
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        })

        if (response.ok) {
          const result = await response.json()
          setBlogs([result.data, ...blogs])
          alert('Blog created successfully!')
        } else {
          alert('Failed to create blog')
        }
      }

      handleCancel()
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('An error occurred while saving the blog')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setIsEditing(true)
    setValue('title', blog.title)
    setValue('excerpt', blog.excerpt)
    setValue('author', blog.author)
    setValue('category', blog.category as any)
    setValue('tags', blog.tags.join(', '))
    setValue('published', blog.published)
    // Note: content would need to be fetched from API in real implementation
    setValue('content', 'Blog content would be loaded here...')
  }

  const handleDelete = async (blog: Blog) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs/${blog.slug}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBlogs(blogs.filter(b => b._id !== blog._id))
        alert('Blog deleted successfully!')
      } else {
        alert('Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('An error occurred while deleting the blog')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingBlog(null)
    reset()
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
            Blog Management
          </h1>
          <p className="text-neutral-600">
            Create, edit, and manage your blog posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                  {isEditing && (
                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter blog title"
                      error={errors.title?.message}
                      {...register('title')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of the blog post"
                      rows={3}
                      error={errors.excerpt?.message}
                      {...register('excerpt')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      placeholder="Author name"
                      error={errors.author?.message}
                      {...register('author')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      placeholder="Select category"
                      error={errors.category?.message}
                      {...register('category')}
                    >
                      <option value="Insurance Tips">Insurance Tips</option>
                      <option value="Career Guidance">Career Guidance</option>
                      <option value="Success Stories">Success Stories</option>
                      <option value="Training">Training</option>
                      <option value="Industry News">Industry News</option>
                      <option value="Sales Techniques">Sales Techniques</option>
                      <option value="Financial Planning">Financial Planning</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Enter tags separated by commas"
                      error={errors.tags?.message}
                      {...register('tags')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="featuredImage">Featured Image URL</Label>
                    <Input
                      id="featuredImage"
                      placeholder="https://example.com/image.jpg"
                      error={errors.featuredImage?.message}
                      {...register('featuredImage')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your blog content here (HTML supported)"
                      rows={8}
                      error={errors.content?.message}
                      {...register('content')}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                      {...register('published')}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update Blog' : 'Create Blog'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Blog List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Blog Posts ({blogs.length})
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="border border-neutral-200 rounded-lg p-4 hover:shadow-soft transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-neutral-900">
                              {blog.title}
                            </h3>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              blog.published 
                                ? 'bg-success-100 text-success-800' 
                                : 'bg-warning-100 text-warning-800'
                            }`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          
                          <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
                            {blog.excerpt}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-neutral-500">
                            <span>By {blog.author}</span>
                            <span>{blog.category}</span>
                            <span>{blog.views} views</span>
                            <span>{blog.readTime} min read</span>
                            {blog.publishedAt && (
                              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {blog.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(blog)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(blog)}
                            className="text-error-600 hover:text-error-700 hover:bg-error-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {blogs.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-neutral-500 mb-4">No blog posts yet</p>
                      <Button onClick={() => setIsEditing(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Post
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

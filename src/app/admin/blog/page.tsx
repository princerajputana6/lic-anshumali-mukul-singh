'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle, Input, Textarea, Select, Button, Label } from '@/components/ui'
import { Plus, Edit, Trash2, Eye, Save, X, Upload, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

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
  featuredImage?: string
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)
  const [publishingBlogId, setPublishingBlogId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      author: 'LIC Career Team',
      category: 'Career Guidance',
      published: false
    }
  })

  const watchedCategory = watch('category')

  // Fetch blogs from API
  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      
      if (response.ok) {
        const data = await response.json()
        const blogsList = data.blogs || data.data?.blogs || []
        setBlogs(blogsList)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

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
          // Refresh blogs from API
          await fetchBlogs()
          toast.success('Blog updated successfully! 🎉')
        } else {
          const errorData = await response.json()
          toast.error(errorData.error || 'Failed to update blog')
        }
      } else {
        // Create new blog
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData)
        })

        if (response.ok) {
          // Refresh blogs from API
          await fetchBlogs()
          toast.success('Blog created successfully! 🎉')
        } else {
          const errorData = await response.json()
          toast.error(errorData.error || 'Failed to create blog')
        }
      }

      handleCancel()
    } catch (error) {
      toast.error('An error occurred while saving the blog')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (blog: Blog) => {
    setEditingBlog(blog)
    setIsEditing(true)
    
    // Fetch full blog details including content
    try {
      const response = await fetch(`/api/blogs/${blog.slug}?admin=true`)
      if (response.ok) {
        const data = await response.json()
        const fullBlog = data.blog || data.data?.blog || data
        
        setValue('title', fullBlog.title)
        setValue('excerpt', fullBlog.excerpt)
        setValue('author', fullBlog.author)
        setValue('category', fullBlog.category as any)
        setValue('tags', fullBlog.tags.join(', '))
        setValue('published', fullBlog.published)
        setValue('content', fullBlog.content || '')
        setValue('featuredImage', fullBlog.featuredImage || '')
        
        if (fullBlog.featuredImage) {
          setImagePreview(fullBlog.featuredImage)
        }
      } else {
        // Fallback to basic data
        setValue('title', blog.title)
        setValue('excerpt', blog.excerpt)
        setValue('author', blog.author)
        setValue('category', blog.category as any)
        setValue('tags', blog.tags.join(', '))
        setValue('published', blog.published)
        setValue('content', '')
      }
    } catch (error) {
      toast.error('Could not load blog content')
    }
  }

  const handleTogglePublish = async (blog: Blog) => {
    setPublishingBlogId(blog._id)
    try {
      const response = await fetch(`/api/blogs/${blog.slug}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !blog.published })
      })

      if (response.ok) {
        await fetchBlogs()
        toast.success(blog.published ? 'Blog unpublished!' : 'Blog published! 🎉')
      } else {
        toast.error('Failed to update blog status')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setPublishingBlogId(null)
    }
  }

  const handleDeleteClick = (blog: Blog) => {
    setBlogToDelete(blog)
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return

    try {
      const response = await fetch(`/api/blogs/${blogToDelete.slug}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchBlogs()
        toast.success('Blog deleted successfully! 🗑️')
      } else {
        toast.error('Failed to delete blog')
      }
    } catch (error) {
      toast.error('An error occurred while deleting the blog')
    } finally {
      setShowDeleteConfirm(false)
      setBlogToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
    setBlogToDelete(null)
    toast('Delete cancelled', {
      icon: 'ℹ️',
      duration: 2000,
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingBlog(null)
    setImagePreview('')
    reset()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setUploadingImage(true)

    try {
      // Create FormData for upload
      const formData = new FormData()
      formData.append('image', file)

      // Upload to ImgBB API (free service)
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
      
      if (apiKey && apiKey !== 'YOUR_IMGBB_API_KEY') {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          const imageUrl = data.data.url
          setValue('featuredImage', imageUrl)
          setImagePreview(imageUrl)
          toast.success('Image uploaded successfully!')
          setUploadingImage(false)
          return
        }
      }
      
      // Fallback to base64 if API key not configured or upload fails
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setValue('featuredImage', base64String)
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      // Fallback to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setValue('featuredImage', base64String)
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    } finally {
      setUploadingImage(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-4 sm:py-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1e40af',
            border: '1px solid #1e40af',
          },
          success: {
            iconTheme: {
              primary: '#1e40af',
              secondary: '#ffc908',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-1 sm:mb-2" style={{color: '#1e40af'}}>
            Blog Management
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            Create, edit, and manage your blog posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8">
          {/* Blog Form - Left Side */}
          <div className="lg:col-span-2">
            <Card className="lg:sticky lg:top-8 shadow-xl border-2" style={{borderColor: '#1e40af'}}>
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}}>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#ffc908'}}>
                      {isEditing ? <Edit className="h-4 w-4 sm:h-5 sm:w-5" style={{color: '#1e40af'}} /> : <Plus className="h-4 w-4 sm:h-5 sm:w-5" style={{color: '#1e40af'}} />}
                    </div>
                    <span className="text-white font-bold text-base sm:text-xl">
                      {isEditing ? 'Edit Blog Post' : 'Create New Blog'}
                    </span>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm" onClick={handleCancel} className="text-white hover:bg-white/20">
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-bold flex items-center" style={{color: '#1e40af'}}>
                      <span className="mr-2">📝</span> Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter an engaging blog title"
                      error={errors.title?.message}
                      {...register('title')}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-sm font-bold flex items-center" style={{color: '#1e40af'}}>
                      <span className="mr-2">✍️</span> Excerpt *
                    </Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Write a compelling summary (max 300 characters)"
                      rows={3}
                      error={errors.excerpt?.message}
                      {...register('excerpt')}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>

                  {/* Author and Category - Inline */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author" className="text-sm font-bold flex items-center" style={{color: '#1e40af'}}>
                        <span className="mr-2">👤</span> Author *
                      </Label>
                      <Input
                        id="author"
                        placeholder="Author name"
                        error={errors.author?.message}
                        {...register('author')}
                        className="border-2 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-bold flex items-center" style={{color: '#1e40af'}}>
                        <span className="mr-2">📂</span> Category *
                      </Label>
                      <Select
                        id="category"
                        placeholder="Select category"
                        value={watchedCategory}
                        onChange={(e) => setValue('category', e.target.value as any)}
                        error={errors.category?.message}
                        className="border-2 focus:border-blue-500"
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-sm font-bold flex items-center" style={{color: '#1e40af'}}>
                      <span className="mr-2">🏷️</span> Tags
                    </Label>
                    <Input
                      id="tags"
                      placeholder="e.g., insurance, career, tips"
                      error={errors.tags?.message}
                      {...register('tags')}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featuredImage" className="text-sm font-bold flex items-center" style={{color: '#1e40af'}}>
                      <span className="mr-2">🖼️</span> Featured Image
                    </Label>
                    <div className="space-y-3">
                      {/* Image Upload Button */}
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor="imageUpload"
                          className="flex-1 flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:scale-105"
                          style={{
                            borderColor: uploadingImage ? '#ffc908' : '#1e40af',
                            backgroundColor: uploadingImage ? '#fef3c7' : '#eff6ff'
                          }}
                        >
                          <Upload className="h-6 w-6 mr-3" style={{color: '#1e40af'}} />
                          <span className="text-sm font-bold" style={{color: '#1e40af'}}>
                            {uploadingImage ? '⏳ Uploading...' : '📤 Click to Upload'}
                          </span>
                        </label>
                        <input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </div>

                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="relative rounded-xl overflow-hidden border-2" style={{borderColor: '#1e40af'}}>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-56 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview('')
                              setValue('featuredImage', '')
                            }}
                            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg transition-all hover:scale-110"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg" style={{backgroundColor: '#ffc908'}}>
                            <span className="text-xs font-bold" style={{color: '#1e40af'}}>✓ Image Ready</span>
                          </div>
                        </div>
                      )}

                      {/* Manual URL Input */}
                      <div>
                        <Input
                          id="featuredImage"
                          placeholder="🔗 Or paste image URL directly"
                          error={errors.featuredImage?.message}
                          {...register('featuredImage')}
                          onChange={(e) => {
                            setValue('featuredImage', e.target.value)
                            if (e.target.value) {
                              setImagePreview(e.target.value)
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-bold flex items-center" style={{color: '#1e40af'}}>
                      <span className="mr-2">📄</span> Content *
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Write your blog content here...\n\nTip: Use line breaks to separate paragraphs"
                      rows={12}
                      error={errors.content?.message}
                      {...register('content')}
                      className="border-2 focus:border-blue-500 font-mono text-sm"
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-xl" style={{backgroundColor: '#eff6ff', border: '2px solid #1e40af'}}>
                    <input
                      type="checkbox"
                      id="published"
                      {...register('published')}
                      className="h-5 w-5 rounded border-2 cursor-pointer"
                      style={{accentColor: '#1e40af'}}
                    />
                    <Label htmlFor="published" className="cursor-pointer font-bold flex items-center" style={{color: '#1e40af'}}>
                      <span className="mr-2">🚀</span> Publish immediately
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 sm:py-6 text-base sm:text-lg font-bold hover:bg-blue-800 transition-all hover:scale-105 shadow-lg"
                    style={{backgroundColor: loading ? '#9ca3af' : '#1e40af', color: '#ffffff'}}
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin mr-3">⏳</span>
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-3" />
                        {isEditing ? '✓ Update Blog' : '✨ Create Blog'}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Blog List - Right Side */}
          <div className="lg:col-span-3">
            <Card className="border border-neutral-200 shadow-sm">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span>Blog Posts ({blogs.length})</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="hover:bg-blue-800 text-xs sm:text-sm"
                    style={{backgroundColor: '#1e40af', color: '#ffc908', borderColor: '#1e40af'}}
                  >
                    <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                    New Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="border border-neutral-200 rounded-xl p-3 sm:p-4 hover:shadow-soft transition-shadow"
                    >
                      {/* Mobile: stack vertically. Desktop: side by side */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        {/* Thumbnail Image */}
                        {blog.featuredImage && (
                          <div className="flex-shrink-0">
                            <img 
                              src={blog.featuredImage} 
                              alt={blog.title}
                              className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg border border-neutral-200"
                            />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1.5">
                            <h3 className="font-semibold text-sm sm:text-base leading-snug line-clamp-2" style={{color: '#1e40af'}}>
                              {blog.title}
                            </h3>
                            <span className={`flex-shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              blog.published 
                                ? 'bg-green-600' 
                                : 'bg-warning-100'
                            }`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        
                          <p className="text-xs sm:text-sm mb-2 line-clamp-2 text-neutral-600">
                            {blog.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
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
                                className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                        
                      {/* Action buttons - always at bottom, horizontal scroll on mobile */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
                        {!blog.published ? (
                          <Button
                            size="sm"
                            onClick={() => handleTogglePublish(blog)}
                            disabled={publishingBlogId === blog._id}
                            className="hover:bg-green-700 text-xs sm:text-sm"
                            style={{backgroundColor: publishingBlogId === blog._id ? '#9ca3af' : '#10b981', color: '#ffffff'}}
                          >
                            {publishingBlogId === blog._id ? (
                              <>
                                <span className="animate-spin mr-1">⏳</span>
                                Publishing...
                              </>
                            ) : (
                              'Publish'
                            )}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleTogglePublish(blog)}
                            disabled={publishingBlogId === blog._id}
                            className="hover:bg-orange-700 text-xs sm:text-sm"
                            style={{backgroundColor: publishingBlogId === blog._id ? '#9ca3af' : '#f97316', color: '#ffffff'}}
                          >
                            {publishingBlogId === blog._id ? (
                              <>
                                <span className="animate-spin mr-1">⏳</span>
                                Unpublishing...
                              </>
                            ) : (
                              'Unpublish'
                            )}
                          </Button>
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const url = blog.published 
                                ? `/blog/${blog.slug}` 
                                : `/blog/${blog.slug}?preview=true`
                              window.open(url, '_blank')
                            }}
                            title={blog.published ? 'View published blog' : 'Preview unpublished blog'}
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
                            onClick={() => handleDeleteClick(blog)}
                            className="hover:bg-red-100"
                            style={{color: '#ef4444'}}
                            title="Delete blog"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {blogs.length === 0 && (
                    <div className="text-center py-10 sm:py-12">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#1e40af'}}>
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <p className="mb-4 text-sm sm:text-base font-semibold text-neutral-600">No blog posts yet</p>
                      <Button 
                        onClick={() => setIsEditing(true)}
                        className="hover:bg-blue-800 text-sm"
                        style={{backgroundColor: '#1e40af', color: '#ffc908'}}
                      >
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
      
      {/* Custom Delete Confirmation Dialog */}
      {showDeleteConfirm && blogToDelete && (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-0 sm:p-4">
        <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-200" style={{backgroundColor: '#fef2f2'}}>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#ef4444'}}>
                  <Trash2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold" style={{color: '#ef4444'}}>Delete Blog Post</h3>
                <p className="text-xs sm:text-sm text-neutral-600">This action cannot be undone</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <p className="text-sm sm:text-base mb-3 sm:mb-4 font-semibold text-neutral-900">
              Are you sure you want to delete this blog post?
            </p>
            <div className="bg-neutral-50 rounded-lg p-3 sm:p-4 border border-neutral-200">
              <p className="text-xs font-bold mb-1" style={{color: '#1e40af'}}>Blog Title:</p>
              <p className="text-sm sm:text-base font-semibold text-neutral-900">{blogToDelete.title}</p>
            </div>
            <div className="mt-3 sm:mt-4 flex items-start space-x-2 p-3 rounded-lg" style={{backgroundColor: '#fef2f2'}}>
              <span className="text-base sm:text-lg">⚠️</span>
              <p className="text-xs sm:text-sm font-semibold" style={{color: '#ef4444'}}>
                This will permanently delete the blog post and all its content.
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-neutral-50 border-t border-neutral-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              className="font-bold w-full sm:w-auto"
              style={{borderColor: '#1e40af', color: '#1e40af'}}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="font-bold hover:bg-red-700 w-full sm:w-auto"
              style={{backgroundColor: '#ef4444', color: '#ffffff'}}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Blog
            </Button>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

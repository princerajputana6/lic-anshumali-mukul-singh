import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  featuredImage?: string
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  readTime: number
  views: number
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    default: 'LIC Career Team'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Insurance Tips',
      'Career Guidance', 
      'Success Stories',
      'Training',
      'Industry News',
      'Sales Techniques',
      'Financial Planning'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    default: null
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  readTime: {
    type: Number,
    default: 5 // minutes
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Create indexes
BlogSchema.index({ slug: 1 })
BlogSchema.index({ published: 1, publishedAt: -1 })
BlogSchema.index({ category: 1 })
BlogSchema.index({ tags: 1 })

// Pre-save middleware to generate slug and calculate read time
BlogSchema.pre('save', function(this: IBlog) {
  // Always generate slug from title if slug is not set
  if (!this.slug || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }
  
  if (this.isModified('content')) {
    // Calculate read time (average 200 words per minute)
    const wordCount = this.content.split(/\s+/).length
    this.readTime = Math.ceil(wordCount / 200)
  }
  
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date()
  }
})

// Static methods
BlogSchema.statics.findPublished = function() {
  return this.find({ published: true }).sort({ publishedAt: -1 })
}

BlogSchema.statics.findByCategory = function(category: string) {
  return this.find({ published: true, category }).sort({ publishedAt: -1 })
}

BlogSchema.statics.findByTag = function(tag: string) {
  return this.find({ published: true, tags: tag }).sort({ publishedAt: -1 })
}

// Instance methods
BlogSchema.methods.incrementViews = function(this: IBlog) {
  this.views += 1
  return this.save()
}

// Clear the model from cache if it exists to ensure schema updates are applied
if (mongoose.models.Blog) {
  delete mongoose.models.Blog
}

const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema)

export default Blog

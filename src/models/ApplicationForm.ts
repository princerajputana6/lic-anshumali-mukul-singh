import mongoose from 'mongoose'

const ApplicationFormSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  
  // Location Information
  city: {
    type: String,
    required: true,
    trim: true
  },
  
  // Professional Information
  occupation: {
    type: String,
    required: true,
    trim: true
  },
  education: {
    type: String,
    required: true,
    enum: ['10th', '12th', 'graduate', 'post-graduate']
  },
  salesExperience: {
    type: Boolean,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
ApplicationFormSchema.index({ email: 1 })
ApplicationFormSchema.index({ mobile: 1 })
ApplicationFormSchema.index({ createdAt: -1 })

// Prevent duplicate submissions from same email
ApplicationFormSchema.index({ email: 1 }, { unique: true })

// Clear the model from cache if it exists to ensure schema updates are applied
if (mongoose.models.ApplicationForm) {
  delete mongoose.models.ApplicationForm
}

const ApplicationForm = mongoose.model('ApplicationForm', ApplicationFormSchema)

export default ApplicationForm

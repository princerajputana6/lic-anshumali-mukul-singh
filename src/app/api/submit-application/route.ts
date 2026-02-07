import { NextRequest, NextResponse } from 'next/server'
import { applicationFormSchema } from '@/lib/validations'
import { Resend } from 'resend'
import connectDB from '@/lib/mongodb'
import ApplicationForm from '@/models/ApplicationForm'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = applicationFormSchema.parse(body)
    
    // Only connect to MongoDB if MONGODB_URI is configured
    let savedApplication = null
    if (process.env.MONGODB_URI) {
      try {
        // Connect to MongoDB
        await connectDB()
        
        // Get client IP and user agent for tracking
        const clientIP = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown'
        const userAgent = request.headers.get('user-agent') || 'unknown'
        
        // Save to MongoDB
        const applicationFormData = new ApplicationForm({
          fullName: validatedData.fullName,
          email: validatedData.email,
          mobile: validatedData.mobile,
          city: validatedData.city,
          occupation: validatedData.occupation,
          education: validatedData.education,
          salesExperience: validatedData.salesExperience === 'yes',
          reason: validatedData.reason
        })
        
        // Save to database
        savedApplication = await applicationFormData.save()
        console.log('Application saved to MongoDB:', savedApplication._id)
      } catch (dbError) {
        console.error('MongoDB error (continuing without saving):', dbError)
        // Continue with email sending even if DB save fails
      }
    } else {
      console.log('MongoDB not configured - skipping database save')
    }
    
    // Create email content for admin
    const adminEmailHtml = `
      <h2>New LIC Agent Application</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Applicant Details:</h3>
        <p><strong>Name:</strong> ${validatedData.fullName}</p>
        <p><strong>Mobile:</strong> ${validatedData.mobile}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>City:</strong> ${validatedData.city}</p>
        <p><strong>Occupation:</strong> ${validatedData.occupation}</p>
        <p><strong>Education:</strong> ${validatedData.education}</p>
        <p><strong>Sales Experience:</strong> ${validatedData.salesExperience}</p>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Reason for Interest:</h3>
        <p>${validatedData.reason}</p>
      </div>
      <p><em>Application submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</em></p>
    `

    // Create confirmation email for applicant
    const applicantEmailHtml = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #FF6B35, #003366); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to LIC Career!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your application has been received successfully</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p>Dear ${validatedData.fullName},</p>
          
          <p>Thank you for your interest in becoming an LIC Insurance Advisor! We have successfully received your application and are excited to help you start your journey toward financial independence.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B35;">
            <h3 style="margin-top: 0; color: #FF6B35;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our team will contact you within 24 hours</li>
              <li>You'll receive your free study materials via email</li>
              <li>We'll schedule your training session</li>
              <li>You'll get guidance on the IRDA exam preparation</li>
            </ul>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #28a745;">Your Application Summary:</h3>
            <p><strong>Mobile:</strong> ${validatedData.mobile}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>City:</strong> ${validatedData.city}</p>
            <p><strong>Current Occupation:</strong> ${validatedData.occupation}</p>
            <p><strong>Education:</strong> ${validatedData.education}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="margin-bottom: 15px;">Have questions? We're here to help!</p>
            <div style="display: inline-block; background: #FF6B35; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 0 10px;">
              📞 Call: +91 88006 74722
            </div>
            <div style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 0 10px;">
              💬 WhatsApp: +91 88006 74722
            </div>
          </div>
          
          <p>Best regards,<br>
          <strong>LIC Career Team</strong><br>
          Building successful insurance careers since 2020</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            This email was sent because you submitted an application on our website. 
            If you did not request this, please ignore this email.
          </p>
        </div>
      </div>
    `

    // Send emails if Resend is configured
    if (resend) {
      const emailPromises = []

      // Send email to admin
      if (process.env.ADMIN_EMAIL) {
        emailPromises.push(
          resend.emails.send({
            from: process.env.FROM_EMAIL || 'noreply@liccareer.com',
            to: process.env.ADMIN_EMAIL,
            subject: `New LIC Agent Application - ${validatedData.fullName}`,
            html: adminEmailHtml,
          })
        )
      }

      // Send confirmation email to applicant
      emailPromises.push(
        resend.emails.send({
          from: process.env.FROM_EMAIL || 'noreply@liccareer.com',
          to: validatedData.email,
          subject: 'Welcome to LIC Career - Application Received!',
          html: applicantEmailHtml,
        })
      )

      // Wait for all emails to be sent
      await Promise.all(emailPromises)
    } else {
      console.log('Resend not configured - skipping email sending')
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        applicationId: savedApplication?._id || null
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Form submission error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data',
          errors: error
        },
        { status: 400 }
      )
    }

    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('E11000')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'An application with this email already exists. Please contact us if you need to update your information.' 
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

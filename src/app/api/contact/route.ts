import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log environment configuration (without exposing sensitive data)
    console.log('=== Email Configuration Check ===')
    console.log('RESEND_API_KEY configured:', !!process.env.RESEND_API_KEY)
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL)
    console.log('FROM_EMAIL:', process.env.FROM_EMAIL)
    console.log('Resend client initialized:', !!resend)
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body)
    console.log('Form data validated for:', validatedData.email)
    
    // Create email content for admin
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Message:</h3>
        <p>${validatedData.message}</p>
      </div>
      <p><em>Message sent on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</em></p>
    `

    // Create auto-reply email for sender
    const autoReplyHtml = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #FF6B35, #003366); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We have received your message</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p>Dear ${validatedData.name},</p>
          
          <p>Thank you for reaching out to LIC Career! We have successfully received your message and appreciate your interest in our services.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B35;">
            <h3 style="margin-top: 0; color: #FF6B35;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Message:</strong> ${validatedData.message.substring(0, 150)}${validatedData.message.length > 150 ? '...' : ''}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #28a745;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our team will review your message within 24 hours</li>
              <li>We'll respond to your inquiry via email or phone</li>
              <li>If urgent, feel free to call us at +91 88006 74722</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="margin-bottom: 15px;">Need immediate assistance?</p>
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
            This is an automated response. Please do not reply to this email. 
            For support, contact us at anshumali.msingh@gmail.com
          </p>
        </div>
      </div>
    `

    // Send emails if Resend is configured
    if (resend) {
      console.log('=== Starting Email Send Process ===')
      const emailPromises = []

      // Send email to admin
      if (process.env.ADMIN_EMAIL) {
        console.log('Preparing admin email to:', process.env.ADMIN_EMAIL)
        console.log('From address:', process.env.FROM_EMAIL || 'noreply@liccareer.com')
        emailPromises.push(
          resend.emails.send({
            from: process.env.FROM_EMAIL || 'noreply@liccareer.com',
            to: process.env.ADMIN_EMAIL,
            subject: `Contact Form: ${validatedData.subject} - ${validatedData.name}`,
            html: adminEmailHtml,
          })
        )
      } else {
        console.warn('ADMIN_EMAIL not configured - admin notification will not be sent')
      }

      // Send auto-reply to sender
      console.log('Preparing auto-reply to:', validatedData.email)
      emailPromises.push(
        resend.emails.send({
          from: process.env.FROM_EMAIL || 'noreply@liccareer.com',
          to: validatedData.email,
          subject: 'Thank you for contacting LIC Career!',
          html: autoReplyHtml,
        })
      )

      // Wait for all emails to be sent
      try {
        const results = await Promise.all(emailPromises)
        console.log('✅ Emails sent successfully!')
        console.log('Email IDs:', results.map(r => r.data?.id || 'unknown'))
        results.forEach((result, index) => {
          if (result.error) {
            console.error(`Email ${index + 1} error:`, result.error)
          }
        })
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError)
        throw emailError
      }
    } else {
      console.warn('RESEND_API_KEY not configured - email sending is disabled')
      console.log('Form submission received from:', validatedData.email)
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
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

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

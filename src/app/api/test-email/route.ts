import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET(request: NextRequest) {
  try {
    console.log('=== EMAIL CONFIGURATION TEST ===')
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0)
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL)
    console.log('FROM_EMAIL:', process.env.FROM_EMAIL)
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL)
    
    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
    console.log('Resend client initialized:', !!resend)
    
    if (!resend) {
      return NextResponse.json({
        success: false,
        message: 'Resend API key not configured',
        config: {
          hasApiKey: false,
          adminEmail: process.env.ADMIN_EMAIL || 'NOT SET',
          fromEmail: process.env.FROM_EMAIL || 'NOT SET'
        }
      })
    }
    
    if (!process.env.ADMIN_EMAIL) {
      return NextResponse.json({
        success: false,
        message: 'ADMIN_EMAIL not configured',
        config: {
          hasApiKey: true,
          adminEmail: 'NOT SET',
          fromEmail: process.env.FROM_EMAIL || 'NOT SET'
        }
      })
    }
    
    if (!process.env.FROM_EMAIL) {
      return NextResponse.json({
        success: false,
        message: 'FROM_EMAIL not configured',
        config: {
          hasApiKey: true,
          adminEmail: process.env.ADMIN_EMAIL,
          fromEmail: 'NOT SET'
        }
      })
    }
    
    // Try to send a test email
    console.log('Attempting to send test email...')
    console.log('From:', process.env.FROM_EMAIL)
    console.log('To:', process.env.ADMIN_EMAIL)
    
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email - LIC Career Website',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from your LIC Career website.</p>
        <p>If you received this, your email configuration is working correctly!</p>
        <p><strong>Configuration:</strong></p>
        <ul>
          <li>FROM_EMAIL: ${process.env.FROM_EMAIL}</li>
          <li>ADMIN_EMAIL: ${process.env.ADMIN_EMAIL}</li>
          <li>Timestamp: ${new Date().toISOString()}</li>
        </ul>
      `
    })
    
    console.log('✅ Test email sent successfully!')
    console.log('Email ID:', result.data?.id)
    
    if (result.error) {
      console.error('Email error:', result.error)
      return NextResponse.json({
        success: false,
        message: 'Email sending failed',
        error: result.error,
        config: {
          hasApiKey: true,
          adminEmail: process.env.ADMIN_EMAIL,
          fromEmail: process.env.FROM_EMAIL
        }
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully! Check your inbox at ' + process.env.ADMIN_EMAIL,
      emailId: result.data?.id,
      config: {
        hasApiKey: true,
        adminEmail: process.env.ADMIN_EMAIL,
        fromEmail: process.env.FROM_EMAIL
      }
    })
    
  } catch (error: any) {
    console.error('❌ Test email error:', error)
    return NextResponse.json({
      success: false,
      message: 'Error sending test email',
      error: error.message || String(error),
      config: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        adminEmail: process.env.ADMIN_EMAIL || 'NOT SET',
        fromEmail: process.env.FROM_EMAIL || 'NOT SET'
      }
    }, { status: 500 })
  }
}

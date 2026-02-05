# Email Setup Instructions for Form Submissions

## Overview
Your website is configured to send emails when users submit the application form. When someone fills out the form, you'll receive an email at `anshuali.msingh@gmail.com` with all their details, and they'll receive a confirmation email.

## Free Email Service: Resend.com

I've set up your website to use **Resend.com** - a reliable email service with a generous free tier:

### Free Tier Benefits:
- ✅ **3,000 emails per month** (completely free)
- ✅ High delivery rates
- ✅ Professional email templates
- ✅ Easy setup

## Setup Steps:

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email address
3. Verify your email account

### 2. Get Your API Key
1. After logging in, go to **API Keys** section
2. Click **Create API Key**
3. Give it a name like "LIC Career Website"
4. Copy the API key (starts with `re_`)

### 3. Add Environment Variables
Create a `.env.local` file in your project root with:

```bash
# MongoDB Connection (already configured)
MONGODB_URI=mongodb+srv://ams16071985_db_user:raj2jksfIDJ67LBn@cluster0.wytdn7m.mongodb.net/liccareer

# Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=anshuali.msingh@gmail.com
FROM_EMAIL=noreply@yourdomain.com
```

### 4. Domain Setup (Optional but Recommended)
For better email delivery, you can:
1. Add your domain to Resend
2. Verify DNS records
3. Use your domain for FROM_EMAIL (e.g., `noreply@yourdomain.com`)

## What Happens When Form is Submitted:

### 1. Email to You (Admin)
You'll receive an email with:
- ✅ Applicant's full details
- ✅ Contact information
- ✅ Their reason for interest
- ✅ Education and experience
- ✅ Timestamp of submission

### 2. Confirmation Email to Applicant
They'll receive:
- ✅ Welcome message
- ✅ Next steps information
- ✅ Your contact details
- ✅ Professional branded email

## Testing the Setup:

1. Add the environment variables to `.env.local`
2. Restart your development server: `npm run dev`
3. Fill out the application form on your website
4. Check your email for the submission details

## Alternative Free Services:

If you prefer other options:

### EmailJS (Client-side)
- 200 emails/month free
- No server setup needed
- Direct from browser

### Nodemailer + Gmail
- Use your Gmail account
- Requires app password setup
- More complex configuration

## Current Status:
- ✅ Button text changed to "Submit Details"
- ✅ Button colors updated to blue theme
- ✅ Email functionality coded and ready
- ✅ Resend package installed
- ⏳ **Next: Add your Resend API key to `.env.local`**

## Need Help?
If you need assistance with:
- Setting up Resend account
- Configuring environment variables
- Testing email functionality
- Using alternative email services

Just let me know and I can guide you through the process!

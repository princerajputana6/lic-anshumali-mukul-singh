# Vercel Deployment Guide - LIC Career Website

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:

1. ✅ A GitHub account
2. ✅ A Vercel account (sign up at https://vercel.com)
3. ✅ Your code pushed to a GitHub repository
4. ✅ All environment variables ready

---

## 🚀 Step-by-Step Deployment Guide

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - LIC Career Website"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/lic-career-website.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Log In"** (use GitHub for easy integration)
3. Click **"Add New Project"**
4. Click **"Import Git Repository"**
5. Select your **lic-career-website** repository
6. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `./` (leave as default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add the following:

#### Required Variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://ams16071985_db_user:raj2jksfIDJ67LBn@cluster0.wytdn7m.mongodb.net/liccareer

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
ADMIN_EMAIL=anshuali.msingh@gmail.com
FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Image Upload (Optional - ImgBB)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
```

#### How to Get API Keys:

**Resend API Key:**
1. Go to https://resend.com
2. Sign up for free account
3. Go to API Keys section
4. Create new API key
5. Copy and paste into Vercel

**ImgBB API Key (Optional):**
1. Go to https://api.imgbb.com
2. Sign up/login
3. Get your API key
4. Copy and paste into Vercel

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://lic-career-website.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Update Site URL

After first deployment, update the environment variable:

1. Go to your project in Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Edit `NEXT_PUBLIC_SITE_URL` to your actual Vercel URL
4. Click **"Save"**
5. Go to **"Deployments"** → Click **"..."** → **"Redeploy"**

### Configure Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### Update Email Configuration

Update `FROM_EMAIL` to use your custom domain:
```env
FROM_EMAIL=noreply@yourdomain.com
```

---

## 📝 Environment Variables Reference

### Production Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://ams16071985_db_user:raj2jksfIDJ67LBn@cluster0.wytdn7m.mongodb.net/liccareer

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=anshuali.msingh@gmail.com
FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Image Upload (Optional)
NEXT_PUBLIC_IMGBB_API_KEY=your_key_here
```

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy to production
4. Update your live site

---

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**
1. Go to **"Deployments"**
2. Click on failed deployment
3. View build logs
4. Fix errors in your code
5. Push changes to GitHub

**Common Issues:**
- Missing environment variables
- TypeScript errors
- Missing dependencies
- MongoDB connection issues

### MongoDB Connection Issues

**Whitelist Vercel IPs:**
1. Go to MongoDB Atlas
2. Network Access → IP Whitelist
3. Add `0.0.0.0/0` (allow all) for Vercel
4. Save changes

### Email Not Sending

**Verify Resend Configuration:**
1. Check API key is correct
2. Verify domain is verified in Resend
3. Check email addresses are valid
4. Review Resend dashboard for errors

---

## 🎯 Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed and pushed to GitHub
- [ ] Environment variables are configured
- [ ] MongoDB connection string is correct
- [ ] Resend API key is valid
- [ ] Admin email is correct
- [ ] Site builds locally without errors (`npm run build`)
- [ ] All console.logs are removed (production-ready)
- [ ] Images are optimized
- [ ] SEO metadata is configured

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard

Monitor your deployment:
- **Analytics**: View visitor stats
- **Logs**: Check runtime logs
- **Performance**: Monitor speed
- **Deployments**: View deployment history

### MongoDB Atlas

Monitor database:
- **Metrics**: View database performance
- **Logs**: Check query logs
- **Alerts**: Set up alerts for issues

---

## 🔐 Security Best Practices

1. **Never commit `.env.local` to GitHub**
2. **Use environment variables for all secrets**
3. **Regularly rotate API keys**
4. **Monitor MongoDB access logs**
5. **Keep dependencies updated**
6. **Use HTTPS only (Vercel provides this)**

---

## 🎉 Your Site is Live!

Once deployed, your website will be available at:
- **Vercel URL**: `https://lic-career-website.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

### Features Available:
✅ Application form with email notifications
✅ Blog management system
✅ Dynamic blog posts from MongoDB
✅ Image uploads (ImgBB or base64)
✅ Admin panel for blog management
✅ Responsive design
✅ SEO optimized

---

## 📞 Support

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

**MongoDB Support:**
- Documentation: https://docs.mongodb.com
- Support: https://support.mongodb.com

**Resend Support:**
- Documentation: https://resend.com/docs
- Support: support@resend.com

---

## 🚀 Next Steps

After deployment:

1. **Test all features** on production
2. **Set up custom domain** (if desired)
3. **Configure email templates** in Resend
4. **Add Google Analytics** (optional)
5. **Set up monitoring** and alerts
6. **Create backup strategy** for MongoDB
7. **Document admin procedures**

---

**Congratulations! Your LIC Career Website is now live! 🎊**

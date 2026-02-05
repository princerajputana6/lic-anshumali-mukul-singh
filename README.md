# LIC Career Website - Next.js 14 Project

A high-performance, SEO-optimized career recruitment website for LIC agent recruitment built with Next.js 14, TypeScript, and Tailwind CSS. Designed to achieve 95+ Lighthouse scores and optimized for Vercel deployment.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **SEO Optimized**: Comprehensive metadata, structured data, sitemap generation
- **Performance Focused**: Optimized images, lazy loading, code splitting
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Form Handling**: React Hook Form with Zod validation
- **Email Integration**: Resend API for form submissions and notifications
- **Accessibility**: WCAG 2.1 AA compliant components

## 📋 Project Structure

```
lic-career-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── faq/               # FAQ page
│   │   ├── api/               # API routes
│   │   │   ├── submit-application/
│   │   │   └── contact/
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Homepage
│   │   ├── robots.ts          # Robots.txt generation
│   │   └── sitemap.ts         # Sitemap generation
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Homepage sections
│   │   └── shared/            # Shared components
│   ├── lib/                   # Utilities and validations
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.ts            # Next.js configuration
├── vercel.json               # Vercel deployment config
└── env.example               # Environment variables template
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Resend account for email functionality

### 1. Clone and Install

```bash
git clone <repository-url>
cd lic-career-website
npm install
```

### 2. Environment Setup

Copy the environment template and configure:

```bash
cp env.example .env.local
```

Configure the following variables in `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Configuration (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📧 Email Configuration

The website uses [Resend](https://resend.com) for email functionality:

1. Sign up for a Resend account
2. Get your API key from the dashboard
3. Add your API key to `.env.local`
4. Configure your domain for sending emails

### Email Features

- **Application Form**: Sends confirmation to applicant and notification to admin
- **Contact Form**: Sends auto-reply to sender and notification to admin
- **Professional Templates**: HTML email templates with branding

## 🎨 Design System

### Colors

- **Primary**: LIC Orange (#FF6B35)
- **Secondary**: Deep Blue (#003366) 
- **Accent**: Gold (#FFD700)
- **Neutral**: Grays for text and backgrounds

### Typography

- **Headings**: Poppins (Bold/Semibold)
- **Body**: Inter (Regular)
- Optimized with `next/font` for performance

### Components

All components are built with:
- TypeScript for type safety
- Tailwind CSS for styling
- Class Variance Authority for component variants
- Accessibility best practices

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Deployment
npm run deploy       # Deploy to Vercel (if configured)
```

## 📱 Pages & Sections

### Homepage Sections

1. **Hero Section**: Compelling headline with CTAs
2. **Value Propositions**: 6 key benefits with icons
3. **How It Works**: 5-step process timeline
4. **Commission Structure**: Earnings breakdown and calculator
5. **Target Audience**: Ideal candidate profiles
6. **Application Form**: Lead capture with validation
7. **FAQ**: Expandable accordion with common questions

### Additional Pages

- **About**: Company info, mission, vision, team
- **FAQ**: Dedicated FAQ page with all questions
- **Contact**: Contact form, office info, map integration

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**:
   ```bash
   vercel --prod
   ```

2. **Environment Variables**:
   Add all environment variables in Vercel dashboard

3. **Domain Configuration**:
   - Add custom domain in Vercel
   - Update `NEXT_PUBLIC_SITE_URL` environment variable

### Manual Deployment

```bash
npm run build
npm run start
```

## ⚡ Performance Optimization

### Implemented Optimizations

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Font Optimization**: next/font with preloading
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Below-the-fold content
- **Caching**: Optimized headers and static assets
- **Compression**: Gzip/Brotli compression enabled

### Lighthouse Targets

- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🔍 SEO Features

### Technical SEO

- **Metadata API**: Dynamic metadata for all pages
- **Structured Data**: Organization, JobPosting, WebSite schemas
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Proper crawling directives
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific metadata

### Content SEO

- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: All images have descriptive alt text
- **Internal Linking**: Strategic internal link structure
- **Mobile-First**: Responsive design for mobile SEO

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form submissions work correctly
- [ ] Email notifications are sent
- [ ] All links navigate properly
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Performance metrics (Lighthouse)
- [ ] Accessibility compliance

### Recommended Tools

- **Lighthouse**: Performance and SEO auditing
- **WAVE**: Accessibility testing
- **Google PageSpeed Insights**: Core Web Vitals
- **Google Search Console**: SEO monitoring

## 🔒 Security

### Implemented Security Measures

- **Content Security Policy**: XSS protection
- **HTTPS Enforcement**: Secure connections only
- **Input Validation**: Zod schema validation
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: Security-focused HTTP headers

## 📊 Analytics & Monitoring

### Google Analytics 4

Add your GA4 measurement ID to `NEXT_PUBLIC_GA_ID` environment variable.

### Vercel Analytics

Automatically enabled on Vercel deployment for Core Web Vitals monitoring.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- **Email**: contact@liccareer.com
- **Phone**: +91 98765 43210
- **Documentation**: Check this README and code comments

## 🎯 Success Metrics

### Technical KPIs
- Lighthouse Performance Score: 95+
- Time to First Byte (TTFB): < 600ms
- Page Load Time: < 3s
- Core Web Vitals: All green

### Business KPIs
- Form submission rate: 5-10% of visitors
- Bounce rate: < 50%
- Average session duration: > 2 minutes
- Mobile traffic percentage tracking

---

**Built with ❤️ for LIC Career Success**

*This website helps thousands of people build successful insurance careers with comprehensive training, ongoing support, and proven strategies.*

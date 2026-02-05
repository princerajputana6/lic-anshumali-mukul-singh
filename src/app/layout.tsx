import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LIC Career - Build Your Career as an Insurance Advisor | Unlimited Earning Potential",
  description: "Join LIC as an insurance advisor and earn unlimited income with flexible work hours. No investment required, complete training provided. Apply now and get free study materials.",
  keywords: ["LIC agent", "insurance advisor", "career opportunity", "part-time job", "commission income", "financial independence"],
  authors: [{ name: "LIC Career Team" }],
  creator: "LIC Career",
  publisher: "LIC Career",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://liccareer.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'LIC Career - Build Your Career as an Insurance Advisor',
    description: 'Join LIC as an insurance advisor and earn unlimited income with flexible work hours. No investment required, complete training provided.',
    siteName: 'LIC Career',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LIC Career - Insurance Advisor Opportunities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIC Career - Build Your Career as an Insurance Advisor',
    description: 'Join LIC as an insurance advisor and earn unlimited income with flexible work hours. Apply now!',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

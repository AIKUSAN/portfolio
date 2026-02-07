import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lorenz Tazan - AI-Powered Platform Engineer | Infrastructure Automation & LLM Integration",
  description: "AI-Powered Platform Engineer with 7+ years expertise in infrastructure automation, LLM integration, and cloud-native orchestration. Achieved 99.9% uptime, 93% deployment speed improvement, and pioneered multi-agent AI systems for network automation.",
  keywords: [
    "AI-Powered Platform Engineer",
    "LLM Integration",
    "Infrastructure Automation",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Kubernetes Administrator",
    "Docker Orchestration",
    "Cloud Native Architecture",
    "Network Engineering",
    "GitOps",
    "AI Infrastructure",
    "Platform Engineering"
  ],
  authors: [{ name: "Lorenz Tazan" }],
  creator: "Lorenz Tazan",
  publisher: "Lorenz Tazan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lorenztazan.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Lorenz Tazan - AI-Powered Platform Engineer",
    description: "AI-Powered Platform Engineer with 7+ years expertise in infrastructure automation and LLM integration. 99.9% uptime, pioneering multi-agent AI systems.",
    url: 'https://lorenztazan.com',
    siteName: 'Lorenz Tazan Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lorenz Tazan - Systems Engineer | AI Infrastructure Specialist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lorenz Tazan - AI-Powered Platform Engineer",
    description: "AI-Powered Platform Engineer specializing in Infrastructure Automation and LLM Integration",
    creator: '@AIKUSAN',
    images: ['/og-image.png'],
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
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // TODO: Get verification code from https://search.google.com/search-console
    // 1. Add property: lorenztazan.com
    // 2. Verify ownership via HTML tag method
    // 3. Replace 'your-google-verification-code' with actual code
    // 4. Submit sitemap: https://lorenztazan.com/sitemap.xml
    google: 'your-google-verification-code',
  },
};

// JSON-LD Structured Data for enhanced SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lorenz Tazan",
  jobTitle: "AI-Powered Platform Engineer",
  description: "AI-Powered Platform Engineer with 7+ years expertise in infrastructure automation, LLM integration, cloud-native orchestration, and pioneering multi-agent AI systems for network automation.",
  url: "https://lorenztazan.com",
  email: "lorenztazan@gmail.com",
  telephone: "+1-240-256-2410",
  sameAs: [
    "https://github.com/AIKUSAN",
    "https://linkedin.com/in/lorenztazan"
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "California",
    addressRegion: "MD",
    addressCountry: "US"
  },
  knowsAbout: [
    "AI-Powered Infrastructure",
    "LLM Integration",
    "Platform Engineering",
    "Infrastructure Automation",
    "DevOps",
    "Kubernetes Orchestration",
    "Docker Containerization",
    "Network Engineering",
    "GitOps",
    "Cloud Native Architecture"
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "AI-Powered Platform Engineer",
    skills: [
      "LLM Integration & Multi-Agent AI Systems",
      "Infrastructure Automation & Orchestration",
      "Kubernetes & Docker Production Deployment",
      "Platform Engineering & GitOps",
      "Network Engineering & BGP Routing",
      "DevOps & CI/CD Pipeline Design",
      "Cloud Native Architecture (AWS, Azure)",
      "Security Compliance (NIST 800-171, Zero-Trust)"
    ],
    occupationLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US"
      }
    }
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Interface Computer College",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Iligan City",
      addressCountry: "PH"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

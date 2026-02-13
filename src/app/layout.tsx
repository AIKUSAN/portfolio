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
  title: "Lorenz Tazan - Systems Engineer | DevOps & Infrastructure Automation",
  description: "Systems Engineer with 7 years of hands-on experience in infrastructure automation, Kubernetes/Docker orchestration, and AI-enhanced workflows. Achieved 99.9% uptime across distributed systems, 93% deployment speed improvement, and implemented LLM-driven automation for network operations.",
  keywords: [
    "Systems Engineer",
    "DevOps Engineer",
    "Platform Engineer",
    "Infrastructure Automation",
    "Site Reliability Engineer",
    "Kubernetes Administrator",
    "Docker Orchestration",
    "Cloud Infrastructure",
    "CI/CD Pipeline",
    "Network Engineering",
    "GitOps",
    "Infrastructure as Code",
    "LLM Integration"
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
    title: "Lorenz Tazan - Systems Engineer | DevOps & Infrastructure",
    description: "Systems Engineer with 7 years of hands-on experience in infrastructure automation and cloud-native orchestration. 99.9% uptime across distributed systems.",
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
    title: "Lorenz Tazan - Systems Engineer | DevOps & Infrastructure",
    description: "Systems Engineer specializing in Infrastructure Automation, Kubernetes, and DevOps workflows",
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
  jobTitle: "Systems Engineer",
  description: "Systems Engineer with 7 years of hands-on experience in infrastructure automation, DevOps workflows, Kubernetes/Docker orchestration, and implementing AI-enhanced infrastructure operations.",
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

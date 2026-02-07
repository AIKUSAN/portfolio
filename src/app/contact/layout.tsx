import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Lorenz Tazan - Hire an AI-Powered Platform Engineer",
  description: "Actively seeking Platform Engineering, Site Reliability Engineering (SRE), and DevOps opportunities. AI infrastructure automation specialist. Remote-first, available immediately. Contact: lorenztazan@gmail.com | 240-256-2410 | Frederick, MD / Remote",
  keywords: "Hire Platform Engineer, AI Infrastructure Jobs, LLM Integration Specialist, Site Reliability Engineer Available, DevOps Engineer Remote, Kubernetes Administrator Hire, Cloud Native Engineer, GitOps Specialist",
  openGraph: {
    title: "Contact Lorenz Tazan - AI-Powered Platform Engineer",
    description: "Actively seeking Platform Engineering and SRE opportunities",
    url: "https://lorenztazan.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

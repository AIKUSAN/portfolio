import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education & Learning | Lorenz Tazan - AI-Powered Platform Engineer",
  description: "BS Computer Engineering (Interface Computer College 2017-2020). Self-taught expertise in AI infrastructure, LLM integration, Kubernetes/Docker orchestration, platform engineering, and NIST 800-171 compliance. 7+ years hands-on experience across infrastructure automation, security, and cloud-native architecture.",
  keywords: "Computer Engineering, Platform Engineering Education, Self-Taught AI Infrastructure, LLM Integration Learning, Kubernetes Certification Path, Docker Professional, Infrastructure Automation, GitOps, Cloud Native, Security Compliance Training",
  openGraph: {
    title: "Education & Continuous Learning - Lorenz Tazan",
    description: "Formal education combined with 7+ years practical IT experience",
    url: "https://lorenztazan.com/education",
  },
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

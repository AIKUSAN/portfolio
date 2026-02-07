import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Experience | Lorenz Tazan - AI-Powered Platform Engineer",
  description: "7+ years professional experience: Platform Engineer pioneering LLM-based automation at Land of Promise (24-server infrastructure, 99.9% uptime), DoD Network Consultant (NIST 800-171 compliance, zero audit findings), ISP Network Administrator (700+ subscribers, 10Gbps BGP routing). Expertise in AI infrastructure, Kubernetes, and GitOps.",
  keywords: "AI-Powered Platform Engineer, LLM Infrastructure Automation, Site Reliability Engineer, DevOps Professional, Kubernetes Administrator, DoD Contractor Security Clearance, ISP Network Engineering, GitOps, Cloud Native, Infrastructure as Code",
  openGraph: {
    title: "Professional Experience - Lorenz Tazan | AI-Powered Platform Engineer",
    description: "7+ years managing enterprise infrastructure with 99.9% uptime",
    url: "https://lorenztazan.com/experience",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

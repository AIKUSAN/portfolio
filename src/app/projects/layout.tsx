import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Portfolio | Lorenz Tazan - AI Infrastructure & Automation",
  description: "Platform engineering projects: AI Agentic Network Automation (Multi-LLM orchestration), ISP Core Network (700+ subscribers, 10Gbps), DoD Secure Network (zero audit findings), Global Traffic Manager (AI-powered failover), NetOps Framework (LLM drift detection), and production Kubernetes deployments.",
  keywords: "AI Infrastructure Projects, LLM Integration, Platform Engineering, Multi-Agent AI Systems, Network Automation, Kubernetes Production, Docker Orchestration, ISP Infrastructure, DoD Security Compliance, GitOps, Infrastructure as Code",
  openGraph: {
    title: "Infrastructure & Automation Projects - Lorenz Tazan",
    description: "Production systems serving 700+ users with 99.9% uptime",
    url: "https://lorenztazan.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Portfolio | Lorenz Tazan - Infrastructure & Automation",
  description: "Infrastructure projects: AI-Enhanced Network Automation (Multi-LLM orchestration), ISP Core Network (700+ subscribers, 10Gbps), DoD Secure Network (zero audit findings), Global Traffic Manager implementation, NetOps automation framework, and production Kubernetes deployments.",
  keywords: "Infrastructure Projects, DevOps Portfolio, Network Automation, Kubernetes Production, Docker Orchestration, ISP Infrastructure, DoD Security Compliance, Systems Engineering, GitOps, Infrastructure as Code, CI/CD Pipelines",
  openGraph: {
    title: "Infrastructure & Automation Projects - Lorenz Tazan",
    description: "Production infrastructure serving 700+ users with 99.9% uptime",
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

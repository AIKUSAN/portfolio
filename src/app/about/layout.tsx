import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Lorenz Tazan - AI-Powered Platform Engineer",
  description: "AI-Powered Platform Engineer with 7+ years experience pioneering LLM-based infrastructure automation, managing 24-server platforms with 99.9% uptime. Expert in multi-agent AI systems, Kubernetes orchestration, and cloud-native architecture.",
  keywords: "AI-Powered Platform Engineer, LLM Integration, Infrastructure Automation, Multi-Agent AI Systems, DevOps Engineer, Site Reliability Engineer, Kubernetes Administrator, Docker Orchestration, GitOps, Cloud Native, Network Engineering",
  openGraph: {
    title: "About Lorenz Tazan - AI-Powered Platform Engineer",
    description: "7+ years pioneering LLM-based infrastructure automation with 99.9% uptime",
    url: "https://lorenztazan.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

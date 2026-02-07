import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Skills & Expertise | AI-Powered Platform Engineer Portfolio",
  description: "Interactive technology stack visualization showcasing 68 production technologies including LLM integration (Gemini, Claude, GPT-4), Kubernetes, Docker, multi-agent AI systems, and cloud platforms. Platform engineering expertise with 99.9% infrastructure uptime and pioneering AI automation.",
  keywords: "AI-Powered Platform Engineer, LLM Integration, Multi-Agent AI Systems, Gemini AI, Claude AI, GPT-4, Platform Engineering, DevOps, Infrastructure Automation, Docker, Kubernetes, GitOps, Cloud Native, Java, Python, TypeScript, Linux, Azure, AWS, Network Engineering, MikroTik, Terraform, Ansible, Site Reliability Engineering",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

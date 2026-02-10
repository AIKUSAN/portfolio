import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Lorenz Tazan - Systems Engineer & DevOps Specialist",
  description: "Systems Engineer with 7 years of hands-on experience implementing infrastructure automation and managing distributed systems. Currently maintaining 24-server platform with 99.9% uptime. Expertise in Kubernetes orchestration, Docker containerization, and AI-enhanced DevOps workflows.",
  keywords: "Systems Engineer, DevOps Engineer, Infrastructure Automation, Kubernetes Specialist, Docker Orchestration, Cloud Infrastructure, Platform Engineering, GitOps, CI/CD, Site Reliability",
  openGraph: {
    title: "About Lorenz Tazan - Systems Engineer & DevOps Specialist",
    description: "7 years of hands-on infrastructure automation experience with focus on high-availability systems",
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

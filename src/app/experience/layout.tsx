import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Experience | Lorenz Tazan - Systems Engineer & DevOps",
  description: "7 years of professional experience: Systems Engineer implementing LLM-enhanced automation at Land of Promise (24-server infrastructure, 99.9% uptime), DoD Network Consultant (NIST 800-171 compliance, zero audit findings), ISP Network Administrator (700+ subscribers, 10Gbps BGP routing). Hands-on expertise in Kubernetes, Docker, and infrastructure automation.",
  keywords: "Systems Engineer Experience, DevOps Engineer, Infrastructure Automation, Kubernetes Specialist, Site Reliability Engineer, DoD Network Security, ISP Network Engineering, GitOps, Cloud Infrastructure, Infrastructure as Code",
  openGraph: {
    title: "Professional Experience - Lorenz Tazan | Systems Engineer",
    description: "7 years of hands-on experience managing enterprise infrastructure with 99.9% uptime",
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

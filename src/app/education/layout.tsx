import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education & Learning | Lorenz Tazan - Systems Engineer",
  description: "BS Computer Engineering coursework (Interface Computer College 2017-2020). Hands-on expertise in infrastructure automation, Kubernetes/Docker orchestration, DevOps workflows, and NIST 800-171 compliance. 7 years of practical experience across enterprise infrastructure, security, and cloud-native architecture.",
  keywords: "Computer Engineering, Systems Engineering Education, Infrastructure Automation, Kubernetes, Docker, DevOps, Cloud Infrastructure, Security Compliance, GitOps, Continuous Learning, Professional Development",
  openGraph: {
    title: "Education & Continuous Learning - Lorenz Tazan",
    description: "Formal education combined with 7 years of practical IT experience",
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

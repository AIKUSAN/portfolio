import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Skills & Expertise | Systems Engineer Portfolio",
  description: "Interactive technology stack visualization showcasing production expertise in Kubernetes, Docker, Linux administration, Python/Java development, infrastructure automation, and AI-enhanced DevOps workflows. Hands-on experience with cloud platforms (Azure, AWS) and enterprise infrastructure management.",
  keywords: "Systems Engineer Skills, DevOps Technologies, Kubernetes, Docker, Infrastructure Automation, Python, Java, TypeScript, Linux Administration, Cloud Platforms, Azure, AWS, Network Engineering, Terraform, Ansible, CI/CD, GitOps, Site Reliability Engineering",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

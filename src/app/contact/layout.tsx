import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Lorenz Tazan - Systems Engineer & DevOps Specialist",
  description: "Systems Engineer seeking Platform Engineer, Site Reliability Engineer (SRE), DevOps Engineer, and Cloud Infrastructure roles. Specializing in Kubernetes, Docker, infrastructure automation, and CI/CD workflows. Preference for hybrid positions in DC, Maryland, Virginia (DMV area). Contact: lorenztazan@gmail.com | 240-256-2410",
  keywords: "Systems Engineer jobs, Platform Engineer Maryland, DevOps Engineer DMV, Site Reliability Engineer DC, Cloud Infrastructure Engineer, Kubernetes jobs, Docker specialist, Infrastructure automation, CI/CD engineer, Hybrid DevOps jobs Maryland, Platform engineering DMV, Infrastructure as code, Terraform, Ansible, DevOps Virginia, Hybrid work DMV",
  openGraph: {
    title: "Contact Lorenz Tazan - Systems Engineer | Platform & DevOps Specialist",
    description: "Systems Engineer seeking Platform Engineer, SRE, and DevOps roles. Kubernetes, Docker, infrastructure automation expertise. Hybrid work preferred in DMV area.",
    url: "https://lorenztazan.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

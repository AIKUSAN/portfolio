export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  category: "Infrastructure" | "Automation" | "Security";
  imageClass: string; // CSS class for background color/gradient placeholder
  span: string; // CSS class for grid span
}

export const projects: Project[] = [
  {
    id: "isp-network",
    title: "Regional Fiber ISP Core Redesign",
    description: "Architected a highly available MPLS backbone for a regional ISP serving 50k+ subscribers. Migrated OSPF to IS-IS and implemented BGP route reflectors to improve convergence times and scalability.",
    tech: ["Cisco IOS-XR", "MPLS/Segment Routing", "Python"],
    category: "Infrastructure",
    imageClass: "bg-gradient-to-br from-blue-600/20 to-indigo-900/40 border-blue-500/30",
    span: "md:col-span-2 md:row-span-2",
    github: "https://github.com/AIKUSAN/regional-fiber-isp"
  },
  {
    id: "gov-secure-net",
    title: "Zero-Trust Gov Network",
    description: "NIST 800-171 compliant infrastructure for a defense contractor. Implemented 802.1X NAC, micro-segmentation, and strict firewall policies.",
    tech: ["Palo Alto Patterns", "Aruba ClearPass", "Ansible"],
    category: "Security",
    imageClass: "bg-gradient-to-bl from-emerald-600/20 to-teal-900/40 border-emerald-500/30",
    span: "md:col-span-1 md:row-span-2",
    github: "https://github.com/AIKUSAN/government-contractor-network"
  },
  {
    id: "cloud-hub",
    title: "Hybrid Cloud Transit Hub",
    description: "Centralized Transit Gateway architecture connecting 3 on-prem datacenters to AWS & Azure. Automated route propagation and VPN failover.",
    tech: ["Terraform", "AWS TGW", "BGP"],
    category: "Infrastructure",
    imageClass: "bg-gradient-to-tr from-purple-600/20 to-violet-900/40 border-purple-500/30",
    span: "md:col-span-1 md:row-span-1",
    github: "https://github.com/AIKUSAN/network-infrastructure-diagrams"
  },
  {
    id: "net-auto-framework",
    title: "NetOps Automation Framework",
    description: "Self-healing network automation platform that detects configuration drift and auto-remediates based on golden templates.",
    tech: ["Python", "Nornir", "Docker"],
    category: "Automation",
    imageClass: "bg-gradient-to-br from-orange-600/20 to-red-900/40 border-orange-500/30",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "global-dns",
    title: "Global Traffic Manager",
    description: "GSLB implementation for multi-region application failover and geo-steering.",
    tech: ["F5 DNS", "Bind", "Lua"],
    category: "Infrastructure",
    imageClass: "bg-gradient-to-r from-cyan-600/20 to-blue-900/40 border-cyan-500/30",
    span: "md:col-span-1 md:row-span-1",
  }
];

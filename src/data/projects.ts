export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "network-infrastructure-diagrams",
    title: "Network Infrastructure Portfolio",
    description: "Interactive viewer showcasing professional network topologies from ISP and DoD contractor deployments. Features glassmorphism UI with Draw.io integration and complete technical documentation.",
    tags: ["Networking", "Draw.io", "GitHub Pages", "Documentation"],
    github: "https://github.com/AIKUSAN/network-infrastructure-diagrams",
    live: "https://aikusan.github.io/network-infrastructure-diagrams/viewer/",
    featured: true
  },
  {
    id: "regional-fiber-isp",
    title: "Regional Fiber ISP - Core Network",
    description: "ISP core network deployment serving 700+ subscribers with 10Gbps backbone capacity. Includes MikroTik CCR routing configuration, BGP peering, traffic shaping, and CGNAT implementation with 99.8% uptime.",
    tags: ["MikroTik", "pfSense", "BGP", "ISP", "CGNAT"],
    github: "https://github.com/AIKUSAN/regional-fiber-isp",
    featured: true
  },
  {
    id: "government-contractor-network",
    title: "DoD Contractor Secure Network",
    description: "Government compliance network infrastructure with 3-VLAN segmentation, strict firewall rules, and WPA3 Enterprise authentication. Achieved 0 audit findings during security inspection.",
    tags: ["Ubiquiti", "Security", "Compliance", "DoD"],
    github: "https://github.com/AIKUSAN/government-contractor-network",
    featured: true
  },
  {
    id: "docker-kubernetes-automation",
    title: "Docker/Kubernetes Automation Toolkit",
    description: "Production deployment toolkit featuring MariaDB Galera clustering, Prometheus/Grafana monitoring stacks, and Pterodactyl panel automation. Reduced deployment time from 30min to <2min.",
    tags: ["Docker", "Kubernetes", "IaC", "Automation", "DevOps"],
    github: "https://github.com/AIKUSAN/docker-kubernetes-automation",
    featured: false
  },
  {
    id: "mariadb-optimization-guide",
    title: "MariaDB Performance Optimization",
    description: "Comprehensive guide for production MariaDB deployments featuring Galera cluster replication, query optimization techniques, and performance tuning parameters for high-traffic applications.",
    tags: ["MariaDB", "Database", "Performance", "Galera", "Clustering"],
    github: "https://github.com/AIKUSAN/mariadb-optimization-guide",
    featured: false
  },
  {
    id: "java-spring-microservices",
    title: "Java Spring Microservices Demo",
    description: "Event-driven microservices architecture using Spring Boot, demonstrating service discovery, API gateway patterns, and distributed tracing for scalable enterprise applications.",
    tags: ["Java", "Spring Boot", "Microservices", "Architecture"],
    github: "https://github.com/AIKUSAN/java-spring-microservices-demo",
    featured: false
  },
  {
    id: "bash-devops-toolkit",
    title: "Bash DevOps Automation Scripts",
    description: "Collection of production-ready Bash scripts for automated server provisioning, backup management, log rotation, and system monitoring. Battle-tested in 24-server environments.",
    tags: ["Bash", "Linux", "Automation", "Scripts", "DevOps"],
    github: "https://github.com/AIKUSAN/bash-devops-toolkit",
    featured: false
  }
];

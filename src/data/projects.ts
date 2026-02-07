export type ProjectCategory = 'Infrastructure' | 'Security' | 'Automation';

export interface ProjectMetric {
  label: string;
  value: string; // Display string (e.g. "99.9%")
  target: number; // Numeric target for animation (e.g. 99.9)
  suffix: string; // %, ms, k+, etc.
}

export interface ProjectColors {
  primary: string; // Tailwind class for text/border (e.g. text-blue-400)
  glow: string; // Hex for shadow generation
  gradient: string; // Tailwind gradient classes
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tech: string[];
  description: string;
  gridSpan: string;
  image: string;
  imageAlt: string;
  details: {
    architecture: string;
    highlights: string[];
  };
  metrics: ProjectMetric[];
  colors: ProjectColors;
  links: {
    github?: string;
    demo?: string;
  };
  lastUpdated: string; // ISO date string for sorting
}

export const projects: Project[] = [
  {
    id: 'isp-core',
    title: 'Regional Fiber ISP - Core Network',
    category: 'Infrastructure',
    tech: ['MikroTik CCR', 'BGP', 'GPON', 'CGNAT', 'QoS'],
    description: 'Production ISP infrastructure serving 700+ subscribers across multi-site deployment with 10Gbps backbone, load balancing, and traffic shaping.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
    imageAlt: 'Fiber optic network infrastructure with glowing blue cables',
    details: {
      architecture: 'MikroTik CCR core router with dual WAN failover, GPON distribution for residential and dedicated fiber for business clients.',
      highlights: [
        '10Gbps backbone with BGP peering',
        'CGNAT and subscriber bandwidth management',
        'QoS enforcement for multi-tier service plans'
      ]
    },
    metrics: [
      { label: 'Uptime', value: '99.8%', target: 99.8, suffix: '%' },
      { label: 'Subscribers', value: '700+', target: 700, suffix: '+' }
    ],
    colors: {
      primary: 'text-cyan-400',
      glow: '#22d3ee',
      gradient: 'from-cyan-500/20 to-blue-600/20'
    },
    links: { github: 'https://github.com/AIKUSAN/regional-fiber-isp' },
    lastUpdated: '2025-11-20'
  },
  {
    id: 'zero-trust',
    title: 'DoD Contractor - Secure Network',
    category: 'Security',
    tech: ['Ubiquiti EdgeRouter', 'UniFi', 'WPA3 Enterprise', 'RADIUS', '802.1X'],
    description: 'NIST 800-171 compliant infrastructure with network segmentation, WPA3-Enterprise authentication, and strict guest isolation.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
    imageAlt: 'Secure network infrastructure with digital security elements',
    details: {
      architecture: 'VLAN segmentation with EdgeRouter firewall, WPA3-Enterprise via RADIUS, and MAC-based management access control.',
      highlights: [
        'Zero audit findings during government inspection',
        'Complete guest network isolation',
        'Daily password rotation for guest WiFi'
      ]
    },
    metrics: [
      { label: 'Security Audits', value: '0', target: 0, suffix: ' findings' },
      { label: 'Network VLANs', value: '3', target: 3, suffix: '' }
    ],
    colors: {
      primary: 'text-emerald-400',
      glow: '#34d399',
      gradient: 'from-emerald-500/20 to-teal-600/20'
    },
    links: { github: 'https://github.com/AIKUSAN/government-contractor-network' },
    lastUpdated: '2025-12-15'
  },
  {
    id: 'cloud-transit',
    title: 'Network Infrastructure Diagrams',
    category: 'Infrastructure',
    tech: ['Draw.io', 'MikroTik RouterOS', 'pfSense', 'Ubiquiti'],
    description: 'Professional network topology diagrams and documentation from real-world ISP and enterprise deployments with interactive viewer.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop',
    imageAlt: 'Cloud infrastructure with purple and violet data streams',
    details: {
      architecture: 'Sanitized network documentation with Draw.io diagrams, production-ready configurations, and interactive web viewer.',
      highlights: [
        'Multi-site ISP and enterprise topologies',
        'Ubiquiti-style professional UI',
        'Real MikroTik and pfSense configurations'
      ]
    },
    metrics: [
      { label: 'Projects Documented', value: '2', target: 2, suffix: '' },
      { label: 'Configurations', value: '10+', target: 10, suffix: '+' }
    ],
    colors: {
      primary: 'text-violet-400',
      glow: '#a78bfa',
      gradient: 'from-violet-500/20 to-purple-600/20'
    },
    links: { github: 'https://github.com/AIKUSAN/network-infrastructure-diagrams' },
    lastUpdated: '2025-10-10'
  },
  {
    id: 'netops-auto',
    title: 'NetOps Automation Framework',
    category: 'Automation',
    tech: ['FastAPI', 'Gemini AI', 'Claude AI', 'Nornir', 'NAPALM', 'n8n', 'Docker'],
    description: 'AI-powered network automation with dual LLM analysis (Gemini + Claude) for configuration drift detection, risk assessment, and automated remediation with rollback support.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    imageAlt: 'Digital automation with orange and red glowing elements',
    details: {
      architecture: 'FastAPI REST API with Gemini for risk analysis, Claude for detailed explanations, Celery for background tasks, and n8n workflows for automated drift detection.',
      highlights: [
        'Dual AI validation for config changes',
        'Auto-remediation with Nornir + NAPALM',
        'Git webhook-triggered drift detection',
        'Docker Compose 7-service stack'
      ]
    },
    metrics: [
      { label: 'AI Models', value: '2', target: 2, suffix: ' LLMs' },
      { label: 'Devices', value: '12+', target: 12, suffix: '+' }
    ],
    colors: {
      primary: 'text-orange-400',
      glow: '#fb923c',
      gradient: 'from-orange-500/20 to-red-600/20'
    },
    links: { github: 'https://github.com/AIKUSAN/netops-automation-framework' },
    lastUpdated: '2026-02-05'
  },
  {
    id: 'global-traffic',
    title: 'Global Traffic Manager',
    category: 'Infrastructure',
    tech: ['F5 BIG-IP GTM', 'Lua iRules', 'Gemini AI', 'Claude AI', 'Python', 'n8n'],
    description: 'DNS-based GSLB with AI-powered health monitoring using Gemini for failover analysis and Claude for incident reporting. Geographic steering via custom Lua iRules.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    imageAlt: 'Global network with blue and cyan traffic connections',
    details: {
      architecture: 'F5 GTM with Lua iRules for geographic routing, n8n workflow for 30-second health monitoring, Python automation with AI analysis.',
      highlights: [
        'AI-powered automatic failover decisions',
        'Continent-based geographic steering',
        'Claude-generated incident reports',
        'MaxMind GeoIP integration'
      ]
    },
    metrics: [
      { label: 'Datacenters', value: '3', target: 3, suffix: ' regions' },
      { label: 'Health Checks', value: '30s', target: 30, suffix: 's interval' }
    ],
    colors: {
      primary: 'text-blue-400',
      glow: '#60a5fa',
      gradient: 'from-blue-500/20 to-indigo-600/20'
    },
    links: { github: 'https://github.com/AIKUSAN/global-traffic-manager' },
    lastUpdated: '2026-02-04'
  },
  {
    id: 'ai-agentic',
    title: 'AI Agentic Network Automation',
    category: 'Automation',
    tech: ['Gemini 1.5 Pro', 'Claude 3.5', 'GPT-4', 'LangChain', 'ChromaDB', 'FastAPI'],
    description: 'Multi-agent LLM system for intelligent network automation. Natural language to topology design, intent-based config generation, and safe deployment with AI agents.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    imageAlt: 'AI neural network with purple and pink glowing nodes',
    details: {
      architecture: 'Multi-agent system with Gemini (Design), Claude (Config), GPT-4 (Deployment), ChromaDB vector database for RAG, and LangChain orchestration.',
      highlights: [
        'Zero-touch network provisioning',
        'Design Agent: NL → Network Topology',
        'Config Agent: Intent → CLI commands',
        'Deploy Agent: Safe rollback automation'
      ]
    },
    metrics: [
      { label: 'AI Agents', value: '5', target: 5, suffix: ' specialized' },
      { label: 'LLM Models', value: '3', target: 3, suffix: ' providers' }
    ],
    colors: {
      primary: 'text-purple-400',
      glow: '#c084fc',
      gradient: 'from-purple-500/20 to-pink-600/20'
    },
    links: { github: 'https://github.com/AIKUSAN/ai-agentic-network-automation' },
    lastUpdated: '2026-02-03'
  },
  {
    id: 'bash-toolkit',
    title: 'Bash DevOps Toolkit',
    category: 'Automation',
    tech: ['Bash', 'Systemd', 'Cron', 'Docker', 'MariaDB'],
    description: 'Battle-tested automation scripts for server management. Automated backups, health monitoring, zero-downtime deployments, and disaster recovery across 24 production servers.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop',
    imageAlt: 'Terminal with green text showing bash scripts',
    details: {
      architecture: 'Collection of production Bash scripts with systemd integration, cron scheduling, Discord webhooks for alerts, and automated rollback mechanisms.',
      highlights: [
        'Automated backups every 6 hours',
        'Zero-downtime Docker deployments',
        'SSL certificate expiry monitoring',
        'Prevented 3+ outages with proactive alerts'
      ]
    },
    metrics: [
      { label: 'Scripts', value: '20+', target: 20, suffix: '+' },
      { label: 'Servers', value: '24', target: 24, suffix: '' }
    ],
    colors: {
      primary: 'text-green-400',
      glow: '#4ade80',
      gradient: 'from-green-500/20 to-emerald-600/20'
    },
    links: { github: 'https://github.com/aikusan/bash-devops-toolkit' },
    lastUpdated: '2026-01-15'
  },
  {
    id: 'container-orchestration',
    title: 'Container Orchestration & Infrastructure',
    category: 'Infrastructure',
    tech: ['Docker', 'Kubernetes', 'MariaDB Cluster', 'Prometheus', 'Grafana'],
    description: 'Production Docker and Kubernetes configurations managing 24-node infrastructure with 99.9% uptime. Multi-node Pterodactyl, MariaDB clustering, and monitoring stack.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop',
    imageAlt: 'Container orchestration with blue and purple nodes',
    details: {
      architecture: 'Multi-node container orchestration with Docker Compose and Kubernetes, MariaDB master-slave replication, Prometheus + Grafana monitoring, automated failover.',
      highlights: [
        '24-node production infrastructure',
        'MariaDB: 2M+ queries/day',
        'Deployment time: 45min → 8min',
        '99.9% uptime over 18 months'
      ]
    },
    metrics: [
      { label: 'Nodes', value: '24', target: 24, suffix: '' },
      { label: 'Users', value: '300+', target: 300, suffix: '+' }
    ],
    colors: {
      primary: 'text-sky-400',
      glow: '#38bdf8',
      gradient: 'from-sky-500/20 to-cyan-600/20'
    },
    links: { github: 'https://github.com/aikusan/docker-kubernetes-automation' },
    lastUpdated: '2026-01-20'
  },
  {
    id: 'spring-microservices',
    title: 'Java Spring Microservices',
    category: 'Automation',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'MongoDB', 'RabbitMQ', 'Redis'],
    description: 'Enterprise microservices architecture for support ticket system. API Gateway, service mesh, event-driven messaging, and distributed caching. Response time: 80ms → 35ms.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    imageAlt: 'Java code with Spring Boot framework',
    details: {
      architecture: 'Microservices with Spring Cloud Gateway, Config Server, MongoDB for tickets, MariaDB for users, RabbitMQ for async messaging, Redis caching layer.',
      highlights: [
        '5 microservices with service discovery',
        'Event-driven with RabbitMQ',
        'JWT authentication + RBAC',
        'Response time improved 56%'
      ]
    },
    metrics: [
      { label: 'Services', value: '5', target: 5, suffix: '' },
      { label: 'Users', value: '300+', target: 300, suffix: '+' }
    ],
    colors: {
      primary: 'text-red-400',
      glow: '#f87171',
      gradient: 'from-red-500/20 to-rose-600/20'
    },
    links: { github: 'https://github.com/aikusan/java-spring-microservices-demo' },
    lastUpdated: '2026-01-10'
  },
  {
    id: 'mariadb-optimization',
    title: 'MariaDB Performance Optimization',
    category: 'Infrastructure',
    tech: ['MariaDB', 'MySQL', 'Sysbench', 'Query Profiling', 'Indexing'],
    description: 'Production database tuning guide that reduced query time from 800ms to 35ms (96% improvement). Scaled from 100 to 300+ users on same hardware with 2M+ queries/day.',
    gridSpan: 'col-span-1',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop',
    imageAlt: 'Database performance graphs and metrics',
    details: {
      architecture: 'Production-optimized MariaDB configs, master-slave replication, automated benchmarking with sysbench, query profiling, strategic indexing, and performance monitoring.',
      highlights: [
        'Query time: 800ms → 35ms (96% faster)',
        'Slow queries: 15% → <1%',
        'Zero deadlocks after optimization',
        'Server load reduced by 75%'
      ]
    },
    metrics: [
      { label: 'Performance', value: '96%', target: 96, suffix: '%' },
      { label: 'Queries/Day', value: '2M+', target: 2, suffix: 'M+' }
    ],
    colors: {
      primary: 'text-amber-400',
      glow: '#fbbf24',
      gradient: 'from-amber-500/20 to-yellow-600/20'
    },
    links: { github: 'https://github.com/AIKUSAN/mariadb-optimization-guide' },
    lastUpdated: '2026-01-25'
  }
];

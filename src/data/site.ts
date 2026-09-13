import type { ExperienceRecord, ProjectRecord, RoleFocus } from '@/types/site';
import { projectEvidence } from './evidence';

export const focusCopy: Record<RoleFocus, {
  label: string;
  shortLabel: string;
  headline: string;
  introduction: string;
  resume: string;
}> = {
  support: {
    label: 'IT Support',
    shortLabel: 'Support',
    headline: 'IT Support & Field Services Professional',
    introduction: 'Hands-on troubleshooting, workstation deployment, user support, documentation, and clear escalation across remote and on-site environments.',
    resume: '/resume/lorenz-tazan-it-support.pdf'
  },
  systems: {
    label: 'Systems & Network',
    shortLabel: 'Systems',
    headline: 'IT Systems & Infrastructure Professional',
    introduction: 'Practical systems administration, network operations, secure deployments, documentation, and resilient service delivery.',
    resume: '/resume/lorenz-tazan-systems-cloud.pdf'
  },
  platform: {
    label: 'Cloud & Platform',
    shortLabel: 'Platform',
    headline: 'Systems, Automation & Platform Operations',
    introduction: 'Infrastructure automation, container operations, observability patterns, and lab-built systems that connect operational fundamentals to modern platforms.',
    resume: '/resume/lorenz-tazan-systems-cloud.pdf'
  }
};

export const projects: ProjectRecord[] = [
  {
    id: 'client-support-operations',
    title: 'Client IT Support Operations',
    focus: ['support'],
    provenance: 'independent-business',
    provenanceLabel: 'Independent business',
    summary: 'Day-to-day PC and Mac support plus defined service projects at client-owned business sites.',
    situation: 'Clients needed reliable repair, setup, recovery, and understandable guidance without a dedicated internal IT team.',
    intervention: [
      'Diagnosed hardware, software, peripheral, and connectivity issues',
      'Handled component replacement, data recovery, procurement, setup, and testing',
      'Documented fixes and explained next steps in practical language'
    ],
    verifiedResult: 'Completed 20+ defined IT service projects covering repair, setup and client support at business sites across multiple locations.',
    outcome: '20+',
    outcomeLabel: 'service projects',
    technologies: ['Windows', 'macOS', 'Hardware diagnostics', 'Networking', 'Documentation'],
    collaborators: 'Clients, business owners, end users',
    contribution: 'Diagnosed PC and Mac issues, completed repair and setup work, and explained practical next steps to clients.',
    decisionNotes: [
      'Cover hardware, software, peripherals and connectivity together when troubleshooting.',
      'Pair component replacement, recovery and setup with testing and clear user guidance.'
    ],
    scopeNote: 'An aggregate service record across multiple client projects, not a reconstruction of one incident or a client testimonial.',
    featured: true
  },
  {
    id: 'regional-isp-core',
    title: 'Regional ISP Core Operations',
    focus: ['systems'],
    provenance: 'sanitized-architecture',
    provenanceLabel: 'Sanitized architecture',
    summary: 'Portfolio-safe documentation of telecommunications infrastructure supported during a network administration contract.',
    situation: 'A regional service environment needed stable routing, subscriber connectivity, and maintainable network controls.',
    intervention: [
      'Supported MikroTik RouterOS and pfSense network operations',
      'Maintained routing, firewall controls, access policies, and connectivity procedures',
      'Produced sanitized topology and configuration documentation for portfolio review'
    ],
    verifiedResult: 'Supported MikroTik and pfSense network infrastructure serving 700+ concurrent subscribers.',
    outcome: '700+',
    outcomeLabel: 'concurrent subscribers',
    technologies: ['MikroTik', 'pfSense', 'TCP/IP', 'Routing', 'Network documentation'],
    collaborators: 'Network operations, technical support, service stakeholders',
    sourceUrl: 'https://github.com/AIKUSAN/regional-fiber-isp',
    sourceLabel: 'Inspect sanitized repository',
    contribution: 'Supported MikroTik and pfSense operations, maintained network controls, and investigated connectivity and performance issues.',
    decisionNotes: [
      'The published documentation separates upstream connectivity, routing, policy controls and subscriber access.',
      'The router source expresses VLAN segmentation, primary and backup route priorities, NAT and input filtering.'
    ],
    evidence: projectEvidence.regional,
    scopeNote: 'The subscriber figure describes the supported service environment. Public files are reference artifacts with differing details; this simplified plate is not an as-built topology or an uptime claim.',
    featured: true
  },
  {
    id: 'netops-automation-lab',
    title: 'NetOps Automation Framework',
    focus: ['platform'],
    provenance: 'portfolio-lab',
    provenanceLabel: 'Independent project',
    summary: 'Python implementation for comparing network configurations and classifying configuration drift.',
    situation: 'Configuration drift is difficult to review consistently when checks and remediation steps remain manual.',
    intervention: [
      'Implemented unified comparison of running configurations against golden templates',
      'Added keyword-based severity classification and template-to-device mapping',
      'Wrote mocked test cases for drift detection and selected classification paths'
    ],
    verifiedResult: 'Implemented configuration comparison, severity classification and mocked test cases in Python.',
    outcome: 'LAB',
    outcomeLabel: 'inspectable build',
    technologies: ['Python', 'difflib', 'pytest', 'Nornir', 'NAPALM'],
    collaborators: 'Independent research and implementation',
    sourceUrl: 'https://github.com/AIKUSAN/netops-automation-framework',
    sourceLabel: 'Inspect source repository',
    contribution: 'Built the comparison and classification logic, with device-response mocks to make individual behavior inspectable.',
    decisionNotes: [
      'Compare golden and running text with a standard unified diff so changes can be read directly.',
      'Keep classification explicit: critical and high-priority keywords first, then a text-length threshold.',
      'Use mocked device responses in the existing tests to isolate drift and classification behavior.'
    ],
    evidence: projectEvidence.netops,
    scopeNote: 'Source-inspectable implementation. End-to-end operation, a passing test run and production deployment have not been verified.',
    featured: true
  },
  {
    id: 'secure-site-deployment',
    title: 'Secure Site Deployment Documentation',
    focus: ['support', 'systems'],
    provenance: 'client-employment',
    provenanceLabel: 'Contract engagement',
    summary: 'On-site network and workstation deployment work for a contractor facility.',
    situation: 'A facility required connected workstations, wireless access, shared resources, and practical support documentation.',
    intervention: [
      'Deployed network equipment and wireless access points',
      'Configured workstations and software, assisted with user-account setup, and supported access to printers and shared resources',
      'Produced user-facing connection and troubleshooting guides'
    ],
    verifiedResult: 'Completed the defined March 2025 deployment and documentation engagement.',
    outcome: 'SITE',
    outcomeLabel: 'deployment delivered',
    technologies: ['Ubiquiti', 'Workstation deployment', 'Wi-Fi', 'User support', 'Documentation'],
    collaborators: 'Client stakeholders and facility users',
    contribution: 'Deployed network equipment and workstations, configured software and user access, and produced connection and troubleshooting guides.',
    decisionNotes: [
      'Include wireless access, printers and shared resources in workstation setup.',
      'Provide user-facing documentation alongside equipment and software deployment.'
    ],
    scopeNote: 'A defined March 2025 contract engagement. Client systems and internal documentation remain private.',
    featured: false
  },
  {
    id: 'bash-operations-toolkit',
    title: 'Bash Operations Toolkit',
    focus: ['platform', 'systems'],
    provenance: 'portfolio-lab',
    provenanceLabel: 'Independent project',
    summary: 'Bash source for database backups and Linux server health checks.',
    situation: 'Repeated backup and health checks benefit from a readable, configurable operational workflow.',
    intervention: [
      'Implemented database dump, compression and retention handling',
      'Added Linux resource and systemd service checks',
      'Separated configuration and common helpers from the task scripts'
    ],
    verifiedResult: 'Implemented database-backup and server-health scripts with shared configuration and alert helpers.',
    outcome: 'CODE',
    outcomeLabel: 'operational patterns',
    technologies: ['Bash', 'systemd', 'MySQL / MariaDB', 'Linux'],
    collaborators: 'Independent implementation',
    sourceUrl: 'https://github.com/AIKUSAN/bash-devops-toolkit',
    sourceLabel: 'Inspect source repository',
    contribution: 'Wrote separate backup and monitoring scripts with configurable thresholds, logging and notification calls.',
    decisionNotes: [
      'Keep database backups and host health checks in separate scripts with shared configuration.',
      'Expose resource thresholds and use cooldown logic to limit repeated alerts.'
    ],
    evidence: projectEvidence.bash,
    scopeNote: 'Source inspection only. Backup, retention and alert behavior need environment-specific validation before use; no restore test or production reliability result is claimed.',
    featured: false
  },
  {
    id: 'database-tuning-lab',
    title: 'MariaDB Tuning Workbook',
    focus: ['platform'],
    provenance: 'portfolio-lab',
    provenanceLabel: 'Independent project',
    summary: 'SQL profiling queries and MariaDB configuration choices, presented together for review.',
    situation: 'Database tuning claims are difficult to trust without showing the configuration and measurement approach.',
    intervention: [
      'Documented buffer, connection, and InnoDB configuration choices',
      'Added query-digest, index-usage and lock-wait inspection queries',
      'Included logging and durability settings in the configuration'
    ],
    verifiedResult: 'Created a profiling workbook and configuration reference for examining query behavior and database settings.',
    outcome: 'SQL',
    outcomeLabel: 'repeatable workbook',
    technologies: ['MariaDB', 'MySQL', 'SQL', 'Performance Schema'],
    collaborators: 'Independent implementation',
    sourceUrl: 'https://github.com/AIKUSAN/docker-kubernetes-automation',
    sourceLabel: 'Inspect source repository',
    contribution: 'Organized query-profiling SQL and explicit database settings so the measurement approach and configuration can be inspected side by side.',
    decisionNotes: [
      'Inspect query patterns, index usage and waits rather than relying on one headline performance number.',
      'Make buffer, connection, logging and durability settings visible for review against a target environment.'
    ],
    evidence: projectEvidence.database,
    scopeNote: 'A source workbook, not a benchmark report. Settings and logging changes need environment-specific review; no measured speedup, throughput or production deployment is asserted.',
    featured: false
  }
];

export const experience: ExperienceRecord[] = [
  {
    organization: 'Land of Promise (Patrick Bezalel Pte Ltd)',
    role: 'Independent IT & Platform Support Contractor',
    period: 'June 2024–Present',
    provenance: 'client-employment',
    bullets: [
      'Support a Linux-based online platform and dedicated servers by investigating service, performance, connectivity, and compatibility issues.',
      'Support platform account access and permissions, assist with onboarding, and troubleshoot access and software issues for users and team members.',
      'Maintain Java-based server plugins, test updates, document fixes, and coordinate releases and incident follow-through with the project team.'
    ]
  },
  {
    organization: 'Proven Training Concepts',
    role: 'Network Infrastructure Consultant (Contract)',
    period: 'March 2025',
    provenance: 'client-employment',
    bullets: [
      'Deployed network equipment, wireless access points, workstations, and software.',
      'Assisted with user accounts, printers, shared resources, and desk-side support.',
      'Produced user-facing connectivity and troubleshooting guides.'
    ]
  },
  {
    organization: 'DigiHwy — Land of Promise Project',
    role: 'Lead Developer / Platform Support',
    period: '2023–June 13, 2024',
    provenance: 'client-employment',
    bullets: [
      'Supported the Land of Promise partner project as a full-time DigiHwy employee, working with the DigiHwy team and project owner Patrick Bezalel Pte Ltd.',
      'Developed and maintained Java-based server features and plugins; investigated application and server issues and tested releases for compatibility.',
      'Documented fixes and coordinated technical work across office and remote settings to support daily platform operations.'
    ]
  },
  {
    organization: 'Teknomahika',
    role: 'IT Support & Hardware Repair Specialist — Independent Business',
    period: '2015–2023',
    provenance: 'independent-business',
    bullets: [
      'Provided day-to-day PC and Mac repair, technical support, recovery, and setup for clients.',
      'Completed 20+ IT service projects at client-owned business sites across multiple locations.',
      'Procured, installed, configured, and tested components for workstation and server builds.',
      'Helped clients set up SharePoint during the pandemic.'
    ]
  },
  {
    organization: 'Panay Telephone Corporation II',
    role: 'Network Administrator / IT Specialist — Contract',
    period: '2021–2022',
    provenance: 'client-employment',
    bullets: [
      'Supported network infrastructure serving 700+ concurrent subscribers.',
      'Configured and maintained MikroTik and pfSense network equipment and controls, investigating connectivity and performance issues.',
      'Troubleshot network availability issues in a telecommunications service environment.'
    ]
  },
  {
    organization: 'iQor',
    role: 'CRM Analyst / Specialist',
    period: '2020–2021',
    provenance: 'client-employment',
    bullets: [
      'Maintained CRM data quality and produced operational reports and dashboards.',
      'Trained employees on system workflows and documented established processes.',
      'Collaborated with sales and support teams on day-to-day CRM operations.'
    ]
  }
];

export const education = {
  degree: 'Bachelor of Science in Computer Engineering',
  institution: 'Interface Computer College',
  completion: 'Completed 2020',
  coursework: ['Computer Systems Architecture', 'Network Engineering', 'Database Management', 'Data Structures & Algorithms'],
  development: 'CompTIA Security+',
  status: 'In progress; target completion Fall 2026',
  study: 'Continuing hands-on study in access control, network security, vulnerability management, incident response, and security operations.'
};

export const capabilities = {
  support: ['Windows and macOS troubleshooting', 'Workstation setup and deployment', 'Hardware diagnostics and repair', 'Account access and permissions', 'Remote and desk-side support', 'Documentation and user training'],
  systems: ['Linux administration', 'TCP/IP and connectivity', 'MikroTik and pfSense', 'VLAN and firewall fundamentals', 'Access controls', 'Network documentation'],
  platform: ['Bash automation', 'Docker fundamentals', 'Git and GitHub Actions', 'MariaDB and MySQL', 'Python automation labs', 'Monitoring and rollback patterns']
} satisfies Record<RoleFocus, string[]>;

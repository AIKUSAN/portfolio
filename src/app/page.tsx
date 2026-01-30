import Link from 'next/link';
import { Github, Mail, Download, ExternalLink, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Status Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 ring-1 ring-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Available for immediate hire
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-center text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Systems Engineer
          </h1>
          <p className="mt-6 text-center text-xl leading-8 text-gray-300">
            Infrastructure • Java Systems • Network Administration • DevOps
          </p>

          {/* Introduction */}
          <div className="mt-10 text-center text-lg leading-8 text-gray-400">
            <p className="mb-4">
              IT Infrastructure Specialist with <span className="font-semibold text-white">7+ years IT experience, 3+ years Systems Engineering</span> architecting and managing 
              <span className="font-semibold text-white"> 24-server distributed ecosystems</span> maintaining 99.9% uptime.
            </p>
            <p>
              Specialized in <span className="font-semibold text-white">Linux/Windows administration</span>, 
              application performance optimization, Docker/Kubernetes containerization, and <span className="font-semibold text-white">DevOps CI/CD pipelines</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#experience"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
            >
              View Experience
            </a>
            <a
              href="#projects"
              className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
            >
              See Projects <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex justify-center gap-6">
            <a
              href="https://github.com/AIKUSAN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:lorenztazan@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="tel:+12402562410"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Phone"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">300+</div>
              <div className="mt-2 text-sm text-gray-400">Concurrent Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">24</div>
              <div className="mt-2 text-sm text-gray-400">Distributed Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">99.9%</div>
              <div className="mt-2 text-sm text-gray-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">7+</div>
              <div className="mt-2 text-sm text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Projects Preview */}
      <section id="projects" className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Network Infrastructure Portfolio */}
            <div className="rounded-lg bg-slate-800/50 p-6 ring-1 ring-slate-700 hover:ring-blue-500/50 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">Network Infrastructure Portfolio</h3>
              <p className="text-gray-400 text-sm mb-4">
                Interactive viewer showcasing professional network topologies from ISP and DoD contractor deployments with complete documentation.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">Draw.io</span>
                <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded">Glassmorphism UI</span>
                <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded">GitHub Pages</span>
              </div>
              <a
                href="https://github.com/AIKUSAN/network-infrastructure-diagrams"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View on GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Regional Fiber ISP */}
            <div className="rounded-lg bg-slate-800/50 p-6 ring-1 ring-slate-700 hover:ring-blue-500/50 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">Regional Fiber ISP</h3>
              <p className="text-gray-400 text-sm mb-4">
                ISP core network deployment serving 700+ subscribers with 10Gbps backbone, MikroTik routing, and 99.8% uptime.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-orange-500/10 text-orange-400 rounded">MikroTik</span>
                <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded">pfSense</span>
                <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">BGP</span>
              </div>
              <a
                href="https://github.com/AIKUSAN/regional-fiber-isp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View on GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Government Contractor Network */}
            <div className="rounded-lg bg-slate-800/50 p-6 ring-1 ring-slate-700 hover:ring-blue-500/50 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">DoD Contractor Network</h3>
              <p className="text-gray-400 text-sm mb-4">
                Government compliance network with 3-VLAN segmentation, strict firewall rules, and 0 audit findings.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">Ubiquiti</span>
                <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded">Security</span>
                <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded">Compliance</span>
              </div>
              <a
                href="https://github.com/AIKUSAN/government-contractor-network"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View on GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Docker Kubernetes Automation */}
            <div className="rounded-lg bg-slate-800/50 p-6 ring-1 ring-slate-700 hover:ring-blue-500/50 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">Docker/Kubernetes Automation</h3>
              <p className="text-gray-400 text-sm mb-4">
                Production deployment toolkit with MariaDB clustering, monitoring stacks, and Pterodactyl panel automation.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">Docker</span>
                <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded">Kubernetes</span>
                <span className="px-2 py-1 text-xs bg-orange-500/10 text-orange-400 rounded">IaC</span>
              </div>
              <a
                href="https://github.com/AIKUSAN/docker-kubernetes-automation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View on GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* MariaDB Optimization */}
            <div className="rounded-lg bg-slate-800/50 p-6 ring-1 ring-slate-700 hover:ring-blue-500/50 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">MariaDB Optimization Guide</h3>
              <p className="text-gray-400 text-sm mb-4">
                Performance tuning and clustering documentation for production MariaDB deployments with Galera replication.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded">MariaDB</span>
                <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">Galera</span>
                <span className="px-2 py-1 text-xs bg-orange-500/10 text-orange-400 rounded">Performance</span>
              </div>
              <a
                href="https://github.com/AIKUSAN/mariadb-optimization-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View on GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Java Spring Microservices */}
            <div className="rounded-lg bg-slate-800/50 p-6 ring-1 ring-slate-700 hover:ring-blue-500/50 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2">Java Spring Microservices</h3>
              <p className="text-gray-400 text-sm mb-4">
                Event-driven microservices architecture demo using Spring Boot, with service discovery and API gateway patterns.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded">Spring Boot</span>
                <span className="px-2 py-1 text-xs bg-orange-500/10 text-orange-400 rounded">Java</span>
                <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded">Microservices</span>
              </div>
              <a
                href="https://github.com/AIKUSAN/java-spring-microservices-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View on GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section Preview */}
      <section id="experience" className="px-6 py-16 lg:px-8 bg-slate-800/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
          
          <div className="space-y-8">
            {/* Land of Promise */}
            <div className="relative pl-8 border-l-2 border-blue-500">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500"></div>
              <div className="mb-1 text-sm text-gray-400">Jan 2023 - Present</div>
              <h3 className="text-xl font-semibold text-white">Systems Engineer</h3>
              <div className="text-blue-400 mb-3">Land of Promise • Remote</div>
              <p className="text-gray-400 mb-4">
                Distributed Java Application Platform & Server Infrastructure
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-blue-400 mt-1">▸</span>
                  <span>Managed 24-server distributed ecosystem serving 300+ concurrent users with 99.9% uptime</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 mt-1">▸</span>
                  <span>Reduced operational costs by 65% through migration to bare-metal Debian architecture</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 mt-1">▸</span>
                  <span>Optimized JVM performance reducing latency by 56% (80ms to 35ms) under peak load</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-slate-700 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-600 transition-all"
            >
              <Download className="h-4 w-4" />
              Download Full Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-sm text-gray-500">
          <p>© 2026 Lorenz Tazan. Built with Next.js and deployed on GitHub Pages.</p>
        </div>
      </footer>
    </div>
  );
}

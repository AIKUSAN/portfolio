import Link from "next/link";
import { 
  Server, 
  Terminal, 
  Shield 
} from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  const featuredProjects = projects.slice(0, 3); // Show top 3

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute inset-0 bg-blue-500/5 radial-gradient blur-3xl rounded-full scale-150 -z-10 animate-pulse" />
        
        <div className="space-y-6 max-w-4xl z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for Hire
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Digital Infrastructure <br />
            <span className="text-blue-500">Engineered to Scale</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I am a Systems Engineer specializing in high-performance network architecture, automated deployments, and secure enterprise environments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              href="/projects"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              View Projects
            </Link>
            <a 
              href="/resume.pdf"
              target="_blank"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Download Resume
            </a>
          </div>

          <div className="flex gap-6 justify-center pt-12 items-center">
             <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/5 rounded-full border border-white/10">
                  <Server className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Systems</span>
             </div>
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/5 rounded-full border border-white/10">
                  <Terminal className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Automation</span>
             </div>
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/5 rounded-full border border-white/10">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Security</span>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Work</h2>
              <p className="text-gray-400">Selected infrastructure and engineering projects.</p>
            </div>
            <Link href="/projects" className="hidden md:inline-flex text-blue-400 hover:text-blue-300 items-center">
              View All <span className="ml-2">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/projects" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
              View All Projects <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Professional Experience</h2>
          
          <div className="space-y-12">
            <div className="relative border-l-2 border-white/10 pl-8 md:pl-12 py-2">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Systems Engineer</h3>
                <span className="text-sm text-blue-400 font-mono">Jan 2023 - Present</span>
              </div>
              <h4 className="text-lg text-gray-400 mb-4">Land of Promise • Remote</h4>
              <ul className="list-disc list-outside ml-4 space-y-2 text-gray-300">
                <li>Managed 24-server distributed ecosystem serving 300+ concurrent users with 99.9% uptime through load balancing and failover protocols</li>
                <li>Optimized JVM performance, reducing latency 56% (80ms to 35ms). Migrated to Debian 12 bare-metal, cutting costs 65%</li>
                <li>Built CI/CD framework using Docker/Bash, reducing deployments from 30min to &lt;2min. Developed 15+ Java modules with MariaDB/MySQL/Redis/MongoDB persistence</li>
                <li>Implemented 24/7 monitoring and alerting, reducing downtime 80%. Led 7-person distributed technical team</li>
              </ul>
            </div>

            <div className="relative border-l-2 border-white/10 pl-8 md:pl-12 py-2">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Network Infrastructure Consultant</h3>
                <span className="text-sm text-purple-400 font-mono">Mar 2025</span>
              </div>
              <h4 className="text-lg text-gray-400 mb-4">DoD Contractor • On-site</h4>
              <ul className="list-disc list-outside ml-4 space-y-2 text-gray-300">
                <li>Designed secure enterprise network using Ubiquiti (UDM Pro, Switch Pro 24 PoE, Wi-Fi 6) for DoD contractor facility</li>
                <li>Produced technical documentation: BoM, CAT6 schematics, rack layouts, UPS redundancy plans</li>
                <li>Implemented firewall rules, VLAN segmentation, VPN controls aligned with defense security standards - achieved 0 audit findings</li>
              </ul>
            </div>

            <div className="relative border-l-2 border-white/10 pl-8 md:pl-12 py-2">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-600"></div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Network Administrator / IT Specialist</h3>
                <span className="text-sm text-gray-500 font-mono">2021 - 2022</span>
              </div>
              <h4 className="text-lg text-gray-400 mb-4">Regional Fiber ISP • Independent Contractor</h4>
              <ul className="list-disc list-outside ml-4 space-y-2 text-gray-300">
                <li>Deployed ISP-grade infrastructure using MikroTik routing for 700+ subscribers across multi-site telecommunications network</li>
                <li>Implemented pfSense firewall and load-balancing for optimized traffic distribution with 99.8% uptime</li>
                <li>Applied server security: ACLs, patch management, network segmentation. Provided on-site support for outages and optimization</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              Download Full Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


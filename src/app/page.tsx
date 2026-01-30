import Link from "next/link";
import { 
  Server, 
  Terminal, 
  Shield 
} from "lucide-react";
import ProjectTile from "@/components/ui/ProjectTile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 rounded-[100%] blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/5 rounded-[100%] blur-[120px] -z-10" />
        
        <div className="space-y-8 max-w-5xl z-10 relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Systems Engineer | Network Architect
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6">
            Infrastructure <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Engineered to Scale
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Specializing in high-performance network architecture, automated compliance, and zero-trust security environments for enterprise and government sectors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <Link 
              href="#projects"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg shadow-white/5"
            >
              View Featured Work
            </Link>
            <a 
              href="/resume.pdf"
              target="_blank"
              className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Download Resume
            </a>
          </div>

          {/* Tech Stack Indicators */}
          <div className="flex gap-8 justify-center pt-20 items-center opacity-80">
             <div className="flex flex-col items-center gap-3 group">
                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                  <Server className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-[10px] md:text-xs text-blue-300/60 uppercase tracking-widest font-semibold">Systems</span>
             </div>
             <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
             <div className="flex flex-col items-center gap-3 group">
                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                  <Terminal className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-[10px] md:text-xs text-purple-300/60 uppercase tracking-widest font-semibold">Automation</span>
             </div>
             <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
             <div className="flex flex-col items-center gap-3 group">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-[10px] md:text-xs text-emerald-300/60 uppercase tracking-widest font-semibold">Security</span>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Quilted Grid */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:flex md:justify-between md:items-end">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Selected Works</h2>
              <p className="text-lg text-gray-400 max-w-xl">
                A showcase of network engineering, automation scripts, and infrastructure diagrams.
              </p>
            </div>
          </div>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] grid-flow-row-dense">
            {projects.map((project) => (
              <ProjectTile key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://github.com/AIKUSAN" 
              target="_blank"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors border-b border-white/0 hover:border-blue-400 pb-1"
            >
              View more on GitHub <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Professional Timeline</h2>
          
          <div className="space-y-12">
            <div className="relative border-l border-blue-500/30 pl-8 md:pl-16 py-2">
              <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] ring-4 ring-black"></span>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Systems Engineer</h3>
                <span className="text-sm text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">2023 - Present</span>
              </div>
              <h4 className="text-lg text-gray-400 mb-6 flex items-center gap-2">
                Tech Corp Solutions
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
                  <span>Designed and implemented scalable cloud infrastructure on AWS for high-traffic enterprise applications.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
                  <span>Automated deployment pipelines using GitHub Actions and Terraform, reducing release time by 60%.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
                  <span>Managed Linux server fleets utilizing Ansible for configuration management and drift detection.</span>
                </li>
              </ul>
            </div>

            <div className="relative border-l border-white/10 pl-8 md:pl-16 py-2">
              <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-gray-600 ring-4 ring-black"></span>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Network Junior Admin</h3>
                <span className="text-sm text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10">2021 - 2023</span>
              </div>
              <h4 className="text-lg text-gray-400 mb-6">Regional ISP Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span>Monitored network uptime and resolved L2/L3 connectivity issues for 500+ commercial clients.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span>Configured VLANs, OSPF routing, and firewall rules on Cisco and Mikrotik equipment.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span>Assisted in the migration of core routing equipment with minimal downtime during maintenance windows.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 Lorenz Tazan. Built with Next.js & Tailwind.</p>
      </footer>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Briefcase, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Systems Engineer",
    company: "Land of Promise",
    location: "Remote",
    period: "January 2023 - Present",
    current: true,
    color: "blue",
    achievements: [
      "Built and managed **24-server distributed ecosystem** serving **300+ concurrent users** with **99.9% uptime** through load balancing and automated failover protocols",
      "Implemented **AI-enhanced infrastructure automation** for **Pterodactyl (containerized infrastructure management platform)** APIs, integrating multi-LLM systems (Gemini, Claude, GPT-4) for intelligent network configuration validation, reducing manual tasks **85%**",
      "Optimized **JVM performance** and **MariaDB queries**, reducing application latency **56% (80ms → 35ms)** and database response times **96% (800ms → 35ms)** while handling **2M+ queries/day**",
      "Led infrastructure migration to **Debian 12 bare-metal**, implementing **Docker containerization** and automated deployment pipelines, cutting operational costs **65%** and deployment time **93% (30min → <2min)**",
      "Developed **15+ custom Java modules** with **Spring Framework** integrated with MariaDB, MySQL, Redis, and MongoDB for distributed applications",
      "Implemented **24/7 monitoring and alerting** with **Prometheus/Grafana**, reducing critical incident response time by **80%**",
      "Collaborated with **7-person technical team** across development, operations, and community management"
    ],
    technologies: ["Docker", "Kubernetes", "MariaDB", "Redis", "Java", "Python", "Bash", "CI/CD", "nginx"]
  },
  {
    title: "Network Infrastructure Consultant",
    company: "Proven Training Concepts (DoD Contractor)",
    location: "On-site",
    period: "March 2025",
    current: false,
    color: "emerald",
    achievements: [
      "Implemented secure enterprise network using Ubiquiti equipment for DoD contractor facility",
      "Produced comprehensive technical documentation including Bill of Materials, CAT6 schematics, rack layouts, and UPS redundancy plans",
      "Implemented firewall rules, VLAN segmentation, and VPN controls aligned with defense security standards",
      "Achieved **0 audit findings** during government inspection for NIST 800-171 compliance",
      "Established zero-trust architecture with 802.1X authentication and WPA3-Enterprise wireless security"
    ],
    technologies: ["Ubiquiti", "RADIUS", "WPA3", "VLAN", "NIST 800-171", "Zero-Trust Architecture"]
  },
  {
    title: "Network Administrator / IT Specialist",
    company: "Panay Telephone Corporation II",
    location: "Independent Contractor",
    period: "2021 - 2022",
    current: false,
    color: "purple",
    achievements: [
      "Deployed **ISP-grade infrastructure** using **MikroTik routing** for enterprise telecommunications clients",
      "Managed infrastructure serving **700+ concurrent subscribers** with **99.8% network availability** and 10Gbps backbone capacity",
      "Configured **BGP routing**, **MPLS**, and traffic optimization with **<30 second convergence times**",
      "Implemented **pfSense firewall clusters** and load-balancing for optimized traffic distribution across multi-WAN connections",
      "Applied comprehensive server security: ACLs, patch management, and network segmentation",
      "Achieved average latency **<5ms to subscribers**, **<15ms to upstream peers** with peak load 9.2Gbps"
    ],
    technologies: ["MikroTik", "pfSense", "BGP", "OSPF", "MPLS", "VLANs", "QoS", "Traffic Shaping"]
  },
  {
    title: "Team Lead (Customer Relationship Management)",
    company: "iQor",
    location: "On-site",
    period: "2020 - 2021",
    current: false,
    color: "cyan",
    achievements: [
      "Supervised customer support team conducting **Salesforce CRM** training on best practices and operational workflows",
      "Analyzed customer data using **Excel** to improve service metrics and satisfaction scores",
      "Maintained Salesforce dashboards to streamline reporting and **reduce handle time 15%**",
      "Successfully led a 12-person team during high-volume periods with 100% SLA compliance"
    ],
    technologies: ["Salesforce CRM", "Microsoft Excel", "Data Analysis"]
  },
  {
    title: "Owner / Technical Consultant",
    company: "Teknomahika",
    location: "Independent Business",
    period: "2015 - 2023",
    current: false,
    color: "orange",
    achievements: [
      "Founded IT consulting business specializing in machine repair, performance restoration, and custom PC builds for SMB clients",
      "Delivered hardware/software troubleshooting achieving 95%+ customer satisfaction across 20+ projects",
      "Managed end-to-end delivery: procurement, installation, and testing for custom server/workstation builds",
      "Provided comprehensive services including custom builds, hardware troubleshooting, and performance tuning"
    ],
    technologies: ["Hardware Diagnostics", "Custom PC Builds", "Server Configuration", "Performance Optimization"]
  }
];

const colorMap: { [key: string]: { border: string; glow: string; badge: string } } = {
  blue: { border: "border-blue-500/30", glow: "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]", badge: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
  emerald: { border: "border-emerald-500/30", glow: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]", badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
  purple: { border: "border-purple-500/30", glow: "bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]", badge: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
  cyan: { border: "border-cyan-500/30", glow: "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]", badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" },
  orange: { border: "border-orange-500/30", glow: "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]", badge: "bg-orange-500/10 border-orange-500/20 text-orange-400" },
};

/**
 * ExperiencePage Component
 * 
 * Displays professional career history using an interactive timeline.
 * Visualizes career progression with color-coded companies, achievement highlights,
 * and technical skill tags.
 * 
 * Features:
 * - Responsive vertical timeline
 * - Scroll-triggered animations (Framer Motion)
 * - Dynamic data mapping
 */
export default function ExperiencePage() {
  return (
    <>
      <Header />
      <AnimatedBackground />

      <div className="min-h-screen pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6">
              Professional <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600">
              7 years of hands-on IT experience with focus on Systems Engineering, implementing enterprise infrastructure and managing distributed systems.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative border-l ${colorMap[exp.color].border} pl-8 md:pl-16 py-2`}
              >
                <span className={`absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full ${colorMap[exp.color].glow} ring-4 dark:ring-black ring-white`}></span>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">{exp.title}</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 dark:text-gray-400 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-lg">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 dark:text-gray-500 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-sm font-mono px-3 py-1 rounded-full border ${colorMap[exp.color].badge} whitespace-nowrap mt-2 sm:mt-0`}>
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3 dark:text-gray-300 text-gray-700 mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className={`mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 ${colorMap[exp.color].glow.split(' ')[0]}`}></span>
                      <span dangerouslySetInnerHTML={{ __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-[10px] uppercase font-bold tracking-wider dark:text-white/60 text-gray-700 dark:bg-white/5 bg-gray-100 px-2 py-1 rounded border dark:border-white/5 border-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 text-center">Career Highlights</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">7</div>
                <div className="dark:text-gray-400 text-gray-600 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">99.9%</div>
                <div className="dark:text-gray-400 text-gray-600 text-sm">Infrastructure Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">700+</div>
                <div className="dark:text-gray-400 text-gray-600 text-sm">Network Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">65%</div>
                <div className="dark:text-gray-400 text-gray-600 text-sm">Cost Reduction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

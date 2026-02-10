"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Mail, Phone } from "lucide-react";
import ProjectTile from "@/components/ui/ProjectTile";
import { projects } from "@/data/projects";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  // Show the 3 most recently updated projects
  const featuredProjects = [...projects]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);

  return (
    <>
      <Header />
      <AnimatedBackground />
      
      <div className="flex flex-col min-h-screen pt-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative">
          <div className="space-y-8 max-w-5xl z-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-medium backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Open to Opportunities | Systems Engineer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold tracking-tight dark:text-white text-gray-900 mb-6"
            >
              Lorenz Tazan
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Systems Engineer
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Systems Engineer with 7 years of hands-on experience building and maintaining high-availability distributed systems. Currently managing 24-server gaming platform serving 300+ concurrent users with 99.9% uptime. Implementing multi-LLM orchestration (Gemini, Claude, GPT-4) for intelligent infrastructure automation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
            >
              <Link 
                href="/projects"
                className="px-8 py-4 dark:bg-white dark:text-black bg-gray-900 text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105 shadow-lg dark:shadow-white/5 shadow-gray-400/20"
              >
                View Projects
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 dark:bg-white/5 dark:text-white bg-gray-100 text-gray-900 font-semibold rounded-full border dark:border-white/10 border-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center pt-12 items-center text-sm dark:text-gray-400 text-gray-600"
            >
              <a href="mailto:lorenztazan@gmail.com" className="flex items-center gap-2 dark:hover:text-white hover:text-black transition-colors">
                <Mail className="w-4 h-4" />
                lorenztazan@gmail.com
              </a>
              <a href="tel:240-256-2410" className="flex items-center gap-2 dark:hover:text-white hover:text-black transition-colors">
                <Phone className="w-4 h-4" />
                240-256-2410
              </a>
              <a href="https://github.com/AIKUSAN" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 dark:hover:text-white hover:text-black transition-colors">
                <Github className="w-4 h-4" />
                @AIKUSAN
              </a>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">Latest Projects</h2>
              <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl">
                Recently updated projects showcasing AI-powered automation, infrastructure optimization, and production deployments.
              </p>
            </motion.div>
            
            {/* Uniform Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {featuredProjects.map((project, index) => (
                <ProjectTile key={project.id} project={project} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black transition-colors border-b border-transparent hover:border-blue-400 pb-1"
              >
                View All Projects <span className="text-xl">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold dark:text-white text-gray-900 mb-16 text-center"
            >
              Professional Experience
            </motion.h2>
            
            <div className="space-y-12">
              {/* Current Role */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative border-l border-blue-500/30 pl-8 md:pl-16 py-2"
              >
                <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] ring-4 dark:ring-black ring-white"></span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900">Systems Engineer</h3>
                  <span className="text-sm text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">2023 - Present</span>
                </div>
                <h4 className="text-lg dark:text-gray-400 text-gray-600 mb-6">Land of Promise</h4>
                <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                  <li className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
                    <span>Built and managed 24-server distributed ecosystem serving 300+ concurrent users with <strong>99.9% uptime</strong></span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
                    <span>Optimized JVM performance, reducing latency <strong>56% (80ms to 35ms)</strong></span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
                    <span>Built CI/CD framework using Docker/Bash, reducing deployments from <strong>30 minutes to &lt;2 minutes</strong></span>
                  </li>
                </ul>
              </motion.div>

              {/* DoD Contractor */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative border-l border-emerald-500/30 pl-8 md:pl-16 py-2"
              >
                <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] ring-4 dark:ring-black ring-white"></span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900">Network Infrastructure Consultant</h3>
                  <span className="text-sm text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">March 2025</span>
                </div>
                <h4 className="text-lg dark:text-gray-400 text-gray-600 mb-6">Proven Training Concepts (DoD Contractor)</h4>
                <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                  <li className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500/50 flex-shrink-0"></span>
                    <span>Implemented NIST 800-171 compliant network with <strong>0 audit findings</strong></span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500/50 flex-shrink-0"></span>
                    <span>Implemented zero-trust architecture with WPA3-Enterprise and network segmentation</span>
                  </li>
                </ul>
              </motion.div>

              {/* ISP Role */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative border-l dark:border-white/10 border-gray-300 pl-8 md:pl-16 py-2"
              >
                <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-gray-600 ring-4 dark:ring-black ring-white"></span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900">Network Administrator</h3>
                  <span className="text-sm dark:text-gray-500 text-gray-600 font-mono dark:bg-white/5 bg-gray-100 px-3 py-1 rounded-full border dark:border-white/10 border-gray-200">2021 - 2022</span>
                </div>
                <h4 className="text-lg dark:text-gray-400 text-gray-600 mb-6">Panay Telephone Corporation II</h4>
                <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                  <li className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                    <span>Deployed 10Gbps fiber backbone serving <strong>700+ subscribers with 99.8% uptime</strong></span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                    <span>Managed BGP routing with &lt;30 second convergence times</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black transition-colors border-b border-transparent hover:border-blue-400 pb-1"
              >
                View Full Experience <span className="text-xl">→</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

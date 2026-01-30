"use client";

import { motion } from 'framer-motion';
import Link from "next/link";
import NetworkBackground from "@/components/layout/NetworkBackground";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import ProjectTile from "@/components/ui/ProjectTile";
import { projects } from "@/data/projects";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <>
      <NetworkBackground />
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative overflow-hidden pt-16">
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
              Available for Opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6"
            >
              LORENZ TAZAN
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Systems Engineer
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Building high-performance network infrastructure, automated compliance systems, 
              and zero-trust security environments for enterprise and government sectors.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Get In Touch
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="pt-20"
            >
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="animate-bounce text-gray-400 hover:text-white transition-colors"
              >
                <ArrowDown className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        </section>

        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 text-center md:text-left"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-400 max-w-xl">
                Selected infrastructure designs, network automation, and security implementations.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] grid-flow-row-dense">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => project.github && window.open(project.github, '_blank')}
                  className="cursor-pointer"
                >
                  <ProjectTile project={project} index={index} />
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <a 
                href="https://github.com/AIKUSAN" 
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:border-blue-500/30 transition-all"
              >
                View All on GitHub <span className="text-xl">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        <Contact />

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© 2026 Lorenz Tazan. Built with Next.js, Tailwind CSS & Framer Motion.</p>
        </footer>
      </main>
    </>
  );
}

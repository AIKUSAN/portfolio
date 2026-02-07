"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProjectTile from "@/components/ui/ProjectTile";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Sort projects by lastUpdated in reverse chronological order (newest first)
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // If a project is selected, show detail view
  if (selectedProject) {
    return (
      <>
        <Header />
        <AnimatedBackground />
        <AnimatePresence mode="wait">
          <ProjectDetail 
            key={selectedProject}
            projectId={selectedProject} 
            onBack={() => setSelectedProject(null)} 
          />
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Header />
      <AnimatedBackground />
      
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6">
              Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-3xl">
              Production infrastructure deployments, ISP networks, and DevOps automation solutions. Each project represents real-world implementations with quantifiable results.
            </p>
          </motion.div>

          {/* Projects Grid - Uniform Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            {sortedProjects.map((project, index) => (
              <ProjectTile 
                key={project.id} 
                project={project} 
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </motion.div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center dark:bg-gradient-to-r dark:from-blue-500/10 dark:to-purple-500/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:border-blue-500/20 border-blue-500/30 border rounded-2xl p-12"
          >
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">Explore More on GitHub</h2>
            <p className="dark:text-gray-400 text-gray-600 mb-6 max-w-2xl mx-auto">
              Visit my GitHub profile for complete project repositories, detailed documentation, and production-ready configurations.
            </p>
            <a
              href="https://github.com/AIKUSAN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:text-black text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
              </svg>
              View GitHub Profile
              <ArrowUpRight className="w-5 h-5 ml-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}

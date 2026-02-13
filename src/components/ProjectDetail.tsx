"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Layers, Zap, CheckCircle } from 'lucide-react';
import { Project } from '@/types';
import MetricCounter from '@/components/ui/MetricCounter';
import ProjectSimulation from '@/components/ui/ProjectSimulation';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen dark:bg-slate-950 bg-white dark:text-slate-100 text-gray-900 selection:bg-cyan-500/30 pb-20"
    >
      {/* Hero Section with Image & Simulation */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 dark:bg-slate-900 bg-gray-100">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-full object-cover opacity-20 blur-sm"
            loading="lazy"
          />
        </div>

        {/* Interactive Simulation Layer */}
        <ProjectSimulation projectId={project.id} colorHex={project.colors.glow} />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-slate-950 dark:via-slate-950/40 dark:to-transparent bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
        <div className={`absolute inset-0 bg-gradient-to-tr ${project.colors.gradient} opacity-10 mix-blend-overlay z-10`} />

        {/* Navigation */}
        <div className="absolute top-0 left-0 p-6 md:p-8 pt-24 md:pt-28 z-30 w-full">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-full dark:bg-slate-900/50 bg-gray-200/50 backdrop-blur-md dark:border-slate-700 border-gray-300 border dark:hover:bg-slate-800 hover:bg-gray-300 transition-all text-sm font-medium dark:text-slate-300 text-gray-700 dark:hover:text-white hover:text-gray-900"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>
        </div>

        {/* Hero Title */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-semibold dark:bg-slate-900/80 bg-gray-200/80 dark:border-slate-700 border-gray-300 border backdrop-blur-md ${project.colors.primary}`}>
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight dark:text-white text-gray-900 mb-4 leading-tight drop-shadow-2xl">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 md:mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-xl font-bold dark:text-white text-gray-900 flex items-center gap-2 mb-4">
                <Layers className={`w-5 h-5 ${project.colors.primary.split(' ')[0]}`} />
                Project Overview
              </h2>
              <p className="dark:text-slate-300 text-gray-700 text-lg leading-relaxed">
                {project.description}
              </p>
            </motion.section>

            {/* Architecture */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="dark:bg-slate-900/30 bg-gray-100 rounded-2xl p-6 dark:border-slate-800 border-gray-200 border backdrop-blur-sm"
            >
              <h2 className="text-xl font-bold dark:text-white text-gray-900 flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                Technical Architecture
              </h2>
              <p className="dark:text-slate-400 text-gray-600 leading-relaxed mb-6">
                {project.details.architecture}
              </p>
              {/* Highlights */}
              <div className="space-y-3">
                {project.details.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`w-5 h-5 mt-0.5 ${project.colors.primary.split(' ')[0]}`} />
                    <span className="dark:text-slate-300 text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex gap-4"
            >
              {project.links.github && (
                <a href={project.links.github} className="flex-1 flex items-center justify-center gap-2 py-3 dark:bg-slate-800 bg-gray-200 dark:hover:bg-slate-700 hover:bg-gray-300 rounded-lg dark:text-white text-gray-900 font-medium transition-all hover:scale-105 dark:border-slate-700 border-gray-300 border">
                  <Github size={18} /> Source Code
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white font-medium transition-all hover:scale-105 border border-transparent shadow-[0_0_15px_rgba(0,0,0,0.3)] bg-gradient-to-r ${project.colors.gradient.replace('/20', '')}`}>
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </motion.div>

            {/* Metrics Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="dark:bg-slate-900/50 bg-gray-100 backdrop-blur-sm rounded-xl dark:border-slate-800 border-gray-200 border p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-slate-500 text-gray-500 mb-6">Key Metrics</h3>
              <div className="grid grid-cols-1 gap-6">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                    className="flex items-center justify-between"
                  >
                    <span className="dark:text-slate-400 text-gray-600">{metric.label}</span>
                    <div className={`text-2xl font-bold ${project.colors.primary.split(' ')[0]}`}>
                      <MetricCounter value={metric.target} suffix={metric.suffix} inView={true} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-slate-500 text-gray-500 mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.3, type: "spring", stiffness: 150 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="px-3 py-1.5 rounded-md dark:bg-slate-800 bg-gray-200 dark:text-slate-300 text-gray-700 text-sm dark:border-slate-700 border-gray-300 border cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

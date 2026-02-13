"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Server, Shield, Cpu, Activity, ArrowRight } from "lucide-react";
import { Project } from "@/types";
import MetricCounter from "./MetricCounter";

interface ProjectTileProps {
  project: Project;
  index: number;
  onClick?: (id: string) => void;
}

// Map icons to categories
const CategoryIcon = ({ category, className }: { category: string; className?: string }) => {
  switch (category) {
    case 'Infrastructure': return <Server className={className} />;
    case 'Security': return <Shield className={className} />;
    case 'Automation': return <Cpu className={className} />;
    default: return <Activity className={className} />;
  }
};

export default function ProjectTile({ project, index, onClick }: ProjectTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine entry direction based on grid column logic (simplified for 3-col grid)
  const getDirectionalVariant = (idx: number) => {
    const mod = idx % 3;
    if (mod === 0) return { x: -50, y: 20 }; // From Left
    if (mod === 1) return { x: 0, y: 50 };   // From Bottom
    return { x: 50, y: 20 };                 // From Right
  };

  const initialPos = getDirectionalVariant(index);

  const cardVariants = {
    hidden: { opacity: 0, ...initialPos, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`relative group rounded-xl overflow-hidden cursor-pointer dark:bg-slate-800/60 bg-white/80 dark:border-slate-700/50 border-gray-200 border backdrop-blur-sm ${project.gridSpan} flex flex-col shadow-lg min-h-[450px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(project.id)}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      style={{
        boxShadow: isHovered ? `0 0 25px ${project.colors.glow}40` : 'none',
        transition: 'box-shadow 0.3s ease-out'
      }}
    >
      {/* Background Image or Fallback Pattern */}
      <div className="absolute inset-0 z-0 dark:bg-slate-900 bg-gray-100">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:grayscale-[0.2]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full relative overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-out dark:bg-slate-900 bg-gray-100">
            {/* Dynamic Abstract Pattern */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.colors.gradient} opacity-20`} />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(${project.colors.glow} 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Geometric Accents */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 border-dashed opacity-20 ${project.colors.primary.replace('text-', 'border-')}`} />
            <div className={`absolute bottom-20 -left-10 w-60 h-60 rounded-full dark:border-slate-700/50 border-gray-300/50 border opacity-30`} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rotate-45 dark:border-slate-600/30 border-gray-400/30 border`} />
          </div>
        )}

        {/* Dark Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-900/20 from-gray-900/90 via-gray-900/60 to-gray-900/10 opacity-90 transition-opacity duration-300 ${isHovered ? 'dark:opacity-95 opacity-95' : 'dark:opacity-80 opacity-85'}`} />

        {/* Hover Gradient Effect */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${project.colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold dark:bg-slate-900/50 bg-white/90 dark:border-slate-700 border-gray-300 border backdrop-blur-md ${project.colors.primary}`}>
            <CategoryIcon category={project.category} className="w-3 h-3" />
            {project.category}
          </span>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            {project.links.github && (
              <a
                href={project.links.github}
                onClick={(e) => e.stopPropagation()}
                className="p-2 dark:bg-slate-800 bg-white/90 rounded-full dark:hover:bg-slate-700 hover:bg-gray-100 dark:text-white text-gray-800 dark:border-transparent border border-gray-300 transition-colors"
                title="View on GitHub"
              >
                <Github size={16} />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                onClick={(e) => e.stopPropagation()}
                className="p-2 dark:bg-slate-800 bg-white/90 rounded-full dark:hover:bg-slate-700 hover:bg-gray-100 dark:text-white text-gray-800 dark:border-transparent border border-gray-300 transition-colors"
                title="Live Demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Main Title & Static Desc */}
        <div className={`transition-all duration-500 ${isHovered ? '-translate-y-4' : 'translate-y-0'}`}>
          <h3 className="text-2xl font-bold dark:text-white text-white mb-2 leading-tight drop-shadow-lg">{project.title}</h3>
          <p className={`dark:text-slate-300 text-gray-100 text-sm line-clamp-2 transition-opacity duration-300 drop-shadow ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            {project.description}
          </p>

          {/* Tech Stack Tags (Static View) */}
          <div className={`flex flex-wrap gap-2 mt-4 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="text-xs dark:text-slate-300 text-gray-100 dark:bg-slate-800/80 bg-gray-800/80 px-2 py-1 rounded dark:border-slate-700 border-gray-600 border backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Slide-Up Overlay (Technical Summary) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-x-0 bottom-0 p-6 dark:bg-slate-900/95 bg-white/95 dark:border-slate-700 border-gray-300 border-t backdrop-blur-xl rounded-t-2xl"
            >
              <div className="space-y-4">
                {/* Tech Details */}
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${project.colors.primary}`}>Architecture</h4>
                  <p className="dark:text-slate-300 text-gray-700 text-xs leading-relaxed">
                    {project.details.architecture}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 my-2">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                      <span className={`text-xl font-bold dark:text-white text-gray-900 flex items-baseline`}>
                        <MetricCounter value={metric.target} suffix={metric.suffix} inView={isHovered} />
                      </span>
                      <span className="text-[10px] uppercase dark:text-slate-500 text-gray-500 font-medium">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* View Project Button */}
                {onClick && (
                  <div className="flex items-center justify-between mt-2 pt-3 dark:border-slate-800 border-gray-300 border-t">
                    <span className="text-xs dark:text-slate-500 text-gray-500">Click to view details</span>
                    <ArrowRight className={`w-4 h-4 ${project.colors.primary}`} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

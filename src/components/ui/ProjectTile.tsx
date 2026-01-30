"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectTileProps {
  project: Project;
  index: number;
}

export default function ProjectTile({ project, index }: ProjectTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm ${project.span || 'col-span-1 row-span-1'}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80`} />
        
        {/* Color Accent Overlay based on category */}
        <div className={`absolute inset-0 opacity-20 mix-blend-overlay ${project.imageClass}`} />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex justify-between items-start">
           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/10 backdrop-blur-md shadow-inner">
            {project.category}
          </span>
          
           {/* Quick Action Links on Hover */}
           <div className="flex gap-2 translate-y-[-10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
           </div>
        </div>

        <div className="mt-auto">
          <div className="mb-4 transform transition-all duration-300 group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-blue-200 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-300/80 text-sm line-clamp-3 group-hover:line-clamp-none group-hover:text-gray-200 transition-all">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] uppercase font-bold tracking-wider text-white/70 bg-white/5 px-2 py-1 rounded border border-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight className="text-white/30 w-6 h-6" />
      </div>
    </motion.div>
  );
}

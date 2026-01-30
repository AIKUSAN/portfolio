import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectTileProps {
  project: Project;
}

export default function ProjectTile({ project }: ProjectTileProps) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/10 ${project.span || 'col-span-1 row-span-1'} ${project.imageClass}`}
    >
      {/* Abstract Background/Decorations can be added here */}
      
      {/* Content Top */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/20 text-white/90 border border-white/10 backdrop-blur-md shadow-inner">
            {project.category}
          </span>
          <div className="flex gap-2 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-black/40 rounded-full hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-black/40 rounded-full hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-blue-100 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-200/80 text-sm md:text-base leading-relaxed max-w-lg">
          {project.description}
        </p>
      </div>

      {/* Content Bottom */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/5">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

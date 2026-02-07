"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { 
  Layers, Activity, TrendingUp, Zap
} from "lucide-react";

// Tech Stack Network - Represents real-world technology relationships
// Using official DevIcons CDN for brand logos
const devicon = (name: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
const deviconPlain = (name: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-plain.svg`;

const techStack = [
  // Infrastructure Core
  { id: "docker", name: "Docker/Swarm", category: "Infrastructure", level: 90, x: 28, y: 42, logo: devicon("docker"), connections: ["kubernetes", "nginx", "redis", "mariadb"] },
  { id: "kubernetes", name: "Kubernetes", category: "Infrastructure", level: 90, x: 48, y: 28, logo: devicon("kubernetes"), connections: ["docker", "prometheus", "grafana"] },
  { id: "linux", name: "Linux", category: "Infrastructure", level: 95, x: 22, y: 58, logo: devicon("linux"), connections: ["docker", "bash", "nginx", "debian", "ubuntu"] },
  { id: "terraform", name: "Terraform", category: "Infrastructure", level: 80, x: 38, y: 72, logo: deviconPlain("terraform"), connections: ["azure", "aws", "kubernetes"] },
  { id: "proxmox", name: "Proxmox (LXC/VM)", category: "Infrastructure", level: 85, x: 12, y: 68, logo: "https://cdn.simpleicons.org/proxmox/E57000", connections: ["linux", "docker", "debian"] },
  { id: "ansible", name: "Ansible", category: "Infrastructure", level: 85, x: 33, y: 78, logo: devicon("ansible"), connections: ["linux", "terraform"] },
  
  // Operating Systems
  { id: "debian", name: "Debian", category: "Operating Systems", level: 90, x: 22, y: 68, logo: devicon("debian"), connections: ["linux", "proxmox"] },
  { id: "ubuntu", name: "Ubuntu", category: "Operating Systems", level: 90, x: 28, y: 62, logo: devicon("ubuntu"), connections: ["linux", "docker"] },
  { id: "windows", name: "Windows Server", category: "Operating Systems", level: 75, x: 38, y: 58, logo: devicon("windows8"), connections: ["azure"] },
  { id: "freebsd", name: "FreeBSD", category: "Operating Systems", level: 80, x: 18, y: 48, logo: "https://cdn.simpleicons.org/freebsd/AB2B28", connections: ["pfsense", "opnsense"] },
  { id: "macos", name: "macOS", category: "Operating Systems", level: 85, x: 32, y: 48, logo: devicon("apple"), connections: ["linux", "freebsd"] },
  
  // Languages
  { id: "java", name: "Java", category: "Languages", level: 90, x: 63, y: 48, logo: devicon("java"), connections: ["spring", "maven", "mariadb"] },
  { id: "python", name: "Python", category: "Languages", level: 80, x: 73, y: 32, logo: devicon("python"), connections: ["automation", "terraform"] },
  { id: "typescript", name: "TypeScript", category: "Languages", level: 85, x: 68, y: 62, logo: devicon("typescript"), connections: ["react", "nodejs"] },
  { id: "bash", name: "Bash", category: "Languages", level: 90, x: 12, y: 78, logo: devicon("bash"), connections: ["linux", "automation"] },
  { id: "shell", name: "Shell Scripting", category: "Languages", level: 90, x: 6, y: 85, logo: devicon("bash"), connections: ["linux", "ansible"] },
  { id: "cplusplus", name: "C++", category: "Languages", level: 85, x: 78, y: 22, logo: devicon("cplusplus"), connections: ["java"] },
  { id: "sql", name: "SQL", category: "Languages", level: 85, x: 58, y: 35, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", connections: ["mariadb", "postgresql"] },
  { id: "html", name: "HTML", category: "Languages", level: 90, x: 63, y: 82, logo: devicon("html5"), connections: ["css", "react"] },
  { id: "css", name: "CSS", category: "Languages", level: 90, x: 63, y: 88, logo: devicon("css3"), connections: ["html", "tailwind"] },
  
  // Cloud
  { id: "azure", name: "Azure", category: "Cloud", level: 75, x: 82, y: 22, logo: devicon("azure"), connections: ["kubernetes", "terraform"] },
  { id: "aws", name: "AWS", category: "Cloud", level: 70, x: 87, y: 38, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", connections: ["terraform"] },
  { id: "gcp", name: "Google Cloud", category: "Cloud", level: 65, x: 85, y: 52, logo: devicon("googlecloud"), connections: ["kubernetes"] },
  
  // Databases
  { id: "mariadb", name: "MariaDB", category: "Databases", level: 90, x: 43, y: 52, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", connections: ["java", "redis", "spring"] },
  { id: "postgresql", name: "PostgreSQL", category: "Databases", level: 85, x: 53, y: 67, logo: devicon("postgresql"), connections: ["java", "sql"] },
  { id: "mongodb", name: "MongoDB", category: "Databases", level: 80, x: 58, y: 78, logo: devicon("mongodb"), connections: ["nodejs"] },
  { id: "redis", name: "Redis", category: "Databases", level: 85, x: 33, y: 58, logo: devicon("redis"), connections: ["docker", "mariadb"] },
  
  // Networking
  { id: "mikrotik", name: "MikroTik", category: "Networking", level: 90, x: 8, y: 32, logo: "https://cdn.simpleicons.org/mikrotik/293239", connections: ["pfsense", "nginx", "openvpn"] },
  { id: "pfsense", name: "pfSense", category: "Networking", level: 90, x: 12, y: 42, logo: "https://cdn.simpleicons.org/pfsense/212121", connections: ["mikrotik", "openvpn", "freebsd"] },
  { id: "opnsense", name: "OPNsense", category: "Networking", level: 85, x: 18, y: 38, logo: "https://cdn.simpleicons.org/opnsense/EC1C24", connections: ["pfsense", "freebsd"] },
  { id: "openvpn", name: "OpenVPN", category: "Networking", level: 88, x: 3, y: 55, logo: "https://cdn.simpleicons.org/openvpn/EA7E20", connections: ["pfsense", "mikrotik"] },
  { id: "nginx", name: "nginx", category: "Networking", level: 85, x: 28, y: 52, logo: devicon("nginx"), connections: ["docker", "linux"] },
  { id: "cisco", name: "Cisco", category: "Networking", level: 80, x: 8, y: 22, logo: "https://cdn.simpleicons.org/cisco/1BA0D7", connections: ["mikrotik"] },
  
  // Frameworks
  { id: "react", name: "React", category: "Frameworks", level: 80, x: 75, y: 68, logo: devicon("react"), connections: ["typescript", "nodejs", "nextjs"] },
  { id: "nextjs", name: "Next.js", category: "Frameworks", level: 85, x: 82, y: 58, logo: "https://cdn.simpleicons.org/nextdotjs/000000", connections: ["react", "typescript", "tailwind"] },
  { id: "nodejs", name: "Node.js", category: "Frameworks", level: 80, x: 70, y: 78, logo: devicon("nodejs"), connections: ["typescript", "mongodb", "npm"] },
  { id: "spring", name: "Spring Boot", category: "Frameworks", level: 85, x: 73, y: 52, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", connections: ["java", "mariadb"] },
  { id: "tailwind", name: "Tailwind CSS", category: "Frameworks", level: 85, x: 82, y: 72, logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4", connections: ["react", "css", "nextjs"] },
  { id: "framer", name: "Framer Motion", category: "Frameworks", level: 85, x: 70, y: 88, logo: "https://cdn.simpleicons.org/framer/0055FF", connections: ["react"] },
  
  // Monitoring
  { id: "prometheus", name: "Prometheus", category: "Monitoring", level: 85, x: 58, y: 18, logo: devicon("prometheus"), connections: ["kubernetes", "grafana"] },
  { id: "grafana", name: "Grafana", category: "Monitoring", level: 85, x: 68, y: 12, logo: devicon("grafana"), connections: ["prometheus", "kubernetes"] },
  
  // Build Tools & Package Managers
  { id: "npm", name: "npm", category: "Build Tools", level: 90, x: 78, y: 85, logo: devicon("npm"), connections: ["nodejs", "typescript"] },
  { id: "pnpm", name: "pnpm", category: "Build Tools", level: 85, x: 85, y: 82, logo: "https://cdn.simpleicons.org/pnpm/F69220", connections: ["nodejs", "npm"] },
  { id: "maven", name: "Maven", category: "Build Tools", level: 90, x: 53, y: 42, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg", connections: ["java"] },
  
  // Automation & CI/CD
  { id: "automation", name: "GitHub Actions", category: "Automation", level: 85, x: 90, y: 62, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", connections: ["docker", "kubernetes", "terraform"] },
  
  // Testing & API Tools
  { id: "postman", name: "Postman", category: "Testing", level: 85, x: 90, y: 48, logo: "https://cdn.simpleicons.org/postman/FF6C37", connections: ["nodejs", "spring"] },
];

const categories = Array.from(new Set(techStack.map(t => t.category)));
const categoryColors: Record<string, string> = {
  Infrastructure: "#3b82f6",
  "Operating Systems": "#06b6d4",
  Languages: "#a855f7",
  Cloud: "#22d3ee",
  Databases: "#10b981",
  Networking: "#f97316",
  Frameworks: "#ec4899",
  Monitoring: "#eab308",
  Automation: "#8b5cf6",
  "Build Tools": "#f59e0b",
  Testing: "#10b981",
};

export default function SkillsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
      
      if (isDragging && graphRef.current) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setPanOffset(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Native wheel event listener with passive:false to prevent page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the background (not on nodes)
    if ((e.target as HTMLElement).closest('.tech-node')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    // Clear hovered tech when clicking background
    setHoveredTech(null);
  };

  // Touch gesture handlers for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; dist: number } | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    // Clear hovered tech when touching background
    if (!(e.target as HTMLElement).closest('.tech-node')) {
      setHoveredTech(null);
    }
    
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY, dist: 0 });
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStart({ x: 0, y: 0, dist });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    if (e.touches.length === 1 && touchStart.dist === 0) {
      // Single finger pan
      const deltaX = e.touches[0].clientX - touchStart.x;
      const deltaY = e.touches[0].clientY - touchStart.y;
      setPanOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setTouchStart({ ...touchStart, x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      // Two finger pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = dist / touchStart.dist;
      setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
      setTouchStart({ ...touchStart, dist });
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setIsDragging(false);
  };

  const resetView = () => {
    setPanOffset({ x: 0, y: 0 });
    setZoom(1);
  };

  const filteredTech = selectedFilter
    ? techStack.filter(t => t.category === selectedFilter)
    : techStack;

  const highlightedConnections = hoveredTech
    ? filteredTech.find(t => t.id === hoveredTech)?.connections.filter(connId => 
        filteredTech.some(t => t.id === connId)
      ) || []
    : [];

  return (
    <>
      <Header />
      <AnimatedBackground />
      
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6">
              Tech <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Stack</span>
            </h1>
            <p className="text-lg md:text-xl dark:text-gray-400 text-gray-600 max-w-3xl mb-8">
              Interactive skill orchestration map showing how production technologies integrate across infrastructure, cloud, databases, and automation workflows.
            </p>
            
            {/* Structured Data for SEO/ATS */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  "name": "Systems Engineer",
                  "jobTitle": "Systems Engineer",
                  "knowsAbout": techStack.map(tech => tech.name),
                  "skills": techStack.map(tech => ({
                    "@type": "DefinedTerm",
                    "name": tech.name,
                    "description": `${tech.level}% proficiency in ${tech.category}`
                  }))
                })
              }}
            />

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === null
                    ? 'dark:bg-white dark:text-black bg-gray-900 text-white shadow-lg'
                    : 'dark:bg-slate-800 bg-gray-200 dark:text-gray-300 text-gray-700 dark:hover:bg-slate-700 hover:bg-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  All Systems
                </div>
              </motion.button>
              
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFilter === category
                      ? 'shadow-lg'
                      : 'dark:bg-slate-800/50 bg-gray-200 dark:text-gray-300 text-gray-700 dark:hover:bg-slate-700 hover:bg-gray-300'
                  }`}
                  style={{
                    backgroundColor: selectedFilter === category ? categoryColors[category] : undefined,
                    color: selectedFilter === category ? 'white' : undefined,
                  }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Interactive Tech Network Graph */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] md:h-[600px] dark:bg-slate-900/50 bg-white/80 rounded-2xl md:rounded-3xl border dark:border-slate-800 border-gray-300 overflow-hidden backdrop-blur-sm shadow-2xl mb-12"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.1), transparent 50%)`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Graph Header - Integrated into canvas */}
            <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 sm:gap-3 dark:bg-slate-900/80 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border dark:border-slate-700/50 border-gray-300/50">
                <div className="w-1 h-6 sm:h-8 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold dark:text-white text-gray-900">Interactive Skills Map</h3>
                  <p className="text-xs dark:text-slate-400 text-gray-600 hidden sm:block">Drag to pan • Scroll to zoom • Touch gestures supported</p>
                  <p className="text-xs dark:text-slate-400 text-gray-600 sm:hidden">Touch & drag enabled</p>
                </div>
              </div>
            </div>

            {/* Compact Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-40 flex items-center gap-1 dark:bg-slate-800/90 bg-white/90 backdrop-blur-md rounded-lg border dark:border-slate-700 border-gray-300 shadow-lg pointer-events-auto p-1">
              <button
                onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(prev * 0.8, 0.5)); }}
                className="w-8 h-8 dark:text-white text-gray-900 flex items-center justify-center hover:bg-slate-700/50 rounded transition-all"
                aria-label="Zoom out"
              >
                −
              </button>
              <div className="px-2 text-xs font-bold dark:text-white text-gray-900 min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(prev * 1.2, 3)); }}
                className="w-8 h-8 dark:text-white text-gray-900 flex items-center justify-center hover:bg-slate-700/50 rounded transition-all"
                aria-label="Zoom in"
              >
                +
              </button>
              <div className="w-px h-6 dark:bg-slate-600 bg-gray-400 mx-1"></div>
              <button
                onClick={(e) => { e.stopPropagation(); resetView(); }}
                className="w-8 h-8 dark:text-white text-gray-900 flex items-center justify-center hover:bg-slate-700/50 rounded transition-all text-sm"
                title="Reset View"
                aria-label="Reset zoom and pan"
              >
                ⟲
              </button>
            </div>

            {/* Draggable/Zoomable Content */}
            <div
              ref={graphRef}
              className="absolute inset-0 w-full h-full transition-transform"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                transformOrigin: 'center center'
              }}
            >
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {filteredTech.map(tech => 
                tech.connections
                  .filter(connId => filteredTech.some(t => t.id === connId))
                  .map(connId => {
                    const target = filteredTech.find(t => t.id === connId);
                    if (!target) return null;
                    
                    const isHighlighted = hoveredTech === tech.id || hoveredTech === connId;
                    const isConnectedToHovered = hoveredTech && (
                      highlightedConnections.includes(connId) || 
                      highlightedConnections.includes(tech.id)
                    );
                    
                    return (
                      <motion.line
                        key={`${tech.id}-${connId}`}
                        x1={`${tech.x}%`}
                        y1={`${tech.y}%`}
                        x2={`${target.x}%`}
                        y2={`${target.y}%`}
                        stroke={isHighlighted || isConnectedToHovered ? categoryColors[tech.category] : '#64748b'}
                        strokeWidth={isHighlighted || isConnectedToHovered ? 3 : 1}
                        strokeOpacity={isHighlighted || isConnectedToHovered ? 0.8 : 0.15}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        filter={isHighlighted ? "url(#glow)" : undefined}
                      />
                    );
                  })
              )}
            </svg>

            {/* Tech Nodes */}
            <AnimatePresence>
              {filteredTech.map((tech, index) => {
                const isHovered = hoveredTech === tech.id;
                const isConnected = hoveredTech && highlightedConnections.includes(tech.id);
                const shouldHighlight = isHovered || isConnected;
                
                return (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      delay: index * 0.03,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    whileHover={{ scale: 1.2, zIndex: 50 }}
                    onHoverStart={() => setHoveredTech(tech.id)}
                    onHoverEnd={() => setHoveredTech(null)}
                    onTap={(e) => {
                      e.stopPropagation();
                      // Toggle hover state on tap for mobile
                      setHoveredTech(prev => prev === tech.id ? null : tech.id);
                    }}
                    className="absolute cursor-pointer group tech-node"
                    style={{
                      left: `${tech.x}%`,
                      top: `${tech.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Pulsing Circle */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: categoryColors[tech.category],
                        opacity: shouldHighlight ? 0.3 : 0,
                        width: '80px',
                        height: '80px',
                        left: '-15px',
                        top: '-15px',
                      }}
                      animate={shouldHighlight ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Main Node */}
                    <div 
                      className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center p-2 transition-all duration-300 dark:bg-slate-800/90 bg-white border dark:shadow-xl shadow-lg backdrop-blur-sm"
                      style={{
                        borderColor: shouldHighlight ? categoryColors[tech.category] : '#e2e8f020',
                        borderWidth: shouldHighlight ? '2px' : '1px',
                        boxShadow: shouldHighlight ? `0 0 25px ${categoryColors[tech.category]}60` : undefined,
                        transform: shouldHighlight ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={tech.logo} 
                        alt={tech.name} 
                        className="w-full h-full object-contain" 
                        onError={(e) => {
                          // Fallback to a generic tech icon if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg dark:bg-slate-900 bg-white border dark:border-slate-700 border-gray-300 shadow-xl whitespace-nowrap z-50"
                        >
                          <div className="text-sm font-bold dark:text-white text-gray-900">{tech.name}</div>
                          <div className="text-xs dark:text-slate-400 text-gray-600">{tech.category}</div>
                          <div className="text-xs dark:text-slate-500 text-gray-500 mt-1">
                            {tech.connections.length} integrated dependencies
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
);
            })}
            </AnimatePresence>
            </div>
          </motion.div>

          {/* Expertise Matrix */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold dark:text-white text-gray-900 mb-8"
          >
            Domain Expertise
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12"
          >
            {categories.map((category, i) => {
              const count = techStack.filter(t => t.category === category).length;
              
              // Impact statements for each category (2026 best practice - evidence-based)
              const impactStatements: Record<string, string> = {
                "Infrastructure": "99.9% uptime achieved",
                "Operating Systems": "Multi-platform orchestration",
                "Languages": "Full-stack development",
                "Cloud": "Multi-cloud architecture",
                "Databases": "High-availability data layer",
                "Networking": "Zero-trust security model",
                "Frameworks": "Modern development stack",
                "Monitoring": "Real-time observability",
                "Automation": "93% deployment speed increase",
                "Build Tools": "CI/CD pipeline optimization",
                "Testing": "Quality assurance automation",
              };
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  animate={{
                    borderColor: clickedCategory === category ? categoryColors[category] : undefined,
                    boxShadow: clickedCategory === category ? `0 0 20px ${categoryColors[category]}60` : undefined,
                  }}
                  className="p-4 rounded-xl dark:bg-slate-800/50 bg-white/80 border dark:border-slate-700 border-gray-300 cursor-pointer group relative overflow-hidden"
                  onClick={() => {
                    if (clickedCategory === category) {
                      // Unselect if already selected
                      setClickedCategory(null);
                      setSelectedFilter(null);
                    } else {
                      // Select the category
                      setSelectedFilter(category);
                      setClickedCategory(category);
                    }
                  }}
                >
                  {/* Click ripple effect */}
                  <AnimatePresence>
                    {clickedCategory === category && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{ backgroundColor: categoryColors[category] }}
                        initial={{ opacity: 0.3, scale: 0 }}
                        animate={{ opacity: 0, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5" style={{ color: categoryColors[category] }} />
                    <span className="text-2xl font-bold" style={{ color: categoryColors[category] }}>
                      {count}
                    </span>
                  </div>
                  <div className="text-sm font-semibold dark:text-white text-gray-900 mb-1 relative z-10">{category}</div>
                  <div className="text-xs dark:text-slate-400 text-gray-600 relative z-10">{impactStatements[category] || `${count} integrated tools`}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer / Concluding Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 mb-12"
          >
            <div className="relative rounded-2xl dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 bg-gradient-to-br from-gray-50 to-white border dark:border-slate-700 border-gray-300 p-8 md:p-12 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4"
                >
                  Continuous Learning & Innovation
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg dark:text-gray-300 text-gray-700 mb-6 max-w-3xl"
                >
                  This technology stack represents years of hands on experience in production environments, 
                  from infrastructure automation to full-stack development. Each connection visualized above 
                  reflects real-world integration challenges solved, systems optimized, and architectures designed 
                  for scalability and reliability.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-4 items-center"
                >
                  <div className="flex items-center gap-2 dark:text-slate-400 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm">Actively maintained knowledge base</span>
                  </div>
                  <div className="flex items-center gap-2 dark:text-slate-400 text-gray-600">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Constantly expanding expertise</span>
                  </div>
                  <div className="flex items-center gap-2 dark:text-slate-400 text-gray-600">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Production-proven implementations</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t dark:border-slate-700 border-gray-300"
                >
                  <p className="text-sm dark:text-slate-500 text-gray-500">
                    <strong className="dark:text-slate-400 text-gray-600">Note:</strong> Skill levels are based on production experience, 
                    real-world projects, and continuous professional development. All technologies listed are actively used 
                    in production environments or personal projects.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ATS-Friendly Plain Text Skills List (Hidden, for parsers only) */}
          <section className="sr-only" aria-label="Technical Skills for ATS">
            <h2>Technical Skills and Proficiencies</h2>
            {categories.map(category => {
              const categoryTechs = techStack.filter(t => t.category === category);
              const avgProficiency = Math.round(
                categoryTechs.reduce((sum, t) => sum + t.level, 0) / categoryTechs.length
              );
              return (
                <div key={category}>
                  <h3>{category} ({avgProficiency}% Average Proficiency)</h3>
                  <ul>
                    {categoryTechs.map(tech => (
                      <li key={tech.id}>
                        {tech.name}: {tech.level}% proficiency, {tech.connections.length} integrated dependencies
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <p>Total Technologies: {techStack.length}</p>
            <p>Infrastructure Uptime: 99.9%</p>
            <p>Deployment Speed Improvement: 93%</p>
            <p>Production Users Managed: 700+</p>
          </section>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SimulationProps {
  projectId: string;
  colorHex: string;
}

export default function ProjectSimulation({ projectId, colorHex }: SimulationProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const renderSimulation = () => {
    switch (projectId) {
      case 'isp-core':
        return <FiberOpticSimulation color={colorHex} mousePos={mousePos} />;
      case 'zero-trust':
        return <SecurityShieldSimulation color={colorHex} mousePos={mousePos} />;
      case 'cloud-transit':
        return <CloudHubSimulation color={colorHex} mousePos={mousePos} />;
      case 'netops-auto':
        return <AutomationGridSimulation color={colorHex} mousePos={mousePos} />;
      case 'global-traffic':
        return <TrafficMapSimulation color={colorHex} mousePos={mousePos} />;
      case 'ai-agentic':
        return <AIAgentSimulation color={colorHex} mousePos={mousePos} />;
      case 'bash-toolkit':
        return <BashTerminalSimulation color={colorHex} mousePos={mousePos} />;
      case 'container-orchestration':
        return <ContainerOrchestrationSimulation color={colorHex} mousePos={mousePos} />;
      case 'spring-microservices':
        return <MicroservicesSimulation color={colorHex} mousePos={mousePos} />;
      case 'mariadb-optimization':
        return <DatabaseOptimizationSimulation color={colorHex} mousePos={mousePos} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 opacity-60">
      <div className="relative w-full h-full flex items-center justify-center">
        {renderSimulation()}
      </div>
    </div>
  );
}

// --- Sub-Simulations ---

const FiberOpticSimulation = ({ color, mousePos }: { color: string, mousePos: {x:number, y:number} }) => {
  return (
    <svg className="w-full h-full absolute inset-0" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <defs>
            <filter id="glow-isp" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
      {[...Array(5)].map((_, i) => (
        <motion.g key={i}
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: [0.3, 0.6, 0.3], 
                y: mousePos.y * (10 + i * 5),
                x: mousePos.x * (10 + i * 5)
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
        >
          {/* Cable Line */}
          <motion.path
            d={`M -100 ${100 + i * 100} C 300 ${50 + i * 80}, 700 ${150 + i * 120}, 1100 ${100 + i * 100}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeOpacity="0.2"
          />
          {/* Data Packet */}
          <motion.path
            d={`M -100 ${100 + i * 100} C 300 ${50 + i * 80}, 700 ${150 + i * 120}, 1100 ${100 + i * 100}`}
            fill="none"
            stroke={color}
            strokeWidth="4"
            filter="url(#glow-isp)"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: [0, 0.2, 0], pathOffset: [0, 1] }}
            transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      ))}
    </svg>
  );
};

const SecurityShieldSimulation = ({ color, mousePos }: { color: string, mousePos: {x:number, y:number} }) => {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Radar Circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-current"
          style={{ 
              color: color, 
              width: `${(i + 1) * 30}%`, 
              height: `${(i + 1) * 30}%`,
              borderColor: color,
              x: mousePos.x * -10 * (i+1),
              y: mousePos.y * -10 * (i+1)
          }}
          animate={{ opacity: [0.1, 0.3, 0.1], rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}
      
      {/* Scanning Shield Effect */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
         <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="50%" stopColor={color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
         </defs>
         <motion.rect
            x="0" y="0" width="100" height="100"
            fill="url(#scanGradient)"
            initial={{ y: -100 }}
            animate={{ y: 100 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ maskImage: 'radial-gradient(circle, white 40%, transparent 70%)' }}
         />
      </svg>

      {/* Threat Nodes */}
      {[...Array(6)].map((_, i) => (
         <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-red-500"
            style={{ 
                top: `${50 + Math.sin(i) * 30}%`, 
                left: `${50 + Math.cos(i) * 30}%` 
            }}
            animate={{ 
                backgroundColor: [color, '#ef4444', color],
                scale: [1, 1.5, 1],
                opacity: [0.2, 1, 0.2]
            }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
         />
      ))}
    </div>
  );
};

const CloudHubSimulation = ({ color, mousePos }: { color: string, mousePos: {x:number, y:number} }) => {
    return (
        <div className="relative w-full h-full">
            {/* Central Hub */}
            <motion.div 
                className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border-4 blur-sm"
                style={{ 
                    borderColor: color, 
                    x: '-50%', 
                    y: '-50%',
                    translateX: mousePos.x * 20,
                    translateY: mousePos.y * 20
                }}
                animate={{ boxShadow: [`0 0 20px ${color}`, `0 0 50px ${color}`, `0 0 20px ${color}`] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
             <motion.div 
                className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border-2 dark:bg-slate-900/50 bg-gray-900/50 backdrop-blur"
                style={{ borderColor: color, x: '-50%', y: '-50%', translateX: mousePos.x * 20, translateY: mousePos.y * 20 }}
            />

            {/* Satellites */}
            {[0, 120, 240].map((deg, i) => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-full h-full"
                    style={{ x: '-50%', y: '-50%' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20 + i*5, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div 
                        className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white]"
                        style={{ 
                            top: '50%', 
                            left: '50%', 
                            transform: `rotate(${deg}deg) translateX(${150 + i * 20}px)` 
                        }}
                    >
                         {/* Connection Line */}
                         <div className="absolute top-1/2 right-1/2 w-[150px] h-[1px] origin-right" 
                              style={{ backgroundColor: color, opacity: 0.3, transform: 'rotate(0deg)' }} />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}

const AutomationGridSimulation = ({ color, mousePos }: { color: string, mousePos: {x:number, y:number} }) => {
    const rows = 6;
    const cols = 10;
    
    return (
        <div className="w-full max-w-3xl h-64 flex flex-wrap gap-1 justify-center items-center perspective-[1000px]">
             {[...Array(rows * cols)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="w-8 h-8 rounded-sm dark:bg-slate-800 bg-gray-800 dark:border-slate-700 border-gray-700 border"
                    style={{
                        rotateX: mousePos.y * 10,
                        rotateY: mousePos.x * 10
                    }}
                    animate={{ 
                        borderColor: [null, '#ef4444', color, null],
                        backgroundColor: [null, 'rgba(239, 68, 68, 0.2)', color, 'rgba(30, 41, 59, 1)']
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: (i * 0.2) % 5,
                        times: [0, 0.1, 0.3, 1]
                    }}
                 />
             ))}
        </div>
    )
}

const TrafficMapSimulation = ({ color }: { color: string, mousePos: {x:number, y:number} }) => {
    return (
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 800 400">
             {/* Map Points */}
             {[...Array(8)].map((_, i) => {
                 const x = 100 + ((i * 137) % 600);
                 const y = 50 + ((i * 79) % 300);
                 return (
                     <g key={i}>
                        <motion.circle 
                            cx={x} cy={y} r="3" fill="white"
                            animate={{ r: [3, 5, 3], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i }}
                        />
                        {/* Arcs */}
                        <motion.path
                            d={`M 400 200 Q 400 50 ${x} ${y}`}
                            fill="none"
                            stroke={color}
                            strokeWidth="1"
                            strokeOpacity="0.3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 0], pathOffset: [0, 0, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                        />
                     </g>
                 )
             })}
             <circle cx="400" cy="200" r="5" fill={color} className="animate-pulse" />
        </svg>
    )
}

const AIAgentSimulation = ({ color }: { color: string, mousePos: {x:number, y:number} }) => {
    return (
        <div className="relative w-full h-full">
            {/* Neural Network Nodes */}
            {[...Array(3)].map((layer, l) => (
                <div key={l} className="absolute top-1/2 left-1/2" style={{ transform: `translate(-50%, -50%)` }}>
                    {[...Array(4 - l)].map((_, n) => {
                        const angle = (n * (360 / (4 - l))) * (Math.PI / 180);
                        const radius = 80 + l * 60;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        return (
                            <motion.div
                                key={`${l}-${n}`}
                                className="absolute w-4 h-4 rounded-full border-2"
                                style={{ 
                                    borderColor: color,
                                    left: `${x}px`, 
                                    top: `${y}px`,
                                    backgroundColor: `${color}20`
                                }}
                                animate={{ 
                                    scale: [1, 1.3, 1],
                                    boxShadow: [`0 0 5px ${color}`, `0 0 20px ${color}`, `0 0 5px ${color}`]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: l * 0.3 + n * 0.2 }}
                            />
                        )
                    })}
                </div>
            ))}
            
            {/* Central AI Core */}
            <motion.div 
                className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full border-4"
                style={{ 
                    borderColor: color,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: `${color}10`
                }}
                animate={{ 
                    rotate: 360,
                    boxShadow: [`0 0 20px ${color}`, `0 0 40px ${color}`, `0 0 20px ${color}`]
                }}
                transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 2, repeat: Infinity } }}
            />
        </div>
    )
}

const BashTerminalSimulation = ({ color }: { color: string, mousePos: {x:number, y:number} }) => {
    return (
        <div className="relative w-full max-w-2xl h-64 dark:bg-slate-900/80 bg-gray-900/80 rounded-lg border border-slate-700 overflow-hidden font-mono text-xs">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 dark:bg-slate-800/50 bg-gray-800/50 border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-slate-400 text-xs">bash</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 space-y-2">
                {['$ ./deploy.sh --production', '> Building Docker images...', '> Running health checks...', '> Deployment successful ✓'].map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.8, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                        style={{ color: i === 3 ? color : '#94a3b8' }}
                    >
                        {line}
                    </motion.div>
                ))}
                
                {/* Cursor */}
                <motion.div
                    className="inline-block w-2 h-4 ml-1"
                    style={{ backgroundColor: color }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>
        </div>
    )
}

const ContainerOrchestrationSimulation = ({ color }: { color: string, mousePos: {x:number, y:number} }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Container Pods Grid */}
            <div className="grid grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-16 h-16 rounded-lg border-2 relative overflow-hidden"
                        style={{ borderColor: color, backgroundColor: `${color}10` }}
                        animate={{ 
                            borderColor: [color, `${color}80`, color],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                        {/* Docker Logo Simplified */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="grid grid-cols-3 gap-0.5">
                                {[...Array(6)].map((_, j) => (
                                    <motion.div
                                        key={j}
                                        className="w-1.5 h-1.5 rounded-sm"
                                        style={{ backgroundColor: color }}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <motion.line
                        key={i}
                        x1="50%" y1="20%" x2="50%" y2="80%"
                        stroke={color}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                ))}
            </svg>
        </div>
    )
}

const MicroservicesSimulation = ({ color }: { color: string, mousePos: {x:number, y:number} }) => {
    const services = ['Gateway', 'Auth', 'API', 'DB', 'Cache'];
    
    return (
        <div className="relative w-full h-full">
            {/* Central API Gateway */}
            <motion.div 
                className="absolute top-1/2 left-1/2 w-20 h-20 rounded-lg border-2 flex items-center justify-center text-xs font-bold"
                style={{ 
                    borderColor: color,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: `${color}20`,
                    color: color
                }}
                animate={{ boxShadow: [`0 0 10px ${color}`, `0 0 30px ${color}`, `0 0 10px ${color}`] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                API
            </motion.div>
            
            {/* Microservices */}
            {services.map((service, i) => {
                const angle = (i * (360 / services.length)) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                    <motion.div
                        key={service}
                        className="absolute top-1/2 left-1/2 w-16 h-16 rounded-lg border border-slate-600 flex items-center justify-center text-[10px] font-medium"
                        style={{ 
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                            backgroundColor: '#1e293b',
                            color: '#94a3b8'
                        }}
                        animate={{ 
                            borderColor: [null, color, null],
                            backgroundColor: [null, `${color}20`, null]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    >
                        {service}
                        
                        {/* Connection Line */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ zIndex: -1 }}>
                            <motion.line
                                x1="50%" y1="50%"
                                x2={`calc(50% - ${x}px)`} y2={`calc(50% - ${y}px)`}
                                stroke={color}
                                strokeWidth="1"
                                strokeOpacity="0.3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: [0, 1, 0], pathOffset: [0, 0, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                            />
                        </svg>
                    </motion.div>
                )
            })}
        </div>
    )
}

const DatabaseOptimizationSimulation = ({ color }: { color: string, mousePos: {x:number, y:number} }) => {
    return (
        <div className="relative w-full max-w-xl h-64 flex items-center justify-center gap-8">
            {/* Before State */}
            <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Before</span>
                <div className="relative w-32 h-32 rounded-lg dark:bg-slate-800/50 bg-gray-800/50 border border-red-500/30 flex items-center justify-center">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-8 bg-red-500"
                            style={{ left: `${5 + i * 4}%` }}
                            animate={{ height: [32, ((i * 47) % 80) + 40, 32] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}
                    <span className="text-red-400 text-2xl font-bold relative z-10">800ms</span>
                </div>
            </div>
            
            {/* Arrow */}
            <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ color: color }}
                className="text-3xl"
            >
                →
            </motion.div>
            
            {/* After State */}
            <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">After</span>
                <div className="relative w-32 h-32 rounded-lg dark:bg-slate-800/50 bg-gray-800/50 border flex items-center justify-center" style={{ borderColor: `${color}50` }}>
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-4"
                            style={{ left: `${5 + i * 4}%`, backgroundColor: color }}
                            animate={{ height: [16, ((i * 43) % 20) + 10, 16] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}
                    <span className="text-2xl font-bold relative z-10" style={{ color: color }}>35ms</span>
                </div>
            </div>
        </div>
    )
}

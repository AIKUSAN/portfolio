"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Server, Network, Lock, Database } from "lucide-react";

export default function AboutPage() {
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
          >
            <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600 mb-12">Systems Engineer building high-availability infrastructure with AI-powered automation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6">My Journey in Systems Engineering</h2>
            <div className="dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-2xl p-8 mb-12">
              <p className="dark:text-gray-300 text-gray-700 leading-relaxed">
                I am a Systems Engineer with <strong>7 years of hands-on IT experience</strong>, currently managing a <strong>24-server gaming platform</strong> serving <strong>300+ concurrent users</strong> at Land of Promise with <strong>99.9% uptime</strong>. My work spans the full infrastructure lifecycle—from implementing distributed systems to developing <strong>LLM-enhanced automation</strong> for infrastructure orchestration and server management workflows.
              </p>
              <p className="dark:text-gray-300 text-gray-700 leading-relaxed mt-4">
                My expertise covers the <strong>Linux and Windows ecosystems</strong>, with focus on Docker orchestration, database management (MariaDB/MySQL/PostgreSQL/MongoDB/Redis), and automated deployment pipelines. I&apos;ve contributed to operational cost reduction by <strong>65%</strong> through infrastructure optimization and built systems that run reliably under pressure, scale efficiently, and recover gracefully from failures.
              </p>
              <p className="dark:text-gray-300 text-gray-700 leading-relaxed mt-4">
                What drives me is building infrastructure that anticipates problems before they occur. From optimizing JVM performance by <strong>56%</strong> (80ms → 35ms latency) to reducing database query times by <strong>96%</strong> (800ms → 35ms), I approach every challenge with a mindset of continuous improvement and measurable impact.
              </p>
            </div>

            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6">The Future of Automation</h2>
            <div className="dark:bg-slate-800/60 bg-violet-50 border dark:border-slate-600/40 border-violet-200 rounded-2xl p-8 mb-12">
              <p className="dark:text-white text-gray-800 leading-relaxed text-lg">
                <strong>2025–2026 has been transformative.</strong> I&apos;m advancing my DevOps practice by integrating <strong>Agentic AI and LLM-driven workflows</strong> into production environments. Using tools like <strong>n8n</strong>, I&apos;ve implemented autonomous agents that handle everything from network configuration scripting to proactive system monitoring with intelligent decision-making.
              </p>
              <p className="dark:text-white text-gray-800 leading-relaxed text-lg mt-4">
                My focus is on evolving beyond traditional automation into <strong>intelligent infrastructure</strong> that can self-heal, predict failures, and scale efficiently using modern LLM capabilities. I&apos;m implementing these concepts in production today—every Docker deployment, network script, and monitoring alert is enhanced by AI that learns from patterns and makes decisions at machine speed.
              </p>
              <p className="dark:text-white text-gray-800 leading-relaxed text-lg mt-4">
                <em>AI is transforming infrastructure operations, and I&apos;m excited to contribute to teams exploring this evolution while learning from experienced engineers leading the way.</em>
              </p>
            </div>

            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-8">Core Specializations</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 rounded-xl p-6"
              >
                <Network className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">ISP Infrastructure</h3>
                <p className="dark:text-gray-400 text-gray-600">Deployed 10Gbps backbone serving 700+ subscribers with 99.8% uptime</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-xl p-6"
              >
                <Lock className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">DoD Compliance</h3>
                <p className="dark:text-gray-400 text-gray-600">Government contractor network with 0 audit findings</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20 rounded-xl p-6"
              >
                <Server className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">DevOps Automation</h3>
                <p className="dark:text-gray-400 text-gray-600">Reduced deployment time from 30min to &lt;2min (93% improvement)</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-xl p-6"
              >
                <Database className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Performance Optimization</h3>
                <p className="dark:text-gray-400 text-gray-600">JVM latency: 80ms → 35ms (56%), Database queries: 800ms → 35ms (96%)</p>
              </motion.div>
            </div>

            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6">Professional Philosophy</h2>
            <div className="dark:bg-white/5 bg-gray-50 backdrop-blur-sm border dark:border-white/10 border-gray-200 rounded-2xl p-8 space-y-4">
              <p className="dark:text-gray-300 text-gray-700 leading-relaxed flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">•</span>
                <span><strong>Reliability:</strong> 99.9% uptime isn&apos;t a goal, it&apos;s a standard</span>
              </p>
              <p className="dark:text-gray-300 text-gray-700 leading-relaxed flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">•</span>
                <span><strong>Security:</strong> Zero Trust principles applied from Layer 1 to Layer 7</span>
              </p>
               <p className="dark:text-gray-300 text-gray-700 leading-relaxed flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">•</span>
                <span><strong>Efficiency:</strong> Automate everything that can be automated</span>
              </p>
            </div>

            {/* AI & Agentic Workflows Section */}
            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6 mt-12">AI & Agentic Workflows</h2>
            <div className="dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-2xl p-8">
              <p className="dark:text-gray-300 text-gray-700 leading-relaxed mb-8 text-lg">
                Leveraging cutting-edge AI technologies to transform infrastructure automation and operational efficiency. My expertise spans autonomous workflow orchestration, intelligent monitoring systems, and LLM-powered technical solutions.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="dark:bg-slate-800/50 bg-white border dark:border-slate-600/30 border-gray-200 rounded-xl p-6"
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-10 h-10">
                      <path fill="#EA4B71" d="M18.65,10.7c2.1,0,3.8,1.7,3.8,3.8s-1.7,3.8-3.8,3.8s-3.8-1.7-3.8-3.8S16.55,10.7,18.65,10.7z M18.65,27.9c-2.1,0-3.8,1.7-3.8,3.8c0,2.1,1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8C22.45,29.6,20.75,27.9,18.65,27.9z M34.7,12.5c0-1.2-0.5-2.3-1.3-3.1c-0.8-0.8-1.9-1.3-3.1-1.3c-1.2,0-2.3,0.5-3.1,1.3c-0.8,0.8-1.3,1.9-1.3,3.1c0,1.2,0.5,2.3,1.3,3.1c0.8,0.8,1.9,1.3,3.1,1.3c1.2,0,2.3-0.5,3.1-1.3C34.2,14.8,34.7,13.7,34.7,12.5z"/>
                      <path fill="#EA4B71" d="M18.65,21.7c-2.1,0-3.8,1.7-3.8,3.8c0,2.1,1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8C22.45,23.4,20.75,21.7,18.65,21.7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">n8n Autonomous Automation</h3>
                  <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-sm">
                    Built self-healing infrastructure workflows using n8n that autonomously handle Docker container deployments, network configuration changes, and system health checks. These agentic workflows reduce manual intervention by 85% and respond to incidents within seconds.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="dark:bg-slate-800/50 bg-white border dark:border-slate-600/30 border-gray-200 rounded-xl p-6"
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-10 h-10">
                      <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983 0 1.938-.089 2.83-.266a11.52 11.52 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Agentic AI Deployments (2025–2026)</h3>
                  <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-sm">
                    Implemented AI agents that autonomously manage Docker orchestration and generate network automation scripts. These agents analyze infrastructure patterns, predict optimal configurations, and execute deployments with human-level decision-making capabilities.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="dark:bg-slate-800/50 bg-white border dark:border-slate-600/30 border-gray-200 rounded-xl p-6"
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-10 h-10">
                      <path fill="#10A37F" d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A5.985 5.985 0 0012 .654a5.985 5.985 0 00-3.256 1.357 6.046 6.046 0 00-6.51 2.9 5.985 5.985 0 00-.516 4.91 5.985 5.985 0 00-1.71 4.221 5.985 5.985 0 001.71 4.221 5.985 5.985 0 00.516 4.91 6.046 6.046 0 006.51 2.9A5.985 5.985 0 0012 23.346a5.985 5.985 0 003.256-1.357 6.046 6.046 0 006.51-2.9 5.985 5.985 0 00.516-4.91 5.985 5.985 0 001.71-4.221 5.985 5.985 0 00-1.71-4.221zm-6.31 9.44a3.974 3.974 0 01-1.46.545 4.015 4.015 0 01-2.046-.072 3.99 3.99 0 01-1.768-1.124 4.015 4.015 0 01-.89-1.834 4.015 4.015 0 01.072-2.046c.214-.67.577-1.27 1.055-1.743a4.015 4.015 0 011.743-1.055 4.015 4.015 0 012.046-.072c.67.143 1.287.447 1.787.882a3.99 3.99 0 011.124 1.768c.186.67.215 1.379.084 2.062a3.99 3.99 0 01-.882 1.787 3.974 3.974 0 01-1.865 1.142z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">RAG-Based Documentation</h3>
                  <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-sm">
                    Developed Retrieval-Augmented Generation (RAG) systems that provide instant, context-aware answers to technical questions. This system indexes thousands of configuration files, deployment logs, and vendor documentation to deliver precise solutions in real-time.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="dark:bg-slate-800/50 bg-white border dark:border-slate-600/30 border-gray-200 rounded-xl p-6"
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-10 h-10">
                      <path fill="#FF6B6B" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                      <circle fill="#FF6B6B" cx="12" cy="12" r="3"/>
                      <circle fill="#FF6B6B" cx="7" cy="7" r="1.5"/>
                      <circle fill="#FF6B6B" cx="17" cy="7" r="1.5"/>
                      <circle fill="#FF6B6B" cx="7" cy="17" r="1.5"/>
                      <circle fill="#FF6B6B" cx="17" cy="17" r="1.5"/>
                      <path fill="none" stroke="#FF6B6B" strokeWidth="1.5" d="M8.5 8.5L9.5 9.5M15.5 8.5L14.5 9.5M8.5 15.5L9.5 14.5M15.5 15.5L14.5 14.5"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Proactive Monitoring with LLMs</h3>
                  <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-sm">
                    Integrated LLM-powered monitoring that analyzes system logs, identifies anomalies, and generates actionable alerts with root cause analysis. This proactive approach reduced MTTR by 70% and prevented 95% of potential outages before user impact.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Work Validation Section */}
            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6 mt-12">Work Validation</h2>
            <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-700/50 border-gray-300 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 rounded-xl dark:bg-slate-800/50 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border dark:border-slate-600/30 border-blue-300 dark:hover:border-slate-500/50 hover:border-blue-400 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg dark:bg-slate-700/50 bg-blue-500/20 border dark:border-slate-600/50 border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400 dark:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold dark:text-white text-gray-950 mb-2">GitHub Portfolio</h3>
                    <p className="dark:text-gray-300 text-gray-800 text-sm leading-relaxed mb-3">Complete source code, infrastructure diagrams, and technical documentation for production systems</p>
                    <a href="https://github.com/AIKUSAN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 transition-colors text-sm font-bold">
                      View GitHub →
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-xl dark:bg-slate-800/50 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border dark:border-slate-600/30 border-emerald-300 dark:hover:border-slate-500/50 hover:border-emerald-400 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg dark:bg-slate-700/50 bg-emerald-500/20 border dark:border-slate-600/50 border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-400 dark:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold dark:text-white text-gray-950 mb-2">Verified Employment</h3>
                    <p className="dark:text-gray-300 text-gray-800 text-sm leading-relaxed mb-3">Professional history validated through Pantelco tenure and quantifiable project outcomes</p>
                    <a href="/experience" className="inline-flex items-center gap-2 text-emerald-400 dark:text-emerald-300 hover:text-emerald-500 dark:hover:text-emerald-200 transition-colors text-sm font-bold">
                      View Experience →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

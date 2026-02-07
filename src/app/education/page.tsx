"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { GraduationCap, BookOpen, CheckCircle } from "lucide-react";

export default function EducationPage() {
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
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6">
              Education & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Learning</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600">
              Continuous learning and professional development journey.
            </p>
          </motion.div>

          {/* Formal Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6">Formal Education</h2>

            <div className="dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-bold dark:text-white text-gray-900">Bachelor of Science in Computer Engineering</h3>
                  </div>
                  <h4 className="text-xl text-blue-400 mb-2">Interface Computer College</h4>
                  <p className="dark:text-gray-400 text-gray-600"><strong>Status:</strong> Completed 3 years of undergraduate coursework</p>
                </div>
                <span className="dark:text-gray-400 text-gray-600 font-mono text-sm md:text-base mt-2 md:mt-0">2017 - 2020</span>
              </div>
              
              <div className="border-t dark:border-slate-700/50 border-gray-300 pt-6 mt-6">
                <h4 className="text-lg font-bold dark:text-white text-gray-900 mb-4">Key Coursework - Systems Engineering Focus</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold dark:text-gray-200 text-gray-900">Computer Systems Architecture</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">Hardware-software integration, system design patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold dark:text-gray-200 text-gray-900">Network Architecture & Design</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">TCP/IP, routing protocols, network topology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold dark:text-gray-200 text-gray-900">Database Management Systems</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">Relational design, query optimization, transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold dark:text-gray-200 text-gray-900">Data Structures & Algorithms</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">Computational complexity, optimization techniques</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold dark:text-gray-200 text-gray-900">Software Engineering Principles</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">SDLC, design patterns, testing methodologies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold dark:text-gray-200 text-gray-900">Operating Systems</p>
                      <p className="text-sm dark:text-gray-400 text-gray-600">Process management, memory allocation, file systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Self-Directed Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6">Continuous Learning</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold dark:text-white text-gray-900">Technical Expertise</h3>
                </div>
                <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span>Self-taught in Linux system administration and DevOps practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span>Extensive hands-on experience with enterprise networking equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span>Docker, Kubernetes, and container orchestration mastery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span>Database optimization and performance tuning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    <span>AI/LLM integration for infrastructure automation</span>
                  </li>
                </ul>
              </div>

              <div className="dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold dark:text-white text-gray-900">Industry Standards</h3>
                </div>
                <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span>NIST 800-171 compliance and implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span>Zero-trust architecture design principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span>DoD contractor security requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span>Industry best practices for high-availability systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    <span>Agentic AI workflow orchestration patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Practical Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-6">Real-World Experience</h2>

            <div className="dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-2xl p-8">
              <p className="dark:text-gray-300 text-gray-700 leading-relaxed mb-8">
                My education extends far beyond the classroom through <strong>7+ years of hands-on IT experience</strong>. This includes managing production infrastructure, implementing security compliance, and building high-availability systems that serve hundreds of users daily.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 dark:bg-slate-800/50 bg-white border dark:border-slate-600/30 border-gray-300 rounded-xl">
                  <div className="text-4xl font-bold text-purple-400 mb-2">7+</div>
                  <div className="dark:text-gray-400 text-gray-600 font-medium">Years IT Experience</div>
                </div>
                <div className="text-center p-6 dark:bg-slate-800/50 bg-white border dark:border-slate-600/30 border-gray-300 rounded-xl">
                  <div className="text-4xl font-bold text-blue-400 mb-2">24</div>
                  <div className="dark:text-gray-400 text-gray-600 font-medium">Servers Managed</div>
                </div>
                <div className="text-center p-6 dark:bg-slate-800/50 bg-white border dark:border-slate-600/30 border-gray-300 rounded-xl">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">700+</div>
                  <div className="dark:text-gray-400 text-gray-600 font-medium">Network Users Supported</div>
                </div>
              </div>

              <p className="dark:text-gray-300 text-gray-700 leading-relaxed mt-8">
                This practical experience has been invaluable in developing deep expertise across infrastructure design, 
                performance optimization, security compliance, and team leadership. Each project has reinforced the importance 
                of continuous learning and adapting to emerging technologies.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

"use client";

import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Network, Shield, Terminal } from 'lucide-react';

const skills = [
  { name: 'Network Engineering', icon: Network, level: 95, color: 'from-blue-500 to-cyan-500' },
  { name: 'Cloud Infrastructure', icon: Cloud, level: 90, color: 'from-purple-500 to-pink-500' },
  { name: 'Security & Compliance', icon: Shield, level: 88, color: 'from-emerald-500 to-teal-500' },
  { name: 'Automation & Scripting', icon: Terminal, level: 92, color: 'from-orange-500 to-red-500' },
  { name: 'Database Management', icon: Database, level: 85, color: 'from-indigo-500 to-purple-500' },
  { name: 'DevOps & CI/CD', icon: Code2, level: 87, color: 'from-cyan-500 to-blue-500' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Core competencies across infrastructure, security, and automation domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color}`}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                </div>
                <span className="text-2xl font-bold text-white">{skill.level}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

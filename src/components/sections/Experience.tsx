"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    title: "Systems Engineer",
    company: "Tech Corp Solutions",
    period: "2023 - Present",
    location: "San Francisco, CA",
    type: "Full-time",
    highlights: [
      "Designed and implemented scalable cloud infrastructure on AWS for high-traffic enterprise applications.",
      "Automated deployment pipelines using GitHub Actions and Terraform, reducing release time by 60%.",
      "Managed Linux server fleets utilizing Ansible for configuration management and drift detection."
    ]
  },
  {
    title: "Network Junior Admin",
    company: "Regional ISP Services",
    period: "2021 - 2023",
    location: "Oakland, CA",
    type: "Full-time",
    highlights: [
      "Monitored network uptime and resolved L2/L3 connectivity issues for 500+ commercial clients.",
      "Configured VLANs, OSPF routing, and firewall rules on Cisco and Mikrotik equipment.",
      "Assisted in the migration of core routing equipment with minimal downtime during maintenance windows."
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
          <p className="text-gray-400 text-lg">Career journey and key achievements.</p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10" />
          <motion.div
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-20"
              >
                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                  className="absolute left-[26px] top-6 w-4 h-4 rounded-full bg-blue-500 border-4 border-black shadow-lg shadow-blue-500/50"
                />

                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/10 group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-semibold text-lg">{exp.company}</p>
                      <p className="text-gray-400 text-sm">{exp.location}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2 mt-2 md:mt-0">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-mono">
                        {exp.period}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1.5 flex-shrink-0">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

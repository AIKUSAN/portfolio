"use client";

import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "2024",
    icon: "☁️"
  },
  {
    name: "CCNP Enterprise",
    issuer: "Cisco",
    date: "2023",
    icon: "🌐"
  },
  {
    name: "Certified Information Systems Security Professional (CISSP)",
    issuer: "ISC²",
    date: "2023",
    icon: "🛡️"
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    date: "2023",
    icon: "⚡"
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    date: "2022",
    icon: "☸️"
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2021",
    icon: "🔐"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-gray-400 text-lg">Professional credentials and industry certifications.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{cert.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-500 font-mono">Issued: {cert.date}</span>
                  <Award className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

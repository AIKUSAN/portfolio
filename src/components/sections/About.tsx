"use client";

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-gray-400 text-lg">Get to know more about my background and expertise.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              I'm a <span className="text-blue-400 font-semibold">Systems Engineer</span> with a passion for building 
              high-performance, secure, and scalable network infrastructures. My expertise spans across cloud 
              architecture, network automation, and enterprise security compliance.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              With years of experience in designing mission-critical systems for ISPs, government contractors, and 
              enterprise clients, I specialize in <span className="text-purple-400 font-semibold">zero-trust architectures</span>, 
              <span className="text-emerald-400 font-semibold"> MPLS/BGP routing</span>, and 
              <span className="text-orange-400 font-semibold"> automated infrastructure deployments</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>lorenz.tazan@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Github className="w-5 h-5 text-orange-400" />
                  <a href="https://github.com/AIKUSAN" target="_blank" className="hover:text-white transition-colors">
                    github.com/AIKUSAN
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

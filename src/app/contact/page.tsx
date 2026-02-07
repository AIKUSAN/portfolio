"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Mail, Phone, Github, Linkedin, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Encode form data for mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:lorenztazan@gmail.com?subject=${subject}&body=${body}`;
  };

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
              Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-3xl">
              Open to opportunities in Systems Engineering, Network Administration, and DevOps/SRE roles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <a 
                  href="mailto:lorenztazan@gmail.com"
                  className="flex items-center gap-4 p-4 dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl hover:dark:bg-slate-800/60 hover:bg-gray-100 transition-all group"
                >
                  <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="dark:text-white text-gray-900">lorenztazan@gmail.com</div>
                  </div>
                </a>

                <a 
                  href="tel:240-256-2410"
                  className="flex items-center gap-4 p-4 dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl hover:dark:bg-slate-800/60 hover:bg-gray-100 transition-all group"
                >
                  <Phone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="dark:text-white text-gray-900">240-256-2410</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/AIKUSAN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl hover:dark:bg-slate-800/60 hover:bg-gray-100 transition-all group"
                >
                  <Github className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm text-gray-500">GitHub</div>
                    <div className="dark:text-white text-gray-900">@AIKUSAN</div>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/in/lorenztazan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl hover:dark:bg-slate-800/60 hover:bg-gray-100 transition-all group"
                >
                  <Linkedin className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-sm text-gray-500">LinkedIn</div>
                    <div className="dark:text-white text-gray-900">linkedin.com/in/lorenztazan</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="dark:text-white text-gray-900">California, MD • Open to Remote & Hybrid</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-xl">
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">Availability</h3>
                <p className="dark:text-gray-300 text-gray-700">
                  Currently employed and open to new opportunities. Available for immediate start with appropriate notice to current employer.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 dark:bg-slate-900/40 bg-white border dark:border-slate-700/50 border-gray-300 rounded-xl dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 dark:bg-slate-900/40 bg-white border dark:border-slate-700/50 border-gray-300 rounded-xl dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 dark:bg-slate-900/40 bg-white border dark:border-slate-700/50 border-gray-300 rounded-xl dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-500 text-center">
                This will open your default email client
              </p>
            </motion.div>

            {/* Currently Seeking Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="dark:bg-slate-900/40 bg-gray-50 backdrop-blur-sm border dark:border-slate-700/50 border-gray-200 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Currently Seeking
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold dark:text-gray-300 text-gray-700 mb-2">Preferred Roles:</h3>
                  <ul className="space-y-1 dark:text-gray-400 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">▸</span> Platform Engineer
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">▸</span> Site Reliability Engineer (SRE)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-cyan-400">▸</span> Senior DevOps Engineer
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">▸</span> AI Infrastructure Engineer
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t dark:border-slate-700/50 border-gray-300">
                  <h3 className="font-semibold dark:text-gray-300 text-gray-700 mb-2">Work Arrangement:</h3>
                  <p className="dark:text-gray-400 text-gray-600">
                    <strong className="dark:text-white text-gray-900">Remote-first</strong> (open to hybrid in DMV area: DC, Maryland, Virginia)
                  </p>
                </div>

                <div className="pt-2 border-t dark:border-slate-700/50 border-gray-300">
                  <h3 className="font-semibold dark:text-gray-300 text-gray-700 mb-2">Timeline:</h3>
                  <p className="dark:text-gray-400 text-gray-600">
                    Available for interviews <strong className="dark:text-white text-gray-900">immediately</strong>. Can start with 2-week notice.
                  </p>
                </div>

                <div className="pt-2 border-t dark:border-slate-700/50 border-gray-300">
                  <h3 className="font-semibold dark:text-gray-300 text-gray-700 mb-2">What I'm Looking For:</h3>
                  <ul className="space-y-2 dark:text-gray-400 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>AI/LLM integration opportunities in infrastructure automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Cloud-native environments (Kubernetes, containerization)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>High-impact scale challenges (10K+ users or distributed systems)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Technical mentorship and clear growth path</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <p className="text-sm dark:text-gray-500 text-gray-600 italic">
                    Open to discussing opportunities that align with AI-powered infrastructure automation and platform engineering.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

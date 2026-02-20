"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Mail, Phone, Github, Linkedin, MapPin, Send, Download, Briefcase, Clock, Target } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

/**
 * ContactPage Component
 * 
 * Handles user inquiries via a secure form that integrates with Supabase for data persistence
 * and triggers a Make.com webhook for email automation.
 * 
 * Features:
 * - Real-time validation
 * - Supabase Row-Level Security (RLS) compliance
 * - Framer Motion animations
 */
export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formState.name,
            email: formState.email,
            message: formState.message,
          },
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setSubmitStatus('success');
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error submitting message:', error);
      console.error('Error type:', typeof error);
      console.error('Error stringified:', JSON.stringify(error, null, 2));
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <AnimatedBackground />

      <div className="min-h-screen pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6">
              Let&apos;s <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-3xl">
              Systems Engineer with expertise in infrastructure automation, DevOps workflows, and cloud-native orchestration. Seeking Platform Engineer, Site Reliability Engineer, and Cloud Infrastructure roles with preference for hybrid positions in the DMV area.
            </p>
          </motion.div>

          {/* Resume Download CTA - Featured prominently */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border dark:border-blue-500/30 border-blue-500/40 rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2 flex items-center gap-2">
                  <Download className="w-6 h-6 text-blue-400" />
                  Download My Resume
                </h2>
                <p className="dark:text-gray-300 text-gray-700">
                  Complete technical resume highlighting infrastructure automation, Kubernetes/Docker expertise, AI/LLM workflow integration, and proven DevOps capabilities with quantified results.
                </p>
              </div>
              <a
                href="/resume.pdf"
                download="Lorenz_Tazan_Resume_2026.pdf"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-blue-500/25"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>
          </motion.div>

          {/* Currently Seeking - Moved to top for prominence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 grid md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 rounded-xl p-6">
              <Target className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-3">Seeking Roles</h3>
              <ul className="space-y-2 dark:text-gray-300 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">▸</span> Platform Engineer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">▸</span> Site Reliability Engineer (SRE)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">▸</span> DevOps Engineer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">▸</span> Cloud Infrastructure Engineer
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-xl p-6">
              <Briefcase className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-3">Work Preference</h3>
              <p className="dark:text-gray-300 text-gray-700 text-sm mb-2">
                <strong className="dark:text-white text-gray-900">Hybrid preferred</strong> (2-3 days in-office)
              </p>
              <p className="dark:text-gray-400 text-gray-600 text-sm">
                Open to on-site or remote in DMV area (DC, Maryland, Virginia)
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/5 border border-purple-500/20 rounded-xl p-6">
              <Clock className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-3">Availability</h3>
              <p className="dark:text-gray-300 text-gray-700 text-sm mb-2">
                <strong className="dark:text-white text-gray-900">Ready to interview</strong>
              </p>
              <p className="dark:text-gray-400 text-gray-600 text-sm">
                Can start with 2-week notice
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-3">
                <a
                  href="mailto:lorenztazan@gmail.com"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/5 to-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl hover:from-blue-500/10 hover:to-blue-500/20 hover:border-blue-500/30 transition-all group"
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs dark:text-gray-500 text-gray-600">Email</div>
                    <div className="dark:text-white text-gray-900 font-medium">lorenztazan@gmail.com</div>
                  </div>
                </a>

                <a
                  href="tel:240-256-2410"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl hover:from-emerald-500/10 hover:to-emerald-500/20 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs dark:text-gray-500 text-gray-600">Phone</div>
                    <div className="dark:text-white text-gray-900 font-medium">240-256-2410</div>
                  </div>
                </a>

                <a
                  href="https://github.com/AIKUSAN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/5 to-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:from-purple-500/10 hover:to-purple-500/20 hover:border-purple-500/30 transition-all group"
                >
                  <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <Github className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs dark:text-gray-500 text-gray-600">GitHub</div>
                    <div className="dark:text-white text-gray-900 font-medium">@AIKUSAN</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/lorenztazan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/5 to-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:from-cyan-500/10 hover:to-cyan-500/20 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs dark:text-gray-500 text-gray-600">LinkedIn</div>
                    <div className="dark:text-white text-gray-900 font-medium">linkedin.com/in/lorenztazan</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-500/5 to-orange-500/10 backdrop-blur-sm border border-orange-500/20 rounded-xl">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs dark:text-gray-500 text-gray-600">Location</div>
                    <div className="dark:text-white text-gray-900 font-medium">California, MD • Hybrid DMV</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 dark:bg-slate-900/60 bg-white border dark:border-slate-700/50 border-gray-300 rounded-xl dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 dark:bg-slate-900/60 bg-white border dark:border-slate-700/50 border-gray-300 rounded-xl dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 dark:bg-slate-900/60 bg-white border dark:border-slate-700/50 border-gray-300 rounded-xl dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                    placeholder="Tell me about your opportunity, project, or collaboration idea..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-center font-medium"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center font-medium"
                >
                  Failed to send message. Please try again or email directly.
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* What I'm Looking For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 dark:border-slate-700/50 border-gray-300 border rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Ideal Opportunity Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold dark:text-gray-300 text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-blue-400">●</span> Technical Interests
                </h3>
                <ul className="space-y-2 dark:text-gray-400 text-gray-600 text-sm">
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-blue-400 mt-0.5">→</span>
                    <span>Infrastructure automation with AI/LLM workflow integration</span>
                  </li>
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-purple-400 mt-0.5">→</span>
                    <span>Cloud infrastructure and Kubernetes/Docker environments</span>
                  </li>
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-cyan-400 mt-0.5">→</span>
                    <span>CI/CD pipelines and platform engineering automation</span>
                  </li>
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-emerald-400 mt-0.5">→</span>
                    <span>Monitoring, observability, and reliability engineering</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold dark:text-gray-300 text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-purple-400">●</span> Work Environment
                </h3>
                <ul className="space-y-2 dark:text-gray-400 text-gray-600 text-sm">
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-blue-400 mt-0.5">→</span>
                    <span>Collaborative engineering teams with mentorship opportunities</span>
                  </li>
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-purple-400 mt-0.5">→</span>
                    <span>Growth path with structured learning and skill development</span>
                  </li>
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-cyan-400 mt-0.5">→</span>
                    <span>Hybrid work environment (2-3 days in-office collaboration in DMV area)</span>
                  </li>
                  <li className="flex items-start gap-2 pl-4">
                    <span className="text-emerald-400 mt-0.5">→</span>
                    <span>Innovation-friendly culture supporting continuous improvement</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t dark:border-slate-700/50 border-gray-300">
              <p className="text-sm dark:text-gray-400 text-gray-600 italic text-center">
                Excited to contribute infrastructure automation expertise to collaborative engineering teams. Eager to learn from experienced mentors while bringing proven DevOps and AI integration skills to impactful projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

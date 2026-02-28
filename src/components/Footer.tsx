"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, Download, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/AIKUSAN",
      icon: Github,
      color: "hover:text-purple-400",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/lorenztazan",
      icon: Linkedin,
      color: "hover:text-cyan-400",
    },
    {
      name: "Email",
      href: "mailto:lorenztazan@gmail.com",
      icon: Mail,
      color: "hover:text-blue-400",
    },
    {
      name: "Phone",
      href: "tel:240-256-2410",
      icon: Phone,
      color: "hover:text-emerald-400",
    },
  ];

  return (
    <footer className="border-t dark:border-white/5 border-gray-200 dark:bg-black/20 bg-white/80 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold dark:text-white text-gray-900">
              Lorenz Tazan
            </h3>
            <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
              Systems Engineer specializing in AI-powered Infrastructure Automation, LLM Integration, and Cloud-Native Orchestration.
            </p>
            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 dark:bg-slate-900/40 bg-gray-100 dark:hover:bg-slate-800/60 hover:bg-gray-200 border dark:border-slate-700/50 border-gray-300 rounded-lg transition-all text-sm font-medium dark:text-white text-gray-900"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider dark:text-gray-400 text-gray-600">
              Navigation
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm dark:text-gray-500 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider dark:text-gray-400 text-gray-600">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`p-2 dark:bg-slate-900/40 bg-gray-100 border dark:border-slate-700/50 border-gray-300 rounded-lg dark:text-gray-400 text-gray-600 ${social.color} transition-all hover:scale-110`}
                    title={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-2 pt-3 text-xs dark:text-gray-500 text-gray-600">
              <MapPin className="w-3.5 h-3.5" />
              <span>California, MD</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Tech Stack */}
        <div className="pt-8 border-t dark:border-white/5 border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm dark:text-gray-500 text-gray-600 text-center md:text-left"
          >
            © {currentYear} Lorenz Tazan. All Rights Reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs dark:text-gray-600 text-gray-500 font-mono text-center md:text-right"
          >
            Built with Next.js 16, React 19 & Tailwind CSS v4
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import TypingText from "@/components/TypingText";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="32" height="32" viewBox="0 0 32 32" className="flex-shrink-0">
              <defs>
                <linearGradient id="header-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className="group-hover:opacity-80 transition-opacity" style={{stopColor: 'rgb(96,165,250)', stopOpacity: 1}} />
                  <stop offset="100%" className="group-hover:opacity-80 transition-opacity" style={{stopColor: 'rgb(168,85,247)', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <rect width="32" height="32" className="fill-white dark:fill-slate-800" rx="6"/>
              <text x="50%" y="50%" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="bold" fill="url(#header-grad)" textAnchor="middle" dominantBaseline="central">LT</text>
            </svg>
            <span className="hidden sm:inline">
              <TypingText 
                text="Lorenz Tazan" 
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all"
                speed={80}
                delay={300}
              />
            </span>
            <span className="sm:hidden">
              <TypingText 
                text="L. Tazan" 
                className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all"
                speed={80}
                delay={300}
              />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-blue-600 dark:text-white bg-blue-100 dark:bg-white/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* CV Download Button */}
            <a
              href="/resume.pdf"
              download="Lorenz_Tazan_CV.pdf"
              className="ml-2 px-3 py-2 text-xs lg:text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              Download CV
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-all ${
                    isActive
                      ? "text-blue-600 dark:text-white bg-blue-100 dark:bg-white/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              download="Lorenz_Tazan_CV.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg mt-4 text-center hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Download CV
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

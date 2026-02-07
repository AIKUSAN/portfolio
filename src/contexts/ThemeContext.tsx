"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      root.classList.remove('dark', 'light');
      root.classList.add(savedTheme);
    } else {
      // Default to dark mode
      const initialTheme = 'dark';
      setTheme(initialTheme);
      root.classList.remove('dark', 'light');
      root.classList.add(initialTheme);
      localStorage.setItem('theme', initialTheme);
    }
  }, []);

  // Apply theme changes to DOM immediately
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    localStorage.setItem('theme', theme);
    
    // Force class update
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    
    // Force re-render by updating data attribute
    root.setAttribute('data-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Prevent flash of incorrect theme by rendering nothing until mounted
  // or render children with default (dark) to avoid hydration mismatch?
  // For static export, it's better to render children immediately but theme might change.
  // We'll return children wrapped in context.
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback to avoid crashes if used outside provider (e.g. during specific initial renders)
    return { theme: 'dark' as Theme, toggleTheme: () => {} };
  }
  return context;
}

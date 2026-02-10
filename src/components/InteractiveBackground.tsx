"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isClient] = useState(typeof window !== 'undefined');
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // High DPI canvas setup
    const dpr = window.devicePixelRatio || 1;
    
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      
      // Reinitialize particles on resize
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 8000), 150);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking - optimized with requestAnimationFrame
    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isMoving: true
      };

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Intersection Observer for performance
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Animation loop
    const animate = () => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Theme-aware colors
      const isDark = theme === 'dark';
      const particleColor = isDark ? 'rgba(96, 165, 250, 0.6)' : 'rgba(59, 130, 246, 0.5)';
      const lineColor = isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.1)';
      const glowColor = isDark ? 'rgba(147, 51, 234, 0.3)' : 'rgba(139, 92, 246, 0.2)';

      // Clear canvas with transparency
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const maxDistance = 150;
      const mouseInfluence = 100;
      const mouseForce = 0.15;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Calculate distance from mouse
        let dx = 0;
        let dy = 0;
        
        if (mouse.isMoving) {
          dx = mouse.x - particle.x;
          dy = mouse.y - particle.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          // Mouse attraction effect
          if (distToMouse < mouseInfluence) {
            const force = (1 - distToMouse / mouseInfluence) * mouseForce;
            particle.vx += (dx / distToMouse) * force;
            particle.vy += (dy / distToMouse) * force;
          }
        }

        // Apply velocity with minimal damping for continuous movement
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary bounce with energy preservation
        const bounceEnergy = 0.8;
        if (particle.x <= 0) {
          particle.x = 0;
          particle.vx = Math.abs(particle.vx) * bounceEnergy;
        } else if (particle.x >= width) {
          particle.x = width;
          particle.vx = -Math.abs(particle.vx) * bounceEnergy;
        }
        
        if (particle.y <= 0) {
          particle.y = 0;
          particle.vy = Math.abs(particle.vy) * bounceEnergy;
        } else if (particle.y >= height) {
          particle.y = height;
          particle.vy = -Math.abs(particle.vy) * bounceEnergy;
        }

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            // Glow effect near mouse
            const midX = (particle.x + otherParticle.x) / 2;
            const midY = (particle.y + otherParticle.y) / 2;
            const mouseDistToLine = mouse.isMoving 
              ? Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2)
              : 999;
            
            if (mouseDistToLine < mouseInfluence) {
              ctx.strokeStyle = glowColor.replace(/[\d.]+\)$/, `${opacity * 0.8})`);
              ctx.lineWidth = 2;
            } else {
              ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${opacity})`);
              ctx.lineWidth = 1;
            }
            
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Glow near mouse
        if (mouse.isMoving) {
          const distToMouse = Math.sqrt((mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2);
          if (distToMouse < mouseInfluence) {
            const glowIntensity = 1 - distToMouse / mouseInfluence;
            ctx.shadowBlur = 15 * glowIntensity;
            ctx.shadowColor = isDark ? '#a78bfa' : '#8b5cf6';
            ctx.fillStyle = glowColor.replace(/[\d.]+\)$/, `${0.8 + glowIntensity * 0.2})`);
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = particleColor;
          }
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = particleColor;
        }
        
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      clearTimeout(mouseTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient, theme]);

  if (!isClient) {
    // No SSR render needed - transparent overlay
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 transition-opacity duration-500 pointer-events-none"
      style={{ 
        zIndex: -5,
        willChange: 'transform'
      }}
    />
  );
}

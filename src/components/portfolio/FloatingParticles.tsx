import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  /** Number of particles to render */
  count?: number;
  /** Base color for particles (uses gold by default) */
  color?: string;
}

/**
 * Atmospheric floating particles that drift upward.
 * Creates a magical dust/petal effect without distracting from content.
 */
const FloatingParticles = ({ count = 18, color = '#d4af37' }: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across viewport
      y: Math.random() * 100 + 100, // start below viewport
      size: Math.random() * 4 + 2, // 2-6px
      duration: Math.random() * 15 + 20, // 20-35 seconds to float up
      delay: Math.random() * 10, // stagger start times
      opacity: Math.random() * 0.15 + 0.1, // 0.1-0.25 opacity (very subtle)
    }));
    setParticles(newParticles);
  }, [count]);

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}40`,
          }}
          initial={{ 
            y: '100vh',
            opacity: 0,
          }}
          animate={{ 
            y: '-20vh',
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            y: {
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            },
            opacity: {
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1],
              ease: 'linear',
            },
          }}
        />
      ))}
      
      {/* A few larger, slower particles for depth */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${15 + i * 18}%`,
            width: 8 + i * 2,
            height: 8 + i * 2,
            backgroundColor: i % 2 === 0 ? color : '#4a6b5c',
            boxShadow: `0 0 20px ${i % 2 === 0 ? color : '#4a6b5c'}30`,
          }}
          initial={{ 
            y: '110vh',
            opacity: 0,
            x: 0,
          }}
          animate={{ 
            y: '-15vh',
            opacity: [0, 0.08, 0.08, 0],
            x: [0, 30, -20, 10, 0], // gentle horizontal drift
          }}
          transition={{
            y: {
              duration: 35 + i * 5,
              delay: i * 4,
              repeat: Infinity,
              ease: 'linear',
            },
            opacity: {
              duration: 35 + i * 5,
              delay: i * 4,
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1],
              ease: 'linear',
            },
            x: {
              duration: 35 + i * 5,
              delay: i * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;


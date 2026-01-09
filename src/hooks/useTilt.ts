import { useRef, useState, useCallback, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface UseTiltOptions {
  maxRotation?: number;
  scale?: number;
  perspective?: number;
}

/**
 * Custom hook for 3D tilt effect on hover.
 * Creates a subtle perspective shift like examining a framed picture.
 */
export const useTilt = (options: UseTiltOptions = {}) => {
  const { maxRotation = 5, scale = 1.02, perspective = 1000 } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate rotation based on mouse position relative to center
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxRotation;
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * maxRotation;

      setTilt({ rotateX, rotateY, scale });
    },
    [maxRotation, scale, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const style = {
    transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: 'transform 0.15s ease-out',
  };

  return { ref, style, tilt };
};

export default useTilt;


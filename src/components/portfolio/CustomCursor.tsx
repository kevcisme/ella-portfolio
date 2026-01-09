import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Custom artistic cursor with a golden dot and trailing ring.
 * Scales on hover over interactive elements.
 */
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Raw cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for the trailing ring
  const springConfig = { damping: 30, stiffness: 200 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Don't use custom cursor on touch devices
    if ('ontouchstart' in window || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hoverable elements
    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    // Add listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, [data-cursor-hover]'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleElementHover);
          el.removeEventListener('mouseleave', handleElementLeave);
        });
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const cleanupHoverListeners = addHoverListeners();

    // Re-attach listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      cleanupHoverListeners();
      addHoverListeners();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cleanupHoverListeners();
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible, prefersReducedMotion]);

  // Don't render on touch devices or when reduced motion is preferred
  if ('ontouchstart' in window || prefersReducedMotion) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div 
          className="w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gold"
          style={{
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
          }}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          scale: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
      >
        <div 
          className="w-8 h-8 -ml-4 -mt-4 rounded-full border border-gold/40"
          style={{
            boxShadow: isHovering 
              ? '0 0 20px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1)'
              : '0 0 10px rgba(212, 175, 55, 0.2)',
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;


import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  // Handle mouse move for parallax effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to 1 range, then scale to max 15px displacement
      const x = ((clientX / innerWidth) - 0.5) * 30;
      const y = ((clientY / innerHeight) - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  // Trigger load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Botanical line drawings
    const botanicals = [
      { x: 100, y: 100, type: 'fern', opacity: 0 },
      { x: window.innerWidth - 150, y: 200, type: 'ivy', opacity: 0 },
      { x: 200, y: window.innerHeight - 200, type: 'flower', opacity: 0 },
      { x: window.innerWidth - 200, y: window.innerHeight - 150, type: 'leaf', opacity: 0 },
    ];

    let animationFrame = 0;

    const drawFern = (x: number, y: number, opacity: number) => {
      ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 80);
      for (let i = 0; i < 8; i++) {
        ctx.moveTo(x, y + i * 10);
        ctx.bezierCurveTo(x - 15, y + i * 10 + 5, x - 15, y + i * 10 + 8, x - 10, y + i * 10 + 10);
        ctx.moveTo(x, y + i * 10);
        ctx.bezierCurveTo(x + 15, y + i * 10 + 5, x + 15, y + i * 10 + 8, x + 10, y + i * 10 + 10);
      }
      ctx.stroke();
    };

    const drawIvy = (x: number, y: number, opacity: number) => {
      ctx.strokeStyle = `rgba(74, 107, 92, ${opacity * 0.3})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - 20, y + 30, x + 20, y + 60, x, y + 90);
      ctx.stroke();
      
      // Leaves
      for (let i = 0; i < 4; i++) {
        const leafY = y + i * 25;
        ctx.beginPath();
        ctx.arc(x - 10, leafY, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 107, 92, ${opacity * 0.2})`;
        ctx.fill();
      }
    };

    const drawFlower = (x: number, y: number, opacity: number) => {
      ctx.fillStyle = `rgba(212, 175, 55, ${opacity * 0.25})`;
      ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.3})`;
      ctx.lineWidth = 1;
      
      // Petals
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.ellipse(
          x + Math.cos(angle) * 15,
          y + Math.sin(angle) * 15,
          8,
          12,
          angle,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.stroke();
      }
      
      // Center
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${opacity * 0.4})`;
      ctx.fill();
    };

    const drawLeaf = (x: number, y: number, opacity: number) => {
      ctx.fillStyle = `rgba(74, 107, 92, ${opacity * 0.25})`;
      ctx.strokeStyle = `rgba(74, 107, 92, ${opacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + 20, y + 10, x + 20, y + 30, x, y + 40);
      ctx.bezierCurveTo(x - 20, y + 30, x - 20, y + 10, x, y);
      ctx.fill();
      ctx.stroke();
      
      // Vein
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 40);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      animationFrame++;
      
      botanicals.forEach((botanical, index) => {
        // Fade in effect
        if (animationFrame > index * 30) {
          botanical.opacity = Math.min(1, botanical.opacity + 0.02);
        }
        
        const floatOffset = Math.sin((animationFrame + index * 50) * 0.02) * 5;
        
        switch (botanical.type) {
          case 'fern':
            drawFern(botanical.x, botanical.y + floatOffset, botanical.opacity);
            break;
          case 'ivy':
            drawIvy(botanical.x, botanical.y + floatOffset, botanical.opacity);
            break;
          case 'flower':
            drawFlower(botanical.x, botanical.y + floatOffset, botanical.opacity);
            break;
          case 'leaf':
            drawLeaf(botanical.x, botanical.y + floatOffset, botanical.opacity);
            break;
        }
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      botanicals[1].x = window.innerWidth - 150;
      botanicals[2].y = window.innerHeight - 200;
      botanicals[3].x = window.innerWidth - 200;
      botanicals[3].y = window.innerHeight - 150;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Text animation variants
  const nameLetters = "Ella Tanibe".split('');
  
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.05,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  // SVG path animation
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
        opacity: { duration: 0.3, delay: 0.3 },
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 1.5,
        ease: "backOut",
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative h-screen w-full bg-forest-deep overflow-hidden flex items-center justify-center"
    >
      {/* Botanical Canvas Background with parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-60"
        />
      </motion.div>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-forest-shadow opacity-70 pointer-events-none" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Decorative top flourish with SVG drawing animation */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <svg width="120" height="40" viewBox="0 0 120 40" className="opacity-70">
            <motion.path 
              d="M 10 20 Q 30 10, 60 20 T 110 20" 
              stroke="#d4af37" 
              strokeWidth="1" 
              fill="none"
              strokeLinecap="round"
              variants={pathVariants}
            />
            <motion.circle 
              cx="60" 
              cy="20" 
              r="3" 
              fill="#d4af37"
              variants={circleVariants}
            />
          </svg>
        </motion.div>

        {/* Animated name with letter-by-letter reveal */}
        <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-black text-cream mb-6 tracking-tight leading-none">
          {prefersReducedMotion ? (
            "Ella Tanibe"
          ) : (
            nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={letterVariants}
                className="inline-block"
                style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))
          )}
        </h1>
        
        <motion.p 
          className="font-body text-xl md:text-2xl text-cream/80 mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Artist & Designer
        </motion.p>
        
        <motion.p 
          className="font-body text-base md:text-lg text-cream/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Where Victorian elegance meets the wild beauty of nature, 
          each piece tells a story of forgotten gardens and timeless grace.
        </motion.p>

        {/* Decorative bottom flourish */}
        <motion.div 
          className="mt-8 flex justify-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <svg width="80" height="30" viewBox="0 0 80 30" className="opacity-60">
            <motion.path 
              d="M 5 15 Q 20 5, 40 15 T 75 15" 
              stroke="#d4af37" 
              strokeWidth="1" 
              fill="none"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: { duration: 1, ease: "easeInOut", delay: 1.6 },
                    opacity: { duration: 0.3, delay: 1.6 },
                  },
                },
              }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-2 bg-cream/40 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

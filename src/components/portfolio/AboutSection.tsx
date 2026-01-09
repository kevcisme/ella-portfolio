import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for staggered bio paragraphs
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const frameCornerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : delay,
        duration: 0.4,
        ease: "backOut",
      },
    }),
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen bg-sage/10 py-24 px-6 md:px-12 lg:px-24 flex items-center"
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Decorative divider with SVG drawing animation */}
        <motion.div 
          className="flex items-center justify-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg width="200" height="60" viewBox="0 0 200 60" className="opacity-50">
            <motion.path 
              d="M 10 30 Q 50 10, 100 30 T 190 30" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="40" cy="20" r="4" fill="#4a6b5c" opacity="0.6"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
            <motion.circle 
              cx="100" cy="30" r="5" fill="#d4af37"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
            />
            <motion.circle 
              cx="160" cy="20" r="4" fill="#4a6b5c" opacity="0.6"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* About Card */}
        <motion.div 
          className="relative bg-sage/30 rounded-lg p-8 md:p-12 backdrop-blur-sm border border-gold/20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Corner flourishes with staggered animation */}
          <motion.div 
            className="absolute top-0 left-0 w-20 h-20"
            custom={0.3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={frameCornerVariants}
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <path 
                d="M 5 40 Q 5 5, 40 5" 
                stroke="#d4af37" 
                strokeWidth="1.5" 
                fill="none"
                opacity="0.5"
              />
              <circle cx="15" cy="15" r="3" fill="#d4af37" opacity="0.5" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute top-0 right-0 w-20 h-20 rotate-90"
            custom={0.4}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={frameCornerVariants}
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <path 
                d="M 5 40 Q 5 5, 40 5" 
                stroke="#d4af37" 
                strokeWidth="1.5" 
                fill="none"
                opacity="0.5"
              />
              <circle cx="15" cy="15" r="3" fill="#d4af37" opacity="0.5" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 w-20 h-20 -rotate-90"
            custom={0.5}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={frameCornerVariants}
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <path 
                d="M 5 40 Q 5 5, 40 5" 
                stroke="#d4af37" 
                strokeWidth="1.5" 
                fill="none"
                opacity="0.5"
              />
              <circle cx="15" cy="15" r="3" fill="#d4af37" opacity="0.5" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute bottom-0 right-0 w-20 h-20 rotate-180"
            custom={0.6}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={frameCornerVariants}
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <path 
                d="M 5 40 Q 5 5, 40 5" 
                stroke="#d4af37" 
                strokeWidth="1.5" 
                fill="none"
                opacity="0.5"
              />
              <circle cx="15" cy="15" r="3" fill="#d4af37" opacity="0.5" />
            </svg>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-lg blur-xl 
                group-hover:blur-2xl transition-all duration-500" />
              <div className="relative aspect-square overflow-hidden rounded-lg border-4 border-gold/40">
                <motion.img
                  src="/about/1.jpg"
                  alt="Ella Tanibe"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
              {/* Vintage frame corners with animation */}
              <motion.div 
                className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-gold rounded-tl"
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: -10 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              />
              <motion.div 
                className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-gold rounded-tr"
                initial={{ opacity: 0, x: 10, y: -10 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 10, y: -10 }}
                transition={{ delay: 0.65, duration: 0.4 }}
              />
              <motion.div 
                className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-gold rounded-bl"
                initial={{ opacity: 0, x: -10, y: 10 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: 10 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              />
              <motion.div 
                className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-gold rounded-br"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 10, y: 10 }}
                transition={{ delay: 0.75, duration: 0.4 }}
              />
            </motion.div>

            {/* Bio with staggered text */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-cream mb-2">
                  About Me
                </h2>
                <div className="w-24 h-1 bg-gold/50 mb-6" />
              </motion.div>

              <motion.p 
                className="font-body text-lg text-cream/80 leading-relaxed"
                variants={itemVariants}
              >
                From the tropical beaches of Hawaii on the South Shore to the desert of Los Angeles, 
                and then back to the rainforests of Hawaii on the tropical North Shore,
                I find inspiration in the delicate dance between cultivation and wilderness.
              </motion.p>

              <motion.p 
                className="font-body text-lg text-cream/80 leading-relaxed"
                variants={itemVariants}
              >
                My work celebrates the intricate beauty of natural forms: every landscape, eye, and piece of fruit
                rendered with the precision of scientific illustration and the soul of Victorian romanticism.
              </motion.p>

              <motion.p 
                className="font-body text-lg text-cream/80 leading-relaxed"
                variants={itemVariants}
              >
                Working primarily in acrylic, oil, watercolor, clay, and glass, I create pieces that honor both the technical tradition 
                of botanical art and the whimsical spirit of cottage gardens. Every illustration is a love letter 
                to the natural world, pressed between the pages of time.
              </motion.p>

              {/* Signature with special animation */}
              <motion.div 
                className="pt-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 1.2,
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  },
                }}
              >
                <motion.p 
                  className="font-script text-3xl text-gold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  Ella Tanibe
                </motion.p>
                <motion.p 
                  className="font-body text-sm text-cream/60 mt-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                >
                  Est. 2008 Hawaii, USA
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          className="flex items-center justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <svg width="150" height="50" viewBox="0 0 150 50" className="opacity-50">
            <motion.path 
              d="M 10 25 Q 40 15, 75 25 T 140 25" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
            />
            <motion.line 
              x1="75" y1="20" x2="75" y2="30" 
              stroke="#d4af37" strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 2, duration: 0.3 }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

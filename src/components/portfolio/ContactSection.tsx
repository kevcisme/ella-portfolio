import { useState, FormEvent, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen bg-forest-deep py-24 px-6 md:px-12 lg:px-24 flex items-center"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Botanical divider with SVG drawing animation */}
        <motion.div 
          className="flex items-center justify-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg width="250" height="80" viewBox="0 0 250 80" className="opacity-50">
            <motion.path 
              d="M 20 40 Q 70 20, 125 40 T 230 40" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Vine leaves */}
            <motion.ellipse 
              cx="60" cy="30" rx="8" ry="12" fill="#4a6b5c" opacity="0.4"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
            <motion.ellipse 
              cx="125" cy="40" rx="10" ry="14" fill="#d4af37" opacity="0.5"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
            />
            <motion.ellipse 
              cx="190" cy="30" rx="8" ry="12" fill="#4a6b5c" opacity="0.4"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Section title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-cream mb-4">
            Get in Touch
          </h2>
          <p className="font-body text-lg text-cream/60 max-w-2xl mx-auto">
            Commissions and inquiries are always welcome. Let's create something beautiful together.
          </p>
        </motion.div>

        {/* Form container with parchment effect */}
        <motion.div 
          className="relative bg-sage/20 rounded-lg p-8 md:p-12 backdrop-blur-sm border border-gold/20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Decorative corners with staggered animation */}
          <motion.div 
            className="absolute top-0 left-0 w-16 h-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute top-0 right-0 w-16 h-16 rotate-90"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.55, duration: 0.3 }}
          >
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 w-16 h-16 -rotate-90"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </motion.div>
          <motion.div 
            className="absolute bottom-0 right-0 w-16 h-16 rotate-180"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.65, duration: 0.3 }}
          >
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Name field */}
            <motion.div className="relative" variants={itemVariants}>
              <label 
                htmlFor="name" 
                className="block font-body text-sm text-cream/70 mb-2 tracking-wide"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className={`
                  w-full px-6 py-4 bg-cream/5 border-2 rounded-lg
                  font-body text-cream placeholder-cream/30
                  transition-all duration-500 ease-out
                  focus:outline-none focus:bg-cream/10
                  ${focusedField === 'name' 
                    ? 'border-gold shadow-lg shadow-gold/20' 
                    : 'border-gold/20 hover:border-gold/40'
                  }
                `}
                placeholder="Ella Tanibe"
                style={{
                  backgroundImage: focusedField === 'name' 
                    ? `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23d4af37' opacity='0.1'/%3E%3C/svg%3E")`
                    : undefined,
                }}
              />
              {/* Inkwell effect */}
              {focusedField === 'name' && (
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>

            {/* Email field */}
            <motion.div className="relative" variants={itemVariants}>
              <label 
                htmlFor="email" 
                className="block font-body text-sm text-cream/70 mb-2 tracking-wide"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className={`
                  w-full px-6 py-4 bg-cream/5 border-2 rounded-lg
                  font-body text-cream placeholder-cream/30
                  transition-all duration-500 ease-out
                  focus:outline-none focus:bg-cream/10
                  ${focusedField === 'email' 
                    ? 'border-gold shadow-lg shadow-gold/20' 
                    : 'border-gold/20 hover:border-gold/40'
                  }
                `}
                placeholder="hello@example.com"
                style={{
                  backgroundImage: focusedField === 'email' 
                    ? `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23d4af37' opacity='0.1'/%3E%3C/svg%3E")`
                    : undefined,
                }}
              />
              {focusedField === 'email' && (
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>

            {/* Message field */}
            <motion.div className="relative" variants={itemVariants}>
              <label 
                htmlFor="message" 
                className="block font-body text-sm text-cream/70 mb-2 tracking-wide"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={6}
                className={`
                  w-full px-6 py-4 bg-cream/5 border-2 rounded-lg
                  font-body text-cream placeholder-cream/30
                  transition-all duration-500 ease-out resize-none
                  focus:outline-none focus:bg-cream/10
                  ${focusedField === 'message' 
                    ? 'border-gold shadow-lg shadow-gold/20' 
                    : 'border-gold/20 hover:border-gold/40'
                  }
                `}
                placeholder="Tell me about your project or inquiry..."
                style={{
                  backgroundImage: focusedField === 'message' 
                    ? `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23d4af37' opacity='0.1'/%3E%3C/svg%3E")`
                    : undefined,
                }}
              />
              {focusedField === 'message' && (
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>

            {/* Submit button with wax seal effect */}
            <motion.div className="flex justify-center pt-4" variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-10 py-4 bg-gold hover:bg-gold/90 text-forest-deep font-body font-semibold
                  rounded-lg transition-all duration-500 ease-out
                  disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {/* Wax seal animation container */}
                <div className={`
                  absolute inset-0 rounded-lg overflow-hidden
                  ${isSubmitting ? 'animate-pulse' : ''}
                `}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold to-amber-600" />
                </div>

                <span className="relative flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-forest-deep/30 border-t-forest-deep rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.span>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>

            {/* Success message */}
            {isSubmitted && (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-block px-6 py-3 bg-gold/20 border border-gold/40 rounded-lg">
                  <p className="font-body text-gold">
                    ✨ Message sent successfully! I'll be in touch soon.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.form>
        </motion.div>

        {/* Footer info */}
        <motion.div 
          className="mt-12 text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div 
              className="w-12 h-px bg-gold/30"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            />
            <p className="font-script text-2xl text-gold">or</p>
            <motion.div 
              className="w-12 h-px bg-gold/30"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            />
          </div>
          <p className="font-body text-cream/60">
            Email me directly at{' '}
            <a href="mailto:tahtidesigns@gmail.com" className="text-gold hover:text-gold/80 transition-colors underline decoration-gold/30">
              tahtidesigns@gmail.com
            </a>
          </p>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-gold/10 mt-12">
            <p className="font-body text-sm text-cream/40">
              © 2026 Ella Tanibe. All illustrations are original works.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

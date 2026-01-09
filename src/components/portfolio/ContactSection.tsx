import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return (
    <section id="contact" className="relative min-h-screen bg-forest-deep py-24 px-6 md:px-12 lg:px-24 flex items-center">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Botanical divider */}
        <div className="flex items-center justify-center mb-16">
          <svg width="250" height="80" viewBox="0 0 250 80" className="opacity-50">
            <path 
              d="M 20 40 Q 70 20, 125 40 T 230 40" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Vine leaves */}
            <ellipse cx="60" cy="30" rx="8" ry="12" fill="#4a6b5c" opacity="0.4" />
            <ellipse cx="125" cy="40" rx="10" ry="14" fill="#d4af37" opacity="0.5" />
            <ellipse cx="190" cy="30" rx="8" ry="12" fill="#4a6b5c" opacity="0.4" />
          </svg>
        </div>

        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-cream mb-4">
            Get in Touch
          </h2>
          <p className="font-body text-lg text-cream/60 max-w-2xl mx-auto">
            Commissions and inquiries are always welcome. Let's create something beautiful together.
          </p>
        </div>

        {/* Form container with parchment effect */}
        <div className="relative bg-sage/20 rounded-lg p-8 md:p-12 backdrop-blur-sm border border-gold/20">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 rotate-90">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 -rotate-90">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 rotate-180">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M 4 32 Q 4 4, 32 4" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="#d4af37" opacity="0.6" />
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name field */}
            <div className="relative">
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
                placeholder="Eleanor Rose"
                style={{
                  backgroundImage: focusedField === 'name' 
                    ? `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23d4af37' opacity='0.1'/%3E%3C/svg%3E")`
                    : undefined,
                }}
              />
              {/* Inkwell effect */}
              {focusedField === 'name' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent animate-fadeIn" />
              )}
            </div>

            {/* Email field */}
            <div className="relative">
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
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent animate-fadeIn" />
              )}
            </div>

            {/* Message field */}
            <div className="relative">
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
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent animate-fadeIn" />
              )}
            </div>

            {/* Submit button with wax seal effect */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-10 py-4 bg-gold hover:bg-gold/90 text-forest-deep font-body font-semibold
                  rounded-lg transition-all duration-500 ease-out
                  hover:shadow-2xl hover:shadow-gold/30 hover:scale-105
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Success message */}
            {isSubmitted && (
              <div className="text-center animate-fadeIn">
                <div className="inline-block px-6 py-3 bg-gold/20 border border-gold/40 rounded-lg">
                  <p className="font-body text-gold">
                    ✨ Message sent successfully! I'll be in touch soon.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-gold/30" />
            <p className="font-script text-2xl text-gold">or</p>
            <div className="w-12 h-px bg-gold/30" />
          </div>
          <p className="font-body text-cream/60">
            Email me directly at{' '}
            <a href="mailto:hello@eleanorrose.art" className="text-gold hover:text-gold/80 transition-colors underline decoration-gold/30">
              hello@eleanorrose.art
            </a>
          </p>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-gold/10 mt-12">
            <p className="font-body text-sm text-cream/40">
              © 2024 Eleanor Rose. All botanical illustrations are original works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

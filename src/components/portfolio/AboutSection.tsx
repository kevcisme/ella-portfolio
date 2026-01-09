const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen bg-sage/10 py-24 px-6 md:px-12 lg:px-24 flex items-center">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-16">
          <svg width="200" height="60" viewBox="0 0 200 60" className="opacity-50">
            <path 
              d="M 10 30 Q 50 10, 100 30 T 190 30" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="40" cy="20" r="4" fill="#4a6b5c" opacity="0.6" />
            <circle cx="100" cy="30" r="5" fill="#d4af37" />
            <circle cx="160" cy="20" r="4" fill="#4a6b5c" opacity="0.6" />
          </svg>
        </div>

        {/* About Card */}
        <div className="relative bg-sage/30 rounded-lg p-8 md:p-12 backdrop-blur-sm border border-gold/20">
          {/* Corner flourishes */}
          <div className="absolute top-0 left-0 w-20 h-20">
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
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 rotate-90">
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
          </div>
          <div className="absolute bottom-0 left-0 w-20 h-20 -rotate-90">
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
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 rotate-180">
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
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-lg blur-xl 
                group-hover:blur-2xl transition-all duration-500" />
              <div className="relative aspect-square overflow-hidden rounded-lg border-4 border-gold/40">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80"
                  alt="Eleanor Rose"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Vintage frame corners */}
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-gold rounded-tl" />
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-gold rounded-tr" />
              <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-gold rounded-bl" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-gold rounded-br" />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-cream mb-2">
                  About Me
                </h2>
                <div className="w-24 h-1 bg-gold/50 mb-6" />
              </div>

              <p className="font-body text-lg text-cream/80 leading-relaxed">
                From the misty moors of the English countryside to the hidden corners of forgotten conservatories, 
                I find inspiration in the delicate dance between cultivation and wilderness.
              </p>

              <p className="font-body text-lg text-cream/80 leading-relaxed">
                My work celebrates the intricate beauty of botanical forms—each leaf vein, each petal curve, 
                rendered with the precision of scientific illustration and the soul of Victorian romanticism.
              </p>

              <p className="font-body text-lg text-cream/80 leading-relaxed">
                Working primarily in watercolor and ink, I create pieces that honor both the technical tradition 
                of botanical art and the whimsical spirit of cottage gardens. Every illustration is a love letter 
                to the natural world, pressed between the pages of time.
              </p>

              {/* Signature */}
              <div className="pt-6">
                <p className="font-script text-3xl text-gold">
                  Eleanor Rose
                </p>
                <p className="font-body text-sm text-cream/60 mt-1">
                  Est. 2018 · Cornwall, England
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="flex items-center justify-center mt-16">
          <svg width="150" height="50" viewBox="0 0 150 50" className="opacity-50">
            <path 
              d="M 10 25 Q 40 15, 75 25 T 140 25" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <line x1="75" y1="20" x2="75" y2="30" stroke="#d4af37" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

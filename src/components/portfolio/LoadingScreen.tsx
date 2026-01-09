import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-forest-deep flex items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />

      <div className="relative text-center">
        {/* Botanical ornament */}
        <div className="mb-8 flex justify-center animate-float">
          <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-70">
            <circle cx="40" cy="40" r="35" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle cx="40" cy="40" r="25" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.5" />
            
            {/* Flower petals */}
            {[0, 72, 144, 216, 288].map((angle) => {
              const x = 40 + Math.cos((angle * Math.PI) / 180) * 15;
              const y = 40 + Math.sin((angle * Math.PI) / 180) * 15;
              return (
                <ellipse
                  key={angle}
                  cx={x}
                  cy={y}
                  rx="4"
                  ry="8"
                  fill="#d4af37"
                  opacity="0.4"
                  transform={`rotate(${angle} ${x} ${y})`}
                />
              );
            })}
            
            {/* Center */}
            <circle cx="40" cy="40" r="6" fill="#d4af37" opacity="0.6" />
          </svg>
        </div>

        {/* Loading text */}
        <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4 animate-fadeIn">
          Ella Tanibe
        </h2>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-sage/30 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gold rounded-full transition-all duration-300 ease-out shadow-lg shadow-gold/50"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className="font-body text-sm text-cream/50 mt-4">
          Loading your experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

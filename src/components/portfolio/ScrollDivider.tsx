import { useEffect, useRef, useState } from 'react';

interface ScrollDividerProps {
  variant?: 'vine' | 'flower' | 'leaves';
}

const ScrollDivider = ({ variant = 'vine' }: ScrollDividerProps) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => {
      if (dividerRef.current) {
        observer.unobserve(dividerRef.current);
      }
    };
  }, []);

  const renderVine = () => (
    <svg width="300" height="100" viewBox="0 0 300 100" className={`
      transition-all duration-1000 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}>
      <path 
        d="M 20 50 Q 75 20, 150 50 T 280 50" 
        stroke="#d4af37" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
        strokeDasharray="400"
        strokeDashoffset={isVisible ? '0' : '400'}
        style={{ transition: 'stroke-dashoffset 2s ease-out' }}
      />
      {/* Leaves along the vine */}
      <ellipse cx="75" cy="30" rx="10" ry="15" fill="#4a6b5c" opacity="0.4" 
        className={`transition-opacity duration-700 delay-500 ${isVisible ? 'opacity-40' : 'opacity-0'}`} />
      <ellipse cx="150" cy="50" rx="12" ry="18" fill="#d4af37" opacity="0.5"
        className={`transition-opacity duration-700 delay-700 ${isVisible ? 'opacity-50' : 'opacity-0'}`} />
      <ellipse cx="225" cy="30" rx="10" ry="15" fill="#4a6b5c" opacity="0.4"
        className={`transition-opacity duration-700 delay-900 ${isVisible ? 'opacity-40' : 'opacity-0'}`} />
    </svg>
  );

  const renderFlower = () => (
    <svg width="250" height="100" viewBox="0 0 250 100" className={`
      transition-all duration-1000 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}>
      <path 
        d="M 20 50 Q 60 30, 125 50 T 230 50" 
        stroke="#d4af37" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
        strokeDasharray="300"
        strokeDashoffset={isVisible ? '0' : '300'}
        style={{ transition: 'stroke-dashoffset 2s ease-out' }}
      />
      {/* Flower center */}
      <circle cx="125" cy="50" r="8" fill="#d4af37" 
        className={`transition-all duration-500 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: 'center' }} />
      {/* Petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const x = 125 + Math.cos((angle * Math.PI) / 180) * 20;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 20;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="6"
            ry="10"
            fill="#d4af37"
            opacity="0.3"
            transform={`rotate(${angle} ${x} ${y})`}
            className={`transition-all duration-500 ${isVisible ? 'opacity-30 scale-100' : 'opacity-0 scale-0'}`}
            style={{ 
              transformOrigin: `${x}px ${y}px`,
              transitionDelay: `${1000 + i * 100}ms`
            }}
          />
        );
      })}
    </svg>
  );

  const renderLeaves = () => (
    <svg width="200" height="80" viewBox="0 0 200 80" className={`
      transition-all duration-1000 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}>
      <path 
        d="M 20 40 Q 60 25, 100 40 T 180 40" 
        stroke="#d4af37" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
        strokeDasharray="250"
        strokeDashoffset={isVisible ? '0' : '250'}
        style={{ transition: 'stroke-dashoffset 2s ease-out' }}
      />
      {/* Scattered leaves */}
      <path d="M 50 30 Q 60 25, 60 35 Q 60 45, 50 40 Z" fill="#4a6b5c" opacity="0.3"
        className={`transition-all duration-500 delay-700 ${isVisible ? 'opacity-30 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
      <path d="M 100 35 Q 110 30, 110 40 Q 110 50, 100 45 Z" fill="#d4af37" opacity="0.4"
        className={`transition-all duration-500 delay-900 ${isVisible ? 'opacity-40 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
      <path d="M 150 30 Q 160 25, 160 35 Q 160 45, 150 40 Z" fill="#4a6b5c" opacity="0.3"
        className={`transition-all duration-500 delay-1100 ${isVisible ? 'opacity-30 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
    </svg>
  );

  return (
    <div ref={dividerRef} className="flex items-center justify-center py-12">
      {variant === 'vine' && renderVine()}
      {variant === 'flower' && renderFlower()}
      {variant === 'leaves' && renderLeaves()}
    </div>
  );
};

export default ScrollDivider;

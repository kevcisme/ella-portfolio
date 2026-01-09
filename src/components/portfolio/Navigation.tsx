import { Leaf, Flower2, Feather } from 'lucide-react';

interface NavigationProps {
  activeSection?: string;
}

const Navigation = ({ activeSection = 'hero' }: NavigationProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Flower2 },
    { id: 'gallery', label: 'Gallery', icon: Leaf },
    { id: 'about', label: 'About', icon: Feather },
    { id: 'contact', label: 'Contact', icon: Flower2 },
  ];

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent -translate-x-1/2" />
      
      <div className="relative flex flex-col gap-12 py-8">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex items-center gap-4 transition-all duration-300"
              aria-label={item.label}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className={`
                relative w-10 h-10 rounded-full border-2 flex items-center justify-center
                transition-all duration-500 ease-out
                ${isActive 
                  ? 'bg-gold border-gold shadow-lg shadow-gold/30' 
                  : 'bg-forest-deep/50 border-gold/30 hover:border-gold hover:bg-gold/20'
                }
              `}>
                <Icon 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? 'text-forest-deep' : 'text-gold/70 group-hover:text-gold'
                  }`}
                />
              </div>

              {/* Label tooltip */}
              <span className={`
                absolute left-14 whitespace-nowrap font-body text-sm
                transition-all duration-300 ease-out
                opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
                ${isActive ? 'text-gold' : 'text-cream/70'}
              `}>
                {item.label}
              </span>

              {/* Active indicator glow */}
              {isActive && (
                <div className="absolute inset-0 rounded-full animate-glow pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;

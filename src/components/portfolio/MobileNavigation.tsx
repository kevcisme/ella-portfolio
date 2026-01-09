import { useState } from 'react';
import { Menu, X, Leaf, Flower2, Feather } from 'lucide-react';

interface MobileNavigationProps {
  activeSection?: string;
}

const MobileNavigation = ({ activeSection = 'hero' }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Flower2 },
    { id: 'gallery', label: 'Gallery', icon: Leaf },
    { id: 'about', label: 'About', icon: Feather },
    { id: 'contact', label: 'Contact', icon: Flower2 },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 lg:hidden w-12 h-12 rounded-full 
          bg-sage/80 backdrop-blur-sm border-2 border-gold/40
          flex items-center justify-center
          hover:bg-sage transition-all duration-300
          shadow-lg hover:shadow-xl"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gold" />
        ) : (
          <Menu className="w-6 h-6 text-gold" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-forest-shadow/95 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content */}
          <div className="fixed inset-x-0 top-0 z-40 lg:hidden animate-fadeIn">
            <div className="bg-sage/95 backdrop-blur-md border-b-2 border-gold/20 pt-24 pb-8 px-6">
              <nav className="flex flex-col gap-4 max-w-sm mx-auto">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`
                        group flex items-center gap-4 p-4 rounded-lg
                        transition-all duration-300
                        ${isActive 
                          ? 'bg-gold/20 border-2 border-gold' 
                          : 'bg-forest-deep/20 border-2 border-gold/20 hover:border-gold/40'
                        }
                      `}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        transition-colors duration-300
                        ${isActive ? 'bg-gold' : 'bg-gold/20'}
                      `}>
                        <Icon 
                          className={`w-5 h-5 ${
                            isActive ? 'text-forest-deep' : 'text-gold'
                          }`}
                        />
                      </div>
                      <span className={`
                        font-body text-lg font-medium
                        ${isActive ? 'text-gold' : 'text-cream/80'}
                      `}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNavigation;

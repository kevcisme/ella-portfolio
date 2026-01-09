import { useState, useEffect } from 'react';
import LoadingScreen from './portfolio/LoadingScreen';
import HeroSection from './portfolio/HeroSection';
import Navigation from './portfolio/Navigation';
import MobileNavigation from './portfolio/MobileNavigation';
import GallerySection from './portfolio/GallerySection';
import AboutSection from './portfolio/AboutSection';
import ContactSection from './portfolio/ContactSection';
import ScrollDivider from './portfolio/ScrollDivider';

function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'gallery', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />
      
      <div className="w-full min-h-screen bg-forest-deep">
        {/* Fixed Desktop Navigation */}
        <Navigation activeSection={activeSection} />
        
        {/* Mobile Navigation */}
        <MobileNavigation activeSection={activeSection} />

        {/* Main content */}
        <main className="relative">
          <HeroSection />
          
          {/* Decorative transition to gallery */}
          <div className="bg-forest-deep">
            <ScrollDivider variant="vine" />
          </div>
          
          <GallerySection />
          
          {/* Decorative transition to about */}
          <div className="bg-gradient-to-b from-forest-deep to-sage/10">
            <ScrollDivider variant="flower" />
          </div>
          
          <AboutSection />
          
          {/* Decorative transition to contact */}
          <div className="bg-gradient-to-b from-sage/10 to-forest-deep">
            <ScrollDivider variant="leaves" />
          </div>
          
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default Home;

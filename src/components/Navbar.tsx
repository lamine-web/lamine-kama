
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Github, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/hooks/use-theme';
import CVDownload from './CVDownload';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <nav className={`fixed w-full z-20 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo et nom */}
          <div 
            className="group flex items-center space-x-2 cursor-pointer" 
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center text-primary-foreground font-bold transition-all group-hover:shadow-lg group-hover:shadow-primary/20">
              DF
            </div>
            <div className="font-heading font-bold text-xl">
              <span className="text-primary">Dev</span>Portfolio
            </div>
          </div>

          {/* Navigation minimaliste (style rauno.me) */}
          <div className="hidden md:flex items-center">
            <div className="h-8 bg-muted/50 rounded-full flex items-center px-1 backdrop-blur-sm border border-border/20">
              {['home', 'about', 'skills', 'projects', 'testimonials', 'contact'].map((section, index) => {
                const labels: Record<string, string> = {
                  home: 'Accueil',
                  about: 'À propos',
                  skills: 'Compétences',
                  projects: 'Projets',
                  testimonials: 'Témoignages',
                  contact: 'Contact'
                };
                
                return (
                  <button 
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                      index === 0 ? 'text-primary-foreground bg-primary' : 'hover:bg-background/60'
                    }`}
                  >
                    {labels[section]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-3">
            {/* CV Download */}
            <div className="hidden md:block">
              <CVDownload />
            </div>
            
            {/* Github */}
            <Button variant="outline" size="icon" className="hidden md:flex">
              <Github size={18} />
            </Button>
            
            {/* Thème */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="outline" size="icon" onClick={toggleMenu} aria-label="Menu">
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-background/95 backdrop-blur-md shadow-lg border-t`}>
        <div className="px-4 pt-4 pb-4 space-y-2">
          {['home', 'about', 'skills', 'projects', 'testimonials', 'contact'].map((section) => {
            const labels: Record<string, string> = {
              home: 'Accueil',
              about: 'À propos',
              skills: 'Compétences',
              projects: 'Projets',
              testimonials: 'Témoignages',
              contact: 'Contact'
            };
            
            return (
              <button 
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors flex items-center"
              >
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                {labels[section]}
              </button>
            );
          })}
          
          <div className="pt-2 mt-2 border-t border-border/30">
            <div className="px-4 py-3">
              <CVDownload />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

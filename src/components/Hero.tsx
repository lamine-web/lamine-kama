
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, FileText } from 'lucide-react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [objective, setObjective] = useState('');
  const fullText = "Je crée des applications web puissantes avec Laravel & Angular";
  const fullObjective = "Mon objectif: développer des solutions performantes, évolutives et intuitives pour vos besoins métier";
  
  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Après avoir affiché le texte principal, attendre un peu puis afficher l'objectif
        setTimeout(() => {
          let objectiveIndex = 0;
          const objectiveInterval = setInterval(() => {
            if (objectiveIndex <= fullObjective.length) {
              setObjective(fullObjective.substring(0, objectiveIndex));
              objectiveIndex++;
            } else {
              clearInterval(objectiveInterval);
            }
          }, 40);
          
          return () => clearInterval(objectiveInterval);
        }, 500);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-red-50/30 dark:from-blue-950/30 dark:to-red-950/30"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-laravel/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-angular/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/20 animate-scale-in mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" 
                alt="Développeur"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Développeur <span className="text-primary">Full-Stack</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-2">
            {typedText}
            <span className={`animate-pulse inline-block ml-1 ${objective ? 'hidden' : ''}`}>|</span>
          </p>
          
          <p className="text-md sm:text-lg text-primary/80 mb-8 h-16 sm:h-12 font-medium">
            {objective}
            <span className={`animate-pulse inline-block ml-1 ${!objective ? 'hidden' : ''}`}>|</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToProjects}
              className="animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Voir mes projets
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToContact}
              className="animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              Me contacter
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center space-x-4">
            <Button variant="ghost" size="icon">
              <Github size={24} />
            </Button>
            <Button variant="ghost" size="icon">
              <FileText size={24} />
            </Button>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown size={24} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

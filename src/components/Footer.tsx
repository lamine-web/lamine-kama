
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary dark:bg-secondary/10 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="font-heading font-bold text-xl mb-4">
            <span className="text-primary">Dev</span>Portfolio
          </p>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
          </div>
          
          <p className="text-muted-foreground flex items-center justify-center">
            <span>© {currentYear} - Réalisé avec</span>
            <Heart size={16} className="mx-1 text-red-500" />
            <span>par un développeur passionné</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

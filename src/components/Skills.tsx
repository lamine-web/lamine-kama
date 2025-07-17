
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

type Skill = {
  name: string;
  icon: string;
  level: number;
  color: string;
};

const Skills = () => {
  const [showProgress, setShowProgress] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowProgress(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
    
    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);
  
  const frontendSkills: Skill[] = [
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-plain.svg', level: 90, color: 'bg-angular' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg', level: 85, color: 'bg-typescript' },
    { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', level: 90, color: 'bg-orange-500' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg', level: 80, color: 'bg-yellow-500' },
    { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', level: 75, color: 'bg-pink-500' }
  ];
  
  const backendSkills: Skill[] = [
    { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg', level: 95, color: 'bg-laravel' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg', level: 90, color: 'bg-blue-600' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg', level: 85, color: 'bg-postgresql' },
    { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg', level: 90, color: 'bg-green-600' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg', level: 85, color: 'bg-orange-600' }
  ];
  
  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <h2 className="section-title">Mes compétences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center">
              <span className="w-10 h-1 bg-primary mr-3"></span>
              Front-end
              <span className="w-10 h-1 bg-primary ml-3"></span>
            </h3>
            
            <div className="space-y-8">
              {frontendSkills.map((skill, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-6 h-6 mr-3" 
                      />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={showProgress ? skill.level : 0} 
                    className="h-2 transition-all duration-1000"
                    indicatorClassName={skill.color}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center">
              <span className="w-10 h-1 bg-primary mr-3"></span>
              Back-end
              <span className="w-10 h-1 bg-primary ml-3"></span>
            </h3>
            
            <div className="space-y-8">
              {backendSkills.map((skill, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-6 h-6 mr-3" 
                      />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={showProgress ? skill.level : 0} 
                    className="h-2 transition-all duration-1000"
                    indicatorClassName={skill.color}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;


import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'SamaSchool',
    description: 'Plateforme numérique de gestion scolaire permettant aux écoles de gérer les étudiants, les cours, les notes et les communications.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754',
    tags: ['Laravel', 'Angular', 'PostgreSQL', 'JWT'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'E-commerce Dashboard',
    description: 'Tableau de bord d\'administration pour une plateforme e-commerce avec gestion des produits, commandes et analyses.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    tags: ['Angular', 'Laravel', 'Chart.js', 'REST API'],
    link: '#',
    featured: false,
  },
  {
    id: 3,
    title: 'Système de Réservation',
    description: 'Application web permettant la réservation de services avec gestion des disponibilités et paiements.',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f',
    tags: ['Laravel', 'Vue.js', 'MySQL', 'Stripe'],
    github: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Blog Technique',
    description: 'Blog personnel partageant des articles techniques sur le développement web et les bonnes pratiques.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    tags: ['Laravel', 'Markdown', 'Bootstrap', 'SEO'],
    link: '#',
    github: '#',
    featured: false,
  }
];

const Projects = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.featured);
  
  return (
    <section id="projects" className="py-20 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <h2 className="section-title">Mes projets</h2>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              className="rounded-l-md rounded-r-none"
            >
              Tous les projets
            </Button>
            <Button 
              variant={filter === 'featured' ? 'default' : 'outline'} 
              onClick={() => setFilter('featured')}
              className="rounded-r-md rounded-l-none"
            >
              Projets en vedette
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className={
                      tag === 'Laravel' ? 'border-laravel text-laravel' :
                      tag === 'Angular' ? 'border-angular text-angular' :
                      tag === 'PostgreSQL' ? 'border-postgresql text-postgresql' :
                      tag === 'TypeScript' ? 'border-typescript text-typescript' :
                      ''
                    }>
                      {tag}
                    </Badge>
                  ))}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                
                {project.link && (
                  <Button size="sm" asChild className={!project.github ? 'ml-auto' : ''}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Démo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;


import { Code2, Globe, Puzzle, LightbulbIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <h2 className="section-title">À propos de moi</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-slide-in-left">
            <p className="text-lg mb-6">
              Je suis un <span className="font-semibold text-primary">développeur full-stack passionné</span> qui aime créer des applications web innovantes et performantes. Mon expertise dans les technologies modernes me permet de concevoir des solutions complètes, du back-end au front-end.
            </p>
            
            <p className="text-lg mb-6">
              Spécialisé en <span className="text-laravel font-semibold">Laravel</span> et <span className="text-angular font-semibold">Angular</span>, je développe des applications web sécurisées, performantes et bien structurées qui répondent aux besoins des entreprises et des utilisateurs.
            </p>
            
            <p className="text-lg">
              Je travaille actuellement sur <span className="font-semibold">"SamaSchool"</span>, une plateforme numérique de gestion scolaire qui vise à simplifier la vie des établissements d'enseignement.
            </p>
          </div>
          
          <div className="order-1 md:order-2 animate-slide-in-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Code2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Développement</h3>
                  <p className="text-muted-foreground">Création d'applications web robustes et maintenables</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Globe className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Web</h3>
                  <p className="text-muted-foreground">Solutions full-stack avec les meilleures pratiques</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Puzzle className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Architecture</h3>
                  <p className="text-muted-foreground">Conception de systèmes évolutifs et maintenables</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <LightbulbIcon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">Recherche constante des meilleures solutions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

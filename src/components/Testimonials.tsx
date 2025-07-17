import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image?: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Chef de Projet IT",
    company: "TechSolutions",
    image: "https://i.pravatar.cc/150?img=32",
    testimonial: "Un développeur brillant et méthodique. Les applications qu'il a développées pour notre entreprise sont non seulement performantes mais aussi intuitives. Son expertise en Laravel et Angular a vraiment fait la différence sur notre projet SamaSchool."
  },
  {
    id: 2,
    name: "Olivier Martin",
    role: "Directeur Technique",
    company: "DigitalInnovate",
    image: "https://i.pravatar.cc/150?img=12",
    testimonial: "Sa capacité à résoudre des problèmes complexes est remarquable. Notre collaboration sur le projet de gestion d'école a été très productive. Il livre toujours un code propre et bien documenté, ce qui facilite grandement la maintenance."
  },
  {
    id: 3,
    name: "Sophie Lefèvre",
    role: "UI/UX Designer",
    company: "CreativeMinds",
    image: "https://i.pravatar.cc/150?img=5",
    testimonial: "Excellent communicant et collaborateur. Sa compréhension des besoins utilisateurs et sa capacité à les traduire en fonctionnalités techniques ont rendu notre collaboration très fluide. Un vrai professionnel qui sait allier technique et expérience utilisateur."
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    
    // Initial selection
    setActiveIndex(api.selectedScrollSnap());
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section id="testimonials" className="py-20 bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title">
          Ce que disent mes <span className="text-primary">clients</span>
        </h2>
        
        <div className="mt-12 relative px-4 sm:px-10 animate-fade-in">
          <Carousel 
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full transform transition-all duration-500 hover:scale-[1.01]"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-4/5 lg:basis-3/4">
                  <Card className="border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                          <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/20">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex-1">
                          <Quote className="h-10 w-10 text-primary/30 mb-2" />
                          <p className="text-lg md:text-xl italic mb-6">{testimonial.testimonial}</p>
                          
                          <div className="mt-4">
                            <h4 className="font-medium text-lg">{testimonial.name}</h4>
                            <p className="text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
          </Carousel>
          
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`block h-2 rounded-full transition-all ${
                    activeIndex === index 
                      ? "bg-primary w-6" 
                      : "bg-primary/30 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
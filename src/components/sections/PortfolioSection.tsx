import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Portfolio {
  title: string;
  description: string;
  image: string;
}

interface PortfolioSectionProps {
  portfolio: Portfolio[];
}

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Портфолио</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Реализованные проекты промышленного строительства
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolio.map((project, idx) => {
            const scrollAnim = useScrollAnimation();
            return (
              <div
                key={idx}
                ref={scrollAnim.ref}
                className={`transform transition-all duration-700 ${
                  scrollAnim.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{transitionDelay: `${idx * 150}ms`}}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

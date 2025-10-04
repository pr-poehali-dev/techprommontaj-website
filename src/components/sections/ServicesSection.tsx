import { memo, useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Service {
  icon: string;
  number: string;
  title: string;
  desc: string;
}

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection = memo(({ services }: ServicesSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">К услугам генерального подряда относится</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Полный спектр услуг для реализации строительных проектов любой сложности
        </p>

        {isMobile ? (
          <div className="relative max-w-sm mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {services.map((service, idx) => (
                  <div key={idx} className="min-w-full px-2">
                    <Card className="border-2 hover:border-accent transition-all hover:shadow-2xl group h-full bg-white relative overflow-hidden">
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                        <span className="text-lg font-bold text-accent group-hover:text-white">{service.number}</span>
                      </div>
                      
                      <CardContent className="p-6 pt-8">
                        <div className="bg-gradient-to-br from-accent/10 to-accent/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all group-hover:scale-110 group-hover:rotate-3">
                          <Icon name={service.icon as any} size={40} className="text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-accent hover:text-white transition-all z-10"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-accent hover:text-white transition-all z-10"
            >
              <Icon name="ChevronRight" size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-accent' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto relative">
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" style={{opacity: 0.15}}>
                <path d="M 25% 15% Q 37.5% 10%, 50% 15%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                <path d="M 50% 15% Q 62.5% 10%, 75% 15%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                <path d="M 25% 35% Q 25% 42.5%, 25% 50%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                <path d="M 75% 35% Q 75% 42.5%, 75% 50%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                <path d="M 25% 65% Q 37.5% 60%, 50% 65%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                <path d="M 50% 65% Q 62.5% 60%, 75% 65%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
              </svg>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {services.map((service, idx) => {
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
                    style={{transitionDelay: `${idx * 100}ms`}}
                  >
                    <Card className="border-2 hover:border-accent transition-all hover:shadow-2xl group h-full bg-white relative overflow-hidden">
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                        <span className="text-lg font-bold text-accent group-hover:text-white">{service.number}</span>
                      </div>
                      
                      <CardContent className="p-6 pt-8">
                        <div className="bg-gradient-to-br from-accent/10 to-accent/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all group-hover:scale-110 group-hover:rotate-3">
                          <Icon name={service.icon as any} size={40} className="text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 min-h-[3.5rem] flex items-start">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                        
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/5 rounded-tr-full transform -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;

import { memo, useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

const WhyUsSection = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reasons: WhyUsItem[] = [
    {
      icon: 'Zap',
      title: 'Быстрый вывод специалистов',
      description: 'Оперативно подбираем и направляем квалифицированных специалистов требуемой квалификации на ваш объект'
    },
    {
      icon: 'Shield',
      title: 'Граждане РФ',
      description: 'Все специалисты - граждане Российской Федерации, что обеспечивает полное соответствие законодательству'
    },
    {
      icon: 'Users',
      title: 'Сплоченные команды',
      description: 'Предоставляем организованные бригады с опытными бригадирами и руководителями проектов'
    },
    {
      icon: 'FileText',
      title: 'Без кадровой нагрузки',
      description: 'Освобождаем вас от кадрового учета. Все вопросы трудового законодательства берем на себя'
    },
    {
      icon: 'TrendingDown',
      title: 'Налоговая оптимизация',
      description: 'Оплата наших услуг является вашими расходами, что позволяет оптимизировать налогообложение в части НДС и налога на прибыль'
    }
  ];

  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reasons.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, reasons.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reasons.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reasons.length) % reasons.length);
  };
  
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-accent/5 to-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Почему именно мы?</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
          5 причин начать работать с нами уже сегодня
        </p>

        {isMobile ? (
          <div className="relative max-w-sm mx-auto mb-16">
            <div 
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {reasons.map((reason, idx) => (
                  <div key={idx} className="min-w-full px-2">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      
                      <div className="relative bg-white rounded-[2rem] p-8 shadow-lg transition-all duration-500 overflow-hidden h-full">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full transition-transform duration-700"></div>
                        
                        <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center transition-transform duration-700">
                          <span className="text-2xl font-black text-accent/30">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                        
                        <div className="relative z-10 space-y-4">
                          <div className="inline-block bg-gradient-to-br from-accent via-accent to-primary p-4 rounded-3xl transition-all duration-500 shadow-xl">
                            <Icon name={reason.icon as any} size={32} className="text-white" />
                          </div>
                          
                          <h3 className="text-xl font-bold text-primary transition-colors">
                            {reason.title}
                          </h3>
                          
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {reason.description}
                          </p>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary transition-transform duration-500 origin-left rounded-full"></div>
                      </div>
                    </div>
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
              {reasons.map((_, idx) => (
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
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <div className="relative bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                  <span className="text-2xl font-black text-accent/30">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                
                <div className="relative z-10 space-y-4">
                  <div className="inline-block bg-gradient-to-br from-accent via-accent to-primary p-4 rounded-3xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-xl">
                    <Icon name={reason.icon as any} size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors min-h-[3.5rem] flex items-center">
                    {reason.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {reason.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center">
                <Icon name="Award" size={40} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Более 2000 специалистов работают в нашей компании</h3>
              <p className="text-white/90 text-lg">
                Присоединяйтесь к числу наших довольных клиентов и получите доступ к лучшим специалистам отрасли
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyUsSection.displayName = 'WhyUsSection';

export default WhyUsSection;
import { useState, useEffect, useRef } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface AboutSectionProps {
  stats: Stat[];
}

const CounterAnimation = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * target);
            
            setCount(currentCount);
            
            if (progress < 1) {
              animationRef.current = requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasAnimated, target]);

  return (
    <div ref={counterRef} className="text-3xl sm:text-5xl md:text-6xl font-bold text-accent mb-2">
      {count}{suffix}
    </div>
  );
};

const AboutSection = ({ stats }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">О компании</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-3xl mx-auto text-lg">Техпроммонтаж — компания, которая помогает бизнесу снизить затраты, сосредоточиться на своей основной деятельности и быстро получить доступ к специалистам и экспертам в определенных областях</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-4 sm:p-6 rounded-lg bg-gradient-to-br from-muted/30 to-white border border-muted hover:shadow-xl transition-all">
              <CounterAnimation target={stat.value} suffix={stat.suffix} />
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
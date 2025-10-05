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
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let frame = 0;
    const totalFrames = 60;
    const increment = target / totalFrames;

    const counter = setInterval(() => {
      frame++;
      if (frame === totalFrames) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(frame * increment));
      }
    }, 30);

    return () => clearInterval(counter);
  }, [isVisible, target]);

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
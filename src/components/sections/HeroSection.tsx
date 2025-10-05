import { memo, useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CallButton from '@/components/ui/CallButton';

interface HeroSectionProps {
  heroImages: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const HeroSection = memo(({ heroImages, currentImageIndex, setCurrentImageIndex }: HeroSectionProps) => {
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }
    }
  }, [heroImages.length, setCurrentImageIndex]);
  
  useEffect(() => {
    const section = document.querySelector('section');
    if (!section) return;
    
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: true });
    section.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
  
  return (
    <section 
      className="relative bg-gradient-to-br from-primary to-primary/80 text-white min-h-[90vh] flex items-center overflow-hidden"
      id="hero-section"
    >
      {heroImages.map((img, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 bg-cover bg-center will-change-opacity ${
            idx === currentImageIndex ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            transition: 'opacity 1s ease-in-out'
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="opacity-0 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              ТЕХПРОММОНТАЖ
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl mb-8 text-white/95 font-medium">
              Надёжный партнёр в промышленном строительстве
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10 opacity-0 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer group">
              <Icon name="Building2" size={40} className="mb-3 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">7+ лет опыта</h3>
              <p className="text-white/80 text-sm">Работа с крупнейшими промышленными предприятиями</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer group">
              <Icon name="Users" size={40} className="mb-3 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Работа вахтой</h3>
              <p className="text-white/80 text-sm">Вакансии по 50+ специальностям в 7+ городах России</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer group">
              <Icon name="Award" size={40} className="mb-3 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
              <p className="text-white/80 text-sm">Соблюдение всех норм и стандартов безопасности</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <CallButton 
              forceModal={true}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-105"
            />
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg transition-all hover:scale-105"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Briefcase" size={20} className="mr-2" />
              Наши проекты
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentImageIndex 
                ? 'w-8 bg-accent' 
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
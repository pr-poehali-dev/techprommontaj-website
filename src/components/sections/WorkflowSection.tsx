import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import ContactModal from '@/components/ui/ContactModal';

const WorkflowSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = [
    {
      number: 1,
      title: 'Договор',
      description: 'Мы подписываем договор о выполнении работ'
    },
    {
      number: 2,
      title: 'Заявка',
      description: 'Вы отправляете нам заявку на специалистов с указанием количества и требуемой квалификации'
    },
    {
      number: 3,
      title: 'Связь с руководителем',
      description: 'Руководитель проекта связывается с вами и договаривается о дате и времени вывода специалистов на объект'
    },
    {
      number: 4,
      title: 'Аттестация',
      description: 'Вывод специалистов и прохождение ими аттестации (по требованию Заказчика)'
    },
    {
      number: 5,
      title: 'Начало работы',
      description: 'После прохождения аттестации (если требуется) Заказчик допускает специалистов к работе и они приступают к выполнению своих обязанностей'
    },
    {
      number: 6,
      title: 'Оплата',
      description: 'Далее каждый отчетный период производится оплата'
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, steps.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Как мы работаем</h2>
        <p className="text-center text-white/90 mb-16 max-w-2xl mx-auto text-lg">
          Прозрачный процесс от договора до выполнения работ
        </p>

        {isMobile ? (
          <div className="relative max-w-sm mx-auto mb-16">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {steps.map((step, idx) => (
                  <div key={idx} className="min-w-full px-2">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                      <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold mx-auto">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                      <p className="text-white/80 leading-relaxed text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white/30 transition-all z-10"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white/30 transition-all z-10"
            >
              <Icon name="ChevronRight" size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-accent' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
                  <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/50"></div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Начать сотрудничество
          </Button>
          <ContactModal 
            open={isModalOpen} 
            onOpenChange={setIsModalOpen}
            title="Начать сотрудничество"
            description="Расскажите о вашем проекте и мы свяжемся с вами для обсуждения деталей"
          />
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
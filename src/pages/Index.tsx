import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation on scroll hook
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

  const stats = [
    { value: 7, suffix: ' лет', label: 'опыта работы' },
    { value: 7, suffix: '+', label: 'городов в центральных и южных регионах России для работы вахтой' },
    { value: 50, suffix: '+', label: 'рабочих специальностей по которым мы предлагаем вакансии вахтой' },
    { value: 2000, suffix: '+', label: 'сотрудников уже работают в компании' }
  ];

  const CounterAnimation = ({ target, suffix }: { target: number; suffix: string }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (hasAnimated) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }
        },
        { threshold: 0.3 }
      );

      if (counterRef.current) {
        observer.observe(counterRef.current);
      }

      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }, []);

    return (
      <div ref={counterRef} className="text-5xl md:text-6xl font-bold text-accent mb-2">
        {count}{suffix}
      </div>
    );
  };

  const clients = [
    { name: 'Айэс', logo: '/img/ff1b73af-2036-4381-bd40-9f3b581b0c00.jpg' },
    { name: 'Промтомск', logo: '/img/68c75c12-4162-462c-9995-0d5c0639328e.jpg' },
    { name: 'Ленмонтаж', logo: '/img/5a77f5f7-e5d8-4e86-899b-d2012b2b9fd7.jpg' },
    { name: 'Спецстройинжиниринг', logo: '/img/13387ebf-04d3-4881-a0fc-dc68a7446596.jpg' },
    { name: 'Поликомстрой', logo: '/img/a25ff700-9c51-4e87-93ba-2bfae10a67d0.jpg' },
    { name: 'Алькад', logo: '/img/56dab5cc-1263-4a3c-b934-00b0c4b92ec5.jpg' },
    { name: 'АртикЭнергоСтрой', logo: '/img/5ad7a239-7905-4e18-9414-97b4210b8eb4.jpg' },
    { name: 'ПЗМК', logo: '/img/588525ae-42f4-48b9-bc18-19a51e91c012.jpg' },
  ];

  const heroImages = [
    '/img/0be783f2-1c33-4215-8fe4-3402f15496d7.jpg',
    '/img/6c795340-a5a3-405b-8f62-fb7ba76417ce.jpg',
    '/img/4313046a-07a8-4d70-aa07-19d4a4ed66b6.jpg',
    '/img/b633879c-adbb-465a-8a51-46c78671fc57.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const portfolio = [
    { 
      title: 'Промышленный комплекс №1',
      description: 'Монтаж металлоконструкций, 15 000 м²',
      image: '/img/0be783f2-1c33-4215-8fe4-3402f15496d7.jpg'
    },
    { 
      title: 'Производственный цех',
      description: 'Электромонтажные работы, автоматизация',
      image: '/img/b633879c-adbb-465a-8a51-46c78671fc57.jpg'
    },
    { 
      title: 'Складской терминал',
      description: 'Комплексное строительство под ключ',
      image: '/img/041790ce-a9a1-4ca6-b0c0-df609b7c0e7b.jpg'
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
    setFormData({ name: '', phone: '', message: '' });
  };

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services = [
    { icon: 'Blueprint', number: '01', title: 'Создание строительных проектов', desc: 'Подбор оптимального метода управления процессом строительства на объекте' },
    { icon: 'Search', number: '02', title: 'Контроль за проведением работ', desc: 'Контроль всех видов работ на строительной площадке' },
    { icon: 'Building', number: '03', title: 'Координируемое строительство', desc: 'Строительство зданий любой сложности, реконструкция зданий' },
    { icon: 'Crane', number: '04', title: 'Установка оборудования', desc: 'Установка строительного оборудования и различных механизмов для процесса возведения объекта' },
    { icon: 'HardHat', number: '05', title: 'Проведение мероприятий', desc: 'Соблюдение техники безопасности, защита окружающей среды и охрана труда' },
    { icon: 'FileCheck', number: '06', title: 'Получение разрешения', desc: 'Получение разрешения на строительство, получение ТУ, ведение строительства в государственных органах' },
    { icon: 'Key', number: '07', title: 'Ввод объекта в эксплуатацию', desc: 'Финальная сдача объекта заказчику с полным пакетом документов' },
  ];

  const faqs = [
    { q: 'Какие регионы вы обслуживаете?', a: 'Мы работаем по Санкт-Петербургу и Ленинградской области. Также предоставляем работу вахтовым методом в 7+ городах центральных и южных регионов России.' },
    { q: 'Какие документы необходимы для начала работы?', a: 'Для начала сотрудничества потребуется техническое задание и проектная документация. Наши специалисты помогут подготовить все необходимые разрешения и согласования.' },
    { q: 'Предоставляете ли вы гарантию на выполненные работы?', a: 'Да, мы предоставляем гарантию на все виды выполненных работ. Срок гарантии определяется договором и видом работ.' },
    { q: 'Работаете ли вы с юридическими лицами?', a: 'Да, мы работаем как с юридическими, так и с физическими лицами. Все работы выполняются по договору с полным пакетом документов.' },
    { q: 'Как происходит оплата?', a: 'Оплата производится поэтапно согласно договору. Возможна предоплата и оплата по факту выполнения работ.' },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50">
        <div className="bg-gradient-to-r from-primary via-primary to-primary/95 text-white py-2.5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 group">
                  <div className="bg-accent/20 p-1.5 rounded-full group-hover:bg-accent/30 transition-colors">
                    <Icon name="MapPin" size={14} className="text-accent" />
                  </div>
                  <span className="font-medium">СПб и Ленобласть</span>
                </div>
                <div className="hidden md:flex items-center gap-2 group">
                  <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                    <Icon name="Mail" size={14} />
                  </div>
                  <span className="text-white/90">tehprommontaj@gmail.com</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-white/90">
                <Icon name="Clock" size={14} />
                <span className="text-xs">Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4 py-5">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary to-accent w-12 h-12 rounded-xl flex items-center justify-center">
                  <Icon name="Building2" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-primary leading-tight tracking-tight">ТЕХПРОММОНТАЖ</h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">Подрядная организация</p>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center gap-1">
                <a href="#about" onClick={(e) => smoothScroll(e, '#about')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">О нас</a>
                <a href="#clients" onClick={(e) => smoothScroll(e, '#clients')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Клиенты</a>
                <a href="#portfolio" onClick={(e) => smoothScroll(e, '#portfolio')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Портфолио</a>
                <a href="#contact" onClick={(e) => smoothScroll(e, '#contact')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Контакты</a>
                
                <div className="ml-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 transition-all"
                    onClick={() => window.location.href = 'tel:+79006312247'}
                  >
                    <Icon name="Phone" size={18} className="animate-pulse" />
                    Позвонить
                  </Button>
                </div>
              </div>

              <button 
                className="lg:hidden text-primary bg-primary/5 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
              </button>
            </nav>

            {isMenuOpen && (
              <div className="lg:hidden mt-6 pb-4 space-y-2 border-t pt-6 animate-fade-in">
                <a href="#about" onClick={(e) => smoothScroll(e, '#about')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">О нас</a>
                <a href="#clients" onClick={(e) => smoothScroll(e, '#clients')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Клиенты</a>
                <a href="#portfolio" onClick={(e) => smoothScroll(e, '#portfolio')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Портфолио</a>
                <a href="#contact" onClick={(e) => smoothScroll(e, '#contact')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Контакты</a>
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center justify-center gap-2 shadow-lg"
                    onClick={() => window.location.href = 'tel:+79006312247'}
                  >
                    <Icon name="Phone" size={18} className="animate-pulse" />
                    Позвонить сейчас
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white min-h-[90vh] flex items-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              idx === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{backgroundImage: `url(${img})`}}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl">
            <div className="opacity-0 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                ТЕХПРОММОНТАЖ
              </h2>
              <p className="text-2xl md:text-3xl mb-8 text-white/95 font-medium">
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
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-105"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="MessageSquare" size={20} className="mr-2" />
                Заказать звонок
              </Button>
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

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">О компании</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-3xl mx-auto text-lg">
            Техпроммонтаж — надёжная подрядная организация с многолетним опытом. 
            Мы предоставляем работу вахтой по всей России и гарантируем профессиональное выполнение проектов.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-lg bg-gradient-to-br from-muted/30 to-white border border-muted hover:shadow-xl transition-all">
                <CounterAnimation target={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Как мы работаем</h2>
          <p className="text-center text-white/90 mb-16 max-w-2xl mx-auto text-lg">
            Прозрачный процесс от заявки до сдачи объекта
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
                <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Заявка</h3>
                <p className="text-white/80 leading-relaxed">
                  Вы оставляете заявку по телефону или через форму на сайте
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/50"></div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
                <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Консультация</h3>
                <p className="text-white/80 leading-relaxed">
                  Наш менеджер связывается с вами и обсуждает детали проекта
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/50"></div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
                <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Выполнение</h3>
                <p className="text-white/80 leading-relaxed">
                  Квалифицированная бригада приступает к работе на объекте
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/50"></div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
                <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3">Сдача объекта</h3>
                <p className="text-white/80 leading-relaxed">
                  Проверка качества работ и официальная приёмка заказчиком
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Начать сотрудничество
            </Button>
          </div>
        </div>
      </section>

      <section id="clients" className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2">
                <span className="text-accent font-semibold">Нам доверяют</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Наши клиенты —<br/>
              <span className="text-accent">лидеры промышленности</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Работаем с крупнейшими предприятиями России. Наш профессионализм подтверждён успешными проектами
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {clients.map((client, idx) => {
              const scrollAnim = useScrollAnimation();
              return (
                <div
                  key={idx}
                  ref={scrollAnim.ref}
                  className={`transform transition-all duration-700 ${
                    scrollAnim.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${idx * 80}ms`}}
                >
                  <div className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105 hover:border-accent/50 h-32 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-all relative z-10" 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/70 text-lg mb-6">
              Присоединяйтесь к компаниям, которые выбрали качество
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg shadow-2xl shadow-accent/30"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Handshake" size={20} className="mr-2" />
              Стать партнёром
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-muted/20 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">К услугам генерального подряда относится</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Полный спектр услуг для реализации строительных проектов любой сложности
          </p>

          <div className="max-w-6xl mx-auto relative">
            {/* Connecting arrows */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" style={{opacity: 0.15}}>
                {/* Row 1 arrows */}
                <path d="M 25% 15% Q 37.5% 10%, 50% 15%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                <path d="M 50% 15% Q 62.5% 10%, 75% 15%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                {/* Vertical connectors */}
                <path d="M 25% 35% Q 25% 42.5%, 25% 50%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                <path d="M 75% 35% Q 75% 42.5%, 75% 50%" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" strokeDasharray="5,5" />
                {/* Row 2 arrows */}
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
                      {/* Number badge */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                        <span className="text-lg font-bold text-accent group-hover:text-white">{service.number}</span>
                      </div>
                      
                      <CardContent className="p-6 pt-8">
                        <div className="bg-gradient-to-br from-accent/10 to-accent/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all group-hover:scale-110 group-hover:rotate-3">
                          <Icon name={service.icon as any} size={40} className="text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 min-h-[3.5rem] flex items-start">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                        
                        {/* Decorative corner */}
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/5 rounded-tr-full transform -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-20 bg-gradient-to-b from-muted/20 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Частые вопросы</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ответы на популярные вопросы о наших услугах
          </p>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => {
                const scrollAnim = useScrollAnimation();
                return (
                  <div
                    key={idx}
                    ref={scrollAnim.ref}
                    className={`transform transition-all duration-700 ${
                      scrollAnim.isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-10'
                    }`}
                    style={{transitionDelay: `${idx * 100}ms`}}
                  >
                    <AccordionItem 
                      value={`item-${idx}`}
                      className="border-2 rounded-xl px-6 bg-white hover:border-accent hover:shadow-lg transition-all group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                      
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <span className="text-sm font-bold text-accent">0{idx + 1}</span>
                      </div>
                      
                      <AccordionTrigger className="text-left hover:no-underline py-6 pr-16">
                        <div className="flex items-start gap-3">
                          <Icon name="HelpCircle" size={24} className="text-accent mt-1 flex-shrink-0" />
                          <span className="font-semibold text-lg group-hover:text-accent transition-colors">
                            {faq.q}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-9">
                        <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-accent/30">
                          {faq.a}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Свяжитесь с нами</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={24} className="text-accent" />
                  <a href="tel:+79006312247" className="text-lg hover:text-accent transition-colors">
                    +7 (900) 631-22-47
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={24} className="text-accent" />
                  <a href="mailto:tehprommontaj@gmail.com" className="text-lg hover:text-accent transition-colors">
                    tehprommontaj@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-white/80">
                Оставьте заявку, и наш менеджер свяжется с вами в течение рабочего дня
              </p>
            </div>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Заказать звонок</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Комментарий (необязательно)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white min-h-24"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary/95 text-white/80 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Техпроммонтаж. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
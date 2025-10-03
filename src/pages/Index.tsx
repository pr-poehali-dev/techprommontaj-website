import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

            return () => clearInterval(timer);
          }
        },
        { threshold: 0.5 }
      );

      if (counterRef.current) {
        observer.observe(counterRef.current);
      }

      return () => observer.disconnect();
    }, [target, hasAnimated]);

    return (
      <div ref={counterRef} className="text-5xl md:text-6xl font-bold text-accent mb-2">
        {count}{suffix}
      </div>
    );
  };

  const clients = [
    { name: 'Айэс', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=ИС' },
    { name: 'Промтомск', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=ПРОМТОМСК' },
    { name: 'Ленмонтаж', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=ЛЕНМОНТАЖ' },
    { name: 'Спецстройинжиниринг', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=ССИ' },
    { name: 'Поликомстрой', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=ПОЛИКОМСТРОЙ' },
    { name: 'Алькад', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=АЛЬКАД' },
    { name: 'АртикЭнергоСтрой', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=АЭС' },
    { name: 'ПЗМК', logo: 'https://via.placeholder.com/150x80/64748B/FFFFFF?text=ПЗМК' },
  ];

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
                <a href="#about" className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">О нас</a>
                <a href="#clients" className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Клиенты</a>
                <a href="#portfolio" className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Портфолио</a>
                <a href="#contact" className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Контакты</a>
                
                <div className="ml-4 flex items-center gap-3">
                  <a href="tel:+79006312247" className="text-primary hover:text-accent font-bold text-lg transition-colors">+7 (900) 631-22-47</a>
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
                <a href="#about" className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">О нас</a>
                <a href="#clients" className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Клиенты</a>
                <a href="#portfolio" className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Портфолио</a>
                <a href="#contact" className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Контакты</a>
                <div className="pt-4 space-y-3">
                  <a href="tel:+79006312247" className="block text-center text-primary font-bold text-xl py-2">+7 (900) 631-22-47</a>
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

      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/img/0be783f2-1c33-4215-8fe4-3402f15496d7.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Надёжный партнёр в промышленном строительстве
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Профессиональный монтаж, опыт работы с крупнейшими предприятиями России
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              <a href="#contact">Заказать звонок</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">О компании</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-3xl mx-auto text-lg">
            Техпроммонтаж — надёжная подрядная организация с многолетним опытом. 
            Мы предоставляем работу вахтой по всей России и гарантируем профессиональное выполнение проектов.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-lg bg-gradient-to-br from-muted/30 to-white border border-muted hover:shadow-xl transition-all">
                <CounterAnimation target={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 hover:border-accent transition-all">
              <CardContent className="pt-8">
                <Icon name="Building2" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Опыт</h3>
                <p className="text-muted-foreground">Работа с крупнейшими промышленными предприятиями</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-accent transition-all">
              <CardContent className="pt-8">
                <Icon name="Users" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Работа вахтой</h3>
                <p className="text-muted-foreground">Предоставляем вакансии по 50+ специальностям</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-accent transition-all">
              <CardContent className="pt-8">
                <Icon name="Award" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Качество</h3>
                <p className="text-muted-foreground">Соблюдение всех норм и стандартов безопасности</p>
              </CardContent>
            </Card>
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

      <section id="clients" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Наши клиенты</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Нам доверяют крупнейшие промышленные предприятия
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {clients.map((client, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow bg-white">
                <CardContent className="flex items-center justify-center p-6 h-28">
                  <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            ))}
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
            {portfolio.map((project, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
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
            ))}
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
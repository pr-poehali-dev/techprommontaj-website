import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import ClientsSection from '@/components/sections/ClientsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

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
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        smoothScroll={smoothScroll}
      />

      <HeroSection 
        heroImages={heroImages}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      <AboutSection stats={stats} />

      <WorkflowSection />

      <ClientsSection clients={clients} />

      <ServicesSection services={services} />

      <PortfolioSection portfolio={portfolio} />

      <FAQSection faqs={faqs} />

      <ContactSection 
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />

      <Footer />
    </div>
  );
};

export default Index;

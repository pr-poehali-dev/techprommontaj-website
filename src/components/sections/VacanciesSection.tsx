import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Vacancy {
  title: string;
  location: string;
  salary: string;
  type: string;
  requirements: string[];
}

const VacanciesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const vacancies: Vacancy[] = [
    {
      title: 'Электромонтажник',
      location: 'Вахта по России',
      salary: 'от 80 000 ₽',
      type: 'electrical',
      requirements: ['Опыт работы от 1 года', 'Наличие удостоверения', 'Готовность к командировкам']
    },
    {
      title: 'Монтажник технологических трубопроводов',
      location: 'Вахта по России',
      salary: 'от 90 000 ₽',
      type: 'installation',
      requirements: ['Опыт работы от 2 лет', 'Профильное образование', 'Аттестация НАКС']
    },
    {
      title: 'Сварщик',
      location: 'Вахта по России',
      salary: 'от 100 000 ₽',
      type: 'welding',
      requirements: ['Опыт сварки от 3 лет', 'Аттестация НАКС', 'Знание РД и ПБ']
    },
    {
      title: 'Слесарь по монтажу металлоконструкций',
      location: 'Вахта по России',
      salary: 'от 75 000 ₽',
      type: 'installation',
      requirements: ['Опыт работы от 1 года', 'Умение читать чертежи', 'Допуск к высотным работам']
    },
    {
      title: 'Инженер ПТО',
      location: 'Москва / Вахта',
      salary: 'от 120 000 ₽',
      type: 'engineering',
      requirements: ['Высшее образование', 'Опыт работы от 3 лет', 'Знание AutoCAD, MS Project']
    },
    {
      title: 'Прораб',
      location: 'Вахта по России',
      salary: 'от 150 000 ₽',
      type: 'management',
      requirements: ['Опыт работы от 5 лет', 'Строительное образование', 'Организаторские способности']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все вакансии', icon: 'Briefcase' },
    { id: 'electrical', name: 'Электромонтаж', icon: 'Zap' },
    { id: 'welding', name: 'Сварка', icon: 'Flame' },
    { id: 'installation', name: 'Монтаж', icon: 'Wrench' },
    { id: 'engineering', name: 'Инженерия', icon: 'Compass' },
    { id: 'management', name: 'Управление', icon: 'Users' }
  ];

  const filteredVacancies = selectedCategory === 'all' 
    ? vacancies 
    : vacancies.filter(v => v.type === selectedCategory);

  return (
    <section id="vacancies" className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Icon name="Briefcase" className="text-white" size={20} />
            <span className="text-white font-medium">Актуальные вакансии</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Работа мечты ждёт вас
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Присоединяйтесь к команде профессионалов. Стабильная работа, достойная зарплата, официальное трудоустройство
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-white text-primary shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Icon name={cat.icon as any} size={18} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredVacancies.map((vacancy, index) => (
            <div
              key={index}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-accent/10 p-3 rounded-xl group-hover:bg-accent/20 transition-colors">
                  <Icon name="HardHat" className="text-accent" size={28} />
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Открыто
                </div>
              </div>

              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                {vacancy.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">{vacancy.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="DollarSign" size={16} />
                  <span className="text-sm font-semibold text-accent">{vacancy.salary}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Требования:</p>
                <ul className="space-y-1">
                  {vacancy.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-white group-hover:shadow-lg transition-all"
                onClick={() => window.open('https://hh.ru/employer/5664175', '_blank')}
              >
                Откликнуться
                <Icon name="ExternalLink" size={16} className="ml-2" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Icon name="TrendingUp" className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Не нашли подходящую вакансию?</p>
                <p className="text-white/80 text-sm">Отправьте резюме, мы свяжемся с вами</p>
              </div>
            </div>
            <Button 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              onClick={() => window.open('https://hh.ru/employer/5664175', '_blank')}
            >
              Все вакансии на HH.ru
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default VacanciesSection;

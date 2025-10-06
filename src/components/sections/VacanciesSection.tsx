import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Vacancy {
  id: string;
  title: string;
  location: string;
  salary: string;
  url: string;
  employer: string;
  published: string;
}

const VacanciesSection = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/ef59a322-baba-4a58-b533-e49097a4a306');
        const data = await response.json();
        
        if (response.ok) {
          setVacancies(data.vacancies || []);
        }
      } catch (err) {
        console.error('Ошибка загрузки вакансий:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  return (
    <section id="vacancies" className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Icon name="Briefcase" className="text-white" size={20} />
            <span className="text-white font-medium">Актуальные вакансии с HH.ru</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Работа мечты ждёт вас
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Присоединяйтесь к команде профессионалов. Стабильная работа, достойная зарплата, официальное трудоустройство
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
            <p className="text-white mt-4">Загружаем вакансии...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {vacancies.slice(0, 9).map((vacancy) => (
                <div
                  key={vacancy.id}
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

                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors min-h-[56px]">
                    {vacancy.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="MapPin" size={16} />
                      <span className="text-sm">{vacancy.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="Wallet" size={16} />
                      <span className="text-sm font-semibold text-accent">{vacancy.salary}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-white group-hover:shadow-lg transition-all"
                    onClick={() => window.open(vacancy.url, '_blank')}
                  >
                    Откликнуться
                    <Icon name="ExternalLink" size={16} className="ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            {vacancies.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" className="text-white/50 mx-auto mb-4" size={48} />
                <p className="text-white text-lg">Нет доступных вакансий</p>
              </div>
            )}
          </>
        )}

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
              onClick={() => window.open('https://spb.hh.ru/employer/12178128', '_blank')}
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

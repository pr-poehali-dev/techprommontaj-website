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
  const [allVacancies, setAllVacancies] = useState<Vacancy[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [vacanciesByCity, setVacanciesByCity] = useState<Record<string, Vacancy[]>>({});
  const [selectedCity, setSelectedCity] = useState<string>('Санкт-Петербург');
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/ef59a322-baba-4a58-b533-e49097a4a306');
        const data = await response.json();
        
        if (response.ok) {
          setAllVacancies(data.vacancies || []);
          setCities(data.cities || []);
          setVacanciesByCity(data.vacanciesByCity || {});
        }
      } catch (err) {
        console.error('Ошибка загрузки вакансий:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  const displayedVacancies = vacanciesByCity[selectedCity] || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayedVacancies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displayedVacancies.length) % displayedVacancies.length);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCity]);

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

        {!loading && cities.length > 0 && (
          <div className="mb-8 flex justify-center">
            <div className="relative inline-block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[280px]"
              >
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Icon name="MapPin" className="text-accent" size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs text-gray-500 font-medium">Город</p>
                  <p className="text-primary font-bold">{selectedCity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-bold">
                    {vacanciesByCity[selectedCity]?.length || 0}
                  </span>
                  <Icon 
                    name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
                    className="text-gray-400" 
                    size={20} 
                  />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-6 py-3 hover:bg-accent/10 transition-colors ${
                        selectedCity === city ? 'bg-accent/20' : ''
                      }`}
                    >
                      <span className={`font-medium ${
                        selectedCity === city ? 'text-accent' : 'text-gray-700'
                      }`}>
                        {city}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-bold">
                        {vacanciesByCity[city]?.length || 0}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
            <p className="text-white mt-4">Загружаем вакансии...</p>
          </div>
        ) : (
          <>
            <div className="md:hidden relative mb-12">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {displayedVacancies.map((vacancy) => (
                    <div
                      key={vacancy.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-accent/10 p-3 rounded-xl">
                            <Icon name="HardHat" className="text-accent" size={28} />
                          </div>
                          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            Открыто
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-3 min-h-[56px]">
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
                          className="w-full bg-accent hover:bg-accent/90 text-white"
                          onClick={() => window.open(vacancy.url, '_blank')}
                        >
                          Откликнуться
                          <Icon name="ExternalLink" size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {displayedVacancies.length > 0 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Previous"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Next"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </button>

                  <div className="flex justify-center gap-2 mt-6">
                    {displayedVacancies.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayedVacancies.slice(0, 9).map((vacancy) => (
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

            {displayedVacancies.length === 0 && (
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
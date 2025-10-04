import { useState, memo, lazy, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const YandexMap = lazy(() => import('@/components/YandexMap'));

interface Portfolio {
  title: string;
  description: string;
  image: string;
  location: string;
  coordinates: { lat: number; lng: number };
}

interface PortfolioSectionProps {
  portfolio: Portfolio[];
}

type ViewMode = 'list' | 'map';

const PortfolioSection = memo(({ portfolio }: PortfolioSectionProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const mapPoints = portfolio.map(project => ({
    coords: [project.coordinates.lat, project.coordinates.lng] as [number, number],
    title: project.title,
    description: project.description,
    location: project.location,
    image: project.image
  }));

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Портфолио</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Реализованные проекты промышленного строительства
        </p>
        
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name="List" size={20} />
            Список
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              viewMode === 'map'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name="Map" size={20} />
            На карте
          </button>
        </div>

        {viewMode === 'list' ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolio.map((project, idx) => (
              <div
                key={idx}
                className="transform transition-all duration-700 opacity-100 translate-y-0"
                style={{transitionDelay: `${idx * 150}ms`}}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Icon name="MapPin" size={16} />
                      {project.location}
                    </p>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={
              <div className="w-full h-[600px] rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Загрузка карты...</p>
                </div>
              </div>
            }>
              <YandexMap points={mapPoints} />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
});

PortfolioSection.displayName = 'PortfolioSection';

export default PortfolioSection;
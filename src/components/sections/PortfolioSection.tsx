import { useState, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-xl" style={{ height: '600px' }}>
              <svg viewBox="0 0 1000 600" className="w-full h-full">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <g className="map-of-russia">
                  <path 
                    d="M 100 300 Q 200 250 300 280 L 400 270 Q 500 260 600 250 L 700 240 Q 800 230 900 250 L 950 260 L 970 280 L 980 320 L 970 360 L 950 380 L 900 390 Q 800 400 700 380 L 600 370 Q 500 360 400 350 L 300 360 Q 200 370 150 340 Z"
                    fill="#e2e8f0"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  
                  <text x="500" y="320" textAnchor="middle" className="fill-slate-400 text-2xl font-light" style={{fontSize: '24px'}}>Россия</text>
                </g>
                
                {portfolio.map((project, idx) => {
                  const positions = [
                    { x: 280, y: 300 },
                    { x: 320, y: 280 },
                    { x: 880, y: 270 }
                  ];
                  const pos = positions[idx] || { x: 500, y: 300 };
                  const isHovered = hoveredProject === idx;
                  
                  return (
                    <g 
                      key={idx}
                      onMouseEnter={() => setHoveredProject(idx)}
                      onMouseLeave={() => setHoveredProject(null)}
                      className="cursor-pointer"
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 16 : 12}
                        fill="hsl(var(--primary))"
                        filter={isHovered ? 'url(#glow)' : ''}
                        className="transition-all duration-300"
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 24 : 20}
                        fill="hsl(var(--primary))"
                        opacity="0.2"
                        className="transition-all duration-300 animate-pulse"
                      />
                      
                      {isHovered && (
                        <g>
                          <rect
                            x={pos.x - 120}
                            y={pos.y - 140}
                            width="240"
                            height="120"
                            rx="12"
                            fill="white"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            filter="url(#glow)"
                            className="animate-in fade-in zoom-in-95 duration-200"
                          />
                          <text 
                            x={pos.x} 
                            y={pos.y - 105} 
                            textAnchor="middle" 
                            className="fill-slate-900 font-bold"
                            style={{fontSize: '16px'}}
                          >
                            {project.title}
                          </text>
                          <text 
                            x={pos.x} 
                            y={pos.y - 80} 
                            textAnchor="middle" 
                            className="fill-slate-600"
                            style={{fontSize: '12px'}}
                          >
                            📍 {project.location}
                          </text>
                          <foreignObject x={pos.x - 110} y={pos.y - 68} width="220" height="50">
                            <div className="text-xs text-slate-500 text-center px-2">
                              {project.description}
                            </div>
                          </foreignObject>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Наведите на точку для подробностей</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

PortfolioSection.displayName = 'PortfolioSection';

export default PortfolioSection;

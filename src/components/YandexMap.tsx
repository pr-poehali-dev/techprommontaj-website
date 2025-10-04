import { useEffect, useRef } from 'react';

interface MapPoint {
  coords: [number, number];
  title: string;
  description: string;
  location: string;
  image: string;
}

interface YandexMapProps {
  points: MapPoint[];
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap = ({ points }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = () => {
      if (!window.ymaps) {
        console.error('Yandex Maps API not loaded');
        return;
      }

      window.ymaps.ready(() => {
        if (mapInstanceRef.current) return;

        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.76, 82.00],
          zoom: 3,
          controls: ['zoomControl', 'fullscreenControl']
        });

        points.forEach((point) => {
          const balloonContent = `
            <div style="max-width: 300px;">
              <strong style="font-size: 16px; color: #1e293b;">${point.title}</strong>
              <img src="${point.image}" alt="${point.title}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px; margin: 12px 0;" />
              <p style="margin: 8px 0; color: #64748b; font-size: 14px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline; vertical-align: middle; margin-right: 4px;">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                ${point.location}
              </p>
              <p style="margin: 0; color: #475569; font-size: 14px;">${point.description}</p>
            </div>
          `;

          const placemark = new window.ymaps.Placemark(
            point.coords,
            {
              balloonContent: balloonContent,
              hintContent: point.title
            },
            {
              preset: 'islands#blueDotIcon'
            }
          );

          map.geoObjects.add(placemark);
        });

        mapInstanceRef.current = map;
      });
    };

    if (window.ymaps) {
      initMap();
    } else {
      const checkYmaps = setInterval(() => {
        if (window.ymaps) {
          clearInterval(checkYmaps);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkYmaps);
    }
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full rounded-2xl overflow-hidden shadow-xl border-2 border-primary/10"
      style={{ height: '600px' }}
    />
  );
};

export default YandexMap;
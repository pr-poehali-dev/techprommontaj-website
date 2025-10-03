import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Client {
  name: string;
  logo: string;
}

interface ClientsSectionProps {
  clients: Client[];
}

const ClientCard = memo(({ client, index }: { client: Client; index: number }) => {
  const scrollAnim = useScrollAnimation();
  
  return (
    <div
      ref={scrollAnim.ref}
      className={`transform will-change-transform ${
        scrollAnim.isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 80}ms`,
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
      }}
    >
      <div className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105 hover:border-accent/50 h-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img 
          src={client.logo} 
          alt={client.name}
          loading="lazy"
          decoding="async"
          className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-all relative z-10" 
        />
      </div>
    </div>
  );
});

ClientCard.displayName = 'ClientCard';

const ClientsSection = memo(({ clients }: ClientsSectionProps) => {
  const handleContactClick = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="clients" className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
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
          {clients.map((client, idx) => (
            <ClientCard key={client.name} client={client} index={idx} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70 text-lg mb-6">
            Присоединяйтесь к компаниям, которые выбрали качество
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg shadow-2xl shadow-accent/30"
            onClick={handleContactClick}
          >
            <Icon name="Handshake" size={20} className="mr-2" />
            Стать партнёром
          </Button>
        </div>
      </div>
    </section>
  );
});

ClientsSection.displayName = 'ClientsSection';

export default ClientsSection;
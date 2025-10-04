import { memo } from 'react';
import Icon from '@/components/ui/icon';

interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

const WhyUsSection = memo(() => {
  const reasons: WhyUsItem[] = [
    {
      icon: 'Zap',
      title: 'Быстрый вывод специалистов',
      description: 'Оперативно подбираем и направляем квалифицированных специалистов требуемой квалификации на ваш объект'
    },
    {
      icon: 'Shield',
      title: 'Граждане РФ',
      description: 'Все специалисты - граждане Российской Федерации, что обеспечивает полное соответствие законодательству'
    },
    {
      icon: 'Users',
      title: 'Сплоченные команды',
      description: 'Предоставляем организованные бригады с опытными бригадирами и руководителями проектов'
    },
    {
      icon: 'FileText',
      title: 'Без кадровой нагрузки',
      description: 'Освобождаем вас от кадрового учета. Все вопросы трудового законодательства берем на себя'
    },
    {
      icon: 'TrendingDown',
      title: 'Налоговая оптимизация',
      description: 'Оплата наших услуг является вашими расходами, что позволяет оптимизировать налогообложение в части НДС и налога на прибыль'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-accent/5 to-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Почему именно мы?</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
          5 причин начать работать с нами уже сегодня
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-accent overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-accent to-accent/80 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Icon name={reason.icon as any} size={32} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                  {reason.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>

                <div className="absolute bottom-4 right-4 text-6xl font-bold text-accent/5 group-hover:text-accent/10 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center">
                <Icon name="Award" size={40} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Более 2000 специалистов работают в нашей компании</h3>
              <p className="text-white/90 text-lg">
                Присоединяйтесь к числу наших довольных клиентов и получите доступ к лучшим специалистам отрасли
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyUsSection.displayName = 'WhyUsSection';

export default WhyUsSection;

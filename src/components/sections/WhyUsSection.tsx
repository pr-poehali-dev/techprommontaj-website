import { memo } from 'react';

interface WhyUsItem {
  title: string;
  description: string;
}

const WhyUsSection = memo(() => {
  const reasons: WhyUsItem[] = [
    {
      title: 'Быстро выведем необходимое количество специалистов требуемой квалификации на объект',
      description: 'Оперативно подбираем и направляем квалифицированных специалистов согласно вашим требованиям'
    },
    {
      title: 'Все специалисты - граждане Российской Федерации',
      description: 'Работаем только с гражданами РФ, что обеспечивает полное соответствие законодательству'
    },
    {
      title: 'Мы предоставляем сплоченные команды с бригадиром и руководителем проекта',
      description: 'Организованные бригады с опытными руководителями для эффективной работы'
    },
    {
      title: 'Мы освобождаем Вас от необходимости вести кадровый учет. Все вопросы трудового законодательства мы берем на себя',
      description: 'Полное кадровое администрирование и соблюдение трудового законодательства - наша забота'
    },
    {
      title: 'Оплата наших услуг является вашими расходами, что позволяет оптимизировать ваше налогообложение в части НДС и налога на прибыль',
      description: 'Легальная оптимизация налоговой нагрузки через правильное оформление расходов'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Почему именно мы?</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            {reasons.map((reason, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border-l-4 border-accent hover:scale-[1.02] group"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                    <span className="text-lg font-bold text-accent group-hover:text-white">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary leading-tight">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative hidden md:block">
            <div className="sticky top-24">
              <img 
                src="https://cdn.poehali.dev/files/4707b538-6692-492c-93fc-d60c8d526574.png" 
                alt="Почему выбирают нас" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyUsSection.displayName = 'WhyUsSection';

export default WhyUsSection;

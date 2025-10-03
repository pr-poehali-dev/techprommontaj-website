import { Button } from '@/components/ui/button';

const WorkflowSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Как мы работаем</h2>
        <p className="text-center text-white/90 mb-16 max-w-2xl mx-auto text-lg">
          Прозрачный процесс от заявки до сдачи объекта
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Заявка</h3>
              <p className="text-white/80 leading-relaxed">
                Вы оставляете заявку по телефону или через форму на сайте
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/50"></div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Консультация</h3>
              <p className="text-white/80 leading-relaxed">
                Наш менеджер связывается с вами и обсуждает детали проекта
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/50"></div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Выполнение</h3>
              <p className="text-white/80 leading-relaxed">
                Квалифицированная бригада приступает к работе на объекте
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/50"></div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 duration-300">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Сдача объекта</h3>
              <p className="text-white/80 leading-relaxed">
                Проверка качества работ и официальная приёмка заказчиком
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Начать сотрудничество
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;

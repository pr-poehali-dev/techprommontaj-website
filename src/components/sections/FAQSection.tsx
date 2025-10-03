import { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Частые вопросы</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Ответы на популярные вопросы о наших услугах
        </p>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => {
              const scrollAnim = useScrollAnimation();
              return (
                <div
                  key={idx}
                  ref={scrollAnim.ref}
                  className={`transform transition-all duration-700 ${
                    scrollAnim.isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-10'
                  }`}
                  style={{transitionDelay: `${idx * 100}ms`}}
                >
                  <AccordionItem 
                    value={`item-${idx}`}
                    className="border-2 rounded-xl px-6 bg-white hover:border-accent hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <span className="text-sm font-bold text-accent">0{idx + 1}</span>
                    </div>
                    
                    <AccordionTrigger className="text-left hover:no-underline py-6 pr-16">
                      <div className="flex items-start gap-3">
                        <Icon name="HelpCircle" size={24} className="text-accent mt-1 flex-shrink-0" />
                        <span className="font-semibold text-lg group-hover:text-accent transition-colors">
                          {faq.q}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-9">
                      <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-accent/30">
                        {faq.a}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

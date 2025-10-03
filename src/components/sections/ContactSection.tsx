import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ContactSectionProps {
  formData: { name: string; phone: string; message: string };
  setFormData: (data: { name: string; phone: string; message: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ContactSection = ({ formData, setFormData, handleSubmit }: ContactSectionProps) => {
  return (
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Свяжитесь с нами</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={24} className="text-accent" />
                <a href="tel:+79006312247" className="text-lg hover:text-accent transition-colors">
                  +7 (900) 631-22-47
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={24} className="text-accent" />
                <a href="mailto:tehprommontaj@gmail.com" className="text-lg hover:text-accent transition-colors">
                  tehprommontaj@gmail.com
                </a>
              </div>
            </div>
            <p className="text-white/80">
              Оставьте заявку, и наш менеджер свяжется с вами в течение рабочего дня
            </p>
          </div>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Заказать звонок</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Комментарий (необязательно)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white min-h-24"
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

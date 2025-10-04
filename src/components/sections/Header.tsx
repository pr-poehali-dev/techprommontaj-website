import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  smoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, target: string) => void;
}

const Header = ({ isMenuOpen, setIsMenuOpen, smoothScroll }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-primary via-primary to-primary/95 text-white py-2.5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 group">
                <div className="bg-accent/20 p-1.5 rounded-full group-hover:bg-accent/30 transition-colors">
                  <Icon name="MapPin" size={14} className="text-accent" />
                </div>
                <span className="font-medium text-xs sm:text-sm">По всей россии</span>
              </div>
              <div className="hidden md:flex items-center gap-2 group">
                <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                  <Icon name="Mail" size={14} />
                </div>
                <span className="text-white/90">tehprommontaj@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Icon name="Clock" size={14} />
              <span className="text-xs">Пн-Пт: 9-18</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent w-12 h-12 rounded-xl flex items-center justify-center">
                <Icon name="Building2" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-primary leading-tight tracking-tight">ТЕХПРОММОНТАЖ</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Подрядная организация</p>
              </div>
            </div>
            
            <div className="flex lg:hidden items-center gap-2">
              <a 
                href="tel:+79006312247"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Icon name="Phone" size={20} />
              </a>
              <button 
                className="text-primary bg-primary/5 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
            
            <div className="hidden lg:flex items-center gap-1">
              <a href="#about" onClick={(e) => smoothScroll(e, '#about')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">О нас</a>
              <a href="#clients" onClick={(e) => smoothScroll(e, '#clients')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Клиенты</a>
              <a href="#portfolio" onClick={(e) => smoothScroll(e, '#portfolio')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Портфолио</a>
              <a href="#contact" onClick={(e) => smoothScroll(e, '#contact')} className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium rounded-lg hover:bg-accent/5">Контакты</a>
              
              <div className="ml-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 transition-all"
                  onClick={() => window.location.href = 'tel:+79006312247'}
                >
                  <Icon name="Phone" size={18} className="animate-pulse" />
                  Позвонить
                </Button>
              </div>
            </div>
          </nav>

          {isMenuOpen && (
            <div className="lg:hidden mt-6 pb-4 space-y-2 border-t pt-6 animate-fade-in">
              <a href="#about" onClick={(e) => smoothScroll(e, '#about')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">О нас</a>
              <a href="#clients" onClick={(e) => smoothScroll(e, '#clients')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Клиенты</a>
              <a href="#portfolio" onClick={(e) => smoothScroll(e, '#portfolio')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Портфолио</a>
              <a href="#contact" onClick={(e) => smoothScroll(e, '#contact')} className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg">Контакты</a>
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => window.location.href = 'tel:+79006312247'}
                >
                  <Icon name="Phone" size={18} className="animate-pulse" />
                  Позвонить сейчас
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
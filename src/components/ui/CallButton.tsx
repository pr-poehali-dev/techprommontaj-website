import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ContactModal from '@/components/ui/ContactModal';

interface CallButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
  forceModal?: boolean;
}

const CallButton = ({ className, variant = 'default', size = 'lg', children, forceModal = false }: CallButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = '+79006312247';

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile', 'phone'];
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      setIsMobile(isMobileUA || (hasTouchScreen && window.innerWidth < 1024));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (forceModal) {
      setIsModalOpen(true);
    } else if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Button 
        size={size}
        variant={variant}
        className={className}
        onClick={handleClick}
      >
        <Icon name={forceModal || !isMobile ? 'MessageSquare' : 'Phone'} size={20} className="mr-2" />
        {children || (forceModal || !isMobile ? 'Заказать звонок' : 'Позвонить')}
      </Button>
      <ContactModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Заказать звонок"
        description="Оставьте свои контактные данные и мы перезвоним вам в течение 15 минут"
      />
    </>
  );
};

export default CallButton;
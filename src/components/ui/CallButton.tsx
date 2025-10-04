import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CallButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
}

const CallButton = ({ className, variant = 'default', size = 'lg', children }: CallButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
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
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button 
      size={size}
      variant={variant}
      className={className}
      onClick={handleClick}
    >
      <Icon name={isMobile ? 'Phone' : 'MessageSquare'} size={20} className="mr-2" />
      {children || (isMobile ? 'Позвонить' : 'Заказать звонок')}
    </Button>
  );
};

export default CallButton;

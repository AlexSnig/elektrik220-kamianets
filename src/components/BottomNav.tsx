import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, Wrench, Phone, MapPin } from 'lucide-react';
import { useApp } from '../hooks/use-app';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isActive, onClick }) => {
  const { state } = useApp();
  const phoneNumber = state.companyData?.contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';

  // Special handling for phone link
  const isPhoneLink = href.startsWith('tel:');
  const actualHref = isPhoneLink ? `tel:${phoneNumber}` : href;

  const handleClick = (e: React.MouseEvent) => {
    if (!isPhoneLink) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={actualHref}
      onClick={handleClick}
      className={`flex flex-col items-center justify-center flex-1 py-2 px-1 min-h-[60px] transition-colors ${
        isActive ? 'text-amber-500' : 'text-gray-400 hover:text-gray-200'
      }`}
      aria-label={label}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <Icon className="w-6 h-6 mb-1" />
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.div>
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
};

const BottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active section
      setActiveSection(href.replace('#', ''));
    }
  }, []);

  const navItems = [
    { icon: Home, label: 'Головна', href: '#home', id: 'home' },
    { icon: Wrench, label: 'Послуги', href: '#services', id: 'services' },
    { icon: Phone, label: 'Дзвінок', href: 'tel:', id: 'call' },
    { icon: MapPin, label: 'Контакти', href: '#contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-40 safe-area-inset-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex justify-around items-center px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={activeSection === item.id}
            onClick={() => scrollToSection(item.href)}
          />
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNav;

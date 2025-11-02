import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Zap, Clock } from 'lucide-react';
import { useApp } from '../hooks/use-app';
import { throttle, smoothTransition } from '../utils/performance';

const Header: React.FC = () => {
  const { state } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Throttled scroll handler for better performance
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Головна', href: '#home' },
    { id: 'services', label: 'Послуги', href: '#services' },
    { id: 'about', label: 'Про нас', href: '#about' },
    { id: 'gallery', label: 'Галерея', href: '#gallery' },
    { id: 'testimonials', label: 'Відгуки', href: '#testimonials' },
    { id: 'blog', label: 'Блог', href: '#blog' },
    { id: 'contact', label: 'Контакти', href: '#contact' },
  ];

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
      setIsMenuOpen(false);
    }
  }, []);

  const phoneNumber = state.companyData?.contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={smoothTransition}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer min-h-[44px] -ml-2 pl-2 pr-3 sm:pr-0 sm:ml-0 sm:pl-0 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={smoothTransition}
              onClick={() => scrollToSection('#home')}
              aria-label="Перейти на головну сторінку"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  scrollToSection('#home');
                }
              }}
            >
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                  {state.companyData?.company.name ?? 'Електрик 220В'}
                </h1>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 leading-tight">
                  Кам&#39;янець-Подільський
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={smoothTransition}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{phoneNumber}</div>
                <div className="text-xs text-gray-600 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  24/7 аварійний виклик
                </div>
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJKx7hfRfHM0cR9gFI8ZPSvl4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline mt-1 block"
                >
                  Ми на Google Maps
                </a>
              </div>
              <motion.a
                href={`tel:${phoneNumber}`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={smoothTransition}
              >
                <Phone className="w-4 h-4" />
                <span>Викликати</span>
              </motion.a>
            </div>

            {/* Tablet/Mobile Phone CTA */}
            <div className="hidden md:flex lg:hidden items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{phoneNumber}</div>
                <div className="text-xs text-gray-600">24/7</div>
              </div>
              <motion.a
                href={`tel:${phoneNumber}`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={smoothTransition}
                aria-label="Подзвонити електрику"
              >
                <Phone className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Small Mobile Phone CTA */}
            <motion.a
              href={`tel:${phoneNumber}`}
              className="md:hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2.5 rounded-lg shadow-md min-w-[44px] min-h-[44px] flex items-center justify-center mr-2"
              whileTap={{ scale: 0.95 }}
              transition={smoothTransition}
              aria-label="Подзвонити електрику"
            >
              <Phone className="w-5 h-5" />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mr-3"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={smoothTransition}
              aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute top-16 lg:top-20 left-0 right-0 bottom-0 bg-black/50"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 sm:top-18 lg:top-20 right-0 w-full max-w-sm h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.5rem)] lg:h-[calc(100vh-5rem)] bg-white shadow-2xl overflow-hidden"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
            >
              <div className="p-4 sm:p-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{state.companyData?.company.name ?? 'Електрик 220В'}</h2>
                      <p className="text-xs sm:text-sm text-gray-600 leading-tight">Кам&#39;янець-Подільський</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
                    aria-label="Закрити меню"
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 mb-6 sm:mb-8" role="navigation" aria-label="Головна навігація">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left text-base sm:text-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 font-medium transition-colors py-3 px-4 rounded-lg min-h-[44px] flex items-center"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      aria-label={`Перейти до секції ${item.label}`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Contact CTA */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-lg sm:text-xl font-semibold text-gray-900">{phoneNumber}</div>
                    <div className="text-sm text-gray-600">24/7 аварійний виклик</div>
                  </div>
                  <motion.a
                    href={`tel:${phoneNumber}`}
                    className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-4 rounded-xl font-semibold shadow-lg min-h-[44px] flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Подзвонити електрику зараз"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Викликати електрика</span>
                    </div>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ChevronRight, Zap } from 'lucide-react';
import { useApp } from '../hooks/use-app';

const HeroSection: React.FC = () => {
  const { state } = useApp();

  const companyData = state.companyData;
  const phoneNumber = companyData?.contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              <span>Аварійний виклик електрика 24/7</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block animate-fade-scale">Електрик</span>
              <span
                className="block bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent drop-shadow-lg"
                style={{
                  animationDelay: '0.2s',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Кам&apos;янець-Подільський
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-gray-800 animate-fade-up [animation-delay:0.4s]">
                — Виклик 24/7 220В
              </span>
            </h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Термінова допомога при відключенні світла, вибиванні автоматів. Електромонтажні роботи
              будь-якої складності: встановлення розеток, заміна електропроводки, підключення
              електроприладів. Офіційний чек, 3-річна гарантія на роботи.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href={`tel:${phoneNumber}`}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                <span>Викликати зараз</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.button
                type="button"
                onClick={handleScrollToContact}
                className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Розрахувати вартість - перейти до форми контактів"
              >
                <span>Розрахувати вартість</span>
                <ChevronRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

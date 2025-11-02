import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, Shield, ChevronRight, Zap, Users, Award } from 'lucide-react';
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

  const stats = [
    {
      icon: Users,
      value: companyData?.company?.completed_projects ?? '2000+',
      label: 'Виконаних проектів',
    },
    {
      icon: Clock,
      value: '15',
      label: 'Років досвіду',
    },
    {
      icon: Shield,
      value: '3',
      label: 'Років гарантії',
    },
    {
      icon: Award,
      value: '30 хв',
      label: 'Час прибуття',
    },
  ];

  const keyFeatures = [
    'Приїзд за 30 хвилин',
    'Гарантія 3 роки',
    'Цілодобовий виклик 24/7',
    '15 років досвіду',
  ];

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
                  WebkitTextFillColor: 'transparent'
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
              Термінова допомога при відключенні світла, вибиванні автоматів.
              Електромонтажні роботи будь-якої складності: встановлення розеток, заміна електропроводки, підключення електроприладів.
              Офіційний чек, гарантія 3 роки.
            </motion.p>

            {/* Key Features */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm lg:text-base">{feature}</span>
                </div>
              ))}
            </motion.div>

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
                onClick={handleScrollToContact}
                className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Розрахувати вартість</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

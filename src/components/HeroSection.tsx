import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, Shield, Star, ChevronRight, Zap, Users, Award } from 'lucide-react';
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
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              <span>Професійні електричні послуги</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">Електрик</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                Кам&apos;янець-Подільський
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl">— Виклик 24/7 220В</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Зникло світло? Вибиває автомат? Приїду за 35 хвилин цілодобово. 
              Електромонтаж, заміна проводки, заземлення. Чек, гарантія 3 роки, 15 років досвіду.
            </motion.p>

            {/* Key Features */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm lg:text-base">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
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

            {/* Stats (залишаємо для мобільних) */}
            <motion.div
              className="grid grid-cols-2 gap-6 justify-items-center lg:hidden"
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
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/hero-electrician.jpg"
                  alt="Професійний електрик за роботою"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

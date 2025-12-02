import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Shield, Users, Clock, CheckCircle, Zap, Phone } from 'lucide-react';
import { useApp } from '../hooks/use-app';
import OptimizedImage from './ui/OptimizedImage';

const AboutSection: React.FC = () => {
  const { state } = useApp();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const companyData = state.companyData;
  const phoneNumber = companyData?.contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';

  const achievements = [
    {
      icon: Users,
  value: companyData?.company.completed_projects ?? '2000+',
      label: 'Задоволених клієнтів',
      description: 'За час роботи ми допомогли тисячам клієнтів',
    },
    {
      icon: Clock,
  value: companyData?.company.experience ?? '15',
      label: 'Років на ринку',
      description: 'Багаторічний досвід у сфері електромонтажу',
    },
    {
      icon: Shield,
  value: companyData?.company.guarantee ?? '3',
      label: 'Роки гарантії',
      description: 'Офіційна гарантія на всі види робіт',
    },
    {
      icon: Award,
      value: '100%',
      label: 'Якості робіт',
      description: 'Використовуємо тільки якісні матеріали',
    },
  ];

  const advantages = [
    {
      icon: Zap,
      title: 'Швидкий виїзд',
      description: 'Майстер прибуває на об\'єкт за 30 хвилин у межах міста',
    },
    {
      icon: Shield,
      title: 'Безпека робіт',
      description: 'Дотримуємось усіх норм ПУЕ та стандартів електробезпеки ДСТУ',
    },
    {
      icon: Award,
      title: 'Кваліфіковані спеціалісти',
      description: 'Електрики з офіційними допусками до робіт підвищеної небезпеки',
    },
    {
      icon: Users,
      title: 'Індивідуальний підхід',
      description: 'Знаходимо оптимальне рішення для кожного клієнта',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Про нашу команду</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Професійний електрик
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                з 15-річним досвідом
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              {companyData?.company.description ?? 
                'Ми - команда кваліфікованих електриків з багаторічним досвідом роботи в Кам\'янці-Подільському. Спеціалізуємося на всіх видах електромонтажних робіт від дрібного ремонту до повного електромонтажу.'}
            </p>

            {/* Advantages */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <advantage.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certificates */}
            {companyData?.certificates && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 text-blue-600 mr-2" />
                  Наші сертифікати та допуски:
                </h3>
                <div className="space-y-2">
                  {(companyData?.certificates || []).map((cert, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href={`tel:${phoneNumber}`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Безкоштовна консультація</span>
              </a>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                Переглянути послуги
              </button>
            </motion.div>
          </motion.div>

          {/* Achievements & Image */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Image */}
            <div className="relative">
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <OptimizedImage
                  src="/images/tools-background.jpg"
                  alt="Професійні інструменти електрика"
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  widths={[400, 800, 1200]}
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </motion.div>

              {/* Floating Elements */}
              {/* Елемент 24/7 Аварійний виклик видалено */}

              {/* Елемент 5 років гарантії видалено */}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{achievement.label}</div>
                  <div className="text-xs text-gray-600">{achievement.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ArrowRight, Clock, Shield, Phone, Users, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Service } from '../types';

export const StatsBar: React.FC = () => {
  const { state } = useApp();
  const stats = [
    { icon: Users, value: state.companyData?.company?.completed_projects ?? '2000+', label: 'Виконаних проектів' },
    { icon: Clock, value: state.companyData?.company?.experience ?? '10+', label: 'Років досвіду' },
    { icon: Shield, value: state.companyData?.company?.guarantee ?? '5', label: 'Років гарантії' },
    { icon: Award, value: '24/7', label: 'Аварійний виклик' },
  ];
  return (
    <div className="container mx-auto px-4">
  <div className="hidden lg:flex items-center justify-center gap-12 mx-auto max-w-5xl py-1">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-base font-bold text-gray-900 leading-none whitespace-nowrap">{stat.value}</div>
              <div className="text-xs text-gray-600 leading-none whitespace-nowrap">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const { state } = useApp();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const phoneNumber = state.companyData?.contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      {/* Inter-section band (desktop only): center stats inside the yellow zone */}
      <div className="hidden lg:block bg-gray-50">
        <div className="h-24 flex items-center justify-center">
          <StatsBar />
        </div>
      </div>
      <section id="services" className="py-12 sm:py-16 md:py-20 lg:pt-0 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Електричні послуги
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              в Кам&apos;янці-Подільському
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Повний спектр електромонтажних робіт з гарантією якості та безпеки. 
            Працюємо швидко, акуратно та за доступними цінами.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {(state.services || []).map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col"
              whileHover={{ y: -5 }}
            >
              {/* Urgent Badge */}
              {service.urgent && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                  ТЕРМІНОВО
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {service.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                  {service.urgent && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>30 хв</span>
                    </div>
                  )}
                </div>

                {/* Features Preview */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 2 && (
                    <div className="text-sm text-blue-600 font-medium">
                      +{service.features.length - 2} переваг
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Детальніше</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Замовити</span>
                  </a>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Details Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedService(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">{selectedService.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedService.title}</h3>
                      <div className="text-3xl font-bold text-blue-600 mt-1">{selectedService.price}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 mb-6 text-lg">{selectedService.description}</p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    Що включено в послугу:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Замовити послугу</span>
                  </a>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Закрити
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-4">Не знайшли потрібну послугу?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Зв&apos;яжіться з нами для консультації. Ми вирішуємо будь-які електричні завдання!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phoneNumber}`}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Безкоштовна консультація</span>
            </a>
            <button
              onClick={() => window.location.href = '#contact'}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Написати повідомлення
            </button>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default ServicesSection;

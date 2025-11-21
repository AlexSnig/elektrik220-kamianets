// Рекомендація: для кращої типізації увімкніть strictNullChecks у tsconfig.json
// "strictNullChecks": true

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award } from 'lucide-react';

const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const galleryItems = [
    {
      id: 1,
      src: '/images/gallery/wiring-work.jpeg',
      title: 'Заміна електропроводки',
      category: 'wiring',
      description: 'Повна заміна проводки в 2-кімнатній квартирі з встановленням сучасного електрощита',
      location: 'вул. Соборна',
    },
    {
      id: 2,
      src: '/images/gallery/panel-installation.jpg',
      title: 'Монтаж електрощита',
      category: 'panels',
      description: 'Встановлення нового електрощита з автоматичними вимикачами та УЗО',
      location: 'вул. Хмельницька',
    },
    {
      id: 3,
      src: '/images/gallery/outlet-installation.jpg',
      title: 'Встановлення розеток',
      category: 'outlets',
      description: 'Монтаж додаткових розеток та вимикачів в офісному приміщенні',
      location: 'вул. Грушевського',
    },
    {
      id: 4,
      src: '/images/gallery/lighting-installation.jpg',
      title: 'Монтаж освітлення',
      category: 'lighting',
      description: 'Встановлення сучасних світлодіодних світильників та диммерів',
      location: 'вул. Пушкінська',
    },
    {
      id: 5,
      src: '/images/gallery/power-outlet.jpg',
      title: 'Силові розетки',
      category: 'outlets',
      description: 'Підключення силових розеток для побутової техніки',
      location: 'вул. Татарська',
    },
    {
      id: 6,
      src: '/images/gallery/electrical-cables.png',
      title: 'Прокладка кабелів',
      category: 'wiring',
      description: 'Прокладка кабельних трас у приватному будинку',
      location: 'приватний сектор',
    },
  ];

  const categories = [
    { id: 'all', label: 'Всі роботи' },
    { id: 'wiring', label: 'Проводка' },
    { id: 'panels', label: 'Електрощити' },
    { id: 'outlets', label: 'Розетки' },
    { id: 'lighting', label: 'Освітлення' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

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
    <section id="gallery" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>Наші роботи</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Галерея виконаних
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              проектів
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Переглядайте приклади наших робіт. Кожен проект виконаний з дотриманням усіх стандартів безпеки та якості.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="sync">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
                layout
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-medium">{item.location}</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 bg-white rounded-3xl p-8 lg:p-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Хочете такий же результат?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Зв&apos;яжіться з нами, і ми з радістю втілимо ваш проект в життя з такою ж якістю та увагою до деталей.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+380677523103"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Замовити консультацію
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              Написати повідомлення
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;

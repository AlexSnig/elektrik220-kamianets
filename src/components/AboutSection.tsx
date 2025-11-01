import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Shield, Users, Clock, CheckCircle, Zap, Phone } from 'lucide-react';
import { useApp } from '../hooks/use-app';

const AboutSection: React.FC = () => {
  const { state } = useApp();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const companyData = state.companyData;
  const phoneNumber = companyData?.contact.phones.find(p => p.primary)?.number ?? '+380 97 123 45 67';

  const achievements = [
    {
      icon: Users,
  value: companyData?.company.completed_projects ?? '2000+',
      label: 'Задоволених клієнтів',
      description: 'За час роботи ми допомогли тисячам клієнтів',
    },
    {
      icon: Clock,
  value: companyData?.company.experience ?? '10+',
      label: 'Років на ринку',
      description: 'Багаторічний досвід у сфері електромонтажу',
    },
    {
      icon: Shield,
  value: companyData?.company.guarantee ?? '5',
      label: 'Років гарантії',
      description: 'Довгострокова гарантія на всі роботи',
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
      title: 'Швидкий відгук',
      description: 'Приїжджаємо протягом 30 хвилин у Кам\'янці-Подільському',
    },
    {
      icon: Shield,
      title: 'Гарантія безпеки',
      description: 'Всі роботи виконуємо згідно з нормами безпеки та стандартами',
    },
    {
      icon: Award,
      title: 'Сертифіковані майстри',
      description: 'Команда професіоналів з офіційними допусками та сертифікатами',
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
              Професійні електрики
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                з багаторічним досвідом
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
                  {companyData.certificates.map((cert, index) => (
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
                <img
                  src="/images/tools-background.jpg"
                  alt="Професійні інструменти електрика"
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                  loading="lazy"
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

        {/* Working Process */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Як ми працюємо</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Простий та прозорий процес співпраці від дзвінка до завершення робіт
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Дзвінок', desc: 'Зв\'язуйтеся з нами будь-яким зручним способом' },
              { step: '2', title: 'Діагностика', desc: 'Виїжджаємо та проводимо безкоштовну діагностику' },
              { step: '3', title: 'Роботи', desc: 'Виконуємо роботи якісно та в обумовлені терміни' },
              { step: '4', title: 'Гарантія', desc: 'Надаємо гарантію та подальшу підтримку' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

// FAQSection component
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp, HelpCircle, Phone, Clock, Shield, CreditCard, Users, Zap } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "1. Які терміни виконання робіт?",
      answer: "Терміни виконання робіт залежать від складності завдання, але ми завжди намагаємося завершити роботу якнайшвидше.",
      icon: Clock,
    },
    {
      question: "2. Чи надаєте ви гарантію на виконані роботи?",
      answer: "Так, ми надаємо гарантію на роботи від 3 до 10 років залежно від виду робіт.",
      icon: Shield,
    },
    {
      question: "3. Чи можна викликати електрика в нічний час?",
      answer: "Так, ми працюємо цілодобово. Аварійний виклик доступний 24/7.",
      icon: Zap,
    },
    {
      question: "4. Яка вартість прорахунку електромонтажних робіт?",
      answer: "Прорахунок вартості робіт проводиться безкоштовно після огляду об'єкта.",
      icon: CreditCard,
    },
    {
      question: "5. Які матеріали ви використовуєте у роботі?",
      answer: "Ми використовуємо тільки сертифіковані матеріали від провідних виробників, що відповідають стандартам ДСТУ.",
      icon: Shield,
    },
    {
      question: "6. Як швидко ви можете приїхати на аварійний виклик?",
      answer: "На аварійний виклик ми приїжджаємо протягом 30 хвилин у межах Кам'янця-Подільського.",
      icon: Clock,
    },
    {
      question: "7. Чи є знижки для постійних клієнтів?",
      answer: "Так, для постійних клієнтів ми надаємо знижки та спеціальні умови співпраці.",
      icon: Users,
    },
    {
      question: "8. Як оплатити ваші послуги?",
      answer: "Оплата можлива готівкою, картою або шляхом оплати на рахунок. Оплата після виконання робіт.",
      icon: CreditCard,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Часті запитання</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Часті запитання
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              FAQ
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Відповіді на найпопулярніші питання про наші послуги
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <faq.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-6"
                >
                  <div className="pl-16 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-4">Не знайшли відповідь?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Зв'яжіться з нами для консультації. Ми відповімо на всі ваші питання!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:067-752-31-03"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Зателефонувати</span>
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
  );
};

export default FAQSection;

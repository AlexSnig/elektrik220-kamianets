import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Clock,
  Shield,
  CreditCard,
  Users,
  Zap,
} from 'lucide-react';

const FAQSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '1. Які терміни виконання робіт?',
      answer:
        'Прості роботи (заміна розетки, вимикача, підключення світильника) - 1-2 години. Середні роботи (встановлення кількох розеток, прокладка кабелю) - 3-8 годин. Складні роботи (повна заміна проводки, монтаж електрощита) - від 1 до 5 днів залежно від площі приміщення.',
      icon: Clock,
    },
    {
      question: '2. Чи надаєте ви гарантію на виконані роботи?',
      answer: 'Так, ми надаємо офіційну гарантію 3 роки на всі електромонтажні роботи. Гарантія підтверджується чеком та договором. При виникненні будь-яких проблем протягом гарантійного терміну - виправляємо безкоштовно.',
      icon: Shield,
    },
    {
      question: '3. Чи можна викликати електрика в нічний час?',
      answer: 'Так, ми працюємо цілодобово. Аварійний виклик доступний 24/7.',
      icon: Zap,
    },
    {
      question: '4. Яка вартість прорахунку електромонтажних робіт?',
      answer: "Консультація та оцінка вартості робіт - безкоштовно. Майстер приїде на об'єкт, оцінить обсяг робіт, підрахує необхідні матеріали та надасть детальну кошторисну калькуляцію. Виїзд для оцінки по Кам'янцю-Подільському також безкоштовний.",
      icon: CreditCard,
    },
    {
      question: '5. Які матеріали ви використовуєте у роботі?',
      answer:
        'Ми використовуємо тільки сертифіковані матеріали від провідних виробників, що відповідають стандартам ДСТУ.',
      icon: Shield,
    },
    {
      question: '6. Як швидко ви можете приїхати на аварійний виклик?',
      answer:
        "На аварійний виклик ми приїжджаємо протягом 30 хвилин у межах Кам'янця-Подільського.",
      icon: Clock,
    },
    {
      question: '7. Чи є знижки для постійних клієнтів?',
      answer: 'Так! Для постійних клієнтів діє накопичувальна система знижок та пріоритетний виїзд майстра. При замовленні комплексних робіт (від 3 послуг одночасно) - знижка до 15%. Також маємо спеціальні ціни для організацій та управителів ОСББ.',
      icon: Users,
    },
    {
      question: '8. Як оплатити ваші послуги?',
      answer:
        'Оплата можлива готівкою, картою або шляхом оплати на рахунок. Оплата після виконання робіт.',
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
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0"
                      animate={{
                        scale: isOpen ? 1.1 : 1,
                        backgroundColor: isOpen ? 'rgb(37, 99, 235)' : 'rgb(219, 234, 254)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <faq.icon
                        className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-blue-600'}`}
                      />
                    </motion.div>
                    <h3
                      className={`text-lg font-semibold pr-4 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-900'}`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    className="flex-shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                          opacity: { duration: 0.25, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <motion.div
                          className="pl-16 text-gray-600 leading-relaxed"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 lg:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-4">Залишились запитання?</h3>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Подзвоніть нам прямо зараз - детально проконсультуємо та дамо рекомендації по телефону.
          </p>
          <a
            href="tel:+380677523103"
            className="inline-flex items-center justify-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Подзвонити зараз</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

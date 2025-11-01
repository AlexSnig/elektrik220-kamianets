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
              href="tel:+380677523103"
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


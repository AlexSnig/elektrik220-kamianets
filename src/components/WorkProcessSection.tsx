import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhoneCall, Search, Wrench, Shield } from 'lucide-react';

interface ProcessStep {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  duration: string;
}

const WorkProcessSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps: ProcessStep[] = [
    {
      id: 1,
      icon: PhoneCall,
      title: 'Заявка',
      description: 'Дзвінок або заповнення форми на сайті. Консультація диспетчера',
      duration: '5 хв',
    },
    {
      id: 2,
      icon: Search,
      title: 'Діагностика',
      description: 'Приїзд майстра за 30 хвилин. Безкоштовний огляд та оцінка робіт',
      duration: '30 хв',
    },
    {
      id: 3,
      icon: Wrench,
      title: 'Виконання',
      description: 'Якісне виконання робіт з використанням професійного обладнання',
      duration: '2-4 год',
    },
    {
      id: 4,
      icon: Shield,
      title: 'Гарантія',
      description: 'Прибирання після робіт. Гарантія 3 роки на всі виконані роботи',
      duration: '3 роки',
    },
  ];

  return (
    <section id="work-process" className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Як ми <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">працюємо</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Простий і зрозумілий процес від заявки до гарантійного обслуговування
          </p>
        </motion.div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600" />

            {/* Steps */}
            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step number */}
                  <div className="absolute top-[88px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center text-xl font-bold shadow-lg z-10">
                    {step.id}
                  </div>

                  {/* Card */}
                  <div className="glass-card glass-card-hover rounded-2xl p-6 transition-shadow mt-32">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4">
                        <step.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-200" />
              )}

              {/* Step number */}
              <div className="absolute left-0 top-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center text-xl font-bold shadow-lg z-10">
                {step.id}
              </div>

              {/* Card */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                    <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {step.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
          >
            Замовити виклик майстра
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcessSection;

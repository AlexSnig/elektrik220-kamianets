import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Clock, Shield, Zap } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Respect user's motion preferences (WCAG 2.1 - 2.3.3 Animation from Interactions)
  const prefersReducedMotion = useReducedMotion();

  const features = [
    {
      icon: Award,
      title: '15 років досвіду',
      description: 'Кваліфіковані електромонтажні роботи від простих до складних проектів',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-700',
      ariaLabel: 'Досвід роботи 15 років',
    },
    {
      icon: Zap,
      title: 'Працюємо цілодобово',
      description: 'Екстрений виклик електрика доступний 24 години на добу, 7 днів на тиждень',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-700',
      ariaLabel: 'Цілодобова аварійна служба',
    },
    {
      icon: Shield,
      title: '3-річна гарантія',
      description: 'Підтверджена документально гарантія на роботи та встановлені матеріали',
      color: 'from-green-600 to-emerald-700',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-700',
      ariaLabel: 'Офіційна гарантія 3 роки',
    },
    {
      icon: Clock,
      title: 'Приїзд за 30 хв',
      description: 'Швидке реагування на аварійні виклики по Кам\'янцю-Подільському',
      color: 'from-purple-600 to-indigo-700',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-700',
      ariaLabel: 'Швидкий приїзд за 30 хвилин',
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="why-choose-us-heading"
      role="region"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2
            id="why-choose-us-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Чому обирають нас
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Ми надаємо якісні електромонтажні послуги з гарантією та професійним підходом
          </p>
        </motion.div>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          role="list"
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="relative"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              <article
                className="relative glass-card glass-card-hover rounded-2xl p-6 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all duration-300 h-full overflow-hidden group"
                aria-label={feature.ariaLabel}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  aria-hidden="true"
                ></div>

                {/* Icon */}
                <div
                  className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10`}
                  aria-hidden="true"
                >
                  <feature.icon
                    className={`w-8 h-8 ${feature.iconColor}`}
                    aria-hidden="true"
                    focusable="false"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div
                  className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}
                  aria-hidden="true"
                ></div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;

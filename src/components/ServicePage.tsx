import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Phone,
  CheckCircle,
  Clock,
  Shield,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../hooks/use-app';
import SEOHead from './SEOHead';
import Breadcrumbs from './Breadcrumbs';
import Header from './Header';
import Footer from './Footer';
import FloatingCallButton from './FloatingCallButton';
import BottomNav from './BottomNav';

const ServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { state } = useApp();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Find the service by ID
  const service = state.services.find((s) => s.id === serviceId);

  // If service not found, redirect to home
  if (!service) {
    return <Navigate to="/" replace />;
  }

  // Get company data
  const companyData = state.companyData;
  const primaryPhone =
    companyData?.contact?.phones?.find((p) => p.primary)?.number ??
    '+380677523103';

  // SEO: Generate title and description with geo-targeting
  const seoTitle = `${service.title} в Кам'янці-Подільському`;
  const seoDescription = `${service.description} Професійні електромонтажні роботи в Кам'янці-Подільському. Ціна ${service.price}. Гарантія 3 роки. Виклик майстра ☎ ${primaryPhone}`;

  // Schema.org Service markup
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Електрик 220В',
      telephone: primaryPhone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: "Кам'янець-Подільський",
        addressRegion: 'Хмельницька область',
        addressCountry: 'UA',
      },
    },
    areaServed: {
      '@type': 'City',
      name: "Кам'янець-Подільський",
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'UAH',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/posluhy/${serviceId}`}
        structuredData={serviceSchema}
      />

      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        <main className="pt-16 lg:pt-20">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Послуги', path: '/#services' },
              { label: service.title },
            ]}
          />

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                {service.urgent && (
                  <div className="inline-block mb-4 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full">
                    ⚡ ТЕРМІНОВО 24/7
                  </div>
                )}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  {service.title}
                  <br />
                  <span className="text-blue-100 text-2xl sm:text-3xl lg:text-4xl">
                    в Кам'янці-Подільському
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-blue-50 mb-6">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <a
                    href={`tel:${primaryPhone}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <span>Викликати електрика</span>
                  </a>
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                    <span>Кам'янець-Подільський</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Price and Info */}
          <section className="py-8 bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {service.price}
                  </div>
                  <div className="text-sm text-gray-600">Вартість послуги</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      30 хв
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Час прибуття</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      3 роки
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Гарантія</div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Features */}
          <section ref={ref} className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl font-bold text-center mb-12"
                >
                  Що входить у послугу
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300"
                    >
                      <CheckCircle
                        className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span className="text-gray-900 text-lg">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                  Чому обирають нас
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: '⚡',
                      title: 'Швидко',
                      desc: 'Приїжджаємо за 30 хвилин',
                    },
                    {
                      icon: '🛡️',
                      title: 'Надійно',
                      desc: 'Гарантія 3 роки на роботи',
                    },
                    {
                      icon: '👨‍🔧',
                      title: 'Досвід',
                      desc: '15 років на ринку',
                    },
                    {
                      icon: '💰',
                      title: 'Чесно',
                      desc: 'Прозорі ціни без накруток',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Потрібна консультація?
                </h2>
                <p className="text-xl text-blue-50 mb-8">
                  Телефонуйте прямо зараз і отримайте безкоштовну консультацію
                  від професійного електрика
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <a
                    href={`tel:${primaryPhone}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <span>{primaryPhone}</span>
                  </a>
                  <Link
                    to="/#services"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-400 transition-all duration-300"
                  >
                    <span>Інші послуги</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Service Area */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Зона обслуговування</h2>
                <p className="text-gray-600 mb-6">
                  Надаємо послуги електрика в Кам'янці-Подільському та
                  передмісті. Працюємо 24/7 без вихідних.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    "Кам'янець-Подільський",
                    'Старе місто',
                    'Новий план',
                    'Передмістя',
                    'Приватний сектор',
                  ].map((area, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingCallButton />
        <BottomNav />
      </div>
    </>
  );
};

export default ServicePage;

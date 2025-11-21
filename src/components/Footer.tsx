import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  Facebook,
  Instagram,
  MessageCircle,
  ArrowUp,
  Shield,
  Award,
} from 'lucide-react';
import { useApp } from '../hooks/use-app';

const Footer: React.FC = () => {
  const { state } = useApp();
  const companyData = state.companyData;
  const contact = companyData?.contact;
  const primaryPhone = contact?.phones?.find(p => p.primary)?.number ?? '+380 97 123 45 67';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Головна', href: '#home' },
    { label: 'Послуги', href: '#services' },
    { label: 'Про нас', href: '#about' },
    { label: 'Галерея', href: '#gallery' },
    { label: 'Відгуки', href: '#testimonials' },
    { label: 'Блог', href: '#blog' },
    { label: 'Контакти', href: '#contact' },
  ];

  const services = (state.services || []).slice(0, 6);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {companyData?.company.name ?? 'Електрик 220В'}
                </h3>
                <p className="text-gray-400 text-sm">Кам&#39;янець-Подільський</p>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {companyData?.company.tagline ??
                "Ваш надійний електрик у Кам'янці-Подільському. Професійні електричні послуги з гарантією якості."}
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  Гарантія {companyData?.company.guarantee ?? '5 років'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Award className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  Досвід {companyData?.company.experience ?? '10+ років'}
                </span>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {companyData?.social_media?.facebook && (
                <a
                  href={companyData.social_media.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {companyData?.social_media?.instagram && (
                <a
                  href={companyData.social_media.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {companyData?.social_media?.telegram && (
                <a
                  href={companyData.social_media.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Навігація
            </motion.h4>
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Services */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Послуги
            </motion.h4>
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <li key={service.id}>
                  <button
                    onClick={() => scrollToSection('#services')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left text-sm"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Контакти
            </motion.h4>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {/* Phone */}
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href={`tel:${primaryPhone}`}
                    className="text-white hover:text-blue-400 transition-colors font-medium"
                  >
                    {primaryPhone}
                  </a>
                  <p className="text-gray-400 text-sm">24/7 аварійний виклик</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href={`mailto:${contact?.email}`}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {contact?.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col items-start space-y-3">
                {/* Ми на картах */}
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJKx7hfRfHM0cR9gFI8ZPSvl4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-600 font-medium mb-2"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Ми на картах</span>
                </a>
                <div>
                  <p className="text-white">
                    {contact?.address.street}
                    <br />
                    {contact?.address.city}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              {/* Testimonials */}
              <div className="mt-6">{/* Відгуки прибрано */}</div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm">
                    Пн-Пт: {contact?.working_hours?.monday_friday ?? '9:00 - 18:00'}
                    <br />
                    Сб: {contact?.working_hours?.saturday ?? '10:00 - 16:00'}
                    <br />
                    Нд: {contact?.working_hours?.sunday ?? 'Вихідний'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Emergency CTA */}
            <motion.div
              className="mt-6 p-4 bg-red-600 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-white text-sm font-medium mb-2">Аварійна ситуація?</p>
              <a
                href={`tel:${primaryPhone}`}
                className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Дзвонити зараз
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.p
              className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © {currentYear} {companyData?.company.name ?? 'Електрик 220В'}. Всі права захищені.
            </motion.p>

            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
                <span>Розроблено з ❤️ для Кам&#39;янця-Подільського</span>
              </div>

              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors group"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

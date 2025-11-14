import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { useApp } from '../hooks/use-app';
import { QuoteRequest } from '../types';

const ContactSection: React.FC = () => {
  const { state } = useApp();
  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    phone: '',
    email: '',
    service: '',
    description: '',
    address: '',
    preferred_time: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const companyData = state.companyData;
  const contact = companyData?.contact;
  const primaryPhone = contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';

  // Google Maps configuration
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const mapsLoaderResult = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey || 'dummy-key',
    libraries: googleMapsApiKey ? ['places'] : []
  });
  const isLoaded = mapsLoaderResult?.isLoaded ?? false;
  const loadError = mapsLoaderResult?.loadError ?? null;

  const mapCenter = {
    lat: contact?.address?.coordinates?.lat ?? 48.672192,
    lng: contact?.address?.coordinates?.lng ?? 26.5671073
  };

  const mapOptions = {
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const fullAddress = `${contact?.address?.street ?? 'Рiчна 11'}, ${contact?.address?.city ?? 'Кам\'янець-Подільський'}, ${contact?.address?.region ?? 'Хмельницька область'}, ${contact?.address?.postal_code ?? '32301'}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      console.log('Bot detected');
      return;
    }

    // Client-side validation
    if (!formData.name.trim() || formData.name.length < 2) {
      setSubmitError('Будь ласка, введіть коректне ім\'я (мінімум 2 символи)');
      return;
    }

    if (!formData.phone.trim() || !/^[\d+\s\-()]{10,}$/.test(formData.phone)) {
      setSubmitError('Будь ласка, введіть коректний номер телефону');
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError('Будь ласка, введіть коректний email');
      return;
    }

    if (!formData.service) {
      setSubmitError('Будь ласка, оберіть послугу');
      return;
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      setSubmitError('Будь ласка, детально опишіть роботи (мінімум 10 символів)');
      return;
    }

    if (!formData.address.trim()) {
      setSubmitError('Будь ласка, вкажіть адресу');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to FormSubmit.co (free email forwarding service)
      // Replace 'info@elektrik220.km.ua' with your actual email
      const response = await fetch('https://formsubmit.co/ajax/info@elektrik220.km.ua', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'не вказано',
          service: formData.service,
          description: formData.description,
          address: formData.address,
          preferred_time: formData.preferred_time || 'не вказано',
          _subject: `Нова заявка від ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (!response.ok) {
        throw new Error('Помилка відправки форми');
      }

      // Success
      alert('Дякуємо за заявку! Ми зв\'яжемося з вами найближчим часом.');

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        description: '',
        address: '',
        preferred_time: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Виникла помилка при відправці. Будь ласка, зателефонуйте нам: ' + primaryPhone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-50">
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
            <Phone className="w-4 h-4" />
            <span>Зв&apos;язатися з нами</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Контакти та
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              замовлення послуг
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Зв'яжіться з нами для отримання професійної консультації та замовлення послуг електрика
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Терміновий виклик</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">{primaryPhone}</div>
                    <div className="text-blue-100 text-sm">Цілодобово для аварійних викликів</div>
                  </div>
                </a>
                {(contact?.phones?.filter(phone => !phone.primary) || []).map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone.number}`}
                    className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">{phone.number}</div>
                      <div className="text-blue-100 text-sm">{phone.type}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактна інформація</h3>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Адреса</div>
                    <div className="text-gray-600">
                      {contact?.address?.street ?? 'Рiчна 11'}<br />
                      {contact?.address?.city ?? 'Кам\'янець-Подільський'}, {contact?.address?.region ?? 'Хмельницька область'}<br />
                      {contact?.address?.postal_code ?? '32301'}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <a
                      href={`mailto:${contact?.email ?? 'info@elektrik220.km.ua'}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {contact?.email ?? 'info@elektrik220.km.ua'}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Години роботи</div>
                    <div className="text-gray-600 space-y-1">
                      <div>Пн-Пт: {contact?.working_hours?.monday_friday ?? '9:00 - 18:00'}</div>
                      <div>Сб: {contact?.working_hours?.saturday ?? '10:00 - 16:00'}</div>
                      <div>Нд: {contact?.working_hours?.sunday ?? 'Вихідний'}</div>
                      <div className="text-red-600 font-medium">Аварійний виклик: {contact?.working_hours?.emergency ?? '24/7'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            {companyData?.social_media && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Соціальні мережі</h3>
                <div className="flex space-x-4">
                  {companyData.social_media?.facebook && (
                    <a
                      href={companyData.social_media.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  )}
                  {companyData.social_media?.instagram && (
                    <a
                      href={companyData.social_media.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                  {companyData.social_media?.telegram && (
                    <a
                      href={companyData.social_media.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Form & Map */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Залишити заявку</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ім&apos;я *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Ваше ім'я"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      autoComplete="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+380 XX XXX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Послуга *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Оберіть послугу</option>
                      {(state.services || []).map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-2">
                      Бажаний час
                    </label>
                    <input
                      id="preferred_time"
                      type="text"
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Вранці, вдень, ввечері"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Адреса *
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    autoComplete="address-line1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Адреса виконання робіт"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Опис робіт *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Детально опишіть що потрібно зробити..."
                  />
                </div>

                {/* Honeypot field - hidden from users, visible to bots */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Відправити заявку</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h3 className="text-xl font-bold mb-2">Наше розташування</h3>
              <p className="text-blue-100">{fullAddress}</p>
            </div>
            <div className="h-96">
              {googleMapsApiKey && isLoaded && !loadError ? (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={mapCenter}
                  zoom={16}
                  options={mapOptions}
                >
                  <Marker
                    position={mapCenter}
                    title="Електрик 220В - Кам'янець-Подільський"
                  />
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    {loadError ? (
                      <>
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Помилка завантаження карти</p>
                        <p className="text-sm text-gray-500">Перевірте API ключ</p>
                      </>
                    ) : googleMapsApiKey ? (
                      <>
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Завантаження карти...</p>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Карта недоступна</p>
                        <p className="text-sm text-gray-500">API ключ не налаштовано</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJKx7hfRfHM0cR9gFI8ZPSvl4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Відкрити в Google Maps
                </a>
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  Зателефонувати: {primaryPhone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
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
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const companyData = state.companyData;
  const contact = companyData?.contact;
  const primaryPhone = contact?.phones.find(p => p.primary)?.number || '+380 97 123 45 67';

  const mapStyles = [
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [{ weight: '2.00' }]
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#9c9c9c' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ color: '#f2f2f2' }]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ saturation: -100 }, { lightness: 45 }]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [{ color: '#3e82f4' }, { visibility: 'on' }]
    }
  ];

  const mapOptions = {
    styles: mapStyles,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
  };

  const center = {
    lat: contact?.address.coordinates.lat || 48.6823,
    lng: contact?.address.coordinates.lng || 26.5836,
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    // Map is ready
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Дякуємо за заявку! Ми зв\'яжемося з вами найближчим часом.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        description: '',
        address: '',
        preferred_time: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
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
            <span>Зв'язатися з нами</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Контакти та
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              замовлення послуг
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Готові допомогти вам з будь-якими електричними роботами в Кам'янці-Подільському. Зв'яжіться з нами зручним способом.
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
                {contact?.phones.map((phone, index) => (
                  !phone.primary && (
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
                  )
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
                      {contact?.address.street}<br />
                      {contact?.address.city}, {contact?.address.region}<br />
                      {contact?.address.postal_code}
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
                      href={`mailto:${contact?.email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {contact?.email}
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
                      <div>Пн-Пт: {contact?.working_hours.monday_friday}</div>
                      <div>Сб: {contact?.working_hours.saturday}</div>
                      <div>Нд: {contact?.working_hours.sunday}</div>
                      <div className="text-red-600 font-medium">Аварійний виклик: {contact?.working_hours.emergency}</div>
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
                  <a
                    href={companyData.social_media.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href={companyData.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href={companyData.social_media.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ім'я *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Ваше ім'я"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+380 XX XXX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Послуга *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Оберіть послугу</option>
                      {state.services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Бажаний час
                    </label>
                    <input
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адреса *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Адреса виконання робіт"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Опис робіт *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Детально опишіть що потрібно зробити..."
                  />
                </div>

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

            {/* Map */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ми на карті</h3>
              <div className="h-80 rounded-xl overflow-hidden">
                <LoadScript googleMapsApiKey="AIzaSyCO0kKndUNlmQi3B5mxy4dblg_8WYcuKuk">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={14}
                    onLoad={onLoad}
                    options={mapOptions}
                  >
                    <Marker
                      position={center}
                      onClick={() => setShowInfoWindow(true)}
                    >
                      {showInfoWindow && (
                        <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
                          <div className="p-2">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {companyData?.company.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-2">
                              {contact?.address.street}<br />
                              {contact?.address.city}
                            </p>
                            <a
                              href={`tel:${primaryPhone}`}
                              className="text-blue-600 text-sm font-medium"
                            >
                              {primaryPhone}
                            </a>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

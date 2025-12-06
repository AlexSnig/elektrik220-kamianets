/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import { AppState, AppAction, initialState, appReducer } from './app-context-core';
import { Service, Testimonial, CompanyData, BlogArticle, ServiceSEO } from '../types';

type Language = 'uk' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  uk: {
    // Navigation
    'nav.home': 'Головна',
    'nav.services': 'Послуги',
    'nav.about': 'Про нас',
    'nav.gallery': 'Галерея',
    'nav.testimonials': 'Відгуки',
    'nav.blog': 'Блог',
    'nav.faq': 'FAQ',
    'nav.contact': 'Контакти',
    
    // Hero Section
    'hero.title': 'Електрик',
    'hero.subtitle': 'Кам\'янець-Подільський',
    'hero.tagline': '— Виклик 24/7 220В',
    'hero.description': 'Зникло світло? Вибиває автомат? Приїду за 35 хвилин цілодобово. Електромонтаж, заміна проводки, заземлення. Чек, гарантія 3 роки, 15 років досвіду.',
    'hero.cta': 'Викликати електрика',
    'hero.projects': 'Виконаних проектів',
    'hero.experience': 'Років досвіду',
    'hero.guarantee': 'Років гарантії',
    'hero.arrival': 'Час прибуття',
    
    // Loading
    'loading': 'Завантаження даних...',
    'error.title': 'Сталася помилка',
    'error.retry': 'Спробувати ще раз',
    
    // Contact
    'contact.title': 'Контакти та',
    'contact.subtitle': 'замовлення послуг',
    'contact.description': 'Готові допомогти вам з будь-якими електричними роботами в Кам\'янці-Подільському. Зв\'яжіться з нами зручним способом.',
    'contact.emergency': 'Терміновий виклик',
    'contact.phone': 'Основний номер',
    'contact.email': 'Email',
    'contact.address': 'Адреса',
    'contact.hours': 'Години роботи',
    'contact.emergency_service': 'Аварійний виклик',
    'contact.social': 'Соціальні мережі',
    'contact.form.title': 'Замовити послугу',
    'contact.form.name': 'Ім\'я',
    'contact.form.phone': 'Телефон',
    'contact.form.email': 'Email',
    'contact.form.service': 'Послуга',
    'contact.form.address': 'Адреса',
    'contact.form.time': 'Бажаний час',
    'contact.form.description': 'Опис проблеми',
    'contact.form.submit': 'Відправити заявку',
    
    // FAQ
    'faq.title': 'Часті запитання',
    'faq.subtitle': 'FAQ',
    'faq.description': 'Відповіді на найпопулярніші питання про наші послуги',
    'faq.no_answer': 'Не знайшли відповідь?',
    'faq.contact': 'Зв\'яжіться з нами для консультації. Ми відповімо на всі ваші питання!',
    'faq.call': 'Зателефонувати',
    'faq.message': 'Написати повідомлення',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.services': 'Услуги',
    'nav.about': 'О нас',
    'nav.gallery': 'Галерея',
    'nav.testimonials': 'Отзывы',
    'nav.blog': 'Блог',
    'nav.faq': 'FAQ',
    'nav.contact': 'Контакты',
    
    // Hero Section
    'hero.title': 'Электрик',
    'hero.subtitle': 'Каменец-Подольский',
    'hero.tagline': '— Вызов 24/7 220В',
    'hero.description': 'Пропал свет? Выбивает автомат? Приеду за 35 минут круглосуточно. Электромонтаж, замена проводки, заземление. Чек, гарантия 3 года, 15 лет опыта.',
    'hero.cta': 'Вызвать электрика',
    'hero.projects': 'Выполненных проектов',
    'hero.experience': 'Лет опыта',
    'hero.guarantee': 'Лет гарантии',
    'hero.arrival': 'Время прибытия',
    
    // Loading
    'loading': 'Загрузка данных...',
    'error.title': 'Произошла ошибка',
    'error.retry': 'Попробовать еще раз',
    
    // Contact
    'contact.title': 'Контакты и',
    'contact.subtitle': 'заказ услуг',
    'contact.description': 'Готовы помочь вам с любыми электрическими работами в Каменце-Подольском. Свяжитесь с нами удобным способом.',
    'contact.emergency': 'Срочный вызов',
    'contact.phone': 'Основной номер',
    'contact.email': 'Email',
    'contact.address': 'Адрес',
    'contact.hours': 'Часы работы',
    'contact.emergency_service': 'Аварийный вызов',
    'contact.social': 'Социальные сети',
    'contact.form.title': 'Заказать услугу',
    'contact.form.name': 'Имя',
    'contact.form.phone': 'Телефон',
    'contact.form.email': 'Email',
    'contact.form.service': 'Услуга',
    'contact.form.address': 'Адрес',
    'contact.form.time': 'Желаемое время',
    'contact.form.description': 'Описание проблемы',
    'contact.form.submit': 'Отправить заявку',
    
    // FAQ
    'faq.title': 'Частые вопросы',
    'faq.subtitle': 'FAQ',
    'faq.description': 'Ответы на популярные вопросы о наших услугах',
    'faq.no_answer': 'Не нашли ответ?',
    'faq.contact': 'Свяжитесь с нами для консультации. Мы ответим на все ваши вопросы!',
    'faq.call': 'Позвонить',
    'faq.message': 'Написать сообщение',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.testimonials': 'Testimonials',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Electrician',
    'hero.subtitle': 'Kamianets-Podilskyi',
    'hero.tagline': '— Call 24/7 220V',
    'hero.description': 'Power outage? Circuit breaker tripping? I\'ll arrive within 35 minutes, 24/7. Electrical installation, wiring replacement, grounding. Receipt, 3-year warranty, 15 years of experience.',
    'hero.cta': 'Call Electrician',
    'hero.projects': 'Completed Projects',
    'hero.experience': 'Years Experience',
    'hero.guarantee': 'Years Warranty',
    'hero.arrival': 'Arrival Time',
    
    // Loading
    'loading': 'Loading data...',
    'error.title': 'An error occurred',
    'error.retry': 'Try again',
    
    // Contact
    'contact.title': 'Contacts and',
    'contact.subtitle': 'service ordering',
    'contact.description': 'Ready to help you with any electrical work in Kamianets-Podilskyi. Contact us in any convenient way.',
    'contact.emergency': 'Emergency Call',
    'contact.phone': 'Main Number',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Working Hours',
    'contact.emergency_service': 'Emergency Call',
    'contact.social': 'Social Media',
    'contact.form.title': 'Order Service',
    'contact.form.name': 'Name',
    'contact.form.phone': 'Phone',
    'contact.form.email': 'Email',
    'contact.form.service': 'Service',
    'contact.form.address': 'Address',
    'contact.form.time': 'Preferred Time',
    'contact.form.description': 'Problem Description',
    'contact.form.submit': 'Send Request',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'FAQ',
    'faq.description': 'Answers to popular questions about our services',
    'faq.no_answer': 'Didn\'t find the answer?',
    'faq.contact': 'Contact us for consultation. We will answer all your questions!',
    'faq.call': 'Call Us',
    'faq.message': 'Send Message',
  },
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppAction>>(appReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Load all data concurrently
        const [servicesRes, testimonialsRes, companyRes, blogRes, serviceSEORes] = await Promise.all([
          fetch('/data/services.json'),
          fetch('/data/testimonials.json'),
          fetch('/data/company.json'),
          fetch('/data/blog.json'),
          fetch('/data/service-seo.json'),
        ]);

        if (!servicesRes.ok || !testimonialsRes.ok || !companyRes.ok || !blogRes.ok || !serviceSEORes.ok) {
          throw new Error('Failed to load data');
        }

        const [servicesData, testimonialsData, companyData, blogData, serviceSEOData] = await Promise.all([
          servicesRes.json() as Promise<{ services: Service[] }>,
          testimonialsRes.json() as Promise<{ testimonials: Testimonial[] }>,
          companyRes.json() as Promise<CompanyData>,
          blogRes.json() as Promise<{ articles: BlogArticle[] }>,
          serviceSEORes.json() as Promise<{ services: ServiceSEO[] }>,
        ]);

        // Basic runtime validation and dispatch
        if (servicesData && Array.isArray(servicesData.services)) {
          dispatch({ type: 'SET_SERVICES', payload: servicesData.services });
        }
        if (testimonialsData && Array.isArray(testimonialsData.testimonials)) {
          dispatch({ type: 'SET_TESTIMONIALS', payload: testimonialsData.testimonials });
        }
        if (companyData) {
          dispatch({ type: 'SET_COMPANY_DATA', payload: companyData });
        }
        if (blogData && Array.isArray(blogData.articles)) {
          dispatch({ type: 'SET_BLOG_ARTICLES', payload: blogData.articles });
        }
        if (serviceSEOData && Array.isArray(serviceSEOData.services)) {
          dispatch({ type: 'SET_SERVICE_SEO', payload: serviceSEOData.services });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Помилка завантаження даних' });
        console.error('Error loading data:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    // call and intentionally ignore returned promise (handled inside)
    void loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
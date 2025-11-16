import React, { Suspense, lazy } from 'react';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import ServicesSection from './components/ServicesSection';
// Lazy load heavy components to reduce initial bundle size
const CostCalculator = lazy(() => import('./components/CostCalculator'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
import Footer from './components/Footer';
import './App.css';

import { useApp } from './hooks/use-app';

function AppInner() {
  const { state } = useApp();
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <div className="animate-pulse text-center space-y-4">
          <div className="h-10 w-10 mx-auto rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <p className="font-medium">Завантаження даних...</p>
        </div>
      </div>
    );
  }
  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-700">Сталася помилка</h2>
          <p className="text-red-600">{state.error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm font-medium">Спробувати ще раз</button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="pt-16 lg:pt-20">
        <HeroSection />
        <WhyChooseUs />
        <ServicesSection />
        <Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження калькулятора...</div>}>
          <CostCalculator />
        </Suspense>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження про нас...</div>}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження галереї...</div>}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження відгуків...</div>}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження блогу...</div>}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження FAQ...</div>}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження контактів...</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;

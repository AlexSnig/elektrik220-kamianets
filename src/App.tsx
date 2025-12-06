import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import ServicesSection from './components/ServicesSection';
import WorkProcessSection from './components/WorkProcessSection';
import FloatingCallButton from './components/FloatingCallButton';
import BottomNav from './components/BottomNav';
import Skeleton from './components/ui/Skeleton';
// Lazy load heavy components to reduce initial bundle size
const CostCalculator = lazy(() => import('./components/CostCalculator'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const ServicePage = lazy(() => import('./components/ServicePage'));
import Footer from './components/Footer';
import './App.css';

import { useApp } from './hooks/use-app';

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main id="main-content" className="pt-16 lg:pt-20">
        <HeroSection />
        <WhyChooseUs />
        <ServicesSection />
        <WorkProcessSection />
        <Suspense fallback={<Skeleton variant="calculator" />}>
          <CostCalculator />
        </Suspense>
        <Suspense fallback={<Skeleton variant="section" count={4} />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<Skeleton variant="gallery" />}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<Skeleton variant="card" count={3} />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<Skeleton variant="card" count={3} />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<Skeleton variant="section" count={6} />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<Skeleton variant="section" count={1} />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <FloatingCallButton />
      <BottomNav />
    </div>
  );
}

// App Router Component
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
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm font-medium"
          >
            Спробувати ще раз
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<Skeleton variant="section" count={3} />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/posluhy/:serviceId"
          element={
            <Suspense fallback={<Skeleton variant="section" count={4} />}>
              <ServicePage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;

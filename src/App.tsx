import React from 'react';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Services Section */}
          <ServicesSection />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Gallery Section */}
          <GallerySection />
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Blog Section */}
          <BlogSection />
          
          {/* Contact Section */}
          <ContactSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;

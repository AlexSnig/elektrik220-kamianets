import React from 'react';

/**
 * Skeleton Loading Component - WCAG 2.2 Compliant
 *
 * Provides visual loading feedback for lazy-loaded components.
 * Prevents layout shift and improves perceived performance.
 *
 * @example
 * <Skeleton variant="section" />
 * <Skeleton variant="card" count={3} />
 */

interface SkeletonProps {
  /** Type of skeleton to display */
  variant?: 'section' | 'card' | 'text' | 'circle' | 'image' | 'calculator' | 'gallery';
  /** Number of skeleton items to render */
  count?: number;
  /** Custom className */
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ variant = 'section', count = 1, className = '' }) => {
  // Base skeleton animation classes
  const baseClasses = 'animate-pulse bg-gray-200 rounded-lg';

  // Skeleton variants
  const variants = {
    // Generic section skeleton
    section: () => (
      <div className={`py-12 sm:py-16 md:py-20 ${className}`} aria-busy="true" aria-live="polite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className={`${baseClasses} h-8 w-48 mx-auto mb-4`} />
            <div className={`${baseClasses} h-12 w-96 max-w-full mx-auto mb-4`} />
            <div className={`${baseClasses} h-6 w-[600px] max-w-full mx-auto`} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(count)].map((_, i) => (
              <div key={i} className={`${baseClasses} h-64`} />
            ))}
          </div>
        </div>
      </div>
    ),

    // Card skeleton (for services, testimonials, blog)
    card: () => (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
            <div className={`${baseClasses} h-16 w-16 mb-4`} />
            <div className={`${baseClasses} h-6 w-3/4 mb-3`} />
            <div className={`${baseClasses} h-4 w-full mb-2`} />
            <div className={`${baseClasses} h-4 w-5/6 mb-4`} />
            <div className={`${baseClasses} h-10 w-full`} />
          </div>
        ))}
      </div>
    ),

    // Text skeleton
    text: () => (
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <div key={i} className={`${baseClasses} h-4 w-full`} />
        ))}
      </div>
    ),

    // Circle skeleton (for avatars, icons)
    circle: () => (
      <div className={`${baseClasses} rounded-full h-16 w-16 ${className}`} />
    ),

    // Image skeleton
    image: () => (
      <div className={`${baseClasses} h-64 w-full ${className}`} />
    ),

    // Calculator skeleton
    calculator: () => (
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className={`${baseClasses} h-8 w-64 mx-auto mb-4`} />
              <div className={`${baseClasses} h-12 w-96 max-w-full mx-auto`} />
            </div>
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="space-y-6">
                <div className={`${baseClasses} h-20 w-full`} />
                <div className={`${baseClasses} h-20 w-full`} />
                <div className={`${baseClasses} h-20 w-full`} />
                <div className={`${baseClasses} h-16 w-full`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // Gallery skeleton
    gallery: () => (
      <div className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className={`${baseClasses} h-8 w-48 mx-auto mb-4`} />
            <div className={`${baseClasses} h-12 w-80 max-w-full mx-auto`} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`${baseClasses} h-64 w-full`} />
                <div className="p-6">
                  <div className={`${baseClasses} h-6 w-3/4 mb-3`} />
                  <div className={`${baseClasses} h-4 w-full mb-2`} />
                  <div className={`${baseClasses} h-4 w-5/6`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant]?.() || variants.section();
};

export default Skeleton;

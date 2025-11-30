import React from 'react';

/**
 * OptimizedImage Component - 2025 Standards
 *
 * Features:
 * - AVIF/WebP with fallback to original format
 * - Responsive images with srcset
 * - Lazy loading by default
 * - Proper aspect ratio to prevent CLS
 *
 * @example
 * <OptimizedImage
 *   src="/images/hero-electrician.jpg"
 *   alt="Професійний електрик"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   priority={true}
 * />
 */

interface OptimizedImageProps {
  /** Base image path (without extension) or full path */
  src: string;
  /** Alt text for accessibility (required) */
  alt: string;
  /** CSS classes */
  className?: string;
  /** Responsive sizes attribute */
  sizes?: string;
  /** Width for aspect ratio */
  width?: number;
  /** Height for aspect ratio */
  height?: number;
  /** Priority loading (disable lazy loading for LCP images) */
  priority?: boolean;
  /** Available responsive widths */
  widths?: number[];
  /** Object fit CSS property */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  width,
  height,
  priority = false,
  widths = [400, 800, 1200, 1920],
  objectFit = 'cover',
}) => {
  // Extract path and extension
  const pathWithoutExt = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  const originalExt = src.match(/\.(jpg|jpeg|png|webp|avif)$/i)?.[0] || '.jpg';

  /**
   * Generate srcset for a format
   */
  const generateSrcSet = (format: 'avif' | 'webp') => {
    return widths.map(w => `${pathWithoutExt}-${w}.${format} ${w}w`).join(', ');
  };

  /**
   * Generate fallback srcset for original format
   */
  const generateFallbackSrcSet = () => {
    // If original is already optimized format, use it
    if (originalExt === '.webp' || originalExt === '.avif') {
      return widths.map(w => `${pathWithoutExt}-${w}${originalExt} ${w}w`).join(', ');
    }
    // Otherwise, use the original single image
    return undefined;
  };

  return (
    <picture className={className}>
      {/* AVIF - 50% smaller than WebP! (2025 standard) */}
      <source type="image/avif" srcSet={generateSrcSet('avif')} sizes={sizes} />

      {/* WebP - 25-35% smaller than JPEG/PNG */}
      <source type="image/webp" srcSet={generateSrcSet('webp')} sizes={sizes} />

      {/* Fallback to original format */}
      <img
        src={src}
        srcSet={generateFallbackSrcSet()}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        style={{ objectFit }}
        className="w-full h-full"
      />
    </picture>
  );
};

export default OptimizedImage;

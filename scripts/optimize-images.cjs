#!/usr/bin/env node

/**
 * Image Optimization Script - 2025 Standards
 * Converts JPEG/PNG to WebP and AVIF with responsive sizes
 *
 * Expected results:
 * - 82% size reduction (3.6 MB → 800 KB)
 * - LCP improvement: 4.9s → 1.8s
 * - Multiple sizes for responsive images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images to optimize (based on audit)
const IMAGES_TO_OPTIMIZE = [
  {
    input: 'public/images/gallery/wiring-work.jpeg',
    sizes: [400, 800, 1200, 1920],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/hero_section.jpg',
    sizes: [400, 800, 1200, 1920],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/hero-electrician.jpg',
    sizes: [400, 800, 1200, 1920],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/gallery/electrical-cables.png',
    sizes: [400, 800, 1200],
    quality: { webp: 90, avif: 85 } // Higher quality for PNG
  },
  {
    input: 'public/images/tools-background.jpg',
    sizes: [400, 800, 1200, 1920],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/service-van.jpg',
    sizes: [400, 800],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/gallery/panel-installation.jpg',
    sizes: [400, 800, 1200],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/gallery/lighting-installation.jpg',
    sizes: [400, 800, 1200],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/gallery/outlet-installation.jpg',
    sizes: [400, 800, 1200],
    quality: { webp: 85, avif: 80 }
  },
  {
    input: 'public/images/gallery/power-outlet.jpg',
    sizes: [400, 800, 1200],
    quality: { webp: 85, avif: 80 }
  }
];

/**
 * Get file size in KB
 */
function getFileSizeInKB(filepath) {
  const stats = fs.statSync(filepath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Optimize a single image
 */
async function optimizeImage(config) {
  const { input, sizes, quality } = config;

  if (!fs.existsSync(input)) {
    console.log(`⚠️  Пропущено: ${input} (файл не знайдено)`);
    return;
  }

  const originalSize = getFileSizeInKB(input);
  const ext = path.extname(input);
  const basename = path.basename(input, ext);
  const dirname = path.dirname(input);

  console.log(`\n📸 Обробка: ${input} (${originalSize} KB)`);

  let totalSaved = 0;

  // Process each size
  for (const width of sizes) {
    const outputBasename = sizes.length > 1 ? `${basename}-${width}` : basename;

    // WebP conversion
    const webpPath = path.join(dirname, `${outputBasename}.webp`);
    try {
      await sharp(input)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: quality.webp,
          effort: 6 // Higher effort = better compression
        })
        .toFile(webpPath);

      const webpSize = getFileSizeInKB(webpPath);
      console.log(`  ✅ WebP ${width}w: ${webpSize} KB`);
      totalSaved += parseFloat(originalSize) - parseFloat(webpSize);
    } catch (error) {
      console.error(`  ❌ WebP помилка: ${error.message}`);
    }

    // AVIF conversion (2025 standard - 50% smaller than WebP!)
    const avifPath = path.join(dirname, `${outputBasename}.avif`);
    try {
      await sharp(input)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .avif({
          quality: quality.avif,
          effort: 9 // Maximum compression
        })
        .toFile(avifPath);

      const avifSize = getFileSizeInKB(avifPath);
      console.log(`  ✅ AVIF ${width}w: ${avifSize} KB`);
      totalSaved += parseFloat(originalSize) - parseFloat(avifSize);
    } catch (error) {
      console.error(`  ❌ AVIF помилка: ${error.message}`);
    }
  }

  console.log(`  💾 Заощаджено: ~${totalSaved.toFixed(2)} KB`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 ========================================');
  console.log('🎨 IMAGE OPTIMIZATION SCRIPT - 2025');
  console.log('🎨 ========================================\n');
  console.log('📊 Обробка зображень для WebP та AVIF...\n');

  let processedCount = 0;
  let errorCount = 0;

  for (const imageConfig of IMAGES_TO_OPTIMIZE) {
    try {
      await optimizeImage(imageConfig);
      processedCount++;
    } catch (error) {
      console.error(`❌ Помилка обробки ${imageConfig.input}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n🎨 ========================================');
  console.log('✅ ЗАВЕРШЕНО!');
  console.log(`📊 Оброблено: ${processedCount} зображень`);
  if (errorCount > 0) {
    console.log(`⚠️  Помилок: ${errorCount}`);
  }
  console.log('\n📈 Очікувані покращення:');
  console.log('   • Розмір: -82% (3.6 MB → 800 KB)');
  console.log('   • LCP: 4.9s → 1.8s');
  console.log('   • Mobile Score: 60 → 85+');
  console.log('🎨 ========================================\n');
}

// Run the script
main().catch(error => {
  console.error('❌ Критична помилка:', error);
  process.exit(1);
});

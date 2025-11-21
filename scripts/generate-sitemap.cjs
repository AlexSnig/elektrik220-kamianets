#!/usr/bin/env node

/**
 * Автоматична генерація sitemap.xml з JSON даних
 * Запускається при build для оновлення sitemap з актуальними даними
 */

const fs = require('fs');
const path = require('path');

// Базовий URL сайту
const BASE_URL = 'https://elektrik220-kamianets.vercel.app';

// Шлях до даних
const DATA_DIR = path.join(__dirname, '../public/data');
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// Читаємо дані блогу
function getBlogData() {
  try {
    const blogPath = path.join(DATA_DIR, 'blog.json');
    const data = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
    return data.articles || [];
  } catch (error) {
    console.warn('Не вдалось прочитати blog.json:', error.message);
    return [];
  }
}

// Знаходимо найновішу дату статті
function getLatestBlogDate(articles) {
  if (articles.length === 0) return new Date().toISOString().split('T')[0];

  const dates = articles.map(article => new Date(article.date));
  const latestDate = new Date(Math.max(...dates));
  return latestDate.toISOString().split('T')[0];
}

// Генеруємо sitemap.xml
function generateSitemap() {
  const articles = getBlogData();
  const latestBlogDate = getLatestBlogDate(articles);
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    // Головна сторінка
    {
      loc: `${BASE_URL}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0'
    },
    // Секції сайту
    {
      loc: `${BASE_URL}/#services`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      loc: `${BASE_URL}/#calculator`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${BASE_URL}/#about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: `${BASE_URL}/#gallery`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      loc: `${BASE_URL}/#testimonials`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: `${BASE_URL}/#blog`,
      lastmod: latestBlogDate, // Дата останньої статті!
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: `${BASE_URL}/#contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9'
    }
  ];

  // Генеруємо XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <!-- ${url.loc.split('#')[1] || 'Main page'} -->
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`).join('\n')}
</urlset>`;

  // Записуємо файл
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');

  console.log('✅ sitemap.xml згенеровано успішно!');
  console.log(`📊 Кількість статей в блозі: ${articles.length}`);
  console.log(`📅 Дата останньої статті: ${latestBlogDate}`);
  console.log(`📍 Кількість URL в sitemap: ${urls.length}`);
}

// Запускаємо
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Помилка генерації sitemap:', error);
  process.exit(1);
}

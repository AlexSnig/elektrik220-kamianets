import { test, expect } from '@playwright/test';

test.describe('Elektrik220 Website E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Електрик 220В/i);

    // Check for main company name
    await expect(page.getByText('Електрик 220В')).toBeVisible();
  });

  test('should display header with navigation', async ({ page }) => {
    // Check header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check for logo/company name in header
    await expect(header.getByText('Електрик 220В')).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    // Check for hero section content
    await expect(page.getByText(/Кам'янець-Подільський/i)).toBeVisible();
    await expect(page.getByText(/24\/7/i)).toBeVisible();
  });

  test('should have clickable phone number', async ({ page }) => {
    // Find phone link
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
  });

  test('should navigate to services section', async ({ page }) => {
    // Click on services link (if visible in menu)
    const servicesSection = page.locator('#services');
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(servicesSection).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Check for contact information in footer
    await expect(footer.getByText('Контакти')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile menu button exists
    const mobileMenuButton = page.locator('button[aria-label*="меню"]').first();
    await expect(mobileMenuButton).toBeVisible();

    // Company name should still be visible
    await expect(page.getByText('Електрик 220В')).toBeVisible();
  });

  test('should have working scroll navigation', async ({ page }) => {
    // Scroll to contact section
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeInViewport();
  });

  test('should load all lazy-loaded sections', async ({ page }) => {
    // Scroll through page to trigger lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait a bit for lazy components to load
    await page.waitForTimeout(1000);

    // Check for various sections
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    // Check for semantic HTML
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

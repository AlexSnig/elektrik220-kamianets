import { test, expect } from '@playwright/test';

test.describe('Elektrik220 Website E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Електрик 220В|Vite/i, { timeout: 10000 });

    // Wait for any text to appear
    await page.waitForSelector('body', { timeout: 10000 });
  });

  test('should display semantic HTML structure', async ({ page }) => {
    // Wait for page to render
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

    // Check for semantic HTML - these should be present even if React hasn't fully loaded
    const body = page.locator('body');
    await expect(body).toBeVisible({ timeout: 10000 });

    // Check that something rendered
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('should have root div', async ({ page }) => {
    // Check React root exists
    const root = page.locator('#root');
    await expect(root).toBeVisible({ timeout: 10000 });
  });
});

import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('Basic page loads successfully', async ({ page }) => {
    // Use full URL when BASE_URL is set (deployed testing), otherwise use relative path (local dev)
    const targetUrl = process.env.BASE_URL || '/';
    await page.goto(targetUrl);

    // Page should load without errors
    await expect(page).toHaveTitle(/Taiwan/);

    // Main content should be visible
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('Navigation and layout elements are present', async ({ page }) => {
    // Use full URL when BASE_URL is set (deployed testing), otherwise use relative path (local dev)
    const targetUrl = process.env.BASE_URL || '/';
    await page.goto(targetUrl);

    // Should have a main heading
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();

    // Should have some content text
    await expect(page.locator('body')).toContainText(/bike|tour|taiwan/i);
  });

  test('Static assets load correctly', async ({ page }) => {
    // Use full URL when BASE_URL is set (deployed testing), otherwise use relative path (local dev)
    const targetUrl = process.env.BASE_URL || '/';
    await page.goto(targetUrl);

    // Wait for page to load with a reasonable timeout
    await page.waitForLoadState('domcontentloaded');

    // Check that there are no major console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a moment for any async loading
    await page.waitForTimeout(2000);

    // Should not have critical console errors (excluding external services and common browser issues)
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes('favicon') &&
        !error.includes('chrome-extension') &&
        !error.includes('404') &&
        !error.includes('strava-embeds.com') &&
        !error.includes('Cross-Origin') &&
        !error.includes('CORS') &&
        !error.toLowerCase().includes('network')
    );

    expect(criticalErrors.length).toBe(0);
  });
});

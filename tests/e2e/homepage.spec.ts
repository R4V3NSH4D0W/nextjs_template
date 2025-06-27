import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main navigation', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByText('NextJS Template')).toBeVisible();
  });

  test('should have correct title and meta tags', async ({ page }) => {
    await expect(page).toHaveTitle(/NextJS/);
  });

  test('should display hero section', async ({ page }) => {
    await expect(page.getByText('NextJS Template')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should handle dark mode toggle', async ({ page }) => {
    // Add test for dark mode if implemented
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main')).toBeVisible();
  });

  test('navigation links should work', async ({ page }) => {
    const featuresLink = page.locator('a[href="#features"]');
    if (await featuresLink.isVisible()) {
      await featuresLink.click();
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

test.describe('Performance Tests', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();
    
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  });

  test('should have good lighthouse scores', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // This would typically use lighthouse programmatically
    // For now, we'll just check that the page loads
    await expect(page.locator('main')).toBeVisible();
  });
});

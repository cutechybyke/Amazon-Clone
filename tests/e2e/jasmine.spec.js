import { test, expect } from '@playwright/test';

test('Jasmine browser suite passes', async ({ page }) => {
  await page.goto('/tests/tests.html');

  const result = page.locator('.jasmine-overall-result');
  await expect(result).toContainText(/specs?, \d+ failures?/i, { timeout: 30000 });
  await expect(result).toContainText('0 failures');
});

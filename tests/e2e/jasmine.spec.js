import { test, expect } from '@playwright/test';

test('Jasmine browser suite passes', async ({ page }) => {
  await page.goto('/tests/tests.html');
  await page.waitForFunction(() => {
    const status = document.querySelector('.jasmine-overall-result');
    return status && /finished/i.test(status.textContent || '');
  }, { timeout: 30000 });

  const failures = await page.locator('.jasmine-failure-list .jasmine-failed').count();
  expect(failures).toBe(0);

  const overall = await page.locator('.jasmine-overall-result').textContent();
  expect(overall).toContain('0 failures');
});

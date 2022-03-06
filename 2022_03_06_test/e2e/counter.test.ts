import { test, expect } from '@playwright/test';

test('counter test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const counter = page.locator('[data-test-id="counter"]');
  await expect(counter.first()).toBeVisible();
  await expect(counter).toHaveText('Count: 0');
  await counter.click();
  await expect(counter).toHaveText('Count: 1');
});

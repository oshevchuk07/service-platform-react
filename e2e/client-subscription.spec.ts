import { test, expect } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/user.json' });

test('client can subscribe to a plan', async ({ page }) => {
  await page.goto('/app/pricing');

  const firstPlanCard = page.locator('div', { hasText: /Subscribe/i }).first();
  await firstPlanCard.getByRole('button', { name: /Subscribe/i }).click();

  await expect(page.getByText(/Subscription accepted/i)).toBeVisible();

  await page.goto('/app/subscription');
  await expect(page.getByText(/My subscriptions/i)).toBeVisible();
});
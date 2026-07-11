import { test, expect } from '@playwright/test';

test.use({ storageState: 'e2e/.auth/admin.json' });

test('admin can create a new plan', async ({ page }) => {
  await page.goto('/app/plans');

  await page.getByRole('button', { name: /New plan/i }).click();
  await page.getByLabel(/Name/i).fill(`E2E Test Plan ${Date.now()}`);
  await page.getByLabel(/price \/ month/i).fill('49');
  await page.getByLabel(/Price \/ year/i).fill('490');
  await page.getByRole('button', { name: /Save/i }).click();

  await expect(page.getByText(/Plan created/i)).toBeVisible();
});

test('admin cannot access users page as non-admin', async ({ page }) => {
  await page.context().addCookies([]);
  await page.goto('/app/users');
  await expect(page.getByText(/users \(admin only\)/i)).toBeVisible();
});
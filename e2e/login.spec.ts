import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } }); 

test('user can log in with valid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('test@test.com');
  await page.getByLabel(/Password/i).fill('123456');
  await page.getByRole('button', { name: /Login/i }).click();

  await expect(page).toHaveURL('/app');
  await expect(page.getByText(/dashboard/i)).toBeVisible();
});

test('shows error on invalid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('wrong@test.com');
  await page.getByLabel(/Paswword/i).fill('wrongpass');
  await page.getByRole('button', { name: /Login/i }).click();

  await expect(page.getByText(/Wrong password or login/i)).toBeVisible();
  await expect(page).toHaveURL('/login');
});
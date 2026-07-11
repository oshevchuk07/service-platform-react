import { test as setup, expect } from '@playwright/test';

const adminFile = 'e2e/.auth/admin.json';
const userFile = 'e2e/.auth/user.json';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('admin@test.com');
  await page.getByLabel(/Password/i).fill('123456');
  await page.getByRole('button', { name: /Login/i }).click();
  await expect(page).toHaveURL('/app');
  await page.context().storageState({ path: adminFile });
});

setup('authenticate as user', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('test@test.com');
  await page.getByLabel(/Password/i).fill('123456');
  await page.getByRole('button', { name: /Login/i }).click();
  await expect(page).toHaveURL('/app');
  await page.context().storageState({ path: userFile });
});
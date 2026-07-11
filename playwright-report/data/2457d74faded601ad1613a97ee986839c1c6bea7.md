# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fixtures\auth.setup.ts >> authenticate as admin
- Location: e2e\fixtures\auth.setup.ts:6:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:5173/app"
Received: "http://localhost:5173/login"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "http://localhost:5173/login"

```

```yaml
- heading "Login" [level=1]
- text: Email
- textbox "Email"
- text: Password
- textbox "Password"
- button "Login"
- region "Notifications alt+T"
- button "Open Tanstack query devtools":
  - img
```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | 
  3  | const adminFile = 'e2e/.auth/admin.json';
  4  | const userFile = 'e2e/.auth/user.json';
  5  | 
  6  | setup('authenticate as admin', async ({ page }) => {
  7  |   await page.goto('/login');
  8  |   await page.getByLabel(/email/i).fill('admin@test.com');
  9  |   await page.getByLabel(/Password/i).fill('123456');
  10 |   await page.getByRole('button', { name: /Login/i }).click();
> 11 |   await expect(page).toHaveURL('/app');
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  12 |   await page.context().storageState({ path: adminFile });
  13 | });
  14 | 
  15 | setup('authenticate as user', async ({ page }) => {
  16 |   await page.goto('/login');
  17 |   await page.getByLabel(/email/i).fill('test@test.com');
  18 |   await page.getByLabel(/Password/i).fill('123456');
  19 |   await page.getByRole('button', { name: /Login/i }).click();
  20 |   await expect(page).toHaveURL('/app');
  21 |   await page.context().storageState({ path: userFile });
  22 | });
```
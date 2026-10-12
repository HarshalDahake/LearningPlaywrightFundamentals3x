import { test, expect, Locator } from '@playwright/test';

test('Verify total amount', async ({ page }) => {

    await page.goto('https://demo.applitools.com/'); // - 14533ms

    await page.locator('#username').fill('Admin'); // - 157ms
    await page.locator('#password').fill('Password@123'); // - 83ms

    await page.locator('#log-in').click(); // - 5267ms

    await page.waitForTimeout(2000); // - 2000ms

    await expect(page).toHaveURL('https://demo.applitools.com/app.html'); // - 121ms

    // Get all transaction amounts
    let amounts = await page.locator('table tbody tr td:last-child').allTextContents(); // - 45ms

    let total = 0;

    // Calculate total
    for (let amount of amounts) {

        let value = Number(amount.replaceAll('USD', '').replaceAll(',', '').replaceAll(' ', '').replace('+', ''));

        total = total + value;
    }

    console.log('Total Amount:', total);

    // Assertion
    expect(total).toBe(1996.22); // - 1ms

});


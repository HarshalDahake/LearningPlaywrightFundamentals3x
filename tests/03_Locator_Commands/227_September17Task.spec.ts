import {test, expect} from '@playwright/test';

test('tc#1 - Verify that the vwo page is loaded', async ({page}) =>{

    // Open URL.
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter",{
        waitUntil: "domcontentloaded",
        timeout: 5000,
        referer: "https://app.thetestingacademy.com"      
    });

    let userNameField = page.locator("#email");
    let passwordField = page.locator("#password");
    let rememberMe = page.locator("//input[@type='checkbox']");
    let loginButton = page.locator("//button[@data-testid='login-button']");

    // Enter Username.
    await userNameField.fill("test@example.com");
    // Enter Password.
    await passwordField.fill("123456");
    // Click on Remember Me checkbox.
    await rememberMe.click();
    // Click on Login button.
    await loginButton.click();

    // Assertion: Verify the URL after login.
    await expect(page).toHaveURL("https://app.thetestingacademy.com/playwright/multiple_element_filter?email=test%40example.com&password=123456&remember=yes#login-success");
})
import { test, expect, Locator } from '@playwright/test';

test('Basic verify how to handle multiple elements ', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    const listOfLocators_Links: Locator[] =  await page.locator('a.list-group-item').all();
    console.log(listOfLocators_Links.length);

    for(const locator_link of listOfLocators_Links)
    {
        console.log(locator_link ); // This are the locators
        console.log(await locator_link.getAttribute('href')); // This is the href attribute of the locator
    }
    
    await page.pause();

});
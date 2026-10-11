import {test, expect} from '@playwright/test';

test('QA Profile Form', async ({page}) => 
{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page');
    await page.getByTestId("first-name").fill('Mitansh');
    await page.getByTestId("last-name").fill('Dahake');
    await page.getByTestId("gender-male").click();
    await page.getByTestId("years-experience").selectOption('7');
    await page.getByTestId("profile-date").fill('2026-05-28');
    await page.getByTestId("profession-automation").click();
    await page.getByTestId("tool-selenium").check();
    await page.getByTestId("tool-protractor").check();

    const continents = page.locator("//input[@name='continents']");
    const continentsCount = await continents.count();
    for (let i = 0; i < continentsCount; i++) {
        await continents.nth(i).check();
    }

    await page.getByTestId("profile-submit").click();
    
    await page.locator("#submission-output").isVisible();
    const output = await page.locator("#submission-output").innerText();
    console.log(output);

    const jsonOutput = JSON.parse(output);
    expect (jsonOutput.firstName).toBe('Mitansh');
    expect (jsonOutput.lastName).toBe('Dahake');
    expect (jsonOutput.gender).toBe('Male');
    expect (jsonOutput.yearsExperience).toBe('7');
    expect (jsonOutput.date).toBe('2026-05-28');
    expect (jsonOutput.profession).toBe('Automation Tester');
    expect (jsonOutput.tools).toContain('Selenium Webdriver');
    expect (jsonOutput.tools).toContain('Protractor');
    const expectedValues = ['Asia', 'Europe', 'Africa', 'Australia', 'South America', 'North America'];
    expect (jsonOutput.continents).toEqual(expect.arrayContaining(expectedValues));
   
    await page.pause();
});
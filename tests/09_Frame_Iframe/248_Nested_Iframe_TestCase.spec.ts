import { test, expect, Locator, FrameLocator } from '@playwright/test';

test('Fill fields in nested iframes', async ({ page }) => 
{
  await page.goto('https://selectorshub.com/iframe-scenario/');

  let frame1: FrameLocator = page.frameLocator('iframe#pact1:visible');
  let frame2: FrameLocator = frame1.frameLocator('#pact2');
  let frame3: FrameLocator = frame2.frameLocator('#pact3');

  await frame1.locator('#inp_val').first().fill("Aishwarya Rai");
  await frame2.locator('#jex').fill('Wife');
  await frame3.locator('#glaf').fill('Playwright');

  await expect(frame1.locator('#inp_val').first()).toHaveValue('Aishwarya Rai');
  await expect(frame2.locator('#jex')).toHaveValue('Wife');
  await expect(frame3.locator('#glaf')).toHaveValue('Playwright');

  const headerText = await frame1.locator('h3').innerText();
  console.log(headerText);

  const headerText2 = await frame2.locator('h4').innerText();
  console.log(headerText2);

  await page.pause();
});
import { test, expect, Locator, FrameLocator } from '@playwright/test';

test('Verify Advance Custom DropDowns', async ({ page }) => {

  await page.goto('https://app.thetestingacademy.com/playwright/frames/multi-frames');
  
  let mainFrame: FrameLocator = await page.frameLocator("[name = 'main']");
  let mainFrameText = await mainFrame.locator('h2').innerText();
  console.log("Main Frame Text is : " + mainFrameText);

  const allFrames: Locator[] = await page.locator('//frame').all();
  console.log('total number of frames: ' + allFrames.length);
  
  for(const frame of allFrames)
  {
     console.log(await frame.getAttribute('name'), ': ', await frame.getAttribute('src'));
  }

  let sideFrame: FrameLocator = await page.frameLocator('[name="side"]');
  await sideFrame.getByTestId('side-link-registration').click();


  await mainFrame.locator('#RESULT_TextField-1').fill('Hyundai i10');
  await mainFrame.locator('#RESULT_TextField-2').fill('Harshal Dahake');
  await mainFrame.locator('#RESULT_TextField-3').fill('2012');
  await mainFrame.locator('#RESULT_RadioButton-1').selectOption('Hatchback');

  await mainFrame.locator('#RESULT_TextField-4').fill('2015');

  await mainFrame.locator('#RESULT_TextArea-1').fill('Amazing car with amazing family car in a budget');

  await mainFrame.getByText('Submit registration', { exact: true }).click();

  let output = await mainFrame.locator("#vehicle-output").innerText();
  console.log(output);


  await page.pause();
});
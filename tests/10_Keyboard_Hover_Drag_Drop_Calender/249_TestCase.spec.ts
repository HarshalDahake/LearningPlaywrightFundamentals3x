import { test, expect, Locator } from '@playwright/test';

test('Verify the TestCase', async ({ page }) => {
   await page.goto("https://keycode.info");

   await page.keyboard.press('A');
   await page.screenshot({ path: 'C:/Users/admin/Desktop/PlayWright with TypeScript/WorkSpace/LearningPlaywrightFundamentals3x/tests/10_Keyboard_Hover_Drag_Drop_Calender/A.png' });

   await page.keyboard.press('ArrowLeft');
   await page.screenshot({ path: 'C:/Users/admin/Desktop/PlayWright with TypeScript/WorkSpace/LearningPlaywrightFundamentals3x/tests/10_Keyboard_Hover_Drag_Drop_Calender/ArrowLeft.png' });


   await page.keyboard.press('Shift+O');
   await page.screenshot({ path: 'C:/Users/admin/Desktop/PlayWright with TypeScript/WorkSpace/LearningPlaywrightFundamentals3x/tests/10_Keyboard_Hover_Drag_Drop_Calender/O.png' });

   await page.keyboard.up("Shift");
   await page.keyboard.down("Shift");


   await page.pause();
});
import { test, expect, Locator } from '@playwright/test';

test('Verify the Webtable Example 1', async ({ page }) => {
   await page.goto("https://app.thetestingacademy.com/playwright/webtable");

   //tbody[@id='employee-body']/tr[3]/td[2]
   const firstPart = "//tbody[@id='employee-body']/tr[";
   const secondPart = "]/td[";
   const thirdPart = "]";

    const rows = await page.locator("//tbody[@id='employee-body']/tr").count();
    const cols = await page.locator("//tbody[@id='employee-body']/tr[1]/td").count();

   for (let i = 1; i <= rows; i++) {

      for (let j = 1; j <= cols; j++) {

         const dynamicPath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
         const data = await page.locator(dynamicPath).innerText();

         if (data.includes('Rohan.Mehta')) 
         {
            const chekBox = `${dynamicPath}/preceding-sibling::td`;
            page.locator(chekBox).click();
         }
      }
   }

   await page.pause();
});

//tbody[@id='employee-body']
//tbody[@id='employee-body']/tr[3]
//tbody[@id='employee-body']/tr[3]/td[2]   -> Rohan.Mehta
//tbody[@id='employee-body']/tr[3]/td[2]/preceding-sibling::td -> Select
//tbody[@id='employee-body']/tr[3]/td[2]/following-sibling::td -> Employee Name

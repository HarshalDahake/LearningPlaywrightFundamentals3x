import { test, expect, Locator } from '@playwright/test';

test('Verify the TestCase', async ({ page }) => {
   await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

   let name: string = 'Luca Greco';
   let row;

   while(true)
   {
        row = page.locator("#employees-tbody tr").filter({ hasText: name });
        if(await row.count())
        {
            break;
        }

        const next = page.getByTestId('next-page');
        if(await next.isDisabled())
        {
            throw new Error(`Could not find row with name ${name}`);
        }
        await next.click();
   }

   const email = await row.locator('td[data-col="email"]').innerText();
   const country = await row.locator('td[data-col="country"]').innerText();

   console.log(name, email, country);

   await page.pause();

});

//Objective : Find the on this page - [app.thetestingacademy.com/playwright/tables/webtable](https://app.thetestingacademy.com/playwright/tables/webtable) 
//find the Luca Greco in which country he is present and email ID.

/*
Short explanation:
It opens the page: https://app.thetestingacademy.com/playwright/tables/webtable
It keeps searching the table rows for the name “Luca Greco”
If the name is not on the current page, it clicks the “next page” button
It repeats until it finds the row or no more pages are left
Once found, it reads:
email from the cell with data-col="email"
country from the cell with data-col="country"
Then it logs the values and pauses the browser for inspection
In simple words: “Find Luca Greco in the table, then print his email and country.”
*/


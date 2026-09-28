import {test , expect} from '@playwright/test';

test("TC#1 - Verify that the CURA page is loaded", async({page})=>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/",{
        timeout: 5000,
        waitUntil: "domcontentloaded",
        referer: "https://katalon-demo-cura.herokuapp.com/"
    })

    let makeAppointmentButton = page.locator("#btn-make-appointment");
    await makeAppointmentButton.click();

    let userName = page.locator("#txt-username");
    await userName.fill("John Doe");

    let password = page.locator("#txt-password");
    await password.fill("ThisIsNotAPassword");

    let loginButton = page.locator("#btn-login");
    await loginButton.click();

    let loginSuccessMessage = page.locator("//h2[text()='Make Appointment']");
    await expect(loginSuccessMessage).toContainText("Make Appointment");

})
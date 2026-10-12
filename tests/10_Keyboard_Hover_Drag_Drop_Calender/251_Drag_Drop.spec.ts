import { test, expect, Locator } from '@playwright/test';

test('Verify drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop', {
        waitUntil: 'domcontentloaded',
    });

    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');

    await columnA.dragTo(columnB);

    await expect(columnA).toContainText('B');
    await expect(columnB).toContainText('A');
});
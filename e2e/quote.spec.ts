import { test, expect } from '@playwright/test'

let urlQuote = "http://localhost:3000/quote";

test.beforeAll(async () => {
    console.log('Before tests');
});

test.afterAll(async () => {
    console.log('After tests');
});

test.describe('Header area', () => {
    test('The title tag', async({ page }) => {
        await page.goto(urlQuote)

        await expect(page).toHaveTitle('Anime Quote Search Page');
    })

    test('The meta tag', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto(urlQuote)

        const metaDescriptionOne = page.locator('meta[name="author"]')
        await expect(metaDescriptionOne).toHaveAttribute("content", "Mio Takagi")

        const metaDescriptionThree = page.locator('meta[name="description"]');
        await expect(metaDescriptionThree).toHaveAttribute("content", "You can either see all the Anime quotes, or look up by Anime name")
    })

    test('The link tag', async ({ page }) => {
        await page.goto(urlQuote)

        const linkTag = page.locator('link[rel="icon"]');
        await expect(linkTag).toHaveAttribute('href', '/favicon.ico')
    })
})

test.describe('Main area', () => {
    test('number of button for desktop', async({ page }) => {
        await page.goto(urlQuote)

        await page.setViewportSize({ width: 1920, height: 1080 });

        await expect(page.locator('button')).toHaveCount(2);
    })

    test('number of button for tablet', async({ page }) => {
        await page.goto(urlQuote)

        await page.setViewportSize({ width: 768, height: 1024 });

        await expect(page.locator('button')).toHaveCount(2);
    })

    test('number of button for mobile', async({ page }) => {
        await page.goto(urlQuote)

        await page.setViewportSize({ width: 414, height: 896});

        await expect(page.locator('button')).toHaveCount(2);
    })

    test('background image position for desktop', async({ page }) => {
        await page.goto(urlQuote)

        await page.setViewportSize({ width: 1920, height: 1080 });

        const backgroundSize = await page.locator('span').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("background-position")
        })
        console.log(backgroundSize);
        expect(backgroundSize).toBe("right bottom");
    })

    test('background image position for tablet', async({ page }) => {
        await page.goto(urlQuote)

        await page.setViewportSize({ width: 768, height: 1024 });

        const backgroundSize = await page.locator('span').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("background-position")
        })
        console.log(backgroundSize);
        expect(backgroundSize).toBe("center bottom%");
    })

    test('background image position for mobile', async({ page }) => {
        await page.goto(urlQuote)

        await page.setViewportSize({ width: 414, height: 896});

        const backgroundSize = await page.locator('span').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("background-position")
        })
        console.log(backgroundSize);
        expect(backgroundSize).toBe("center bottom");
    })
})

import { test, expect } from '@playwright/test'

let urlHome = "http://localhost:3000";

test.beforeAll(async () => {
    console.log('Before tests');
});

test.afterAll(async () => {
    console.log('After tests');
});

test.describe('Header area', () => {
    test('The title tag', async({ page }) => {
        await page.goto(urlHome)

        await expect(page).toHaveTitle('Welcome to Anime Quotes');
    })

    test('The meta tag', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto(urlHome)

        const metaDescriptionOne = page.locator('meta[name="author"]')
        await expect(metaDescriptionOne).toHaveAttribute("content", "Mio Takagi")

        const metaDescriptionThree = page.locator('meta[name="description"]');
        await expect(metaDescriptionThree).toHaveAttribute("content", "This is a website that you can search Anime quotes")
    })

    test('The link tag', async ({ page }) => {
        await page.goto(urlHome)

        const linkTag = page.locator('link[rel="icon"]');
        await expect(linkTag).toHaveAttribute('href', '/favicon.ico')
    })
})

test.describe('Main area', () => {
    test('H1 font-size for desktop', async({ page }) => {
        await page.goto(urlHome)

        await page.setViewportSize({ width: 1920, height: 1080 });

        const grabbedFontSize = await page.locator('h1').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("font-size")
        })
        console.log(grabbedFontSize);
        expect(grabbedFontSize).toBe("96px");
    })

    test('H1 font-size for tablet', async({ page }) => {
        await page.goto(urlHome)

        await page.setViewportSize({ width: 768, height: 1024 });

        const grabbedFontSize = await page.locator('h1').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("font-size")
        })
        console.log(grabbedFontSize);
        expect(grabbedFontSize).toBe("48px");
    })

    test('H1 font-size for mobile', async({ page }) => {
        await page.goto(urlHome)

        await page.setViewportSize({ width: 414, height: 896});

        const grabbedFontSize = await page.locator('h1').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("font-size")
        })
        console.log(grabbedFontSize);
        expect(grabbedFontSize).toBe("32px");
    })

    test('background image size for desktop', async({ page }) => {
        await page.goto(urlHome)

        await page.setViewportSize({ width: 1920, height: 1080 });

        const backgroundSize = await page.locator('span').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("background-size")
        })
        console.log(backgroundSize);
        expect(backgroundSize).toBe("cover");
    })

    test('background image size for tablet', async({ page }) => {
        await page.goto(urlHome)

        await page.setViewportSize({ width: 768, height: 1024 });

        const backgroundSize = await page.locator('span').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("background-size")
        })
        console.log(backgroundSize);
        expect(backgroundSize).toBe("100%");
    })

    test('background image size for mobile', async({ page }) => {
        await page.goto(urlHome)

        await page.setViewportSize({ width: 414, height: 896});

        const backgroundSize = await page.locator('span').evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("background-size")
        })
        console.log(backgroundSize);
        expect(backgroundSize).toBe("100%");
    })
})

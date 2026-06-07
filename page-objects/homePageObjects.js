import {Page, expect, test, chromium, firefox, webkit, devices} from '@playwright/test'
import { count } from 'node:console'

export class HomePage {

    constructor(page) {
        this.page = page
    }


    async homePageLoad() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('body')).toBeVisible()
    }

    async pageTitle() {
        const pageTitle = await this.page.title()
        await expect(pageTitle).toEqual('Ludigames | Free Online Games')
    }

    async gameCategories() {
        const gameCategories = await this.page.locator('.container-i').nth(1).textContent()
        expect(gameCategories).toContain('Action games')
        expect(gameCategories).toContain('Sport games')
        expect(gameCategories).toContain('Family games')
        expect(gameCategories).toContain('Casual')
        expect(gameCategories).toContain('Racing games');
        expect(gameCategories).toContain('Adventure games');
        expect(gameCategories).toContain('Simulation games');
        expect(gameCategories).toContain('Strategy games');
        expect(gameCategories).toContain('Logic games');
        expect(gameCategories).toContain('Boardgames');
        expect(gameCategories).toContain('All games');
    }

    async featuredGamesVisible() {
        const featuredGames = this.page.locator('.category-v6 .container-i > a')
    
        const count = await featuredGames.count()

        for(let i = 0; i < count; i++) {

            const game = featuredGames.nth(i)
      
            const href = await game.getAttribute('href')

            console.log(`Game ${i}: ${href}`)

            expect(href).toBeTruthy()
        }
    }

    async featuredGamesClickable() {
        const featuredGames = this.page.locator('.category-v6 .container-i > a')
        test.slow()

        const count = await featuredGames.count()

        for(let i = 0; i < count; i++) {
            const href = await featuredGames.nth(i).getAttribute('href')

            console.log(`Checking link ${i}: ${href}`)

            await this.page.goto(`https://play.ludigames.com/?utm_source=gameloft&utm_medium=bookmark&utm_campaign=CRT03${href}`)

            await expect(this.page).toHaveURL(/.+/)

            await expect(this.page.locator('body')).toBeVisible()
        }
    }

    async pageStabilityAcrossBrowser() {
        const configs = [
            { name: 'Chrome Desktop', browserType: chromium, device: null },
            { name: 'Firefox Desktop', browserType: firefox, device: null },
            { name: 'Safari Desktop', browserType: webkit, device: null },
        
            { name: 'iPhone 15 Safari', browserType: webkit, device: devices['iPhone 15'] },
            { name: 'Pixel 7 Chrome', browserType: chromium, device: devices['Pixel 7'] },
          ];
        
        for (const config of configs) {
            const browser = await config.browserType.launch();
        
            const context = config.device
            ? await browser.newContext({...config.device,})
            : await browser.newContext();
        
            const page = await context.newPage();
        
            const response = await this.page.goto('https://play.ludigames.com/?utm_source=gameloft&utm_medium=bookmark&utm_campaign=CRT03');
        
            expect(response?.ok()).toBeTruthy();
        
            console.log(`${config.name} passed`);
        
            await context.close();
            await browser.close();
        }
        
    }
    
}
import {Page, expect, test, chromium, firefox, webkit, devices} from '@playwright/test'
import { count } from 'node:console'

export class HomePage {

    constructor(page) {
        this.page = page
    }


    async homePageLoad() {
        await this.page.waitForLoadState('networkidle')
    }

    async pageTitle() {
        const pageTitle = await this.page.title()
        return pageTitle
    }

    async gameCategories() {
        const gameCategories = await this.page.locator('.container-i').nth(1).textContent()
        return gameCategories
    }

    async featuredGamesVisible() {
        const featuredGames = this.page.locator('.category-v6 .container-i > a')
    
        const count = await featuredGames.count()

        for(let i = 0; i < count; i++) {

            const game = featuredGames.nth(i)
      
            const href = await game.getAttribute('href')

            console.log(`Game ${i}: ${href}`)

        }

        return featuredGames

    }

    async featuredGamesClickable() {
        const featuredGamesClick = this.page.locator('.category-v6 .container-i > a')
        test.slow()

        const count = await featuredGamesClick.count()

        for(let i = 0; i < count; i++) {
            const href = await featuredGamesClick.nth(i).getAttribute('href')

            console.log(`Checking link ${i}: ${href}`)

            await this.page.goto(`https://play.ludigames.com/?utm_source=gameloft&utm_medium=bookmark&utm_campaign=CRT03${href}`)
        }

        return featuredGamesClick

    }

    async pageStabilityAcrossBrowser() {
        const configs = [
            { name: 'Chrome Desktop', browserType: chromium, device: null },
            { name: 'Firefox Desktop', browserType: firefox, device: null },
            { name: 'Safari Desktop', browserType: webkit, device: null },
        
            { name: 'iPhone 15 Safari', browserType: webkit, device: devices['iPhone 15'] },
            { name: 'Pixel 7 Chrome', browserType: chromium, device: devices['Pixel 7'] },
          ];
        
        let assertArray = []

        for (const config of configs) {
            const browser = await config.browserType.launch();
        
            const context = config.device
            ? await browser.newContext({...config.device,})
            : await browser.newContext();
        
            const page = await context.newPage();
        
            const response = await this.page.goto('https://play.ludigames.com/?utm_source=gameloft&utm_medium=bookmark&utm_campaign=CRT03');
            if (response) {
                assertArray.push(true)
            } else {
                assertArray.push(false)
            }
            console.log(`${config.name} passed`);
        
            await context.close();
            await browser.close();
        }

        return !assertArray.includes(false)
        
    }
    
}
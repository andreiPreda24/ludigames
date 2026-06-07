import {Page, expect} from '@playwright/test'

export class Games {

    constructor(page) {
        this.page = page
    }

    async launch() {
        await this.page.getByRole('link').nth(3).click()
        await this.page.locator('#game-frame').contentFrame().locator('iframe[title="3rd party ad content"]').contentFrame().getByRole('button', { name: 'Close ad' }).click()
    }
}
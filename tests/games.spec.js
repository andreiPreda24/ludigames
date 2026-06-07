import {test, expect} from '@playwright/test'
import { Games } from '../page-objects/gamesObjects'

let games;

test.beforeEach(async({page}) => {
    
    await page.goto('https://play.ludigames.com/?utm_source=gameloft&utm_medium=bookmark&utm_campaign=CRT03')
    await page.getByRole('button', { name: 'Agree and close: Agree to our' }).click()
    games = new Games(page)
})

test.describe('Games', () => {

    test('GL-001 - Launch a game from homepage - Game starts successfully', async({page}) => {
        await games.launch()
        await expect(page.locator('#game-frame')).toBeVisible()
    })
})
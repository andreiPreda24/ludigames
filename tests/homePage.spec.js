import {test, expect} from '@playwright/test'
import { HomePage } from '../page-objects/homePageObjects'

let homePage;

test.beforeEach(async({page}) => {
  await page.goto('https://play.ludigames.com/?utm_source=gameloft&utm_medium=bookmark&utm_campaign=CRT03')
  await page.getByRole('button', { name: 'Agree and close: Agree to our' }).click()
  homePage = new HomePage(page)
})

test.describe('Homepage', () => {

  test('HP-001 - Open homepage URL', async({page}) => {
    await homePage.homePageLoad()
    await expect(page.locator('body')).toBeVisible()
  })

  test('HP-002 - Verify page title Correct page title displayed', async({page}) => {
    const pageTtile = await homePage.pageTitle()
    await expect(pageTtile).toEqual('Ludigames | Free Online Games')
  })

  test('HP-003 - Verify game categories are displayed - Categories load without errors', async({page}) => {
    const gameCategory = await homePage.gameCategories()
    expect(gameCategory).toContain('Action games')
    expect(gameCategory).toContain('Sport games')
    expect(gameCategory).toContain('Family games')
    expect(gameCategory).toContain('Casual')
    expect(gameCategory).toContain('Racing games');
    expect(gameCategory).toContain('Adventure games');
    expect(gameCategory).toContain('Simulation games');
    expect(gameCategory).toContain('Strategy games');
    expect(gameCategory).toContain('Logic games');
    expect(gameCategory).toContain('Boardgames');
    expect(gameCategory).toContain('All games');
  })

  test('HP-004 - Verify featured games section - Featured games visible', async({page}) => {
    const gameVisibility = await homePage.featuredGamesVisible()
    expect(gameVisibility).toBeTruthy()
  })

  test('HP-004 - Verify featured games section - Featured games clickable', async({page}) => {
    const clickOnGame = await homePage.featuredGamesClickable()
    await expect(page).toHaveURL(/.+/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('HP-005 - Verify page loads on Chrome, Firefox, Safari, Edge - Consistent behavior across browsers and mobile', async({page}) => {
    const browserBehavior = await homePage.pageStabilityAcrossBrowser()
    expect(browserBehavior).toBeTruthy();
  })
    
})


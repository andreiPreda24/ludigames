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
  })

  test('HP-002 - Verify page title Correct page title displayed', async({page}) => {
    await homePage.pageTitle()
  })

  test('HP-003 - Verify game categories are displayed - Categories load without errors', async({page}) => {
    await homePage.gameCategories()
  })

  test('HP-004 - Verify featured games section - Featured games visible', async({page}) => {
    await homePage.featuredGamesVisible()
  })

  test('HP-004 - Verify featured games section - Featured games clickable', async({page}) => {
    await homePage.featuredGamesClickable()
  })

  test('HP-005 - Verify page loads on Chrome, Firefox, Safari, Edge - Consistent behavior across browsers and mobile', async({page}) => {
    await homePage.pageStabilityAcrossBrowser()
  })
    
})


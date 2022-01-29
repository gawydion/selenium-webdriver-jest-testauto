// chromedriver reference: https://www.npmjs.com/package/chromedriver#running-with-selenium-webdriver
require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')
const { getChromeWebDriver } = require('../utils/drivers')

// test timeout 5 minutes
jest.setTimeout(300000)

/**
 * Scenario:
 *    1.0 Navigate to npm homepage - https://www.npmjs.com/
 *      1.1 Validate that the title matches expected homepage title
 *    2.0 Fill up search field using my search criteria (selenium-webdriver), then hit enter key
 *      2.1 Validate that the title matches expected search page title
 *      2.2 Validate that we have a result that matches our search criteria
 *      2.3 Validate that result matches our keywords
 *    3.0 Click on the package that matches our criteria
 *      3.1 Validate that the title matches expected package page title
 *      3.2 Validate that this package matches our search criteria
 */
describe('Order a book on http://practice.automationtesting.in/', () => {
  it('1 open Shop page', async () => {

    // webriver initiation
    const driver = getChromeWebDriver()

    //wait untill page is ready
    try {
      await driver.get(`http://practice.automationtesting.in/`)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // check page title
      const homepageTitle = await driver.getTitle()
      expect(homepageTitle).toEqual('Automation Practice Site')

      // open login screen
      const myAccButton = await driver.findElement(By.xpath(`//li[contains(@class, 'menu-item')][2]`)) //todo -> czemu ten xpath nie dziala? //li//a[contains(text(), 'My Account')]/@href
      expect(myAccButton).toBeTruthy()
      await myAccButton.click()

      // login to portal
      await driver
      .wait(until.elementLocated(By.xpath(`//input[@name='username']`)))
      .sendKeys('gawydion@gmail.com')

      await driver
      .wait(until.elementLocated(By.xpath(`//input[@name='password']`)))
      .sendKeys('Jebacpis111', Key.ENTER)

      // check correct login
      const myAccountPageTitle = await driver.getTitle()
      expect(myAccountPageTitle).toEqual('My Account – Automation Practice Site')

      // go to shop page
      const myShopButton = await driver.findElement(By.xpath(`//li[contains(@class, 'menu-item')][1]`)) //todo -> czemu ten xpath nie dziala? //li//a[contains(text(), 'My Account')]/@href
      expect(myShopButton).toBeTruthy()
      await myShopButton.click()

      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // check page title
      const productPageTitle = await driver.getTitle()
      expect(productPageTitle).toEqual('Products – Automation Practice Site')

      // click on android book
      const androidBook = await driver.findElement(By.xpath(`//li[contains(@class, 'product')]//descendant::h3[contains(text(), 'Android Quick Start Guide')]`)) 
      expect(androidBook).toBeTruthy()
      await androidBook.click()

      //todo check the title
      //todo save the price

      // add to basket
      const addToBasketButton = await driver.findElement(By.xpath(`//button[@type='submit']`)) 
      expect(addToBasketButton).toBeTruthy()
      await addToBasketButton.click()

      //todo check popup "“Android Quick Start Guide” has been added to your basket."

      //go to basket
      const cartButton = await driver.findElement(By.xpath(`//li[contains(@class, 'wpmenucart-display-standard')]`)) 
      expect(cartButton).toBeTruthy()
      await cartButton.click()

      // const listingMatch = await driver.findElement(By.xpath(`//section//a[.//h3[.='selenium-webdriver']]`))
      // await listingMatch.click()

      // await driver.wait(10000)

    //   // 2.0 Fill up search field using my search criteria (selenium-webdriver), then hit enter key
    //   await driver
    //     .wait(until.elementLocated(By.xpath(`//input[@name='q']`)))
    //     .sendKeys('selenium-webdriver', Key.ENTER)

    //   // Wait until browser loads completely
    //   await driver.sleep(2000)
    //   await driver.wait(() => {
    //     return driver.executeScript('return document.readyState').then(state => {
    //       return state === 'complete'
    //     })
    //   }, 120000)

    //   // 2.1 Validate that the title matches expected search page title
    //   const searchPageTitle = await driver.getTitle()
    //   expect(searchPageTitle).toEqual('selenium-webdriver - npm search')

    //   // 2.2 Validate that we have a result that matches our search criteria
      // const listingMatch = await driver.findElement(By.xpath(`//section//a[.//h3[.='selenium-webdriver']]`))
      // expect(listingMatch).toBeTruthy()

    //   // 2.3 Validate that result matches our keywords
    //   const keywords = ['automation', 'selenium', 'testing', 'webdriver', 'webdriverjs']
    //   for (keyword of keywords) {
    //     const keywordMatch = await driver.findElement(
    //       By.xpath(`//section//a[.//h3[.='selenium-webdriver']]/ancestor::div[contains(@class, 'items-end')]/following-sibling::ul/li/a[.='${keyword}']`)
    //     )
    //     expect(keywordMatch).toBeTruthy()
    //   }

      // // 3.0 Click on the package that matches our criteria
      // await listingMatch.click()

    //   // Wait until browser loads completely
    //   await driver.sleep(2000)
    //   await driver.wait(() => {
    //     return driver.executeScript('return document.readyState').then(state => {
    //       return state === 'complete'
    //     })
    //   }, 120000)

    //   // 3.1 Validate that the title matches expected package page title
    //   const packagePageTitle = await driver.getTitle()
    //   expect(packagePageTitle).toEqual('selenium-webdriver - npm')

      // 3.2 Validate that this package matches our search criteria
      //const packageTitle = await driver.findElement(By.xpath(`//h2//span[.='selenium-webdriver']`))
      //expect(packageTitle).toBeTruthy()
    } 
    // webriver quit
    finally {
      await driver.quit()
     }
   })
})

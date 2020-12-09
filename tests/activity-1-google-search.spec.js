// chromedriver reference: https://www.npmjs.com/package/chromedriver#running-with-selenium-webdriver
require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')

// test timeout 5 minutes
jest.setTimeout(300000)

describe('npmjs.com package search', () => {
  it('basic package search', async () => {

    // generate options for chrome
    const chromeOptions = new Options()
    // detailed info for these args: https://peter.sh/experiments/chromium-command-line-switches/
    chromeOptions.addArguments('--no-sandbox')
    chromeOptions.addArguments('--disable-gpu')
    chromeOptions.addArguments('--disable-dev-shm-usage')
    // turn off headless by removing this
    // chromeOptions.addArguments('--headless')
    chromeOptions.windowSize({ width: 1920, height: 1080 })

    // selenium webdriver
    const driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build()

    try {
      await driver.get(`https://www.google.com/`)

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      const homepageTitle = await driver.getTitle()
      expect(homepageTitle).toEqual('Google')

      await driver
        .wait(until.elementLocated(By.xpath(`//input[@name='q']`)))
        .sendKeys('selenium bootcamp', Key.ENTER)

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      const searchPageTitle = await driver.getTitle()
      expect(searchPageTitle).toEqual('selenium bootcamp - Google Search')

      const listingMatch = await driver.findElement(By.xpath(`//*[@id="rso"]/div[1]/div/div[1]/a/h3/span`))
      expect(listingMatch).toBeTruthy()

      const listingText = await listingMatch.getText()
      expect(/selenium|bootcamp/ig.test(listingText)).toBeTruthy()
    } finally {
      await driver.quit()
    }
  })
})

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

      //empty basket
      let cartButton = await driver.findElement(By.xpath(`//li[contains(@class, 'wpmenucart-display-standard')]`)) 
      expect(cartButton).toBeTruthy()
      await cartButton.click()

      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      try{
        const productRemoveButton = await driver.findElement(By.xpath(`//td[@class='product-remove']/a[@title='Remove this item']`)) 
        expect(productRemoveButton).toBeTruthy()
        await productRemoveButton.click()
      }catch(e){
        if(e.name === 'NoSuchElementError') {
          console.debug('basket is emtpy - proceeding')
        }
      }
  
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
      cartButton = await driver.findElement(By.xpath(`//li[contains(@class, 'wpmenucart-display-standard')]`)) 
      expect(cartButton).toBeTruthy()
      await cartButton.click()

      //todo check the title
      //todo check the price
      //todo check the quantity

      // proceed to checkout
      const checkoutButton = await driver.findElement(By.xpath(`//div[@class='wc-proceed-to-checkout']/a`)) 
      expect(checkoutButton).toBeTruthy()
      await checkoutButton.click()

      //todo fill the form
      //input[@id='billing_first_name']
      //input[@id='billing_last_name']
      //input[@id='billing_email']
      //input[@id='billing_phone']
      //input[@id='billing_address_1']
      //input[@id='billing_postcode']
      //input[@id='billing_city']

      const countrySelectDropDown = await driver.findElement(By.xpath(`//div[@id='s2id_billing_country']`)) 
      expect(countrySelectDropDown).toBeTruthy()
      await countrySelectDropDown.click()

      await driver
      .wait(until.elementLocated(By.xpath(`//input[@id='s2id_autogen1_search']`)))
      .sendKeys('Poland', Key.ENTER)

      //todo check price again

      //payment method
      const paymentMethodCheckBox = await driver.findElement(By.xpath(`//input[@id='payment_method_cheque']`)) 
      expect(paymentMethodCheckBox).toBeTruthy()
      await paymentMethodCheckBox.click()

      //place order
      
      const placeOrderButton = await driver.findElement(By.xpath(`//input[@id='place_order']`)) 
      expect(placeOrderButton).toBeTruthy()
      await placeOrderButton.click()

      await driver.sleep(10000) //ten sleep pomaga - trzeba poczekać az sie order detail zaladuje

      //final check
      const orderDetailsPage = await driver.findElement(By.xpath(`//div[@class='woocommerce']//descendant::h2[contains(text(), 'Order Details')]`)) 
    } 
    // webriver quit
    finally {
      await driver.quit()
     }
   })
})




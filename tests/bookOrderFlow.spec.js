require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')
var {driver} = require('../index.js');
const HomePage = require ('../pages/homePage.js');
const LoginPage = require ('../pages/loginPage.js');
const CartPage = require ('../pages/cartPage.js');
const ShopPage = require ('../pages/shopPage.js');
const ProductPage = require ('../pages/productPage.js');

// test timeout 5 minutes
jest.setTimeout(300000)

/**
 * Scenario:
 * todo
 */

describe('Order a book on http://practice.automationtesting.in/', () => {
  beforeAll(async () => {
    HomePage.visit()
    LoginPage.openFromTopMenu()
    await LoginPage.loginToPortal()
    await CartPage.openFromTopMenu()
    await CartPage.emptyCart()
  })

  afterAll(async () => {
    await driver.quit()
  })

  test('Buy a book', async () => {

    await ShopPage.openFromTopMenu()
    await ShopPage.pickProduct()
    await ProductPage.isLoaded()
    await ProductPage.addToBasket()
    await CartPage.openFromTopMenu()
    await CartPage.proceedToCheckout()

      //todo check the title
      //todo save the price
      //todo check popup "“Android Quick Start Guide” has been added to your basket."

      //todo check the title
      //todo check the price
      //todo check the quantity

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
   })
  })
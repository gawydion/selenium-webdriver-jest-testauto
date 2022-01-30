require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')
var {driver} = require('../index.js');
const HomePage = require ('../pages/homePage.js');
const LoginPage = require ('../pages/loginPage.js');
const CartPage = require ('../pages/cartPage.js');
const ShopPage = require ('../pages/shopPage.js');
const ProductPage = require ('../pages/productPage.js');
const CheckoutPage = require ('../pages/checkoutPage.js');
const OrderDetailsPage = require ('../pages/orderDetailsPage.js');

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
    //tutaj się pojawia stale element ponizej
    await CartPage.openFromTopMenu()
    await CartPage.proceedToCheckout()
    await CheckoutPage.isLoaded()
    await CheckoutPage.setBillingCountry()
    await CheckoutPage.setPaymentMethod()
    await CheckoutPage.placeOrder()

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

      //todo check price again

      //await driver.sleep(10000) //ten sleep pomaga - trzeba poczekać az sie order detail zaladuje

      //final check
      await driver.wait(until.elementLocated(OrderDetailsPage.orderDetailsHeaderSelector, 10000));
      const orderDetailsPage = await driver.findElement(OrderDetailsPage.orderDetailsHeaderSelector)
   })
  })
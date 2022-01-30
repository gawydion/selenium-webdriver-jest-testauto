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
let config = require('../env-config.json');

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

  test('Buy a book', async () => { // podzielic to na it - ogarnac raport

    await ShopPage.openFromTopMenu()
    await ShopPage.pickProduct()
    await ProductPage.isLoaded()

    const bookTitle = await driver.findElement(ProductPage.bookTittleSelector).getText()
    expect(bookTitle === config.book.tittle)

    await ProductPage.addToBasket()

    //tutaj się pojawia stale element ponizej
    await CartPage.openFromTopMenu()
    await CartPage.proceedToCheckout()
    await CheckoutPage.isLoaded()

    await CheckoutPage.setCustomerForm()
    
    await CheckoutPage.placeOrder()

      //todo check the title
      //todo save the price
      //todo check popup "“Android Quick Start Guide” has been added to your basket."

      //todo check the title
      //todo check the price
      //todo check the quantity

      //todo check price again

      //final check
      await driver.wait(until.elementLocated(OrderDetailsPage.orderDetailsHeaderSelector, 10000));
      const orderDetailsPage = await driver.findElement(OrderDetailsPage.orderDetailsHeaderSelector)
   })
  })
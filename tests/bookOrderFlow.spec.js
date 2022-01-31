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

    let bookTitle = await driver.findElement(ProductPage.bookTittleSelector).getText() //dorobic gettery 
    expect(bookTitle === config.book.tittle)

    let bookPrice = await driver.findElement(ProductPage.bookPriceSelector).getText()
    expect(bookPrice === config.book.price)

    await ProductPage.addToBasket()
    //todo check popup "“Android Quick Start Guide” has been added to your basket."

    //sprawdzić cene w top menu
    //tutaj się pojawia stale element ponizej, dlatego ze sie zmienia cart -> kwota sie pojawia -> ogarnac
    await CartPage.openFromTopMenu()

    bookPrice = await driver.findElement(CheckoutPage.orderSubtotalPriceSelector).getText() //dorobic gettery 
    expect(bookPrice === config.book.price)

    bookTitle = await driver.findElement(CheckoutPage.bookTitleSelector).getText()
    expect(bookTitle === config.book.tittle)

    await CartPage.proceedToCheckout()
    await CheckoutPage.isLoaded()

    await CheckoutPage.setCustomerForm()
    
    await CheckoutPage.placeOrder()

    //final check
    await driver.wait(until.elementLocated(OrderDetailsPage.orderDetailsHeaderSelector, 10000));
    const orderDetailsPage = await driver.findElement(OrderDetailsPage.orderDetailsHeaderSelector)

    bookTitle = await driver.findElement(OrderDetailsPage.bookTitleSelector).getText() //dorobic gettery 
    expect(bookTitle === config.book.tittle)

    bookPrice = await driver.findElement(OrderDetailsPage.orderTotalPriceSelector).getText()
    expect(bookPrice === config.book.price)
   })
  })
require('chromedriver')
const { until } = require('selenium-webdriver')
var {driver} = require('../index.js');
const HomePage = require ('../pages/homePage.js');
const LoginPage = require ('../pages/loginPage.js');
const CartPage = require ('../pages/cartPage.js');
const ShopPage = require ('../pages/shopPage.js');
const ProductPage = require ('../pages/productPage.js');
const CheckoutPage = require ('../pages/checkoutPage.js');
const OrderDetailsPage = require ('../pages/orderDetailsPage.js');
let config = require('../env-config.json');

jest.setTimeout(60000)

/**
 * Scenario:
 * [1] Pick a book and check tittle and price in product page
 * [2] Add a book to the basket, check price and title in the basket
 * [3] Fill the form in checkout page, place the order, check the price and the title in the order details page
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

  test('[1] Pick a book and check tittle and price in product page', async () => { 
    await ShopPage.openFromTopMenu()
    await ShopPage.pickProduct()
    await ProductPage.isLoaded()

    let bookTitle = await driver.findElement(ProductPage.bookTittleSelector).getText()
    let bookPrice = await driver.findElement(ProductPage.bookPriceSelector).getText()
    
    expect(bookTitle === config.book.tittle)
    expect(bookPrice === config.book.price)
  })

  test('[2] Add a book to the basket, check price and title in the basket', async () => { 
    await ProductPage.addToBasket()
    //todo check popup "“Android Quick Start Guide” has been added to your basket."

    //sprawdzić cene w top menu
    //tutaj się pojawia stale element ponizej, dlatego ze sie zmienia cart -> kwota sie pojawia -> ogarnac
    await CartPage.openFromTopMenu()

    let bookPrice = await driver.findElement(CartPage.orderSubtotalPriceSelector).getText()
    let bookTitle = await driver.findElement(CartPage.bookTitleSelector).getText()

    expect(bookPrice === config.book.price)
    expect(bookTitle === config.book.tittle)
  })

  test('[3] Fill the form in checkout page, place the order, check the price and the title in the order details page', async () => { 
    await CartPage.proceedToCheckout()
    await CheckoutPage.isLoaded()
    await CheckoutPage.setCustomerForm()
    await CheckoutPage.placeOrder()

    await driver.wait(until.elementLocated(OrderDetailsPage.orderDetailsHeaderSelector, 10000));

    let bookTitle = await driver.findElement(OrderDetailsPage.bookTitleSelector).getText() 
    let bookPrice = await driver.findElement(OrderDetailsPage.orderTotalPriceSelector).getText()

    expect(bookPrice === config.book.price)
    expect(bookTitle === config.book.tittle)
   })
  })
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
 * [1] Pick a book, check tittle and price in product page
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

  test('Order a book on http://practice.automationtesting.in/', async () => { 
    console.log('[1] Pick a book and check tittle and price in product page')
    await ShopPage.openFromTopMenu()
    await ShopPage.pickProduct()
    await ProductPage.isLoaded()

    let bookTitle = await driver.findElement(ProductPage.bookTittleSelector).getText()
    let bookPrice = await driver.findElement(ProductPage.bookPriceSelector).getText()
    
    expect(bookTitle === config.book.tittle)
    expect(bookPrice === config.book.price)

    console.log('[2] Add a book to the basket, check price and title in the basket')
    await ProductPage.addToBasket()

    let cartPrice = await driver.findElement(CartPage.cartPriceSelector).getText()
    expect(cartPrice === config.book.currency + config.book.price)

    await CartPage.openFromTopMenu()

    bookPrice = await driver.findElement(CartPage.orderSubtotalPriceSelector).getText()
    bookTitle = await driver.findElement(CartPage.bookTitleSelector).getText()

    expect(bookPrice === config.book.price)
    expect(bookTitle === config.book.tittle)

    console.log('[3] Fill the form in checkout page, place the order, check the price and the title in the order details page')
    await CartPage.proceedToCheckout()
    await CheckoutPage.isLoaded()
    await CheckoutPage.setCustomerForm()
    await CheckoutPage.placeOrder()

    await driver.wait(until.elementLocated(OrderDetailsPage.orderDetailsHeaderSelector, 10000));

    bookTitle = await driver.findElement(OrderDetailsPage.bookTitleSelector).getText() 
    bookPrice = await driver.findElement(OrderDetailsPage.orderTotalPriceSelector).getText()

    expect(bookPrice === config.book.price)
    expect(bookTitle === config.book.tittle)
   })
  })
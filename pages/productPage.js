const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class ProductPage extends Page{

    get addToBasketButtonSelector() {return By.xpath(`//button[@type='submit']`)} 
    get bookTittleSelector()        {return By.xpath(`//h1[@class = 'product_title entry-title' and text() = '${config.book.tittle}']`)}
    get bookPriceSelector()         {return By.xpath(`//span[@class = 'woocommerce-Price-amount amount' and text() = '${config.book.price}']`)}

    async addToBasket () {
      const addToBasketButton = await driver.findElement(this.addToBasketButtonSelector)
      expect(addToBasketButton).toBeTruthy()
      await addToBasketButton.click()
    }
}
module.exports = new ProductPage();
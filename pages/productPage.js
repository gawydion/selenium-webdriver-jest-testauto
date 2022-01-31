const Page = require ('./page');
var {driver} = require('../index.js');
const { By } = require('selenium-webdriver')

class ProductPage extends Page{

    get addToBasketButtonSelector() {return By.xpath(`//button[@type='submit']`)} 
    get bookTittleSelector()        {return By.xpath(`//h1[@class = 'product_title entry-title']`)}
    get bookPriceSelector()         {return By.xpath(`//span[@class = 'woocommerce-Price-amount amount']`)}

    async addToBasket () {
      const addToBasketButton = await driver.findElement(this.addToBasketButtonSelector)
      expect(addToBasketButton).toBeTruthy()
      await addToBasketButton.click()
    }
}
module.exports = new ProductPage();
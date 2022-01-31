const Page = require ('./page');
var {driver} = require('../index.js');
const { By } = require('selenium-webdriver')
let config = require('../env-config.json');

class ShopPage extends Page{

    get shopButtonSelector() {return By.xpath(`//li[contains(@class, 'menu-item')][1]`)} 
    get productSelector() {return By.xpath(`//li[contains(@class, 'product')]//descendant::h3[contains(text(), '${config.book.tittle}')]`)} //todo

    async openFromTopMenu () {
        const shopButton = await driver.findElement(this.shopButtonSelector) 
        expect(shopButton).toBeTruthy()
        await shopButton.click()
        await this.isLoaded()
    }

    async pickProduct(){
      const androidBook = await driver.findElement(this.productSelector) 
      expect(androidBook).toBeTruthy()
      await androidBook.click()
    }

}
module.exports = new ShopPage();
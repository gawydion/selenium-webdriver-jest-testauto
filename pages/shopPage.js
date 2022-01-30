const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class ShopPage extends Page{

    get shopButtonSelector() {return By.xpath(`//li[contains(@class, 'menu-item')][1]`)} 
    get productSelector() {return By.xpath(`//li[contains(@class, 'product')]//descendant::h3[contains(text(), 'Android Quick Start Guide')]`)}


    async openFromTopMenu () {
        const shopButton = await driver.findElement(this.shopButtonSelector) 
        expect(shopButton).toBeTruthy()
        await shopButton.click()
        await this.isLoaded()
    }

    //todo format string - title
    //todo wywalic tittle do env conf
    async pickABook(){
      const androidBook = await driver.findElement(this.productSelector) 
      expect(androidBook).toBeTruthy()
      await androidBook.click()
    }

}
module.exports = new ShopPage();
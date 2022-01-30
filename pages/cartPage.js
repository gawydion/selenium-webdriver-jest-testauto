const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class CartPage extends Page{

    get cartButtonSelector() {return By.xpath(`//li[contains(@class, 'wpmenucart-display-standard')]`)} 
    get removeItemFromCartButtonSelector() {return By.xpath(`//td[@class='product-remove']/a[@title='Remove this item']`)}

    async openFromTopMenu () {
        const cartButton = await driver.findElement(this.cartButtonSelector) 
        expect(cartButton).toBeTruthy()
        await cartButton.click()
        await this.isLoaded()
    }

    async emptyCart (){
        try{
            const productRemoveButton = await driver.findElement(this.removeItemFromCartButtonSelector) 
            expect(productRemoveButton).toBeTruthy()
            await productRemoveButton.click()
          }catch(e){
            if(e.name === 'NoSuchElementError') {
              console.debug('basket is emtpy - proceeding')
            }
          }
    }
}
module.exports = new CartPage();
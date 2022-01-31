const Page = require ('./page');
var {driver} = require('../index.js');
const { By } = require('selenium-webdriver')

class CartPage extends Page{

    get cartButtonSelector()               {return By.xpath(`//li[contains(@class, 'wpmenucart-display-standard')]`)} 
    get removeItemFromCartButtonSelector() {return By.xpath(`//td[@class='product-remove']/a[@title='Remove this item']`)}
    get proceedToCheckoutButtonSelector()  {return By.xpath(`//div[@class='wc-proceed-to-checkout']/a`)}
    get orderSubtotalPriceSelector()       {return By.xpath(`//tr[@class='cart-subtotal']//span[@class = 'woocommerce-Price-amount amount']`)}
    get bookTitleSelector()                {return By.xpath(`//td[@class='product-name']//a`)}

    async openFromTopMenu () {
        const cartButton = await driver.findElement(this.cartButtonSelector) 
        expect(cartButton).toBeTruthy()
        await cartButton.click()
        await this.isLoaded()
    }

    async proceedToCheckout (){
      const checkoutButton = await driver.findElement(this.proceedToCheckoutButtonSelector) 
      expect(checkoutButton).toBeTruthy()
      await checkoutButton.click()
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
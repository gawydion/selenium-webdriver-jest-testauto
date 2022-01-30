const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class CheckoutPage extends Page{

    get billingCountrySelector() {return By.xpath(`//div[@id='s2id_billing_country']`)} 
    get billingCountrySearchSelector() {return By.xpath(`//input[@id='s2id_autogen1_search']`)}
    get paymentMethodCheckBoxSelector() {return By.xpath(`//input[@id='payment_method_cheque']`)}
    get placeOrderButtonSelector(){return By.xpath(`//input[@id='place_order']`)}

    async proceedToCheckout (){
      const checkoutButton = await driver.findElement(this.proceedToCheckoutButtonSelector) 
      expect(checkoutButton).toBeTruthy()
      await checkoutButton.click()
    }

    async setBillingCountry (){
      const countrySelectDropDown = await driver.findElement(this.billingCountrySelector) 
      expect(countrySelectDropDown).toBeTruthy()
      await countrySelectDropDown.click()

      await driver
      .wait(until.elementLocated(this.billingCountrySearchSelector))
      .sendKeys('Poland', Key.ENTER)
    }

    async setPaymentMethod (){
      const paymentMethodCheckBox = await driver.findElement(this.paymentMethodCheckBoxSelector) 
      expect(paymentMethodCheckBox).toBeTruthy()
      await paymentMethodCheckBox.click()
    }

    async placeOrder (){
      const placeOrderButton = await driver.findElement(this.placeOrderButtonSelector) 
      expect(placeOrderButton).toBeTruthy()
      await placeOrderButton.click()
    }

    
}
module.exports = new CheckoutPage();
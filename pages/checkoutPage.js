const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class CheckoutPage extends Page{

    get billingCountrySelector()        {return By.xpath(`//div[@id='s2id_billing_country']`)} 
    get billingCountrySearchSelector()  {return By.xpath(`//input[@id='s2id_autogen1_search']`)}
    get paymentMethodCheckBoxSelector() {return By.xpath(`//input[@id='payment_method_cheque']`)}
    get placeOrderButtonSelector()      {return By.xpath(`//input[@id='place_order']`)}

    get billingFirstNameSelector()      {return By.xpath(`//input[@id='billing_first_name']`)}
    get billingLastNameSelector()       {return By.xpath(`//input[@id='billing_last_name']`)}
    get billingEmailSelector()          {return By.xpath(`//input[@id='billing_email']`)}
    get billingPhoneSelector()          {return By.xpath(`//input[@id='billing_phone']`)}
    get billingAddress1Selector()       {return By.xpath(`//input[@id='billing_address_1']`)}
    get billingPostcodeSelector()       {return By.xpath(`//input[@id='billing_postcode']`)}
    get billingCitySelector()           {return By.xpath(`//input[@id='billing_city']`)}

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

    async setCustomerForm (){
      await this.cleartCustomerForm()
      await driver.wait(until.elementLocated(this.billingFirstNameSelector)).sendKeys(config.testuser.firstName)
      await driver.wait(until.elementLocated(this.billingLastNameSelector)).sendKeys(config.testuser.lastName)
      await driver.wait(until.elementLocated(this.billingEmailSelector)).sendKeys(config.testuser.email)
      await driver.wait(until.elementLocated(this.billingPhoneSelector)).sendKeys(config.testuser.phoneNumber)
      await driver.wait(until.elementLocated(this.billingAddress1Selector)).sendKeys(config.testuser.address)
      await driver.wait(until.elementLocated(this.billingPostcodeSelector)).sendKeys(config.testuser.postcode)
      await driver.wait(until.elementLocated(this.billingCitySelector)).sendKeys(config.testuser.city)
      await this.setBillingCountry()
      await this.setPaymentMethod()
    }

    
    async cleartCustomerForm (){
      await driver.wait(until.elementLocated(this.billingFirstNameSelector)).clear()
      await driver.wait(until.elementLocated(this.billingLastNameSelector)).clear()
      await driver.wait(until.elementLocated(this.billingEmailSelector)).clear()
      await driver.wait(until.elementLocated(this.billingPhoneSelector)).clear()
      await driver.wait(until.elementLocated(this.billingAddress1Selector)).clear()
      await driver.wait(until.elementLocated(this.billingPostcodeSelector)).clear()
      await driver.wait(until.elementLocated(this.billingCitySelector)).clear()
    }

    
}
module.exports = new CheckoutPage();
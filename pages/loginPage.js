const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class LoginPage extends Page{

    get inputNameSelector()       {return By.xpath(`//input[@name='username']`)}
    get inputPasswordSelector()   {return By.xpath(`//input[@id='password']`)}
    get myAccountButtonSelector() {return By.xpath(`//li[contains(@class, 'menu-item')][2]`)} //todo -> czemu ten xpath nie dziala? //li//a[contains(text(), 'My Account')]/@href

    async openFromTopMenu () {
        const accButton = await driver.findElement(this.myAccountButtonSelector) //todo -> czemu ten xpath nie dziala? //li//a[contains(text(), 'My Account')]/@href
        expect(accButton).toBeTruthy()
        await accButton.click()
        this.isLoaded()
    }

    async loginToPortal (){
        await driver.wait(until.elementLocated(this.inputNameSelector)).sendKeys(config.testuser.email) //todo env config ogarnac
        await driver.wait(until.elementLocated(this.inputPasswordSelector)).sendKeys('Jebacpis111', Key.ENTER)
        const myAccountPageTitle = await driver.getTitle()
        expect(myAccountPageTitle).toEqual('My Account – Automation Practice Site')
    }
}
module.exports = new LoginPage();
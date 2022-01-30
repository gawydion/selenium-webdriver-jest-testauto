const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')

class LoginPage extends Page{

    get inputName()       {return By.xpath(`//input[@name='password']`)}
    get inputPassword()   {return By.xpath(`//input[@name='username']`)}
    get myAccountButton() {return By.xpath(`//li[contains(@class, 'menu-item')][2]`)} //todo -> czemu ten xpath nie dziala? //li//a[contains(text(), 'My Account')]/@href

    async openFromTopMenu () {
        const myAccButton = await driver.findElement(this.myAccountButton) //todo -> czemu ten xpath nie dziala? //li//a[contains(text(), 'My Account')]/@href
        expect(myAccButton).toBeTruthy()
        await myAccButton.click()
    }
}
module.exports = new LoginPage();
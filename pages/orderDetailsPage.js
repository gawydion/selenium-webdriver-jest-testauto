const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class OrderDetailsPage extends Page{

    get orderDetailsHeaderSelector() {return By.xpath(`//div[@class='woocommerce']//descendant::h2[contains(text(), 'Order Details')]`)} 

}
module.exports = new OrderDetailsPage();
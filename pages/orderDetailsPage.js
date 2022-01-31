const Page = require ('./page');
var {driver} = require('../index.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
let config = require('../env-config.json');

class OrderDetailsPage extends Page{

    get orderDetailsHeaderSelector() {return By.xpath(`//div[@class='woocommerce']//descendant::h2[contains(text(), 'Order Details')]`)} 
    get orderTotalPriceSelector()    {return By.xpath(`//td[@class='product-total']//span[@class = 'woocommerce-Price-amount amount' and text() = '${config.book.price}']`)} 
    get bookTitleSelector()          {return By.xpath(`//td[@class='product-name']//a[text() = '${config.book.tittle}']`)}      

}
module.exports = new OrderDetailsPage();
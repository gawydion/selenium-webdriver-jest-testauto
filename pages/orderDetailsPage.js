const Page = require ('./page');
const { By } = require('selenium-webdriver')

class OrderDetailsPage extends Page{

    get orderDetailsHeaderSelector() {return By.xpath(`//div[@class='woocommerce']//descendant::h2[contains(text(), 'Order Details')]`)} 
    get orderTotalPriceSelector()    {return By.xpath(`//td[@class='product-total']//span[@class = 'woocommerce-Price-amount amount']`)} 
    get bookTitleSelector()          {return By.xpath(`//td[@class='product-name']//a`)}  

}
module.exports = new OrderDetailsPage();
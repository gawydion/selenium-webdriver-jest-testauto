const Page = require ('./page');
var {homeUrl} = require('../index.js'); 

class HomePage extends Page{
    async open () {
        await super.open(homeUrl)
    }   
}
module.exports = new HomePage();
const Page = require ('./page');
var {homeUrl} = require('../index.js'); 

class HomePage extends Page{
    async visit () {
        await super.visit(homeUrl)
        this.isLoaded()
    }   
}
module.exports = new HomePage();
const Page = require ('./page');
let config = require('../env-config.json');

class HomePage extends Page{
    async visit () {
        await super.visit(config.url)
        this.isLoaded()
    }   
}
module.exports = new HomePage();
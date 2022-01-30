//page object model
//parent class Page is inherited by child pages
//https://www.lambdatest.com/blog/using-page-object-model-pattern-in-javascript-with-selenium/

var {driver} = require('../index.js');

module.exports = class Page {
    open (path) {
        return driver.get(path);
    }
}
//page object model
//parent class Page is inherited by child pages
//https://www.lambdatest.com/blog/using-page-object-model-pattern-in-javascript-with-selenium/

var {driver} = require('../index.js');

module.exports = class Page {
    open (path) {
        return driver.get(path);
    }

    isLoaded(){
        return driver.wait(() => {
            return driver.executeScript('return document.readyState').then(state => {
              return state === 'complete'
            })
          }, 120000)
    }

    getPageTitle(){
        return driver.getTitle()
    }
}
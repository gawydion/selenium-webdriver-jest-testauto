var {driver} = require('../index.js');

module.exports = class Page {
    visit (path) {
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
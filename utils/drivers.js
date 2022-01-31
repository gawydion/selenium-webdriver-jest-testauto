require('chromedriver')
const { Builder } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')


exports.getChromeWebDriver = function(){
    const chromeOptions = new Options()
    chromeOptions.addArguments('--disable-gpu')
    chromeOptions.addArguments("--start-maximized");

    return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build()
};
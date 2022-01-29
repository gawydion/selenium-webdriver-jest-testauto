require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')


exports.getChromeWebDriver = function(){
    const chromeOptions = new Options()
    chromeOptions.addArguments('--no-sandbox')
    chromeOptions.addArguments('--disable-gpu')
    chromeOptions.addArguments('--disable-dev-shm-usage')
    chromeOptions.addArguments("--start-maximized");
    //chromeOptions.windowSize({ width: 1920, height: 1080 })

    return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build()
};
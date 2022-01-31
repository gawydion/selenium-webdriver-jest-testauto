const { getChromeWebDriver } = require('./utils/drivers')
const driver = getChromeWebDriver() //other browsers could be an argument to a function getWebDriver()
exports.driver = driver;

//index.js is executed before all. Driver is created before test cases.
//https://stackoverflow.com/questions/21063587/what-is-index-js-used-for-in-node-js-projects
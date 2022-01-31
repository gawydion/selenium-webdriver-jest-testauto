# selenium-webdriver-jest-testauto
Test automation project which automates book ordering on the page:
http://practice.automationtesting.in/

This project is based on: https://github.com/kmcid/selenium-bootcamp

Above repository has been used as a boilerplate.

### Prerequisites
* Node.js -  javascript runtime environment
* Chrome - google chrome web browser (version 96)

### Tools used
* [selenium-webdriver](https://www.selenium.dev/documentation/webdriver/) - used for in browser navigation
* [jest](https://jestjs.io/) - used for test automation

### Running existing tests
Intall dependencies
```sh
$ npm install
```
Run test
```sh
$ npm test
```

### Test data
*env-config.json* stores test data: 
* test environment url
* test user data
* product data

(Note: password is encoded in base64. In real life scenarios cretentials could be stored in env variables and *env-config.json* would be in *.gitignore*)

### Chrome driver
This projext implements Chromedriver only for the sake of simplicity. Driver is generated before test execution in *index.js* file. A method which returns the driver is defined in *./utils/drivers.js*

 [Chrome options](https://peter.sh/experiments/chromium-command-line-switches/) used:
* ('--disable-gpu') - smaller load on the GPU
* ("--start-maximized")

(Note: starting maximized made the test easier. In real life scenario mobile / smaller screens view must be tested as well. On smaller screens top menu hides behind hamburger button.)

### Page object pattern

This project follows page object pattern which is implemented by creating:
* parent class Page (*./pages/page.js*)
* child classes of Page (ex. *./pages/loginPage.js*)

Each page object has a set of selectors and methods which are applicable to that page only. 

(Note: masthead / top menu could be a seperate object which does not inherit from Page)

### Test scenario

The test is implemented in *./tests/bookOrderFlow.spec.js*

Scenario:

Setup:
* Login to the portal.
* Empty the cart - some failed or incomplete execution leave products in the cart. Cart should be empty before the test.

Test:
* [1] Pick a book from the main page.
* [2] Add a book to the basket.
* [3] Place the order.

Teardown:
* Close ChromeDriver.

The price and the title of the book is checked during each of the test steps.
(Note: Jest does not allow *step()* creation which makes reports look bad.)

The scenario is implemented as a single test because:
* tests should be indepented
* in this case the test should fail if any of the assertions fails

### Test report
Each test run saves report to './reports/index.html'



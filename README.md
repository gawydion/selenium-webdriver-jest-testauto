# selenium-webdriver-jest-testauto
Test automation project which automates book ordering on the page:
http://practice.automationtesting.in/

The project is based on: https://github.com/kmcid/selenium-bootcamp

Above repository has been used as a boilerplate.

### Prerequisites
* Node.js -  javascript runtime environment
* Chrome - google chrome web browser (version 97)

### Tools used
* [selenium-webdriver](https://www.selenium.dev/documentation/webdriver/) - used for in the browser navigation
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
The project implements Chromedriver only for the sake of simplicity. A driver is generated before test execution in *index.js* file. A method which returns the driver is defined in *./utils/drivers.js*

 [Chrome options](https://peter.sh/experiments/chromium-command-line-switches/) used:
* ('--disable-gpu') - smaller load on the GPU
* ("--start-maximized")

(Note: starting maximized made the test easier. In real life scenario a mobile / smaller screens view must be tested as well. On smaller screens top menu hides behind the hamburger button.)

### Page object pattern

The project follows a page object pattern which is implemented creation of:
* parent class Page (*./pages/page.js*)
* child classes of Page (ex. *./pages/loginPage.js*)

Each page object has a set of selectors and methods which are applicable to that page only. 

(Note: a masthead / top menu could be a seperate object which does not inherit from Page)

### Test scenario

The test is implemented in *./tests/bookOrderFlow.spec.js*

Scenario:

Setup:
* Login to the portal.
* Empty the cart - (Note: some failed or incomplete executions leave products in the cart. The cart should be empty before the test).

Test:
* [1] Pick a book from the main page.
* [2] Add a book to the basket.
* [3] Place the order.

Teardown:
* Close ChromeDriver.

The price and the title of the book is checked during each of the test steps.
(Note: Jest does not allow *step()* creation which makes reports look poor.)

The scenario is implemented as a single test because:
* tests should be idependent
* test should fail if any of the assertions fails

### Test report
Each test run saves report to *'./reports/index.html'*



# LudiGames Test Automation Framework

Automated end-to-end testing framework for the LudiGames platform using Playwright and JavaScript.


## Overview

This project contains automated UI tests designed to validate the functionality and user experience of the LudiGames gaming platform.

The framework follows the Page Object Model (POM) design pattern to improve:

* Test maintainability
* Code reusability
* Readability
* Scalability


## Tech Stack

* Playwright
* JavaScript
* Node.js
* Playwright Test Runner


## Installation

Clone the repository:

```bash
git clone https://github.com/andreiPreda24/ludigames.git
cd ludigames
```

Install dependencies:

```bash
npm install
```

Install Playwright:

```bash
npm init playwright@latest
```


## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/homepage.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

## Test Coverage

Current automated scenarios include:


### Homepage Validation

* Homepage loads successfully
* Cookie/consent popup handling
* Navigation validation


### Game Launch Validation

* Open game from homepage
* Handle advertisement popup
* Verify game iframe loads correctly
* Verify game content is displayed


### Future Enhancements

* Cross-browser execution
* Mobile viewport testing
* Visual regression testing
* Performance monitoring
* CI/CD integration


## Reporting

Generate Playwright HTML report:

```bash
npx playwright show-report
```

## Best Practices Used

* Page Object Model (POM)
* Explicit assertions
* Reusable locators
* Separation of test logic and page actions


## Author

**Andrei Preda**

GitHub: https://github.com/andreiPreda24

## License

This project is intended for educational and portfolio purposes.

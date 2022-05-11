# TestCafe session cookie issue

This is a repository to reproduce an issue with TestCafe.

## Scenario

Context:

* Create a page that returns a response with a session cookie which has a 3 seconds lifetime.
* When refreshed, the page returns a response that extends the session by 3 seconds.

Steps to reproduce:

1. Load page
2. Wait for 2 seconds
3. Reload page
4. Wait for 2 seconds
5. Reload page

Current result: session cookie is expired, and session is expired

Expected result: session cookie should not be expired, and session still be active.

## How to reproduce scenario with this repository

Prerequisites:

* Install [TestCafe](https://github.com/DevExpress/testcafe) locally.

Install dependencies:

    yarn install

Run Express JS app:

    node app/index.js

This will make the app available on http://127.0.0.1:3000

Run TestCafe tests with either Chrome or Firefox:

    testcafe chrome test.js
    testcafe firefox test.js

This will fail on last step.

Running the same scenario directly in a browser works:

1. Open http://127.0.0.1:3000
2. Click on the *Reload page* link no later than 3 seconds after
3. Check that "Has session" is displayed
4. Click on *Reload page* no later than 3 seconds after
5. Go to step 3

This shows that the session cookie lifetime is refreshed on each page load.

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
* Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

Run PHP and webserver:

    docker-compose up -d

This will make the app available on http://127.0.0.1:8080/set-session-data.php

Run TestCafe tests with either Chrome or Firefox:

    testcafe chrome test.js
    testcafe firefox test.js

This will fail on last step.

Running the same scenario directly in a browser works:

1. Open http://127.0.0.1:8080/set-session-data.php
2. Click on the *Link to "Get session data" page* link no later than 3 seconds after
3. Check that "HAS SESSION DATA" is displayed
4. Click on Reload page no later than 3 seconds after
5. Go to step 3

This shows that the session cookie lifetime is refreshed on each page load.

## Structure of this repository

This repository comprises of 3 plain-old PHP files:

* `set-session-data.php`
  * Starts a session with a cookie lifetime of 3 seconds
  * Stores data in the session
  * Returns an HTML page with a link to `get-session-data.php`
* `get-session-data.php`
  * Starts the session, and adds 3 seconds to the cookie lifetime
  * If session is active, shows "HAS SESSION DATA" message
  * If session is inactive, shows "NO SESSION DATA" message
* `utils.php` adds 2 functions used by other files:
  * `startSession(int $lifetime)`
  * `renderHtml(string $body)`

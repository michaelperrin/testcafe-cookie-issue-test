<?php

/**
 * Starts a session, and defines its lifetime to 3 seconds
 */
function startSession(int $lifetime): void
{
    session_start();

    // On each page load, reinitiate cookie expiration date
    setcookie(session_name(), session_id(), time() + $lifetime);
}

function renderHtml(string $body): void
{
    echo <<<HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="content">
            $body
        </div>
    </body>
    </html>
    HTML;
}

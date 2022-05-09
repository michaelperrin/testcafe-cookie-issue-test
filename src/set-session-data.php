<?php

require_once('utils.php');

startSession(3);

// Set session data
$_SESSION['key'] = 'value';

renderHtml(
    <<<HTML
    <a href="get-session-data.php" id="link-to-get-session-data-page">
        Link to "Get session data" page
    </a>
    HTML
);

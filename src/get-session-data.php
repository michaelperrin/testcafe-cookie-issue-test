<?php

require_once('utils.php');

startSession(3);

$hasSessionData = isset($_SESSION['key']) ? 'HAS SESSION DATA' : 'NO SESSION DATA';

renderHtml(
    <<<HTML
    <div id="text">$hasSessionData</div>
    <a href="get-session-data.php" id="reload-page">Reload page</a>
    HTML
);

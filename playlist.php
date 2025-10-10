<?php
$pls = file_get_contents('listen.pls'); // seu arquivo .pls
$lines = explode("\n", $pls);
$streams = [];

foreach ($lines as $line) {
    if (strpos($line, "Title") !== false) {
        $title = preg_replace('/^\d+(,\d+)*,/', '', $line); // remove números
        $title = trim(substr($title, strpos($title, "=") + 1));
    }
    if (strpos($line, "File") !== false) {
        $url = trim(substr($line, strpos($line, "=") + 1));
        $streams[] = ["title"=>$title, "url"=>$url];
    }
}

header('Content-Type: application/json');
echo json_encode(["streams"=>$streams]);

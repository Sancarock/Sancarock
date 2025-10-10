<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// URL do Shoutcast
$url = "http://s02.transmissaodigital.com:6716/7.html";

$data = @file_get_contents($url);

$artist = "";
$title = "";

if($data !== FALSE){
    // Tenta extrair o título atual da música
    if(preg_match("/Current Song:\s*(.+)/i", $data, $matches)){
        $songRaw = trim($matches[1]);

        // Remove códigos/números antes do nome real (se houver vírgulas)
        $parts = explode(",", $songRaw);
        $songClean = trim(array_pop($parts));

        // Se houver "Artista - Música", separa
        if(strpos($songClean, " - ") !== false){
            list($artist, $title) = explode(" - ", $songClean, 2);
        } else {
            $title = $songClean;
        }
    }
}

echo json_encode([
    "artist" => $artist,
    "title" => $title
]);


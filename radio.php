<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// URL do Shoutcast v1 (metadados)
$url = "http://s02.transmissaodigital.com:6716/7.html";

// Busca o conteúdo
$data = @file_get_contents($url);

if ($data === FALSE) {
    echo json_encode([
        "artist" => "",
        "title"  => "",
        "track"  => "Indisponível"
    ]);
    exit;
}

// Divide os campos
$parts = explode(",", $data);
$track = trim(end($parts));

// Remove HTML e decodifica entidades
$track = preg_replace('/<\/?[^>]+(>|$)/', '', $track);
$track = html_entity_decode($track, ENT_QUOTES | ENT_HTML5, 'UTF-8');

// Inicializa artista/música
$artist = "";
$title = $track;

// Se o formato for "Artista - Música"
if (strpos($track, " - ") !== false) {
    list($artist, $title) = explode(" - ", $track, 2);
}

// Retorna em JSON
echo json_encode([
    "artist" => $artist,
    "title"  => $title,
    "track"  => $track
]);
?>

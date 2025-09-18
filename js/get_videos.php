<?php
header('Content-Type: application/json');

$apiKey = 'AIzaSyBRq-giao8bl3iGBw9zXFdrOpDmmDgFUK4';
$playlistId = 'PLYXfLV3z1Kzysf0c-wpY6qDuKyj5KHGno';
$videos = [];
$pageToken = '';

do {
    $url = "https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=$playlistId&key=$apiKey&pageToken=$pageToken";
    $response = file_get_contents($url);
    $data = json_decode($response, true);

    foreach ($data['items'] as $item) {
        $videos[] = $item['contentDetails']['videoId'];
    }

    $pageToken = isset($data['nextPageToken']) ? $data['nextPageToken'] : '';
} while ($pageToken);

echo json_encode($videos);
?>
<?php
header("Content-Type: application/rss+xml; charset=UTF-8");

// Lista de sites com suas URLs
$sites = [
    "Sao Carlos" => "https://news.google.com/topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE?hl=pt-BR&gl=BR&ceid=BR:pt-419/",
    "Cultura" => "https://www.gazetadopovo.com.br/feed/rss/cultura.xml",
    "Últimas Notícias" => "https://www.gazetadopovo.com.br/feed/rss/ultimas-noticias.xml",
    "Cidadania" => "https://www.gazetadopovo.com.br/feed/rss/vida-e-cidadania.xml"
];

$noticias = [];

// Função para raspar cada site
function rasparSite($nome, $url) {
    $html = @file_get_contents($url);
    $resultado = [];

    if ($html) {
        switch($nome) {
            case "Sao Carlos":
                preg_match_all('/<h2 class="entry-title">.*?<a href="(.*?)".*?>(.*?)<\/a>/s', $html, $matches);
                break;
            case "cultura":
                preg_match_all('/<h2 class="title">.*?<a href="(.*?)".*?>(.*?)<\/a>/s', $html, $matches);
                break;
            case "Últimas Notícias":
                preg_match_all('/<h3 class="sc-.*?">.*?<a href="(.*?)".*?>(.*?)<\/a>/s', $html, $matches);
                break;
            case "Cidadania":
                preg_match_all('/<h2 class="entry-title">.*?<a href="(.*?)".*?>(.*?)<\/a>/s', $html, $matches);
                break;
            default:
                $matches = [[], []];
        }

        $links = $matches[1] ?? [];
        $titulos = $matches[2] ?? [];

        // Limitar a 10 notícias por site
        for ($i = 0; $i < min(10, count($links)); $i++) {
            $resultado[] = [
                "title" => strip_tags($titulos[$i]),
                "link" => $links[$i]
            ];
        }
    }

    return $resultado;
}

// Raspar todos os sites
foreach ($sites as $nome => $url) {
    $noticias = array_merge($noticias, rasparSite($nome, $url));
}

// Misturar aleatoriamente
shuffle($noticias);

// Criar RSS
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<rss version='2.0'><channel>";
echo "<title>RSS Notícias São Carlos</title>";
echo "<link>https://www.sancarock.com/</link>";
echo "<description>Últimas notícias de São Carlos de vários sites</description>";

// Limitar a 20 notícias no feed
for ($i = 0; $i < min(20, count($noticias)); $i++) {
    echo "<item>";
    echo "<title>" . htmlspecialchars($noticias[$i]["title"]) . "</title>";
    echo "<link>" . $noticias[$i]["link"] . "</link>";
    echo "</item>";
}

echo "</channel></rss>";
?>

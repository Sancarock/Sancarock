<?php
// Configuração
$tokenEsperado = "SEUTOKEN123";
$googleFeed   = "https://news.google.com/rss/topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE?hl=pt-BR&gl=BR&ceid=BR:pt-419";
$destino      = __DIR__ . "/rss-sancanews.xml";

// Checa token
if (!isset($_GET['token']) || $_GET['token'] !== $tokenEsperado) {
    http_response_code(403);
    exit("❌ Acesso negado!");
}

// Baixa feed via cURL
$ch = curl_init($googleFeed);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
$xmlConteudo = curl_exec($ch);
$erro = curl_error($ch);
curl_close($ch);

if ($xmlConteudo === false || empty($xmlConteudo)) {
    exit("❌ Erro ao baixar feed: $erro");
}

// Carrega XML usando DOMDocument para lidar com HTML dentro de <description>
$dom = new DOMDocument();
libxml_use_internal_errors(true);
if (!$dom->loadXML($xmlConteudo, LIBXML_NOCDATA)) {
    exit("❌ Erro ao processar XML do Google News");
}

// Converte DOM para SimpleXMLElement
$xml = simplexml_import_dom($dom);

// Cria novo RSS SancaRock
$rss = new SimpleXMLElement('<rss version="2.0"><channel></channel></rss>');
$rss->channel->addChild('title', 'SancaRock News');
$rss->channel->addChild('link', 'https://www.sancarock.com/');
$rss->channel->addChild('description', 'Últimas notícias convertidas do Google News');

// Converte itens
foreach ($xml->channel->item as $item) {
    $novoItem = $rss->channel->addChild('item');
    $novoItem->addChild('title', htmlspecialchars((string)$item->title));
    $novoItem->addChild('link', (string)$item->link);
    $novoItem->addChild('pubDate', (string)$item->pubDate);
    $novoItem->addChild('description', htmlspecialchars((string)$item->description));
}

// Salva RSS final
if ($rss->asXML($destino)) {
    echo "✅ RSS atualizado com sucesso em " . date("d/m/Y H:i:s");
} else {
    echo "❌ Erro ao salvar rss-sancanews.xml";
}
?>


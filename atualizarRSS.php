<?php
// Caminho do arquivo XML local (baixado do Google News)
$arquivo_google = 'google-news.xml';

// Verifica se o arquivo existe
if(!file_exists($arquivo_google)){
    die("O arquivo $arquivo_google não foi encontrado. Baixe o XML do Google News primeiro.\n");
}

// Carrega o XML
$xml = simplexml_load_file($arquivo_google);
$noticias = [];

foreach($xml->channel->item as $item){
    $titulo = (string)$item->title;
    $link   = (string)$item->link;
    $pubDate= (string)$item->pubDate ?? date(DATE_RSS);

    $chave = md5($titulo);
    if(!isset($noticias[$chave])){
        $noticias[$chave] = [
            'title' => $titulo,
            'link'  => $link,
            'pubDate'=> $pubDate
        ];
    }
}

// Ordena por data
usort($noticias, fn($a,$b) => strtotime($b['pubDate']) - strtotime($a['pubDate']));

// Limita a quantidade de notícias
$noticias = array_slice($noticias, 0, 50);

// Cria RSS consolidado
$rss = new SimpleXMLElement('<rss version="2.0"><channel></channel></rss>');
$rss->channel->addChild('title', 'Sanca News');
$rss->channel->addChild('link', 'https://www.sancarock.com');
$rss->channel->addChild('description', 'RSS consolidado de notícias');

foreach($noticias as $n){
    $item = $rss->channel->addChild('item');
    $item->addChild('title', htmlspecialchars($n['title']));
    $item->addChild('link', htmlspecialchars($n['link']));
    $item->addChild('pubDate', date(DATE_RSS, strtotime($n['pubDate'])));
}

// Salva RSS final
$rss->asXML('rss-sancanews.xml');
echo "RSS consolidado atualizado com sucesso!\n";
?>

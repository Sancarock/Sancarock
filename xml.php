<?php
// ---------------------------
// Upload + conversão automática para RSS
// ---------------------------
$senhaEsperada = 'Rush2112*'; // Troque para sua senha
$destinoXML   = __DIR__ . '/google-news.xml';       // arquivo original
$destinoRSS   = __DIR__ . '/rss-sancanews.xml';    // RSS gerado

$mensagem = '';
$sucesso = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $senha = isset($_POST['senha']) ? $_POST['senha'] : '';
    if ($senha !== $senhaEsperada) {
        $mensagem = '❌ Senha incorreta.';
    } else {
        if (!isset($_FILES['arquivoXML'])) {
            $mensagem = '❌ Nenhum arquivo enviado.';
        } else {
            $arquivo = $_FILES['arquivoXML'];
            $ext = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
            if ($ext !== 'xml') {
                $mensagem = '❌ Apenas arquivos .xml são permitidos.';
            } else {
                // Move o arquivo enviado
                if (move_uploaded_file($arquivo['tmp_name'], $destinoXML)) {
                    // Agora faz a conversão automática para RSS
                    libxml_use_internal_errors(true);
                    $dom = new DOMDocument();
                    if (!$dom->load($destinoXML, LIBXML_NOCDATA)) {
                        $mensagem = '❌ Erro ao processar google-news.xml';
                    } else {
                        $xml = simplexml_import_dom($dom);

                        $rss = new SimpleXMLElement('<rss version="2.0"><channel></channel></rss>');
                        $rss->channel->addChild('title', 'SancaRock News');
                        $rss->channel->addChild('link', 'https://www.sancarock.com/');
                        $rss->channel->addChild('description', 'Últimas notícias convertidas do Google News');

                        foreach ($xml->channel->item as $item) {
                            $novoItem = $rss->channel->addChild('item');
                            $novoItem->addChild('title', htmlspecialchars((string)$item->title));
                            $novoItem->addChild('link', (string)$item->link);
                            $novoItem->addChild('pubDate', (string)$item->pubDate);
                            $novoItem->addChild('description', htmlspecialchars((string)$item->description));
                        }

                        if ($rss->asXML($destinoRSS)) {
                            $mensagem = '✅ Upload e conversão para rss-sancanews.xml realizados com sucesso!';
                            $sucesso = true;
                        } else {
                            $mensagem = '❌ Erro ao salvar rss-sancanews.xml';
                        }
                    }
                } else {
                    $mensagem = '❌ Erro ao salvar google-news.xml';
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Upload e Conversão RSS - SancaRock</title>
  <meta name="robots" content="noindex,nofollow">
  <style>
    body{font-family:Arial,Helvetica,sans-serif;padding:12px;color:#111}
    label{display:block;margin:8px 0 4px}
    input[type="file"],input[type="password"]{margin-bottom:8px;width:100%;padding:4px}
    .msg{margin:10px 0;padding:8px;border-radius:4px}
    .ok{background:#e6ffe6;border:1px solid #4caf50}
    .err{background:#ffe6e6;border:1px solid #e53935}
    form{max-width:320px}
    button{padding:8px 12px;margin-top:6px}
  </style>
</head>
<body>
  <h3>Enviar google-news.xml</h3>

  <?php if ($mensagem !== ''): ?>
    <div class="msg <?php echo $sucesso ? 'ok' : 'err'; ?>">
      <?php echo htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8'); ?>
    </div>
  <?php endif; ?>

  <?php if (!$sucesso): ?>
    <form method="post" enctype="multipart/form-data" novalidate>
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" required autocomplete="off" />

      <label for="arquivoXML">Escolha o arquivo google-news.xml</label>
      <input id="arquivoXML" name="arquivoXML" type="file" accept=".xml" required />

      <button type="submit">Enviar e Converter</button>
    </form>
    <p style="font-size:12px;color:#666">O arquivo será salvo como <code>google-news.xml</code> e convertido para <code>rss-sancanews.xml</code>.</p>
  <?php else: ?>
    <script>
      // Fecha a janela/popup automaticamente após 5 segundos
      setTimeout(() => {
        try { window.close(); } catch(e) {}
      }, 5000);
    </script>
    <p>Esta janela será fechada automaticamente.</p>
  <?php endif; ?>

</body>
</html>

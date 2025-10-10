<?php
// up.php - upload protegido por senha (salva como google-news.xml)
// Troque a senha abaixo para a sua
$senhaEsperada = 'Rush2112*';
$destinoXML = __DIR__ . '/google-news.xml';

$mensagem = '';
$sucesso = false;

// Se veio POST, processa o envio
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // verifica senha
    $senha = isset($_POST['senha']) ? $_POST['senha'] : '';
    if ($senha !== $senhaEsperada) {
        $mensagem = '❌ Senha incorreta.';
    } else {
        if (!isset($_FILES['arquivoXML'])) {
            $mensagem = '❌ Nenhum arquivo enviado.';
        } else {
            $arquivo = $_FILES['arquivoXML'];

            // Verifica se o arquivo tem extensão .xml (nome) - checagem simples
            $ext = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
            if ($ext !== 'xml') {
                $mensagem = '❌ Apenas arquivos .xml são permitidos.';
            } else {
                // Move o arquivo enviado para o destino (substitui o anterior)
                if (move_uploaded_file($arquivo['tmp_name'], $destinoXML)) {
                    $mensagem = '✅ Arquivo enviado com sucesso!';
                    $sucesso = true;
                } else {
                    $mensagem = '❌ Erro ao salvar o arquivo no servidor.';
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
  <title>Upload XML - SancaRock</title>
  <meta name="robots" content="noindex,nofollow">
  <style>
    body{font-family:Arial,Helvetica,sans-serif;padding:12px;color:#111}
    label{display:block;margin:8px 0 4px}
    input[type="file"]{margin-bottom:8px}
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
    <!-- Formulário de upload -->
    <form method="post" enctype="multipart/form-data" novalidate>
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" required autocomplete="off" />

      <label for="arquivoXML">Escolha o arquivo google-news.xml</label>
      <input id="arquivoXML" name="arquivoXML" type="file" accept=".xml" required />

      <button type="submit">Enviar XML</button>
    </form>
    <p style="font-size:12px;color:#666">Obs.: o arquivo será salvo como <code>google-news.xml</code> substituindo o anterior.</p>
  <?php else: ?>
    <!-- Mensagem de sucesso: fecha automaticamente após 5s -->
    <script>
      // fecha a janela/popup após 5 segundos
      setTimeout(() => {
        try { window.close(); } catch(e) {}
      }, 5000);
    </script>
    <p>Esta janela será fechada automaticamente.</p>
  <?php endif; ?>

</body>
</html>


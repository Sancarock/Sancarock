<?php
session_start();

$usuarios = [
    'user' => 'sanca2024',
    'admin' => 'sanca2025',
];

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $senha = $_POST['senha'] ?? '';

    if (isset($usuarios[$usuario]) && $usuarios[$usuario] === $senha) {
        $_SESSION['logado'] = true;
        $_SESSION['usuario'] = $usuario;

        // Redireciona para fora do popup
        echo "<!DOCTYPE html>
        <html><head><meta charset='UTF-8'><title>Redirecionando...</title></head><body>
        <script>
            if (window.opener) {
                window.opener.location.href = 'index.php'; // Redireciona janela principal
                window.close(); // Fecha o popup
            } else {
                window.location.href = 'index.php'; // Caso não seja popup
            }
        </script>
        </body></html>";
        exit;
    } else {
        $erro = 'Usuário ou senha inválidos!';
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background: #000;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }

    .radio-logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
    }

    h2 {
      margin-bottom: 10px;
    }

    form {
      background: #111;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
      width: 100%;
      max-width: 300px;
    }

    label {
      display: block;
      margin-bottom: 15px;
    }

    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 10px;
      background-color: #222;
      color: #fff;
      border: 1px solid #444;
      border-radius: 5px;
      margin-top: 5px;
      box-sizing: border-box;
    }

    input[type="text"]::placeholder,
    input[type="password"]::placeholder {
      color: #aaa;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #e00;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #c00;
    }

    p {
      margin-top: 10px;
      color: red;
      text-align: center;
    }
  </style>
</head>
<body>
  <img src="../img/logu.png" alt="Logo da Rádio" class="radio-logo">
  <h2>Login</h2>
  <?php if ($erro): ?>
    <p><?= htmlspecialchars($erro) ?></p>
  <?php endif; ?>
  <form method="post" action="">
    <label>
      Usuário:
      <input type="text" name="usuario" required placeholder="Digite seu usuário">
    </label>
    <label>
      Senha:
      <input type="password" name="senha" required placeholder="Digite sua senha">
    </label>
    <button type="submit">Entrar</button>
  </form>
</body>
</html>
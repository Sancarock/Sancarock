<?php
$con = new mysqli("localhost", "seu_usuario", "sua_senha", "seu_banco");

if ($con->connect_error) {
    die("Erro na conexão: " . $con->connect_error);
}

$usuario = 'admin';
$senha = password_hash('senha123', PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (usuario, senha) VALUES (?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("ss", $usuario, $senha);
$stmt->execute();

echo "Usuário criado com sucesso!";
?>

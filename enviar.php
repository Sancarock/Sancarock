<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome     = htmlspecialchars($_POST["nome"]);
    $email    = htmlspecialchars($_POST["email"]);
    $assunto  = htmlspecialchars($_POST["assunto"]);
    $mensagem = htmlspecialchars($_POST["mensagem"]);

    // Email que vai receber as mensagens
    $destinatario = "radio_sancarock@sancarock.com"; 

    // Assunto do email
    $subject = "Contato do site: $assunto";

    // Corpo do email
    $body  = "Você recebeu uma nova mensagem do formulário de contato:\n\n";
    $body .= "Nome: $nome\n";
    $body .= "Email: $email\n";
    $body .= "Assunto: $assunto\n\n";
    $body .= "Mensagem:\n$mensagem\n";

    // Cabeçalhos
    $headers  = "From: radio_sancarock@sancarock.com\r\n";
$headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Envio
    if (mail($destinatario, $subject, $body, $headers)) {
        echo "<p style='color:green; text-align:center;'>Mensagem enviada com sucesso!</p>";
    } else {
        echo "<p style='color:red; text-align:center;'>Erro ao enviar a mensagem.</p>";
    }
} else {
    echo "Método inválido.";
}
?>

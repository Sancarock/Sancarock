<script>
        // Lista de logins válidos (usuário: senha)
        const users = {
            "admin": "1234",
            "Sancarock": "Sancarock",
            "maria": "senhaMaria",
            "pedro": "senhaPedro"
        };

        function checkLogin() {
            // Pegando os valores dos campos
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Verifica se o nome de usuário existe e se a senha está correta
            if (users[username] && users[username] === password) {
                // Redireciona para outra página se a autenticação for bem-sucedida
                window.location.href = "https://sancarock.com/movies.html";
            } else {
                // Exibe uma mensagem de erro se as credenciais forem inválidas
                document.getElementById("error-message").textContent = "Usuário ou senha incorretos!";
            }
        }
    </script>
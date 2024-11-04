function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Exemplo de credenciais (para fins de demonstração)
            if (username === "admin" && password === "1234") {
                // Armazena que o usuário está autenticado
                localStorage.setItem("authenticated", "true");
                console.log("Login bem-sucedido!"); // Adicionado para depuração
                // Redireciona para a página de filmes
                window.location.href = "movies.html";
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        }
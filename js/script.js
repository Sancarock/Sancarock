function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Exemplo de credenciais (para fins de demonstra��o)
            if (username === "admin" && password === "1234") {
                // Armazena que o usu�rio est� autenticado
                localStorage.setItem("authenticated", "true");
                console.log("Login bem-sucedido!"); // Adicionado para depura��o
                // Redireciona para a p�gina de filmes
                window.location.href = "movies.html";
            } else {
                alert("Credenciais inv�lidas. Tente novamente.");
            }
        }
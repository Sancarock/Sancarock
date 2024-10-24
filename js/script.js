// Lista de usuários com login e senha
        const users = [
            { username: 'admin', password: '1234' },
            { username: 'Sancarock', password: 'Sancarock' },
            { username: 'user2', password: 'senha2' },
            { username: 'guest', password: 'guest123' }
        ];

        // Função de validação de login
        function validateLogin(username, password) {
            return users.some(user => user.username === username && user.password === password);
        }

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o comportamento padrão do formulário

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Verifica se o login é válido
            if (validateLogin(username, password)) {
                // Se o login for bem-sucedido, armazena o estado de autenticação no localStorage
                localStorage.setItem('isAuthenticated', 'true');
                alert('Login bem-sucedido!');
                window.location.href = 'movies.html'; // Redireciona para a página de filmes
            } else {
                alert('Usuário ou senha incorretos!');
            }
        });
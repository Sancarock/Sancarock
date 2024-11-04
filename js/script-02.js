document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário

            // Captura os valores de usuário e senha
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Verifica as credenciais
            if ((username === 'Sancarock' && password === 'Sancarock') || 
				(username === 'Paia' && password === 'Paia') || 
                (username === 'Admin' && password === '1234')) {
                // Redireciona para movies.html na janela pai se o login for bem-sucedido
                window.parent.location.href = 'movies.html';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
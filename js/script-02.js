document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formul�rio

            // Captura os valores de usu�rio e senha
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Verifica as credenciais
            if ((username === 'Sancarock' && password === 'Sancarock') || 
				(username === 'Paia' && password === 'Paia') || 
                (username === 'Admin' && password === '1234')) {
                // Redireciona para movies.html na janela pai se o login for bem-sucedido
                window.parent.location.href = 'movies.html';
            } else {
                alert('Usu�rio ou senha incorretos.');
            }
        });
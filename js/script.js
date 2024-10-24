 // Lista de usuários e senhas para validação
        const users = {
            admin: '1234',
            Sancarock: 'Sancarock',
            user2: 'senha2',
            guest: 'guest123'
        };

        // Validação simples
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (users[username] && users[username] === password) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('loginCount', (parseInt(localStorage.getItem('loginCount')) || 0) + 1);
                alert('Login bem-sucedido!');
                window.location.href = 'movies.html';
            } else {
                alert('Usuário ou senha incorretos!');
            }
        });
    </script>
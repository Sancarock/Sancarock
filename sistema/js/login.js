// login.js — Script único para autenticação Firebase

(function () {
  // Verifica se Firebase já foi carregado
  if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    return;
  }

  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCo4M9c4BTWuiDfQeYKSoe9IyBc_Ss_0v0",
    authDomain: "login-d0199.firebaseapp.com",
    projectId: "login-d0199",
    storageBucket: "login-d0199.firebasestorage.app",
    messagingSenderId: "208029472522",
    appId: "1:208029472522:web:3cbf96452fdd09ba208cf3"
  };

  // Carrega os scripts do Firebase (compatibilidade)
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src.trim(); // remove espaços extras
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Função de login
  window.logar = function () {
    const email = document.getElementById("email")?.value;
    const senha = document.getElementById("senha")?.value;

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(() => {
        window.location.href = "almox.html";
      })
      .catch((err) => {
        alert("Erro: " + err.message);
      });
  };

  // Carrega Firebase e inicializa
  Promise.all([
    loadScript("https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js"),
    loadScript("https://www.gstatic.com/firebasejs/10.6.0/firebase-auth-compat.js")
  ])
  .then(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  })
  .catch(err => {
    console.error("Falha ao carregar o Firebase:", err);
    alert("Erro ao carregar dependências de autenticação.");
  });

})();
// firebase-auth-standalone.js

(function () {
  // Verifica se Firebase já foi carregado
  if (typeof firebase !== 'undefined') {
    initApp();
    return;
  }

  // Carrega Firebase via CDN dinamicamente
  const scripts = [
    'https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth-compat.js'
  ];

  let loadedCount = 0;

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      loadedCount++;
      if (loadedCount === scripts.length) {
        initApp();
      }
    };
    script.onerror = () => console.error('Falha ao carregar:', src);
    document.head.appendChild(script);
  });

  function initApp() {
    const firebaseConfig = {
      apiKey: "AIzaSyCo4M9c4BTWuiDfQeYKSoe9IyBc_Ss_0v0",
      authDomain: "login-d0199.firebaseapp.com",
      projectId: "login-d0199",
      storageBucket: "login-d0199.firebasestorage.app",
      messagingSenderId: "208029472522",
      appId: "1:208029472522:web:3cbf96452fdd09ba208cf3"
    };

    // Evita inicialização duplicada
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Proteção da página
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        window.location.href = "index.html";
      } else {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", updateLoggedInUser);
        } else {
          updateLoggedInUser();
        }
      }
    });

    function updateLoggedInUser() {
      const el = document.getElementById("logado");
      if (el) {
        el.textContent = "Logado: " + firebase.auth().currentUser.email;
      }
    }
  }
})();
(function() {
  // Função para carregar script dinamicamente
  function carregarScript(src) {
    const script = document.createElement('script');
    script.src = `${src}?v=${Date.now()}`; // Força atualização
    script.defer = true;
    document.body.appendChild(script);
  }

  // Pega a hora atual
  const hora = new Date().getHours();

  // Decide qual bloco carregar
  if (hora >= 8 && hora < 16) {
    // 08:00 - 15:59 → Manhã
    carregarScript('js/manhaa.js');
  } else if (hora >= 16 && hora < 24) {
    // 16:00 - 23:59 → Tarde
    carregarScript('js/tarde.js');
  } else {
    // 00:00 - 07:59 → Noite
    carregarScript('js/noite.js');
  }
})();


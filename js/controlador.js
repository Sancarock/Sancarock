(function() {
  function carregarScript(src) {
    const script = document.createElement('script');
    script.src = `${src}?v=${Date.now()}`;
    script.defer = true;
    document.body.appendChild(script);
  }

  const hora = new Date().getHours();

  if (hora >= 8 && hora < 12) {
    carregarScript('js/manhaa.js');
  } else if (hora >= 12 && hora < 16) {
    carregarScript('js/tarde.js');
  } else if (hora >= 16 && hora < 20) {
    carregarScript('js/noite.js');
  } else if (hora >= 20 && hora < 24) {
    carregarScript('js/manhaa.js');
  } else {
    carregarScript('js/noite.js');
  }
})();


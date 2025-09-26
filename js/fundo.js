document.addEventListener('DOMContentLoaded', function () {
  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (isMobile()) {
    const hero = document.querySelector('.hero-section');
    if (hero) {
      hero.style.backgroundImage = `url(img/wall/capa.jpg)`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
      hero.style.backgroundRepeat = 'no-repeat';
    }
    return;
  }

  const CAPA = 'img/wall/capa.jpg';
  const IMAGENS = [
    'img/wall/001.jpg',
    'img/wall/002.jpg',
    'img/wall/003.jpg',
    'img/wall/004.jpg',
    'img/wall/005.jpg',
    'img/wall/006.jpg',
    'img/wall/007.jpg',
    'img/wall/009.jpg',
    'img/wall/010.jpg',
    'img/wall/011.jpg',
    'img/wall/012.jpg',
    'img/wall/013.jpg',
    'img/wall/014.jpg',
    'img/wall/015.jpg',
    'img/wall/016.jpg',
    'img/wall/017.jpg',
    'img/wall/018.jpg'
  ];

  function embaralhar(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function montarSequencia() {
    return embaralhar(IMAGENS).flatMap(img => [CAPA, img]).concat(CAPA);
  }

  const hero = document.querySelector('.hero-section');
  if (!hero) {
    console.error('❌ .hero-section não encontrado!');
    return;
  }

  // Remove qualquer background inline antigo
  hero.style.background = 'none';

  // Cria duas camadas de fundo
  const layer1 = document.createElement('div');
  const layer2 = document.createElement('div');
  layer1.className = 'hero-bg active';
  layer2.className = 'hero-bg';

  hero.appendChild(layer1);
  hero.appendChild(layer2);

  let sequencia = montarSequencia();
  let indice = 0;
  let ativa = layer1;
  let proxima = layer2;
  let timeoutId = null;

  function trocar() {
    const url = sequencia[indice];
    const ehCapa = url === CAPA;
    const tempo = ehCapa ? 10000 : 15000;

    // Define a imagem na camada que está invisível
    proxima.style.backgroundImage = `url(${url})`;

    // Ativa a nova camada (fade in)
    proxima.classList.add('active');
    ativa.classList.remove('active');

    // Troca as referências
    [ativa, proxima] = [proxima, ativa];

    console.log(`🖼️ ${ehCapa ? 'CAPA' : 'IMAGEM'} → ${tempo / 1000}s`);

    indice = (indice + 1) % sequencia.length;
    if (indice === 0) sequencia = montarSequencia();

    clearTimeout(timeoutId);
    timeoutId = setTimeout(trocar, tempo);
  }

  // Inicializa
  layer1.style.backgroundImage = `url(${sequencia[0]})`;
  const primeiroTempo = sequencia[0] === CAPA ? 10000 : 15000;
  timeoutId = setTimeout(trocar, primeiroTempo);
});
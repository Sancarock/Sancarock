document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-section');
  if (!hero) return console.error('❌ .hero-section não encontrado!');

  const CAPA = 'img/capa.jpg';
  const IMAGENS = [
    'img/wall/01.jpg','img/wall/02.jpg','img/wall/03.jpg','img/wall/04.jpg',
    'img/wall/05.jpg','img/wall/06.jpg','img/wall/07.jpg','img/wall/08.jpg',
    'img/wall/09.jpg','img/wall/10.jpg','img/wall/11.jpg','img/wall/12.jpg',
    'img/wall/13.jpg','img/wall/14.jpg','img/wall/15.jpg','img/wall/16.jpg',
    'img/wall/17.jpg'
  ];

  // --- Detecção segura de mobile ---
  const isMobile = () => {
    const ua = navigator.userAgent || '';
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  };

  // --- Detecção segura de TV ---
  const isTV = () => {
    const ua = (navigator.userAgent || '').toLowerCase();
    const tvKeywords = [
      'smarttv','smart-tv','hbbtv','netcast','nettv','webos','tizen',
      'appletv','googletv','viera','bravia','roku','boxee','xbox','playstation','android tv'
    ];
    return tvKeywords.some(k => ua.includes(k));
  };

  // --- Fallback para mobile/TV ---
  if (isMobile() || isTV()) {
    Object.assign(hero.style, {
      backgroundImage: `url(${CAPA})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    });
    console.log('⚠️ Mobile ou TV detectado → fundo estático aplicado.');
    return;
  }

  // --- Funções de embaralhar e montar sequência ---
  const embaralhar = arr => [...arr].sort(() => Math.random() - 0.5);
  const montarSequencia = () => embaralhar(IMAGENS).flatMap(img => [CAPA, img]).concat(CAPA);

  hero.style.background = 'none';
  const layer1 = document.createElement('div');
  const layer2 = document.createElement('div');
  layer1.className = 'hero-bg active';
  layer2.className = 'hero-bg';
  hero.append(layer1, layer2);

  let sequencia = montarSequencia(), indice = 0;
  let ativa = layer1, proxima = layer2, timeoutId = null;

  const trocar = () => {
    const url = sequencia[indice];
    const tempo = url === CAPA ? 10000 : 15000;
    proxima.style.backgroundImage = `url(${url})`;
    proxima.classList.add('active');
    ativa.classList.remove('active');
    [ativa, proxima] = [proxima, ativa];
    indice = (indice + 1) % sequencia.length;
    if (indice === 0) sequencia = montarSequencia();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(trocar, tempo);
  };

  // --- Inicializa animação no desktop ---
  layer1.style.backgroundImage = `url(${sequencia[0]})`;
  timeoutId = setTimeout(trocar, sequencia[0] === CAPA ? 10000 : 15000);
});


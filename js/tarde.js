const feeds = [
    'https://www.noticiasaominuto.com.br/rss/politica',
    'https://www.noticiasaominuto.com.br/rss/economia',
    'https://g1.globo.com/rss/g1/mundo/',
    'https://admin.cnnbrasil.com.br/feed/',
    'https://roadie-metal.com/feed/',
    'https://www.bahianoticias.com.br/esportes/rss.xml'
];

// === VARIÁVEIS DE SLOGAN E PATROCINADORES ===
  let slogan = { titulo: "🤘 Programa Monstros do Rock - Especial Iron Maiden, Sábado às 20h 🤘", url: null };
  let patrocinadores = [
    { titulo: "VJ Suplementos, A melhor loja de Suplementos de São Carlos", url: "https://www.instagram.com/vjsuplementos_saocarlos/" },
    { titulo: "Rádio Sanca Rock - São Carlos / SP", url: null }
  ];

const noticiasSpan = document.getElementById('noticias');

function decodeHTMLEntities(text) {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value.trim();
}

async function fetchRSS(url) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (data.status === "ok" && data.items) {
      return data.items.map(item => ({
        titulo: decodeHTMLEntities(item.title),
        url: item.link
      }));
    }
  } catch (e) {
    console.warn("Erro ao buscar feed:", url, e);
  }
  return [];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function carregarNoticias() {
  const resultados = await Promise.allSettled(feeds.map(feed => fetchRSS(feed)));

  let noticiasRSS = [];
  resultados.forEach(r => {
    if (r.status === 'fulfilled' && r.value.length > 0) {
      r.value.forEach(n => {
        if (!noticiasRSS.some(x => x.titulo === n.titulo)) noticiasRSS.push(n);
      });
    }
  });

  noticiasRSS = shuffleArray(noticiasRSS);
  if (noticiasRSS.length === 0) noticiasRSS.push({ titulo: "Nenhuma notícia disponível", url: null });

  const todasNoticias = [];
  let noticiaIndex = 0;

  // Slogan + patrocinadores
  todasNoticias.push(slogan);
  shuffleArray(patrocinadores).forEach(p => todasNoticias.push(p));

  for (let i = 0; i < 5 && noticiaIndex < noticiasRSS.length; i++) {
    todasNoticias.push(noticiasRSS[noticiaIndex]);
    noticiaIndex++;
  }

  while (noticiaIndex < noticiasRSS.length) {
    todasNoticias.push(slogan);
    shuffleArray(patrocinadores).forEach(p => todasNoticias.push(p));
    for (let i = 0; i < 5 && noticiaIndex < noticiasRSS.length; i++) {
      todasNoticias.push(noticiasRSS[noticiaIndex]);
      noticiaIndex++;
    }
  }

  mostrarMensagem(0, todasNoticias);
}

function mostrarMensagem(index, todasNoticias) {
  noticiasSpan.style.opacity = 0;
  setTimeout(() => {
    const mensagemAtual = todasNoticias[index];
    if (mensagemAtual.url) {
      noticiasSpan.innerHTML = `<a href="${mensagemAtual.url}" target="_blank">${mensagemAtual.titulo}</a>`;
    } else {
      noticiasSpan.innerHTML = mensagemAtual.titulo;
    }
    noticiasSpan.style.transition = 'opacity 0.5s';
    noticiasSpan.style.opacity = 1;
  }, 500);

  setTimeout(() => {
    mostrarMensagem((index + 1) % todasNoticias.length, todasNoticias);
  }, 10500);
}

carregarNoticias();








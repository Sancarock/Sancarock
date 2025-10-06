// Slogan
const slogan = { titulo: "🤘 Programa Monstros do Rock - Especial Buffalo, Sábado às 20h 🤘", url: null };

// Patrocinadores
const patrocinadores = [
  { titulo: "VJ Suplementos, a melhor loja de Suplementos de São Carlos", url: "https://www.instagram.com/vjsuplementos_saocarlos/" },
  { titulo: "Rádio Sanca Rock, Aqui toca de Tudo, Tudo que é Rock!", url: null },
  { titulo: "Siga nosso Instagram - @radio_sancarock", url: "https://www.instagram.com/radio_sancarock/" }
];

const noticiasSpan = document.getElementById('noticias');
let todasMensagens = [];

// Monta array do ciclo: slogan + patrocinadores
function carregarMensagens() {
  todasMensagens = [];
  todasMensagens.push(slogan);
  shuffleArray(patrocinadores).forEach(p => todasMensagens.push(p));
  
  // Se quiser, pode repetir o ciclo várias vezes
  // Exemplo: 2x
  todasMensagens.push(slogan);
  shuffleArray(patrocinadores).forEach(p => todasMensagens.push(p));
  
  mostrarMensagem(0);
}

// Função para embaralhar array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Mostra cada mensagem com fade
function mostrarMensagem(index) {
  noticiasSpan.style.opacity = 0;

  setTimeout(() => {
    const mensagemAtual = todasMensagens[index];
    if (mensagemAtual.url) {
      noticiasSpan.innerHTML = `<a href="${mensagemAtual.url}" target="_blank" style="color:#ffcc00; text-decoration:none;">${mensagemAtual.titulo}</a>`;
    } else {
      noticiasSpan.innerHTML = mensagemAtual.titulo;
    }
    noticiasSpan.style.transition = 'opacity 0.5s';
    noticiasSpan.style.opacity = 1;
  }, 500);

  // Tempo fixo de 10s por mensagem
  const duration = 10000;
  setTimeout(() => {
    mostrarMensagem((index + 1) % todasMensagens.length);
  }, duration + 500);
}

// Inicia
carregarMensagens();

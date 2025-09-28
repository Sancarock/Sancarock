// Elementos
const radioPlayer = document.getElementById('radioPlayer');
const playPauseBtn = document.getElementById('playPause');
const volPlus = document.getElementById('volPlus');
const volMinus = document.getElementById('volMinus');
const equalizer = document.getElementById('equalizer');
const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const albumCover = document.getElementById('albumCover');
const volumeDisplay = document.getElementById('volumeDisplay');
const playerContainer = document.getElementById('playerContainer');
const apiKeyLastFm = 'd08d389671438f325d13d64f0c94b583';

function decodeHtmlEntities(text) {
  if (!text || typeof text !== 'string') return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

let lastTrack = "";

// --- Funções de busca de capa ---
async function fetchCoverFromLastFm(artist, track) {
  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKeyLastFm}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`);
    const data = await res.json();
    const images = data?.track?.album?.image || [];
    const cover = images.find(img => img.size === 'extralarge')?.['#text'];
    if (cover) return `https://images.weserv.nl/?url=${encodeURIComponent(cover)}&w=300&h=300&fit=cover`;
  } catch (e) { console.warn('Last.fm falhou:', e); }
  return null;
}

async function fetchCoverFromDeezer(artist, track) {
  try {
    const res = await fetch(`https://api.deezer.com/search/track?q=artist:"${encodeURIComponent(artist)}" track:"${encodeURIComponent(track)}"&limit=1`);
    const data = await res.json();
    return data.data?.[0]?.album?.cover_big || null;
  } catch (e) { console.warn('Deezer falhou:', e); return null; }
}

async function fetchCoverFromApple(artist, track) {
  try {
    const cleanArtist = artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const cleanTrack = track.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const term = encodeURIComponent(`${cleanArtist} ${cleanTrack}`);
    const url = `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.results?.[0]?.artworkUrl100) return data.results[0].artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg');
  } catch (e) { console.warn('Apple Music falhou:', e); }
  return null;
}

async function fetchCoverFromMusicBrainz(artist, track) {
  try {
    const query = `artist:"${encodeURIComponent(artist)}" AND recording:"${encodeURIComponent(track)}"`;
    const res = await fetch(`https://musicbrainz.org/ws/2/recording?query=${query}&fmt=json&limit=1`);
    const data = await res.json();
    if (data.recordings?.[0]?.releases?.[0]) {
      const releaseId = data.recordings[0].releases[0].id;
      const coverUrl = `https://coverartarchive.org/release/${releaseId}/front-500.jpg`;
      const head = await fetch(coverUrl, { method: 'HEAD' });
      if (head.ok) return coverUrl;
    }
  } catch (e) { console.warn('MusicBrainz falhou:', e); }
  return null;
}

// --- Função central para pegar capa na nova ordem ---
async function getCoverUrl(artist, track) {
  let coverUrl = null;

  coverUrl = await fetchCoverFromLastFm(artist, track);
  if (coverUrl) { console.log("ðŸŽµ Capa encontrada no Last.fm"); return coverUrl; }

  coverUrl = await fetchCoverFromDeezer(artist, track);
  if (coverUrl) { console.log("ðŸŽµ Capa encontrada no Deezer"); return coverUrl; }

  coverUrl = await fetchCoverFromApple(artist, track);
  if (coverUrl) { console.log("ðŸŽµ Capa encontrada no Apple Music"); return coverUrl; }

  coverUrl = await fetchCoverFromMusicBrainz(artist, track);
  if (coverUrl) { console.log("ðŸŽµ Capa encontrada no MusicBrainz"); return coverUrl; }

  console.warn("âš ï¸ Nenhuma capa encontrada, usando padrão.");
  return null;
}

// --- Atualização do fetchMetadata ---
async function fetchMetadata() {
  try {
    const response = await fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=');
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-1');
    const text = decoder.decode(buffer);

    const kbpsIndex = text.lastIndexOf('Kbps');
    if (kbpsIndex === -1) throw new Error("Formato inesperado");

    let trackInfo = text.slice(kbpsIndex + 4).trim();
    trackInfo = trackInfo.replace(/<[^>]*>/g, '');
    const urlRegex = /https?:\/\/[^\s]+/g;
    let currentTrack = trackInfo.replace(urlRegex, '').trim();
	currentTrack = decodeHtmlEntities(currentTrack); // ← ADICIONE ESSA LINHA AQUI

    if (currentTrack === lastTrack) return;
    lastTrack = currentTrack;

    trackTitle.innerText = currentTrack || "Música desconhecida";
    artistName.innerText = "";

    let artist = "", track = "";
    if (currentTrack.includes(" - ")) {
      [artist, track] = currentTrack.split(" - ").map(p => p.trim());
      artistName.innerText = artist;
    }

    // ¤ Casos Especiais
    const trackNormalized = currentTrack.toLowerCase().replace(/[-_]/g, " ");
    if (trackNormalized.includes("monstros do rock")) { albumCover.src = "img/monstrosdorock.gif"; return; }
    if (trackNormalized.includes("disco novo")) { albumCover.src = "img/disconovo.png"; return; }
    if (!artist || !track) { albumCover.src = "img/sanca.png"; return; }

    // âž¤ Busca capa usando a nova ordem
    const coverUrl = await getCoverUrl(artist, track);
    albumCover.src = coverUrl || "img/sanca.png";

  } catch (err) {
    console.error("Erro em fetchMetadata:", err);
    albumCover.src = "img/sanca.png";
    trackTitle.innerText = "Erro ao carregar";
    artistName.innerText = "";
  }
}

// --- Inicialização ---
window.onload = function() {
  radioPlayer.volume = 0.5;
  volumeDisplay.textContent = '50%';
  radioPlayer.muted = false;
  radioPlayer.play().then(() => {
    fetchMetadata();
    equalizer.style.display = 'flex';
    playPauseBtn.textContent = '❚❚';
  }).catch(() => {
    // Autoplay bloqueado â€” ainda busca metadados
    fetchMetadata();
  });
};

// --- Controles ---
playPauseBtn.addEventListener('click', () => {
  if (radioPlayer.paused) {
    radioPlayer.play();
    playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pausa: ❚❚
    equalizer.style.display = 'flex';
  } else {
    radioPlayer.pause();
    playPauseBtn.innerHTML = '&#9654;'; // Play: ►
    equalizer.style.display = 'none';
  }
});

volPlus.addEventListener('click', () => {
  radioPlayer.volume = Math.min(radioPlayer.volume + 0.1, 1);
  volumeDisplay.textContent = `${Math.round(radioPlayer.volume * 100)}%`;
});

volMinus.addEventListener('click', () => {
  radioPlayer.volume = Math.max(radioPlayer.volume - 0.1, 0);
  volumeDisplay.textContent = `${Math.round(radioPlayer.volume * 100)}%`;
});

// Atualiza a cada 30 segundos
setInterval(fetchMetadata, 30000);
// JavaScript Document


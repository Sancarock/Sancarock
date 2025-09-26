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

// --- Funções de busca de capa ---
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
  } catch (e) {
    console.warn('MusicBrainz falhou:', e);
  }
  return null;
}

async function fetchCoverFromDeezer(artist, track) {
  try {
    const res = await fetch(`https://api.deezer.com/search/track?q=artist:"${encodeURIComponent(artist)}" track:"${encodeURIComponent(track)}"&limit=1`);
    const data = await res.json();
    return data.data?.[0]?.album?.cover_big || null;
  } catch (e) {
    console.warn('Deezer falhou:', e);
    return null;
  }
}

async function fetchCoverFromLastFm(artist, track) {
  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKeyLastFm}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`);
    const data = await res.json();
    const images = data?.track?.album?.image || [];
    const cover = images.find(img => img.size === 'extralarge')?.['#text'];
    if (cover) {
      return `https://images.weserv.nl/?url=${encodeURIComponent(cover)}&w=300&h=300&fit=cover`;
    }
  } catch (e) {
    console.warn('Last.fm falhou:', e);
    return null;
  }
}

// --- Metadados ---
async function fetchMetadata() {
  try {
    // ✅ Corrigido: removido espaço extra na URL
    const response = await fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=');
    const text = await response.text();

    // Extrai após "Kbps"
    const kbpsIndex = text.lastIndexOf('Kbps');
    if (kbpsIndex === -1) throw new Error('Formato inesperado');

    let trackInfo = text.slice(kbpsIndex + 4).trim();

    // Remove URLs e tags HTML
    const urlRegex = /https?:\/\/[^\s]+/g;
    let currentTrack = trackInfo.replace(urlRegex, '').replace(/<[^>]*>/g, '').trim();

    // Atualiza título
    trackTitle.innerText = currentTrack || 'Música desconhecida';

    // Separa artista e música
    let artist = '', track = '';
    if (currentTrack.includes(' - ')) {
      [artist, track] = currentTrack.split(' - ').map(p => p.trim());
      artistName.innerText = artist;
    } else {
      artistName.innerText = '';
    }

    // ➤ Casos especiais
    const trackNormalized = currentTrack.toLowerCase().replace(/[-_]/g, ' ');
    if (trackNormalized.includes('monstros do rock')) {
      albumCover.src = 'img/monstrosdorock.gif';
      return;
    }
    if (trackNormalized.includes('disco novo')) {
      albumCover.src = 'img/disconovo.png';
      return;
    }

    // Se não tiver artista/música válidos
    if (!artist || !track) {
      albumCover.src = 'img/sanca.png';
      return;
    }

    // ➤ Busca capas: MusicBrainz → Deezer → Last.fm (ignora albumCoverURL da rádio)
    let coverUrl = await fetchCoverFromMusicBrainz(artist, track);
    if (!coverUrl) coverUrl = await fetchCoverFromDeezer(artist, track);
    if (!coverUrl) coverUrl = await fetchCoverFromLastFm(artist, track);

    albumCover.src = coverUrl || 'img/sanca.png';

  } catch (err) {
    console.error('Erro em fetchMetadata:', err);
    albumCover.src = 'img/sanca.png';
    trackTitle.innerText = 'Erro ao carregar';
    artistName.innerText = '';
  }
}

// --- Inicialização ---
window.onload = function () {
  radioPlayer.volume = 0.5;
  volumeDisplay.textContent = '50%';
  radioPlayer.muted = false;
  radioPlayer.play()
    .then(() => {
      fetchMetadata();
      equalizer.style.display = 'flex';
      playPauseBtn.textContent = '❚❚';
    })
    .catch(() => {
      // Autoplay bloqueado — ainda assim busca metadados
      fetchMetadata();
    });
};

// --- Controles ---
playPauseBtn.addEventListener('click', () => {
  if (radioPlayer.paused) {
    radioPlayer.play();
    playPauseBtn.textContent = '❚❚';
    equalizer.style.display = 'flex';
  } else {
    radioPlayer.pause();
    playPauseBtn.textContent = '►';
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

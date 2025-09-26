// Elementos existentes no HTML
const radioPlayer = document.getElementById('radioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const albumCover = document.getElementById('albumCover');
const volumeSlider = document.getElementById('volumeSlider');
const volumeDisplay = document.getElementById('volumeDisplay');
const statusPlayer = document.getElementById('statusPlayer');
const playerContainer = document.getElementById('playerContainer');
const apiKeyLastFm = 'd08d389671438f325d13d64f0c94b583';

let lastTrack = "";

// Funções de busca de capa (MusicBrainz, Deezer, Last.fm)
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

async function fetchCoverFromDeezer(artist, track) {
  try {
    const res = await fetch(`https://api.deezer.com/search/track?q=artist:"${encodeURIComponent(artist)}" track:"${encodeURIComponent(track)}"&limit=1`);
    const data = await res.json();
    return data.data?.[0]?.album?.cover_big || null;
  } catch (e) { console.warn('Deezer falhou:', e); }
  return null;
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
  } catch (e) { console.warn('Last.fm falhou:', e); }
  return null;
}

// Atualiza status "Ao vivo" / "Pausado"
function updateStatus() {
  statusPlayer.textContent = radioPlayer.paused ? "⏸🟡 Pausado" : "🟡 Ao vivo";
}

// Atualiza metadados da API da Transmissão Digital
async function fetchMetadata() {
  try {
    const response = await fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=');
    const text = await response.text();

    const kbpsIndex = text.lastIndexOf('Kbps');
    if (kbpsIndex === -1) throw new Error('Formato inesperado');

    let trackInfo = text.slice(kbpsIndex + 4).trim();
    const urlRegex = /https?:\/\/[^\s]+/g;
    let currentTrack = trackInfo.replace(urlRegex, '').replace(/<[^>]*>/g, '').trim();

    if (currentTrack === lastTrack) return;
    lastTrack = currentTrack;

    // Atualiza elementos
    trackTitle.innerText = currentTrack || 'Música desconhecida';
    artistName.innerText = '';

    // Separa artista e música
    let artist = '', track = '';
    if (currentTrack.includes(' - ')) {
      [artist, track] = currentTrack.split(' - ').map(p => p.trim());
      artistName.innerText = artist;
    }

    // Título da aba
    document.title = `${currentTrack || 'Sanca Rock'} | Sanca Rock`;

    // Casos especiais
    const trackNorm = currentTrack.toLowerCase();
    if (trackNorm.includes('monstros do rock')) {
      albumCover.src = 'img/monstrosdorock.gif';
      return;
    }
    if (trackNorm.includes('disco novo')) {
      albumCover.src = 'img/disconovo.png';
      return;
    }

    if (!artist || !track) {
      albumCover.src = 'img/sanca.png';
      return;
    }

    // Busca capa
    let coverUrl = await fetchCoverFromMusicBrainz(artist, track);
    if (!coverUrl) coverUrl = await fetchCoverFromDeezer(artist, track);
    if (!coverUrl) coverUrl = await fetchCoverFromLastFm(artist, track);

    albumCover.src = coverUrl || 'img/sanca.png';

  } catch (err) {
    console.error('Erro em fetchMeta', err);
    albumCover.src = 'img/sanca.png';
    trackTitle.innerText = 'Erro ao carregar';
    artistName.innerText = '';
    document.title = 'Sanca Rock | Erro';
  }
}

// Controles
function togglePlayPause() {
  if (radioPlayer.paused) {
    radioPlayer.play().then(() => {
      playPauseBtn.textContent = 'Pause';
      playPauseBtn.className = 'pause-button';
      document.getElementById('equalizer').style.display = 'flex';
    }).catch(err => console.error('Erro ao reproduzir:', err));
  } else {
    radioPlayer.pause();
    playPauseBtn.textContent = 'Play';
    playPauseBtn.className = 'play-button';
    document.getElementById('equalizer').style.display = 'none';
  }
  updateStatus();
}

function setVolume(value) {
  radioPlayer.volume = parseFloat(value);
  volumeDisplay.textContent = `${Math.round(radioPlayer.volume * 100)}%`;
}

function adjustVolume(change) {
  const newVol = Math.max(0, Math.min(1, radioPlayer.volume + change));
  radioPlayer.volume = newVol;
  volumeSlider.value = newVol;
  volumeDisplay.textContent = `${Math.round(newVol * 100)}%`;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  radioPlayer.volume = parseFloat(volumeSlider.value);
  volumeDisplay.textContent = `${Math.round(radioPlayer.volume * 100)}%`;
  updateStatus();

  // Tenta tocar (autoplay)
  radioPlayer.play().catch(() => {
    // Se falhar, espera interação
    document.body.addEventListener('click', () => {
      radioPlayer.play().then(() => {
        playPauseBtn.textContent = 'Pause';
        playPauseBtn.className = 'pause-button';
        document.getElementById('equalizer').style.display = 'flex';
      });
    }, { once: true });
  });

  fetchMetadata();
  setInterval(fetchMetadata, 30000);
  setInterval(updateStatus, 1000);
});

// Funções globais para os botões do HTML
window.togglePlayPause = togglePlayPause;
window.adjustVolume = adjustVolume;
window.setVolume = setVolume;
window.abrir_mail_popup = () => {
  window.open("cont.html", "", "width=550,height=550,toolbar=no,location=no,status=yes,scrollbars=no,resizable=NO");
};

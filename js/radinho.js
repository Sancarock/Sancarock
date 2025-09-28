
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

// ---------------- CAPAS ---------------- //
async function fetchCoverFromiTunes(artist, track) {
  try {
    const query = encodeURIComponent(`${artist} ${track}`);
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].artworkUrl100.replace("100x100", "600x600");
    }
  } catch (e) {
    console.warn("iTunes falhou:", e);
  }
  return null;
}

async function fetchArtistCoverFromiTunes(artist) {
  try {
    const query = encodeURIComponent(artist);
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=musicArtist&limit=1`);
    const data = await res.json();
    if (data.results && data.results.length > 0 && data.results[0].artworkUrl100) {
      return data.results[0].artworkUrl100.replace("100x100", "600x600");
    }
  } catch (e) {
    console.warn("iTunes (artista) falhou:", e);
  }
  return null;
}

async function fetchCoverFromDeezer(artist, track) {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/track?q=artist:"${encodeURIComponent(artist)}" track:"${encodeURIComponent(track)}"&limit=1`
    );
    const data = await res.json();
    return data.data?.[0]?.album?.cover_big || null;
  } catch (e) {
    console.warn("Deezer falhou:", e);
  }
  return null;
}

async function fetchCoverFromLastFm(artist, track) {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKeyLastFm}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`
    );
    const data = await res.json();
    const images = data?.track?.album?.image || [];
    const cover = images.find(img => img.size === "extralarge")?.["#text"];
    if (cover) {
      return `https://images.weserv.nl/?url=${encodeURIComponent(cover)}&w=300&h=300&fit=cover`;
    }
  } catch (e) {
    console.warn("Last.fm falhou:", e);
  }
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
      const head = await fetch(coverUrl, { method: "HEAD" });
      if (head.ok) return coverUrl;
    }
  } catch (e) {
    console.warn("MusicBrainz falhou:", e);
  }
  return null;
}

// Orquestrador de capas
async function getCoverUrl(artist, track) {
  let coverUrl = null;

  coverUrl = await fetchCoverFromiTunes(artist, track);
  if (coverUrl) return coverUrl;

  coverUrl = await fetchCoverFromDeezer(artist, track);
  if (coverUrl) return coverUrl;

  coverUrl = await fetchCoverFromLastFm(artist, track);
  if (coverUrl) return coverUrl;

  coverUrl = await fetchCoverFromMusicBrainz(artist, track);
  if (coverUrl) return coverUrl;

  coverUrl = await fetchArtistCoverFromiTunes(artist);
  if (coverUrl) return coverUrl;

  if (artist) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(artist)}&background=000&color=fff&size=300`;
  }

  return "img/sanca.png";
}

// ---------------- PLAYER ---------------- //
function updateStatus() {
  statusPlayer.textContent = radioPlayer.paused ? "⏸️🟠 Pausado" : "🟢 Ao vivo";
}

// ✅ CORRIGIDO: parser adaptado ao formato exato da API
async function fetchMetadata() {
  try {
    const response = await fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=');
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-1');
    let text = decoder.decode(buffer);

    const kbpsIndex = text.lastIndexOf('Kbps');
    if (kbpsIndex === -1) throw new Error('Kbps não encontrado');

    let afterKbps = text.slice(kbpsIndex + 4);

    // 🔥 REMOVER URLs MESMO QUE ESTEJAM GRUDADAS (sem espaço antes)
    afterKbps = afterKbps.replace(/https?:\/\/[^\s]*/g, '');

    // Remover tags HTML
    afterKbps = afterKbps.replace(/<[^>]*>/g, '');

    // Limpar espaços extras
    afterKbps = afterKbps.trim();

    if (!afterKbps || afterKbps === lastTrack) return;
    lastTrack = afterKbps;

    let artist = '', track = '';

    // ✅ Agora SIM: formato "Artista - Música"
    if (afterKbps.includes(' - ')) {
      const parts = afterKbps.split(' - ', 2); // divide só na primeira ocorrência
      artist = parts[0].trim();
      track = parts[1].trim();
    } else {
      // fallback: tudo é música
      track = afterKbps;
    }

    // Atualiza elementos
    artistName.innerText = artist;
    trackTitle.innerText = track || 'Música desconhecida';
    document.title = `${artist ? `${artist} - ${track}` : afterKbps} | Sanca Rock`;

    // Casos especiais
    const lower = afterKbps.toLowerCase();
    if (lower.includes('monstros do rock')) {
      albumCover.src = 'img/monstrosdorock.gif';
      return;
    }
    if (lower.includes('disco novo')) {
      albumCover.src = 'img/disconovo.png';
      return;
    }

    // Busca capa
    if (artist && track) {
      const coverUrl = await getCoverUrl(artist, track);
      albumCover.src = coverUrl || 'img/sanca.png';
    } else {
      albumCover.src = 'img/sanca.png';
    }

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
    }).catch(err => {
      console.warn('Autoplay bloqueado. Aguardando interação do usuário.');
    });
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

  // Tenta autoplay (falhará silenciosamente em muitos navegadores)
  radioPlayer.play().catch(() => {
    // Só tenta tocar após o primeiro clique do usuário
    document.body.addEventListener('click', () => {
      radioPlayer.play().then(() => {
        playPauseBtn.textContent = 'Pause';
        playPauseBtn.className = 'pause-button';
        document.getElementById('equalizer').style.display = 'flex';
      }).catch(e => console.warn('Falha ao tocar após clique:', e));
    }, { once: true });
  });

  fetchMetadata();
  setInterval(fetchMetadata, 30000); // Atualiza a cada 30s
  setInterval(updateStatus, 1000);
});

// Funções globais para os botões
window.togglePlayPause = togglePlayPause;
window.adjustVolume = adjustVolume;
window.setVolume = setVolume;
window.abrir_mail_popup = () => {
  window.open("cont.html", "", "width=550,height=550,toolbar=no,location=no,status=yes,scrollbars=no,resizable=NO");
};
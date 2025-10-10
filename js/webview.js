// ---------------- ELEMENTOS ---------------- //
const radioPlayer = document.getElementById('radioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const albumCover = document.getElementById('albumCover');
const volumeSlider = document.getElementById('volumeSlider');
const volumeDisplay = document.getElementById('volumeDisplay');
const statusPlayer = document.getElementById('statusPlayer');
const equalizer = document.getElementById('equalizer');
const apiKeyLastFm = 'd08d389671438f325d13d64f0c94b583';

let lastTrack = "";
let retryCount = 0;
const maxRetries = 3;

// ---------------- CAPAS ---------------- //
async function fetchCoverFromiTunes(artist, track) {
  try {
    const query = encodeURIComponent(`${artist} ${track}`);
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=5`);
    const data = await res.json();

    if (data.results?.length > 0) {
      const match = data.results.find(r =>
        r.artistName.toLowerCase().includes(artist.toLowerCase())
      );
      if (match) {
        return match.artworkUrl100.replace("100x100", "600x600");
      }
    }
  } catch (e) {
    console.warn("iTunes falhou:", e);
  }
  return null;
}

async function fetchCoverFromLastFm(artist, track) {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKeyLastFm}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`
    );
    const data = await res.json();

    if (data?.track?.album?.image) {
      const images = data.track.album.image;
      const cover = images.find(img => img.size === "extralarge")?.["#text"];
      if (cover) return cover;
    }
  } catch (e) {
    console.warn("Last.fm falhou:", e);
  }
  return null;
}

async function getCoverUrl(artist, track) {
  let coverUrl = null;

  coverUrl = await fetchCoverFromiTunes(artist, track);
  if (coverUrl) return coverUrl;

  coverUrl = await fetchCoverFromLastFm(artist, track);
  if (coverUrl) return coverUrl;

  return "img/sanca.png"; // fallback único
}

// ---------------- PLAYER ---------------- //
function updateStatus() {
  statusPlayer.textContent = radioPlayer.paused ? "⏸️🟠 Pausado" : "🟢 Ao vivo";
  equalizer.style.opacity = radioPlayer.paused ? "0.3" : "1";
}

async function fetchMetadata() {
  try {
    const response = await fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=');
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-1');
    let text = decoder.decode(buffer);

    const kbpsIndex = text.lastIndexOf('Kbps');
    if (kbpsIndex === -1) throw new Error('Kbps não encontrado');

    let afterKbps = text.slice(kbpsIndex + 4);

    afterKbps = afterKbps.replace(/https?:\/\/[^\s]*/g, '');
    afterKbps = afterKbps.replace(/<[^>]*>/g, '');
    afterKbps = afterKbps.trim();

    function decodeHTMLEntities(str) {
      const txt = document.createElement("textarea");
      txt.innerHTML = str;
      return txt.value;
    }
    afterKbps = decodeHTMLEntities(afterKbps);

    if (!afterKbps || afterKbps === lastTrack) return;
    lastTrack = afterKbps;

    let artist = '', track = '';
    if (afterKbps.includes(' - ')) {
      const parts = afterKbps.split(' - ', 2);
      artist = parts[0].trim();
      track = parts[1].trim();
    } else {
      artistName.innerText = '';
      trackTitle.innerText = 'Rádio Sanca Rock';
      albumCover.src = 'img/sanca.png';
      document.title = 'Rádio Sanca Rock';
      return;
    }

    const lower = afterKbps.toLowerCase();

    if (lower.includes('monstros do rock')) {
      trackTitle.innerText = `${artist} - ${track}`;
      artistName.innerText = '';
      albumCover.src = 'img/monstrosdorock.png';
      document.title = `${artist} - ${track} | Rádio Sanca Rock`;
      return;
    }

    if (lower.includes('disco novo')) {
      trackTitle.innerText = `${artist} - ${track}`;
      artistName.innerText = '';
      albumCover.src = 'img/disconovo.png';
      document.title = `${artist} - ${track} | Rádio Sanca Rock`;
      return;
    }

    trackTitle.innerText = `${artist} - ${track}`;
    artistName.innerText = '';
    document.title = `${artist} - ${track} | Rádio Sanca Rock`;

    if (artist && track) {
      const coverUrl = await getCoverUrl(artist, track);
      albumCover.src = coverUrl || 'img/sanca.png';
    } else {
      albumCover.src = 'img/sanca.png';
    }

  } catch (err) {
    console.error('Erro em fetchMetadata', err);
    albumCover.src = 'img/sanca.png';
    trackTitle.innerText = 'Rádio Sanca Rock';
    artistName.innerText = '';
    document.title = 'Rádio Sanca Rock';
  }
}

// ---------------- CONTROLES ---------------- //
function togglePlayPause() {
  if (radioPlayer.paused) {
    radioPlayer.play().then(() => {
      playPauseBtn.textContent = 'Pause';
      playPauseBtn.className = 'pause-button';
      equalizer.style.display = 'flex';
      retryCount = 0;
    }).catch(err => {
      console.warn('Autoplay bloqueado. Aguardando interação do usuário.');
    });
  } else {
    radioPlayer.pause();
    playPauseBtn.textContent = 'Play';
    playPauseBtn.className = 'play-button';
    equalizer.style.display = 'none';
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

// ---------------- INIT ---------------- //
document.addEventListener('DOMContentLoaded', () => {
  radioPlayer.volume = parseFloat(volumeSlider.value);
  volumeDisplay.textContent = `${Math.round(radioPlayer.volume * 100)}%`;
  equalizer.style.opacity = "0.3";
  updateStatus();

  fetchMetadata();
  setInterval(fetchMetadata, 30000);
  setInterval(updateStatus, 1000);
});

function abrir_mail_popup() {
  window.location.href = "mailto:sancanight@gmail.com?subject=Contato&body=Olá!";
}

window.togglePlayPause = togglePlayPause;
window.adjustVolume = adjustVolume;
window.setVolume = setVolume;

// ---------------- RECONEXÃO AUTOMÁTICA ---------------- //
radioPlayer.addEventListener("error", () => {
  if (radioPlayer.paused) return;

  if (retryCount >= maxRetries) {
    statusPlayer.textContent = "⚠️ Erro na conexão. Clique em Play para tentar novamente.";
    equalizer.style.display = 'none';
    return;
  }

  retryCount++;
  statusPlayer.textContent = `🔄 Reconectando... (tentativa ${retryCount})`;
  equalizer.style.display = 'none';

  setTimeout(() => {
    radioPlayer.load();
    radioPlayer.play()
      .then(() => {
        retryCount = 0;
        updateStatus();
        equalizer.style.display = 'flex';
      })
      .catch(() => {
        console.log("Reconexão bloqueada, aguardando interação do usuário.");
      });
  }, 5000);
});

// Atualiza metadados da API da Transmissão Digital
async function fetchMetadata() {
  try {
    const response = await fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=');
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-1');
    const text = decoder.decode(buffer);

    const kbpsIndex = text.lastIndexOf('Kbps');
    if (kbpsIndex === -1) throw new Error('Formato inesperado');

    let trackInfo = text.slice(kbpsIndex + 4).trim();
    const urlRegex = /https?:\/\/[^\s]+/g;
    let currentTrack = trackInfo.replace(urlRegex, '').replace(/<[^>]*>/g, '').trim();
	currentTrack = decodeHtmlEntities(currentTrack); // ← ADICIONE ESSA LINHA AQUI

    if (currentTrack === lastTrack) return;
    lastTrack = currentTrack;

    // Atualiza elementos
    trackTitle.innerText = currentTrack || 'Música Desconhecida';
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

    // Busca capa pela nova ordem
    let coverUrl = await getCoverUrl(artist, track);
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
 radioPlayer.play().then(() => {
  playPauseBtn.textContent = 'Pause';
  playPauseBtn.className = 'pause-button';
  document.getElementById('equalizer').style.display = 'flex';
}).catch(() => {
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

// Funções Globais para botões do HTML
window.togglePlayPause = togglePlayPause;
window.adjustVolume = adjustVolume;
window.setVolume = setVolume;
window.abrir_mail_popup = () => {
  window.open("cont.html", "", "width=550,height=550,toolbar=no,location=no,status=yes,scrollbars=no,resizable=NO");
};

// JavaScript Document



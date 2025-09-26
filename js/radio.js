// Elementos
var radioPlayer = document.getElementById('radioPlayer');
var trackTitle = document.getElementById('trackTitle');
var artistName = document.getElementById('artistName');
var albumCover = document.getElementById('albumCover');
var statusPlayer = document.getElementById('statusPlayer');

// Atualiza status
function updateStatus() {
  statusPlayer.textContent = radioPlayer.paused ? "⏸🟡 Pausado" : "🟡 Ao vivo";
}

// Busca metadados (versão simples, sem async/await)
function fetchMetadata() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var text = xhr.responseText;

      // Extrai após "Kbps"
      var kbpsIndex = text.lastIndexOf('Kbps');
      if (kbpsIndex === -1) return;

      var trackInfo = text.slice(kbpsIndex + 4).replace(/<[^>]*>/g, '').trim();

      // Remove URLs
      var currentTrack = trackInfo.replace(/https?:\/\/[^\s]+/g, '').trim();

      // Atualiza título
      trackTitle.innerText = currentTrack || 'Música desconhecida';
      artistName.innerText = '';

      // Extrai artista
      if (currentTrack.indexOf(' - ') !== -1) {
        var parts = currentTrack.split(' - ');
        artistName.innerText = parts[0].trim();
      }

      // Título da aba
      document.title = currentTrack + ' | Sanca Rock';

      // Extrai URL da capa (última URL no texto)
      var urls = trackInfo.match(/https?:\/\/[^\s]+/g);
      var coverUrl = 'img/sanca.png';
      if (urls && urls.length >= 1) {
        coverUrl = urls[urls.length - 1]; // última URL = capa
      }

      // Casos especiais
      var trackLower = currentTrack.toLowerCase();
      if (trackLower.indexOf('monstros do rock') !== -1) {
        coverUrl = 'img/monstrosdorock.gif';
      } else if (trackLower.indexOf('disco novo') !== -1) {
        coverUrl = 'img/disconovo.png';
      }

      albumCover.src = coverUrl;
    }
  };
  xhr.send();
}

// Controles simples
function togglePlayPause() {
  if (radioPlayer.paused) {
    radioPlayer.play();
    document.getElementById('equalizer').style.display = 'flex';
    document.getElementById('playPauseBtn').textContent = 'Pause';
    document.getElementById('playPauseBtn').className = 'pause-button';
  } else {
    radioPlayer.pause();
    document.getElementById('equalizer').style.display = 'none';
    document.getElementById('playPauseBtn').textContent = 'Play';
    document.getElementById('playPauseBtn').className = 'play-button';
  }
  updateStatus();
}

function setVolume(val) {
  radioPlayer.volume = parseFloat(val);
  document.getElementById('volumeDisplay').textContent = Math.round(val * 100) + '%';
}

function adjustVolume(delta) {
  var vol = radioPlayer.volume + delta;
  vol = Math.max(0, Math.min(1, vol));
  radioPlayer.volume = vol;
  document.getElementById('volumeSlider').value = vol;
  setVolume(vol);
}

// Inicialização
window.onload = function () {
  radioPlayer.volume = 0.5;
  setVolume(0.5);
  updateStatus();

  // Tenta tocar
  radioPlayer.play().catch(function () {
    // Silenciosamente falha em autoplay — normal em TVs
  });

  fetchMetadata();
  setInterval(fetchMetadata, 30000);
  setInterval(updateStatus, 1000);
};

// Expõe funções globais para os botões
window.togglePlayPause = togglePlayPause;
window.setVolume = setVolume;
window.adjustVolume = adjustVolume;
window.abrir_mail_popup = function () {
  // Em TVs, window.open pode não funcionar — melhor remover ou alertar
  alert('Contato: seuemail@exemplo.com');
};

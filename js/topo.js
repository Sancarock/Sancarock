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

// Função para atualizar metadados
function fetchMetadata() {
  fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=')
    .then(r => r.arrayBuffer())
    .then(buffer => new TextDecoder('iso-8859-1').decode(buffer))
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const currentTrack = data.querySelector("musica_atual")?.textContent || "";
      const albumCoverURL = data.querySelector("capa_musica")?.textContent || "";

      trackTitle.innerText = currentTrack || "Música desconhecida";
      let artist = "", track = "";
      if (currentTrack.includes(" - ")) {
        [artist, track] = currentTrack.split(" - ").map(p => p.trim());
        artistName.innerText = artist;
      } else { artistName.innerText = ""; }

      // Capas especiais
      let trackNormalized = currentTrack.toLowerCase().replace(/[-_]/g, " ");
      if (trackNormalized.includes("monstros do rock")) { albumCover.src = "img/monstrosdorock.gif"; return; }
      if (trackNormalized.includes("disco novo")) { albumCover.src = "img/disconovo.png"; return; }

      if (artist && track) {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKeyLastFm}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`)
          .then(res => res.json())
          .then(lastFmData => {
            const images = lastFmData?.track?.album?.image || [];
            const cover = images.find(img => img.size === 'extralarge')?.['#text'];
            if (cover) albumCover.src = cover;
            else albumCover.src = albumCoverURL || "img/sanca.png";
          }).catch(()=>{ albumCover.src = albumCoverURL || "img/sanca.png"; });
      } else { albumCover.src = albumCoverURL || "img/sanca.png"; }
    }).catch(()=>{ albumCover.src = "img/sanca.png"; });
}

// Inicia rádio automaticamente
window.onload = function() {
  radioPlayer.volume = 0.25;
  volumeDisplay.textContent = '50%';
  radioPlayer.muted = false;
  radioPlayer.play().then(() => {
    fetchMetadata();
    equalizer.style.display = 'flex';
    playPauseBtn.textContent = '❚❚';
  }).catch(() => { /* Autoplay bloqueado */ });
};

// Play/Pause
playPauseBtn.addEventListener('click', () => {
  if (radioPlayer.paused) { radioPlayer.play(); playPauseBtn.textContent='❚❚'; equalizer.style.display='flex'; }
  else { radioPlayer.pause(); playPauseBtn.textContent='►'; equalizer.style.display='none'; }
});

// Volume + e -
volPlus.addEventListener('click', ()=> { radioPlayer.volume = Math.min(radioPlayer.volume + 0.1,1); volumeDisplay.textContent = `${Math.round(radioPlayer.volume*100)}%`; });
volMinus.addEventListener('click', ()=> { radioPlayer.volume = Math.max(radioPlayer.volume - 0.1,0); volumeDisplay.textContent = `${Math.round(radioPlayer.volume*100)}%`; });

// Atualiza metadados a cada 30s
setInterval(fetchMetadata, 30000);

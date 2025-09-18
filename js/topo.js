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

// --- Metadados ---
function fetchMetadata() {
  fetch('https://transmissaodigital.com/api/VG1wamVFNW5QVDA9KzU=')
    .then(r => r.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('iso-8859-1');
      return decoder.decode(buffer);
    })
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const currentTrack = data.querySelector("musica_atual")?.textContent || "";
      const albumCoverURL = data.querySelector("capa_musica")?.textContent || "";
      
      trackTitle.innerText = currentTrack || "Música desconhecida";

      let artist = "", track = "";
      if (currentTrack.includes(" - ")) {
        [artist, track] = currentTrack.split(" - ").map(p => p.trim());
        artistName.innerText = artist;
      } else { 
        artistName.innerText = ""; 
      }

      // ➤ Casos Especiais
      let trackNormalized = currentTrack.toLowerCase().replace(/[-_]/g, " ");
      if (trackNormalized.includes("monstros do rock")) {
        albumCover.src = "img/monstrosdorock.gif"; 
        return;
      }
      if (trackNormalized.includes("disco novo")) {
        albumCover.src = "img/disconovo.png"; 
        return;
      }

      // ➤ Fluxo Principal: Last.fm → Deezer → fallback
      if (artist && track) {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKeyLastFm}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`)
          .then(res => res.json())
          .then(lastFmData => {
            const images = lastFmData?.track?.album?.image || [];
            const cover = images.find(img => img.size === 'extralarge')?.['#text'];

            // Função fallback: tenta Deezer
            function buscarCapaNoDeezer() {
              fetch(`https://api.deezer.com/search/track?q=artist:"${encodeURIComponent(artist)}" track:"${encodeURIComponent(track)}"&limit=1`)
                .then(r => r.json())
                .then(data => {
                  let coverDeezer = data.data?.[0]?.album?.cover_big; // 500x500
                  if (coverDeezer) {
                    albumCover.src = coverDeezer;
                  } else {
                    albumCover.src = albumCoverURL || "img/sanca.png";
                  }
                })
                .catch(() => {
                  albumCover.src = albumCoverURL || "img/sanca.png";
                });
            }

            if (cover) {
              // ✅ Usa proxy para evitar bloqueio de referrer
              albumCover.src = "https://images.weserv.nl/?url=" + encodeURIComponent(cover) + "&w=300&h=300&fit=cover";
              
              // Se falhar, tenta Deezer
              albumCover.onerror = function() {
                console.warn("Capa do Last.fm falhou. Tentando Deezer...");
                buscarCapaNoDeezer();
              };
            } else {
              // Sem capa no Last.fm? Vai direto pro Deezer
              buscarCapaNoDeezer();
            }
          })
          .catch(() => {
            albumCover.src = albumCoverURL || "img/sanca.png";
          });
      } else {
        // Sem info de artista/música? Usa URL da rádio ou fallback
        albumCover.src = albumCoverURL || "img/sanca.png";
      }
    })
    .catch(() => {
      albumCover.src = "img/sanca.png";
    });
}
// Inicialização
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

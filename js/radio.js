const playerContainer = document.getElementById("playerContainer");
const radioPlayer = document.getElementById('radioPlayer');
const trackTitle = document.getElementById('trackTitle');
const artistName = document.getElementById('artistName');
const albumCover = document.getElementById('albumCover');
const apiKeyLastFm = 'd08d389671438f325d13d64f0c94b583';

function abrir_mail_popup() {
  window.open("cont.html", "", "width=550,height=550,toolbar=no,location=no,status=yes,scrollbars=no,resizable=NO");
}

function togglePlayPause() {
  if (radioPlayer.paused) {
    radioPlayer.muted = false;
    radioPlayer.play().then(() => {
      fetchMetadata();
      document.getElementById("equalizer").style.display = "flex";
      playPauseBtn.textContent = "Pause";
      playPauseBtn.className = "pause-button"; // muda a cor
    }).catch(err => console.error("Erro ao reproduzir:", err));
  } else {
    radioPlayer.pause();
    document.getElementById("equalizer").style.display = "none";
    playPauseBtn.textContent = "Play";
    playPauseBtn.className = "play-button"; // volta para verde
  }
}

function fecharApp() {
  alert("Fechar App (implementar no WebView nativo ou via blocos Kodular/Niotron)");
}

function playRadio() {
  radioPlayer.muted = false;
  radioPlayer.play().then(() => {
    fetchMetadata();
    document.getElementById("equalizer").style.display = "flex";
  }).catch(err => console.error("Erro ao reproduzir:", err));
}

function pauseRadio() {
  radioPlayer.pause();
  document.getElementById("equalizer").style.display = "none";
}

function setVolume(value) {
  const vol = parseFloat(value);
  radioPlayer.volume = vol;
  updateVolumeDisplay(vol);
}

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
window.onload = function () {
  const vol = parseFloat(document.getElementById("volumeSlider").value);
  radioPlayer.volume = vol;
  updateVolumeDisplay(vol);

  radioPlayer.muted = false;
  radioPlayer.play().then(() => {
    fetchMetadata();
    document.getElementById("equalizer").style.display = "flex";
  }).catch(() => {
    radioPlayer.muted = true;
    radioPlayer.play().catch(() => {});
    document.addEventListener("click", ()=>{ radioPlayer.muted = false; }, { once:true });
  });
};

setInterval(fetchMetadata, 30000);

function adjustVolume(change) {
  const slider = document.getElementById("volumeSlider");
  let newVolume = Math.max(0, Math.min(1, parseFloat(slider.value) + change));
  radioPlayer.volume = newVolume;
  slider.value = newVolume;
  updateVolumeDisplay(newVolume);
}

// Atualiza display do volume
function updateVolumeDisplay(value) {
  document.getElementById("volumeDisplay").textContent = `${Math.round(value*100)}%`;
}

// PulsaÃ§Ã£o de sombra do player
setInterval(()=> {
  if(!radioPlayer.paused){
    const vol = radioPlayer.volume;
    const scale = 1 + vol*0.1; // aumenta até 10%
    playerContainer.style.transform = `scale(${scale})`;
    playerContainer.style.boxShadow = `0 0 ${20 + vol*40}px rgba(255,0,0,0.7), 0 10px ${35 + vol*30}px rgba(0,0,0,0.8)`;
  }
}, 100);

// --- Logo animado ---
const logos=["img/logu1.png","img/logu2.png"];
let index=0; const logo=document.getElementById("logo");
function cycleLogo(){ index=(index+1)%logos.length; logo.style.opacity=0; setTimeout(()=>{logo.src=logos[index];logo.style.opacity=1;},1000); setTimeout(cycleLogo,5000);}
cycleLogo();

// --- Player ---
const playerContainer=document.getElementById("playerContainer");
const radioPlayer=document.getElementById("radioPlayer");
const trackTitle=document.getElementById("trackTitle");
const artistName=document.getElementById("artistName");
const albumCover=document.getElementById("albumCover");
const playPauseBtn=document.getElementById("playPauseBtn");
const apiKeyLastFm="d08d389671438f325d13d64f0c94b583";
let lastTrack="";
let metadataInterval=null;

function abrir_contato() {
    window.location.href = "mailto:sancanight@gmail.com?subject=Contato&body=Olá!";
}
// --- Play/Pause ---
async function togglePlayPause() {
  const statusMessage = document.getElementById("statusMessage");

  if (radioPlayer.paused || radioPlayer.ended) {
    try {
      radioPlayer.load();
      await radioPlayer.play();

      document.getElementById("equalizer").style.display = "flex";
      statusMessage.textContent = "Ao Vivo";

      if (!metadataInterval) {
        fetchMetadata();
        metadataInterval = setInterval(fetchMetadata, 30000);
      }
    } catch (err) {
      console.warn('Falha ao iniciar o áudio:', err);
      alert('O navegador bloqueou o áudio nesta tentativa. Toque no botão Play novamente.');
    }
  } else {
    radioPlayer.pause();
    document.getElementById("equalizer").style.display = "none";
    statusMessage.textContent = "Pausado";

    clearInterval(metadataInterval);
    metadataInterval = null;
  }
}

// Sincroniza botão com estado real do <audio>
radioPlayer.addEventListener('play', () => {
  playPauseBtn.textContent = 'Pause';
  playPauseBtn.className = 'pause-button';
});
radioPlayer.addEventListener('pause', () => {
  playPauseBtn.textContent = 'Play';
  playPauseBtn.className = 'play-button';
});

// --- Volume ---
function setVolume(value){radioPlayer.volume=parseFloat(value); updateVolumeDisplay(radioPlayer.volume);}
function adjustVolume(change){const slider=document.getElementById("volumeSlider"); let newVolume=Math.max(0,Math.min(1,parseFloat(slider.value)+change)); radioPlayer.volume=newVolume; slider.value=newVolume; updateVolumeDisplay(newVolume);}
function updateVolumeDisplay(value){document.getElementById("volumeDisplay").textContent=`${Math.round(value*100)}%`;}

// Pulsação leve só no volume
function updatePlayerVisual(vol){const scale=1+vol*0.08; playerContainer.style.transform=`scale(${scale})`; playerContainer.style.boxShadow=`0 0 ${15+vol*30}px rgba(255,0,0,0.7),0 10px ${25+vol*25}px rgba(0,0,0,0.8)`;}
radioPlayer.addEventListener("volumechange",()=>updatePlayerVisual(radioPlayer.volume));

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
window.onload=function(){
  radioPlayer.volume=parseFloat(document.getElementById("volumeSlider").value);
  updateVolumeDisplay(radioPlayer.volume);
  updatePlayerVisual(radioPlayer.volume);

};

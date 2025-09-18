let videos = []; // [{id:'abc123', title:'Nome do vídeo'}, ...]
let currentIndex = 0;
let player;

// Busca a playlist do servidor
async function fetchPlaylistVideos() {
  try {
    const response = await fetch('get_videos.php');
    videos = await response.json();
  } catch (error) {
    console.error('Erro ao carregar vídeos:', error);
    alert('Não foi possível carregar os vídeos.');
  }
}

// Embaralha a playlist
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Inicializa o player
function loadPlayer() {
  if (videos.length === 0) return;

  player = new YT.Player('player', {
    videoId: videos[currentIndex].id,
    playerVars: { autoplay: 1, controls: 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  showVideoTitle(currentIndex);
  event.target.playVideo();
}

// Quando o vídeo termina, toca o próximo
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playNext();
  }
}

// Avança para o próximo vídeo
function playNext() {
  currentIndex++;
  if (currentIndex >= videos.length) {
    shuffle(videos);
    currentIndex = 0;
  }
  player.loadVideoById(videos[currentIndex].id);
  showVideoTitle(currentIndex);
}

// Mostra título do vídeo abaixo do player, com fallback
function showVideoTitle(index) {
  const titleDiv = document.getElementById('video-title');
  const title = videos[index].title && videos[index].title.trim() !== ''
    ? videos[index].title
    : `Vídeo ${index + 1}`;
  titleDiv.textContent = title;
}

// Inicialização da API do YouTube
function onYouTubeIframeAPIReady() {
  fetchPlaylistVideos().then(() => {
    shuffle(videos);
    loadPlayer();
  });
}

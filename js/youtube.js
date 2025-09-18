let videos = [];
let currentIndex = 0;
let player;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function fetchPlaylistVideos() {
  try {
    const response = await fetch('get_videos.php');
    const data = await response.json();
    videos = data;
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    alert('Não foi possível carregar os vídeos.');
  }
}

function loadPlayer() {
  if (videos.length === 0) {
    alert("Nenhum vídeo encontrado na playlist.");
    return;
  }

  player = new YT.Player('player', {
    videoId: videos[currentIndex],
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
  document.getElementById('loading').style.display = 'none';
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playNext();
  }
}

function onPlayerError(event) {
  console.log(`Erro no vídeo ${videos[currentIndex]}:`, event.data);
  playNext();
}

function playNext() {
  currentIndex++;
  if (currentIndex < videos.length) {
    player.loadVideoById(videos[currentIndex]);
  } else {
    shuffle(videos);
    currentIndex = 0;
    player.loadVideoById(videos[currentIndex]);
  }
}

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

function onYouTubeIframeAPIReady() {
  const loadingImage = document.getElementById('loading-image-container');
  const playerDiv = document.getElementById('player');

  if (loadingImage) loadingImage.style.display = 'none';
  if (playerDiv) playerDiv.style.display = 'block';

  fetchPlaylistVideos().then(() => {
    shuffle(videos);
    loadPlayer();
  });
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

let player;
let loadingElement;

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.BUFFERING || event.data === YT.PlayerState.PLAYING) {
    if (loadingElement) {
      loadingElement.style.display = 'none';
      document.getElementById('player').style.display = 'block';
    }
  }
}

function onYouTubeIframeAPIReady() {
  loadingElement = document.getElementById('loading');

  player = new YT.Player('player', {
    width: '100%',
    height: '100%',
    playerVars: {
      listType: 'playlist',
      list: 'PLYXfLV3z1Kzysf0c-wpY6qDuKyj5KHGno',
      rel: 0,
      modestbranding: 1,
      enablejsapi: 1,
      autoplay: 0,
      origin: window.location.origin
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange, // â† NOVO: monitora estado do vÃ­deo
      onError: onPlayerError
    }
  });
}

function onPlayerReady(event) {
  player.setShuffle(true);
  playRandomVideo();
}

function playRandomVideo() {
  const playlist = player.getPlaylist();

  if (!playlist || playlist.length === 0) {
    // Tenta novamente a cada 200ms atÃ© carregar
    setTimeout(playRandomVideo, 200);
    return;
  }

  const randomIndex = Math.floor(Math.random() * playlist.length);
  player.playVideoAt(randomIndex);
}

function onPlayerStateChange(event) {
  // Quando o vÃ­deo comeÃ§a a carregar (BUFFERING) ou comeÃ§a a tocar (PLAYING)
  if (event.data === YT.PlayerState.BUFFERING || event.data === YT.PlayerState.PLAYING) {
    if (loadingElement) {
      loadingElement.style.display = 'none'; // Esconde o loading
      document.getElementById('player').style.display = 'block';
    }
  }
}

function onPlayerError(event) {
  console.warn("Erro no player:", event.data);
  // Opcional: recarregar apenas em erros crÃ­ticos
  // if (event.data === 2 || event.data === 100 || event.data === 101) {
  //   setTimeout(() => location.reload(), 1500);
  // }
}

function nextVideo() {
  if (player?.nextVideo) player.nextVideo();
}

function previousVideo() {
  if (player?.previousVideo) player.previousVideo();
}

function toggleFullscreen() {
  const container = document.getElementById('player');
  if (!document.fullscreenElement) {
    if (container.requestFullscreen) container.requestFullscreen();
    else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
    else if (container.msRequestFullscreen) container.msRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  }
}
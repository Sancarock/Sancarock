	let player;

function onYouTubeIframeAPIReady() {
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
      onError: onPlayerError
    }
  });
}

function onPlayerReady(event) {
  player.setShuffle(true);

  setTimeout(() => {
    playRandomVideo();
  }, 2000);
}

function playRandomVideo() {
  const playlist = player.getPlaylist();
  if (playlist && playlist.length > 0) {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    player.playVideoAt(randomIndex);
  } else {
    setTimeout(playRandomVideo, 1000); // tenta de novo se ainda não carregou
  }
}

function onPlayerError(event) {
  console.warn("Erro no player. Recarregando...");
  setTimeout(() => location.reload(), 1500);
}

function nextVideo() {
  if (player && typeof player.nextVideo === 'function') {
    player.nextVideo();
  }
}

function previousVideo() {
  if (player && typeof player.previousVideo === 'function') {
    player.previousVideo();
  }
}

// ✅ Função para ativar/desativar TELA CHEIA no player
function toggleFullscreen() {
  const container = document.getElementById('player');

  if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
    // Entra em fullscreen
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  } else {
    // Sai do fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

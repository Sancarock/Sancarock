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
      autoplay: 0, // Desliga autoplay para controlar manualmente
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
    const alreadyPlayed = sessionStorage.getItem('alreadyPlayed');

    if (!alreadyPlayed) {
      player.playVideoAt(0); // Sempre começa pelo primeiro da lista embaralhada
      sessionStorage.setItem('alreadyPlayed', 'true');
    }
  }, 1500);
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

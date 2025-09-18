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

  // Aguarda um pouco para garantir que a playlist esteja carregada
  setTimeout(() => {
    // --- REMOVIDO O sessionStorage PARA TESTE ---
    // const alreadyPlayed = sessionStorage.getItem('alreadyPlayed');
    // if (!alreadyPlayed) {

    // Sempre escolhe um vídeo aleatório (ideal para testes)
    const playlist = player.getPlaylist();

    if (playlist && playlist.length > 0) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      console.log(`Tocando vídeo aleatório no índice: ${randomIndex}`);
      player.playVideoAt(randomIndex);
    } else {
      console.warn("Playlist não carregada ainda. Tentando fallback...");
      // Tenta novamente em 1 segundo se ainda não carregou
      setTimeout(() => {
        const playlistRetry = player.getPlaylist();
        if (playlistRetry && playlistRetry.length > 0) {
          const randomIndex = Math.floor(Math.random() * playlistRetry.length);
          player.playVideoAt(randomIndex);
        } else {
          console.error("Falha ao carregar playlist. Iniciando primeiro vídeo.");
          player.playVideoAt(0);
        }
      }, 1000);
    }

    // sessionStorage.setItem('alreadyPlayed', 'true'); // Comentado para testes

    // --- FIM DA REMOÇÃO ---
  }, 2000);
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

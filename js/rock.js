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

  // ✅ Remove o setTimeout! Vamos tentar imediatamente.
  playRandomVideo();
}

function playRandomVideo() {
  const playlist = player.getPlaylist();

  // Se a playlist ainda não carregou, tenta de novo em 200ms
  if (!playlist || playlist.length === 0) {
    console.log("Playlist ainda não carregada. Tentando novamente...");
    setTimeout(playRandomVideo, 200);
    return;
  }

  const randomIndex = Math.floor(Math.random() * playlist.length);
  player.playVideoAt(randomIndex);

  // Marca como já iniciado (se quiser manter essa lógica)
  sessionStorage.setItem('alreadyPlayed', 'true');
}

function onPlayerError(event) {
  console.warn("Erro no player:", event.data);
  // Recarrega só se for erro grave (opcional)
  // setTimeout(() => location.reload(), 1500);
}

function nextVideo() {
  if (player?.nextVideo) player.nextVideo();
}

function previousVideo() {
  if (player?.previousVideo) player.previousVideo();
}

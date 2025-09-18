let player;

    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        width: '100%',
        height: '100%',
        playerVars: {
          listType: 'playlist',
          list: 'PLYXfLV3z1Kzysf0c-wpY6qDuKyj5KHGno', // sua playlist
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
          autoplay: 1,
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

      // Garante que inicia em um vídeo aleatório
      setTimeout(() => {
        const playlist = player.getPlaylist();
        if (playlist && playlist.length > 0) {
          const randomIndex = Math.floor(Math.random() * playlist.length);
          player.playVideoAt(randomIndex);
        } else {
          // Caso não carregue a playlist imediatamente
          event.target.playVideo();
        }
      }, 1500); // pequeno atraso para garantir que a playlist carregou
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
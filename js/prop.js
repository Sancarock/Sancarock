// scripts.js

// Lista com 12 banners
const banners = [
    "bann01.html", "bann02.html", "bann03.html", "bann04.html",
    "bann05.html", "bann06.html", "bann07.html", "bann08.html",
    "bann09.html", "bann10.html", "bann11.html", "bann12.html"
];

function getRandomBanners() {
    // Copia a lista de banners para evitar modificações na original
    let shuffled = [...banners];
    
    // Embaralha os banners
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Retorna os 3 primeiros banners da lista embaralhada
    return shuffled.slice(0, 3);
}

function trocarBanners() {
    const iframes = document.querySelectorAll(".promotion-section iframe");
    if (iframes.length >= 3) {
        const selectedBanners = getRandomBanners();
        iframes[0].src = selectedBanners[0];
        iframes[1].src = selectedBanners[1];
        iframes[2].src = selectedBanners[2];
    }
}

// Troca os banners a cada 10 segundos
setInterval(trocarBanners, 10000);

trocarBanners(); // Executa a função imediatamente ao carregar a página

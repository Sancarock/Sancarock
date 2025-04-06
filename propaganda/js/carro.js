// Lista de banners disponíveis
const banners = [
    "https://sancarock.com/propaganda/carrossel01.html", 
    "https://sancarock.com/propaganda/carrossel03.html",  
    "https://sancarock.com/propaganda/carrossel05.html",
];

// Lista de fundos para cada banner
const backgrounds = ["white.png", "grey.png", "fundored.png"];

// Função para embaralhar um array usando Fisher-Yates Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Retorna 3 banners aleatórios sem repetição
function getRandomBanners() {
    let shuffled = [...banners]; // Copia o array original
    shuffleArray(shuffled); 
    return shuffled.slice(0, 3);
}

// Atualiza os banners no container
function updateBanners() {
    const container = document.getElementById("banners-container");
    if (!container) return;
    
    container.innerHTML = ""; // Limpa os banners anteriores
    const selectedBanners = getRandomBanners();

    selectedBanners.forEach((banner, index) => {
        let bannerDiv = document.createElement("div");
        bannerDiv.className = "col-md-4";

        bannerDiv.innerHTML = `
            <div class="promo-box set-bg" style="background-image: url('img/promo/${backgrounds[index]}');">
                <h2>
                    <iframe src="${banner}" frameborder="0" width="300" height="300" scrolling="no" style="background:#fff;"></iframe>
                </h2>
            </div>
        `;

        container.appendChild(bannerDiv);
    });
}

// Exibe os primeiros banners
updateBanners();

// Altera os banners a cada 20 segundos
setInterval(updateBanners, 20000);

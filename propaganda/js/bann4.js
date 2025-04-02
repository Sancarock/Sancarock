// Lista de banners disponíveis
const banners = [
    "propaganda/bann01.html", "propaganda/bann02.html", "propaganda/bann03.html", "propaganda/bann04.html",
    "propaganda/bann05.html", "propaganda/bann06.html", "propaganda/bann07.html", "propaganda/bann08.html",
    "propaganda/bann09.html", "propaganda/bann10.html", "propaganda/bann11.html", "propaganda/bann12.html"
];

// Lista de fundos para cada banner
const backgrounds = ["white.png", "grey.png", "fundored.png"];

// Definição dos blocos na nova sequência
let sequences = [
    [1, 12, 2, 11],
    [3, 10, 9, 4],
    [5, 6, 7, 8]
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getSequentialBanners() {
    shuffleArray(sequences); // Embaralha a ordem dos blocos
    return sequences.flat().map(index => banners[index - 1]);
}

function updateBanners() {
    const container = document.getElementById("banners-container");
    if (!container) return;
    
    container.innerHTML = ""; // Limpa os banners anteriores
    const selectedBanners = getSequentialBanners();

    selectedBanners.forEach((banner, index) => {
        let bannerDiv = document.createElement("div");
        bannerDiv.className = "col-md-3";

        bannerDiv.innerHTML = `
            <div class="promo-box set-bg" style="background-image: url('img/promo/${backgrounds[index % backgrounds.length]}');">
                <h2>
                    <iframe src="${banner}" frameborder="0" width="300" height="300" scrolling="no"></iframe>
                </h2>
            </div>
        `;

        container.appendChild(bannerDiv);
    });
}

updateBanners(); // Exibe os primeiros banners
setInterval(updateBanners, 10000); // Altera os banners a cada 10 segundos
// Lista de banners disponíveis
const banners = [
    "propaganda/bann01.html", "propaganda/bann02.html", "propaganda/bann03.html", "propaganda/bann04.html",
    "propaganda/bann05.html", "propaganda/bann06.html", "propaganda/bann07.html", "propaganda/bann08.html",
    "propaganda/bann09.html", "propaganda/bann10.html", "propaganda/bann11.html", "propaganda/bann12.html"
];

// Lista de fundos para cada banner
const backgrounds = ["white.png", "grey.png", "fundored.png"];

// Definição dos blocos em ordem reversa (3 banners por vez)
const sequences = [
    [3, 2, 1], // 4, 3, 2
    [7, 6, 5], // 8, 7, 6
    [11, 10, 9], // 12, 11, 10
    [0, 4, 8] // 1, 5, 9 (para looping contínuo)
];

let currentSequence = 0;

function getSequentialBanners() {
    let selected = sequences[currentSequence].map(index => banners[index]);
    currentSequence = (currentSequence + 1) % sequences.length; // Avança para o próximo bloco
    return selected;
}

function updateBanners() {
    const container = document.getElementById("banners-container");
    if (!container) return;
    
    container.innerHTML = ""; // Limpa os banners anteriores
    const selectedBanners = getSequentialBanners();

    selectedBanners.forEach((banner, index) => {
        let bannerDiv = document.createElement("div");
        bannerDiv.className = "col-md-4";

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
// Lista de banners disponíveis
const banners = [
    "https://sancarock.com/propaganda/bann03.html", "https://sancarock.com/propaganda/bann04.html", 
    "https://sancarock.com/propaganda/bann07.html", "https://sancarock.com/propaganda/bann08.html", 
    "https://sancarock.com/propaganda/bann11.html", "https://sancarock.com/propaganda/bann12.html", 
];

// Lista de fundos para cada banner
const backgrounds = ["white.png", "grey.png", "fundored.png"];

function getRandomBanners() {
    let shuffled = banners.sort(() => 0.5 - Math.random()); // Embaralha os banners
    return shuffled.slice(0, 3); // Pega 3 sem repetir
}

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
                    <iframe src="${banner}" frameborder="0" width="300" height="300" scrolling="no"></iframe>
                </h2>
            </div>
        `;

        container.appendChild(bannerDiv);
    });
}

updateBanners(); // Exibe os primeiros banners
setInterval(updateBanners, 10000); // Altera os banners a cada 10 segundos

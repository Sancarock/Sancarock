const banners = [
  { img: "https://sancarock.com/propaganda/img/001.gif", link: "https://mercadolivre.com/sec/23WaKH6" },
  { img: "https://sancarock.com/propaganda/img/002.gif", link: "https://mercadolivre.com/sec/2xeEUcx" },
  { img: "https://sancarock.com/propaganda/img/003.gif", link: "https://mercadolivre.com/sec/2XqExAw" },
  { img: "https://sancarock.com/propaganda/img/004.gif", link: "https://mercadolivre.com/sec/1v1fK1A" },
  { img: "https://sancarock.com/propaganda/img/005.gif", link: "https://mercadolivre.com/sec/1cGGSex" },
  { img: "https://sancarock.com/propaganda/img/006.gif", link: "https://mercadolivre.com/sec/2uMR4Gb" },
  { img: "https://sancarock.com/propaganda/img/007.gif", link: "https://mercadolivre.com/sec/3277kLr" },
  { img: "https://sancarock.com/propaganda/img/008.gif", link: "https://mercadolivre.com/sec/1Erm7HD" },
  { img: "https://sancarock.com/propaganda/img/009.gif", link: "https://mercadolivre.com/sec/2hhCKB3" }
];

const backgrounds = ["white.png", "grey.png", "fundored.png"];

// Embaralha um array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let currentIndex = 0;
let currentOrder = [...banners];
shuffleArray(currentOrder);

function updateBanners() {
  const container = document.getElementById("banners-container");
  container.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const banner = currentOrder[(currentIndex + i) % banners.length];
    const bg = backgrounds[i % backgrounds.length];

    const div = document.createElement("div");
    div.className = "col-md-4";
    div.style.padding = "10px";
    
    div.innerHTML = `
      <div style="background-image: url('img/promo/${bg}'); background-size: cover; padding: 10px; text-align: center;">
        <a href="${banner.link}" target="_blank">
          <img src="${banner.img}" alt="Banner ${i + 1}" style="width: 100%; max-width: 300px; height: auto; border: 2px solid #fff;">
        </a>
      </div>
    `;

    container.appendChild(div);
  }

  currentIndex = (currentIndex + 3) % banners.length;
  if (currentIndex === 0) shuffleArray(currentOrder);
}

// Primeira exibição
updateBanners();

// Atualiza a cada 21 segundos
setInterval(updateBanners, 21000);

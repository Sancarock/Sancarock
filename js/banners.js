const banners = [
  { img: "https://sancarock.netlify.app/propaganda/img/1.png", link: "https://s.shopee.com.br/8zyZCaFqwk" },
  { img: "https://sancarock.netlify.app/propaganda/img/2.png", link: "https://s.shopee.com.br/8pf903dk2X" },
  { img: "https://sancarock.netlify.app/propaganda/img/3.png", link: "https://s.shopee.com.br/9zr6O5OrNi" },
  { img: "https://sancarock.netlify.app/propaganda/img/4.png", link: "https://s.shopee.com.br/4LCjaDa9WL" },
  { img: "https://sancarock.netlify.app/propaganda/img/5.png", link: "https://s.shopee.com.br/6AeNpfsZ9d" },
  { img: "https://sancarock.netlify.app/propaganda/img/6.png", link: "https://s.shopee.com.br/6VHEAgg7DB" },
  { img: "https://sancarock.netlify.app/propaganda/img/7.png", link: "https://s.shopee.com.br/9zr6LEUQpB" },
  { img: "https://sancarock.netlify.app/propaganda/img/8.png", link: "https://s.shopee.com.br/4AtJOfMCXy" },
  { img: "https://sancarock.netlify.app/propaganda/img/9.png", link: "https://s.shopee.com.br/BNAZLdw9x?share_channel_code=1"}
];

let currentIndex = 0;
const itemsPerView = 3; // desktop mostra 3 banners por vez
let autoRotateInterval;
let mobileIndex = 0;
let mobileAutoRotate;

// Função para embaralhar array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Embaralha banners
shuffleArray(banners);

// Renderiza CARROSSEL (desktop)
function renderBannersCarousel() {
  const container = document.getElementById("banner-carousel");
  container.innerHTML = "";
  container.style.transition = "transform 0.8s ease-in-out"; // animação suave

  banners.forEach((banner, i) => {
    const div = document.createElement("div");
    div.style.flex = "0 0 33.333%"; // 3 por linha
    div.style.boxSizing = "border-box";
    div.style.padding = "10px";
    div.innerHTML = `
      <a href="${banner.link}" target="_blank">
        <img src="${banner.img}" alt="Banner ${i+1}" style="width: 100%; border: 2px solid #fff; border-radius: 10px;">
      </a>
    `;
    container.appendChild(div);
  });
}

// Atualiza posição do carrossel desktop
function updateCarousel() {
  const container = document.getElementById("banner-carousel");
  const offset = -(currentIndex * 100); // move "páginas" de 3 banners
  container.style.transform = `translateX(${offset}%)`;
}

// Botões do carrossel desktop
document.getElementById("prev-btn").addEventListener("click", function() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = Math.ceil(banners.length / itemsPerView) - 1;
  }
  updateCarousel();
  resetAutoRotate(); // reinicia rotação automática
});

document.getElementById("next-btn").addEventListener("click", function() {
  if (currentIndex < Math.ceil(banners.length / itemsPerView) - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
  resetAutoRotate(); // reinicia rotação automática
});

// Rotação automática desktop
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    if (currentIndex < Math.ceil(banners.length / itemsPerView) - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 20000); // 20 segundos
}

// Reinicia rotação desktop
function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  startAutoRotate();
}

// Renderiza banners mobile (1 por vez)
function renderBannersGridMobile(startIndex) {
  const grid = document.getElementById("banner-grid");
  grid.innerHTML = "";

  const banner = banners[startIndex];
  const div = document.createElement("div");
  div.className = "col-12";
  div.style.padding = "10px";
  div.innerHTML = `
    <a href="${banner.link}" target="_blank">
      <img src="${banner.img}" alt="Banner" style="width: 100%; border: 2px solid #fff; border-radius: 10px;">
    </a>
  `;
  grid.appendChild(div);
}

// Rotação automática mobile
function startMobileAutoRotate() {
  const total = banners.length;
  mobileAutoRotate = setInterval(() => {
    mobileIndex = (mobileIndex + 1) % total;
    renderBannersGridMobile(mobileIndex);
  }, 5000); // muda a cada 5s (ajustável)
}

// Decide qual layout exibir
function checkLayout() {
  if (window.innerWidth < 768) {
    document.getElementById("carousel-wrapper").style.display = "none";
    document.getElementById("banner-grid").style.display = "flex";

    clearInterval(autoRotateInterval); // desktop
    clearInterval(mobileAutoRotate);   // limpa antes de iniciar
    mobileIndex = 0;
    renderBannersGridMobile(mobileIndex);
    startMobileAutoRotate();
  } else {
    document.getElementById("carousel-wrapper").style.display = "block";
    document.getElementById("banner-grid").style.display = "none";

    renderBannersCarousel();
    updateCarousel();
    startAutoRotate();
  }
}

// Inicializa
window.addEventListener("resize", checkLayout);
window.addEventListener("load", checkLayout);


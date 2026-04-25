// Script para controlar a troca de vídeos no hero e o header fixo
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const video1 = document.getElementById('heroVideo1');
  const video2 = document.getElementById('heroVideo2');

  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Vídeo troca
  setTimeout(function() {
    video1.style.opacity = '0';
    video2.style.opacity = '1';
    video2.play();
  }, 8000);

  // Carrossel de imagens - 3 por vez com loop infinito suave
  const carousel = document.querySelector('.carousel');
  const carouselImages = document.querySelectorAll('.carousel-image');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  const itemsPerView = 3;
  const totalItems = carouselImages.length;
  let currentPosition = 0;
  let autoRotateInterval;

  function updateCarousel() {
    const translateX = currentPosition * (-100 / itemsPerView);
    carousel.style.transform = `translateX(${translateX}%)`;

    // Atualiza indicadores baseado na posição módulo do total de grupos
    const indicatorIndex = Math.abs(currentPosition) % indicators.length;
    indicators.forEach((ind, idx) => {
      if (idx === indicatorIndex) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  function nextImages() {
    currentPosition++;
    // Se passou do total de itens, volta ao começo
    if (currentPosition >= totalItems - itemsPerView + 1) {
      // Reseta para a próxima repetição contínua
      currentPosition = currentPosition % (totalItems - itemsPerView + 1);
    }
    updateCarousel();
    resetAutoRotate();
  }

  function prevImages() {
    currentPosition--;
    // Se foi antes do início, vai para o final
    if (currentPosition < 0) {
      currentPosition = (totalItems - itemsPerView) % (totalItems - itemsPerView + 1);
    }
    updateCarousel();
    resetAutoRotate();
  }

  function startAutoRotate() {
    autoRotateInterval = setInterval(nextImages, 5000);
  }

  function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startAutoRotate();
  }

  // Event listeners
  nextBtn.addEventListener('click', nextImages);
  prevBtn.addEventListener('click', prevImages);

  // Indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      currentPosition = index;
      updateCarousel();
      resetAutoRotate();
    });
  });

  // Inicializa o carrossel
  updateCarousel();
  startAutoRotate();
});
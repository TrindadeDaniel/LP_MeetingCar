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

  // Carrossel de imagens - loop infinito contínuo
  const carousel = document.querySelector('.carousel');
  const carouselImages = document.querySelectorAll('.carousel-image');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  const itemsPerView = 3;
  let currentIndex = 0;
  let autoRotateInterval;

  // Clona as primeiras imagens para criar o efeito de loop infinito
  const clonedImages = Array.from(carouselImages).slice(0, itemsPerView).map(img => img.cloneNode(true));
  clonedImages.forEach(img => {
    img.classList.add('cloned');
    carousel.appendChild(img);
  });

  const allImages = carousel.querySelectorAll('.carousel-image');
  const totalItems = allImages.length;

  function updateCarousel() {
    const imageWidth = allImages[0].offsetWidth + 15;
    const translateX = currentIndex * imageWidth;
    carousel.style.transform = `translateX(-${translateX}px)`;

    // Atualiza indicadores (baseado na posição real)
    const realIndicators = indicators.length;
    const activeIndicator = currentIndex % realIndicators;
    indicators.forEach((ind, idx) => {
      if (idx === activeIndicator) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  function nextImages() {
    currentIndex++;
    updateCarousel();

    // Quando chega nas imagens clonadas, volta instantaneamente para o início
    if (currentIndex >= carouselImages.length) {
      setTimeout(() => {
        carousel.style.transition = 'none';
        currentIndex = 0;
        carousel.style.transform = `translateX(0px)`;
        // Restaura a transição após o reset
        setTimeout(() => {
          carousel.style.transition = 'transform 0.6s ease-in-out';
        }, 50);
      }, 600);
    }
    resetAutoRotate();
  }

  function prevImages() {
    // Se estiver no início, vai para a posição clonada (fim)
    if (currentIndex === 0) {
      carousel.style.transition = 'none';
      currentIndex = carouselImages.length;
      const imageWidth = allImages[0].offsetWidth + 15;
      carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
      
      setTimeout(() => {
        carousel.style.transition = 'transform 0.6s ease-in-out';
        currentIndex--;
        updateCarousel();
      }, 50);
    } else {
      currentIndex--;
      updateCarousel();
    }
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
      currentIndex = index;
      updateCarousel();
      resetAutoRotate();
    });
  });

  // Inicializa o carrossel
  updateCarousel();
  startAutoRotate();

  // Recalcula posições ao redimensionar a janela
  window.addEventListener('resize', updateCarousel);
});
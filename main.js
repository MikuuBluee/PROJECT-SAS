  // Swiper
  const swiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Navbar scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.remove("bg-opacity-100");
      navbar.classList.add("bg-opacity-80", "backdrop-blur");
    } else {
      navbar.classList.remove("bg-opacity-80", "backdrop-blur");
      navbar.classList.add("bg-opacity-100");
    }
  });

  // search
  const form = document.getElementById("search");
  const input = document.getElementById("searchInput");
  const result = document.getElementById("searchResult");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Hindari reload halaman
    const keyword = input.value.trim();
    if (keyword) {
      result.textContent = `Kamu mencari: "${keyword}"`;
    } else {
      result.textContent = "Silakan isi kata kunci pencarian.";
    }
  });

  // slide card
  const slider = document.getElementById('scrollContainer');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });

  // hamburger
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

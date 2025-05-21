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
    // Bisa juga lakukan pencarian di sini atau redirect
    // window.location.href = "/search?q=" + encodeURIComponent(keyword);
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

// modal
function showModal(name, desc, image, price) {
  document.getElementById('modal-title').innerText = name;
  document.getElementById('modal-desc').innerText = desc;
  document.getElementById('modal-img').src = image;
  document.getElementById('modal-price').innerText = "Rp " + Number(price).toLocaleString("id-ID");

  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('modal').classList.remove('flex');
  document.getElementById('modal').classList.add('hidden');
}

function addToCart() {
  alert("Produk ditambahkan ke keranjang!");
  closeModal();
}

function buyNow() {
  alert("Mengalihkan ke payment gateway...");
  window.location.href = "https://contoh-payment-gateway.com/checkout";
}

// Button Suka
function toggleLove(btn) {
  const svg = btn.querySelector("svg");
  const isActive = svg.getAttribute("fill") === "red";

  if (isActive) {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "gray");
  } else {
    svg.setAttribute("fill", "red");
    svg.setAttribute("stroke", "red");
  }
}

// cek token session
document.addEventListener("DOMContentLoaded", async () => {
  try{
    const token = localStorage.getItem('token');

    if(!token){
      console.log('Belum login');
      return window.location.href = '/login.html';
    }

    const response = await axios.get('http://localhost:5000/auth/check-session', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.data.loggedIn) {
      console.log('sudah login sebagai: ', response.data.user);
      document.getElementById('loginBtn').textContent = 'Logout';
      if(token){
        loginBtn.textContent = 'Logout';
        
        loginBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          window.location.href = '/login.html';
        })
      }
    } else{
      console.log('session expired atau tidak valid');
      localStorage.removeItem('token');
      window.location.href = '/login.html';
    }
  } catch(error){
    console.log("error saat login: ", error);
    localStorage.removeItem('token');
    window.location.href = '/login.html'
  }
});
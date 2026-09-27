// =========================================================
// 1. BUKA COVER -> tampilkan cerita
// =========================================================
const cover = document.getElementById('cover');
const story = document.getElementById('story');
const openBtn = document.getElementById('openBtn');
const musicToggle = document.getElementById('musicToggle');
const bgAudio = document.getElementById('bgAudio');

openBtn.addEventListener('click', () => {
  cover.classList.add('is-closing');
  story.hidden = false;
  musicToggle.hidden = false;

  setTimeout(() => {
    cover.style.display = 'none';
    story.scrollIntoView({ behavior: 'instant' });
  }, 900);

  // Musik otomatis dicoba diputar setelah interaksi pertama user
  bgAudio.play().then(() => {
    musicToggle.classList.add('is-playing');
  }).catch(() => {
    // Browser memblokir autoplay — biarkan user menekan tombol musik manual
  });
});

// =========================================================
// 2. TOMBOL MUSIK (nyala / mati)
// =========================================================
musicToggle.addEventListener('click', () => {
  if (bgAudio.paused) {
    bgAudio.play();
    musicToggle.classList.add('is-playing');
  } else {
    bgAudio.pause();
    musicToggle.classList.remove('is-playing');
  }
});

// =========================================================
// 3. SCROLL REVEAL — fade-up satu kali saat elemen masuk layar
// =========================================================
const revealItems = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

revealItems.forEach((item) => revealObserver.observe(item));

// =========================================================
// 4. ANIMASI ANGKA REVEAL (mis. "5 tahun")
// Ganti data-target di index.html (#revealNumber) sesuai angka sebenarnya
// =========================================================
const numberEl = document.getElementById('revealNumber');
let numberAnimated = false;

const numberObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !numberAnimated) {
      numberAnimated = true;
      const target = parseInt(numberEl.dataset.target, 10) || 0;
      let current = 0;
      const duration = 1200;
      const stepTime = Math.max(Math.floor(duration / target), 40);

      const counter = setInterval(() => {
        current += 1;
        numberEl.textContent = current;
        if (current >= target) clearInterval(counter);
      }, stepTime);
    }
  });
}, { threshold: 0.5 });

if (numberEl) numberObserver.observe(numberEl);

// =========================================================
// 5. INTERACTIVE REVEAL — "I have one more thing for you"
// =========================================================
const revealBtn = document.getElementById('revealBtn');
const hiddenMessage = document.getElementById('hiddenMessage');

revealBtn.addEventListener('click', () => {
  hiddenMessage.hidden = false;
  revealBtn.disabled = true;
  revealBtn.style.opacity = '0.5';
});
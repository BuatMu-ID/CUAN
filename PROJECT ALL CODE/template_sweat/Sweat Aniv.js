// =========================================================
// 1. BUKA COVER -> tampilkan isi
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
  }, 800);

  // Audio bersifat opsional — kalau file tidak ada / diblokir browser,
  // halaman tetap berjalan normal tanpa musik
  bgAudio.play().then(() => {
    musicToggle.classList.add('is-playing');
  }).catch(() => {});
});

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
// 2. SCROLL REVEAL
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
// 3. BIRTHDAY REVEAL — angka animasi + confetti
// Ganti data-target di index.html (#revealNumber) sesuai angka sebenarnya
// =========================================================
const numberEl = document.getElementById('revealNumber');
const confettiLayer = document.getElementById('confettiLayer');
let birthdayAnimated = false;

function launchConfetti() {
  const colors = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#E8AFAE';
  const palette = ['#FFFFFF', colors.trim(), '#F4D35E'];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = palette[Math.floor(Math.random() * palette.length)];
    piece.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.6) + 's';
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

const birthdayObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !birthdayAnimated) {
      birthdayAnimated = true;
      launchConfetti();

      const target = parseInt(numberEl.dataset.target, 10) || 0;
      let current = 0;
      const duration = 1200;
      const stepTime = Math.max(Math.floor(duration / target), 35);
      const counter = setInterval(() => {
        current += 1;
        numberEl.textContent = current;
        if (current >= target) clearInterval(counter);
      }, stepTime);
    }
  });
}, { threshold: 0.5 });

if (numberEl) birthdayObserver.observe(numberEl);

// =========================================================
// 4. THEME SWITCHER — 3 pilihan tetap
// =========================================================
const themeButtons = document.querySelectorAll('[data-theme-btn]');
const htmlEl = document.documentElement;

function setActiveThemeButton(themeName) {
  themeButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.themeBtn === themeName);
  });
}

themeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.themeBtn;
    htmlEl.setAttribute('data-theme', theme);
    setActiveThemeButton(theme);
  });
});

setActiveThemeButton(htmlEl.getAttribute('data-theme') || 'soft');

// =========================================================
// 5. SALIN LINK (shareable link)
// =========================================================
const copyLinkBtn = document.getElementById('copyLinkBtn');
const copyNote = document.getElementById('copyNote');

copyLinkBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copyNote.hidden = false;
    setTimeout(() => { copyNote.hidden = true; }, 2500);
  }).catch(() => {
    copyNote.textContent = 'Salin manual dari address bar ya ✦';
    copyNote.hidden = false;
  });
});
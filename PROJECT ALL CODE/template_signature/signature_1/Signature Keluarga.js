// ================== DATA URUTAN LAYAR ==================
const order = ["opening","reveal","memories","story","timeline","letter","interactive","ending"];
let current = 0;

const screens = document.querySelectorAll(".screen");
const dotsContainer = document.getElementById("dots");

order.forEach((id, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToScreen(i));
  dotsContainer.appendChild(dot);
});

function goToScreen(index) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(order[index]).classList.add("active");
  document.querySelectorAll(".dot").forEach((d,i) => d.classList.toggle("active", i===index));
  current = index;
  window.scrollTo({top:0, behavior:"smooth"});
  checkRevealElements();
}

document.querySelectorAll(".btn-next").forEach(btn => {
  btn.addEventListener("click", () => {
    const nextId = btn.getAttribute("data-next");
    goToScreen(order.indexOf(nextId));
  });
});

document.getElementById("openBtn").addEventListener("click", () => {
  goToScreen(order.indexOf("reveal"));
});

document.getElementById("replayBtn").addEventListener("click", () => {
  goToScreen(0);
});

function checkRevealElements() {
  const elements = document.querySelectorAll(".reveal-on-scroll, .letter-box");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.3 });
  elements.forEach(el => observer.observe(el));
}
checkRevealElements();

const envelope = document.getElementById("envelope");
const hiddenLetter = document.getElementById("hiddenLetter");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  setTimeout(() => hiddenLetter.classList.add("show"), 400);
});

const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = "🔇";
  } else {
    bgMusic.play().catch(()=>{});
    musicBtn.textContent = "🔊";
  }
  isPlaying = !isPlaying;
});

const particlesContainer = document.getElementById("particles");
const particleEmojis = ["💖","💍","✨","🌹"];

function createParticle() {
  const p = document.createElement("div");
  p.classList.add("particle");
  p.textContent = particleEmojis[Math.floor(Math.random()*particleEmojis.length)];
  p.style.left = Math.random()*100 + "vw";
  p.style.animationDuration = (6 + Math.random()*6) + "s";
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 12000);
}
setInterval(createParticle, 800);
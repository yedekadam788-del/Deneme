const wishes = [
  "Bugün kendine aşık ol: en güçlü hikâye buradan başlar.",
  "Kalbinin sesi net: yeni bir başlangıç çok yakın.",
  "Bugün attığın küçük adım, yarının büyük mutluluğu olacak.",
  "Ruhunu besleyen şeylere yaklaş, geri kalan her şey çözülür.",
  "Sahip olduğun ışık, karşına çıkacak herkesi etkileyecek.",
];

const message = document.getElementById("message");
const loveBtn = document.getElementById("love-btn");
const musicBtn = document.getElementById("music-btn");
const selfLove = document.getElementById("self-love");
const joyMeter = document.getElementById("joy-meter");
const dreamMode = document.getElementById("dream-mode");
const audio = document.getElementById("ambient-audio");

let musicPlaying = false;
let lastWish = -1;

const animateValue = (element, target, suffix = "%") => {
  let current = 0;
  const step = () => {
    current += Math.max(1, Math.round((target - current) / 6));
    if (current >= target) {
      element.textContent = `${target}${suffix}`;
      return;
    }
    element.textContent = `${current}${suffix}`;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

loveBtn.addEventListener("click", () => {
  let next = Math.floor(Math.random() * wishes.length);
  if (next === lastWish) next = (next + 1) % wishes.length;
  lastWish = next;

  message.textContent = wishes[next];
  animateValue(selfLove, 96);
  animateValue(joyMeter, 92);
  dreamMode.textContent = "ON ✨";

  burstHearts();
});

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await audio.play();
      musicBtn.textContent = "Müziği Durdur ⏸";
      musicPlaying = true;
    } else {
      audio.pause();
      musicBtn.textContent = "Müziği Başlat 🎵";
      musicPlaying = false;
    }
  } catch {
    message.textContent = "Tarayıcı müziği engelledi, bir kez daha dene 🎧";
  }
});

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
resize();
window.addEventListener("resize", resize);

function spawnParticle() {
  particles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    size: Math.random() * 6 + 4,
    speedY: Math.random() * 1.3 + 0.5,
    drift: (Math.random() - 0.5) * 0.8,
    alpha: Math.random() * 0.45 + 0.3,
  });
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 16, size / 16);
  ctx.fillStyle = `rgba(255, 95, 162, ${alpha})`;
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(0, -3, -12, -3, -12, 5);
  ctx.bezierCurveTo(-12, 12, 0, 18, 0, 24);
  ctx.bezierCurveTo(0, 18, 12, 12, 12, 5);
  ctx.bezierCurveTo(12, -3, 0, -3, 0, 5);
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.35 && particles.length < 120) spawnParticle();

  particles = particles.filter((p) => p.y > -40);

  particles.forEach((p) => {
    p.y -= p.speedY;
    p.x += p.drift;
    drawHeart(p.x, p.y, p.size, p.alpha);
  });

  requestAnimationFrame(animate);
}
animate();

function burstHearts() {
  for (let i = 0; i < 24; i += 1) {
    particles.push({
      x: canvas.width * 0.4 + Math.random() * canvas.width * 0.2,
      y: canvas.height * 0.65,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 2.6 + 1,
      drift: (Math.random() - 0.5) * 2,
      alpha: Math.random() * 0.5 + 0.5,
    });
  }
}

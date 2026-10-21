// ---------- Réglages ----------
const CELL = 34; // taille d'un "pixel" en px
const BASE = 0.15; // hauteur de la bande au repos (fraction de la hauteur du canvas)
const BOOST = 0.5; // hauteur max de la bande pendant le scroll
const SENSITIVITY = 80; // vitesse de scroll (px/frame) pour atteindre l'effet maximum
const SMOOTH = 0.05; // fluidité de la montée / descente de l'effet
const FADE_IN = 0.18; // vitesse d'apparition d'un pixel (0.05 = lent, 0.5 = rapide)
const FADE_OUT = 0.08; // vitesse de disparition d'un pixel
const PIXEL_COLOR = "#0f1318";

const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");

let W, H, dpr, cols, rows;
let lastY = scrollY;
let energy = 0; // 0 = repos, 1 = scroll rapide
let target = 0;
let running = false;
let alpha = []; // opacité courante de chaque cellule (index = y * cols + x)

// Bruit pseudo-aléatoire stable par cellule (x, y)
function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function setup() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = canvas.clientWidth;
  H = canvas.clientHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cols = Math.ceil(W / CELL);
  rows = Math.ceil(H / CELL);
  alpha = new Float32Array(cols * rows);
  // Opacités initiales cohérentes avec l'état de repos
  step(true);
  draw();
}

// Met à jour l'opacité de chaque cellule vers sa cible.
// Retourne true tant qu'au moins une cellule est encore en transition.
function step(instant = false) {
  const reach = BASE + (BOOST - BASE) * energy;
  const bandH = H * reach;
  const scrollRow = Math.floor(scrollY / CELL);
  let animating = false;

  for (let y = 0; y < rows; y++) {
    const dist = H - (y + 1) * CELL;
    const inBand = dist < bandH;
    const vis = inBand ? 1 - Math.max(0, dist) / bandH : 0;

    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const goal = inBand && hash(x, y + scrollRow) <= vis ? 1 : 0;
      const a = alpha[i];

      if (instant) {
        alpha[i] = goal;
      } else if (a !== goal) {
        const speed = goal > a ? FADE_IN : FADE_OUT;
        let next = a + (goal - a) * speed;
        if (Math.abs(goal - next) < 0.01) next = goal; // évite les queues infinies
        alpha[i] = next;
        animating = true;
      }
    }
  }
  return animating;
}

function draw() {
  ctx.clearRect(0, 0, W, H); // fond transparent
  ctx.fillStyle = PIXEL_COLOR;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const a = alpha[y * cols + x];
      if (a <= 0.01) continue;
      ctx.globalAlpha = a;
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }
  ctx.globalAlpha = 1;
}

function loop() {
  target *= 0.9; // la cible retombe quand on arrête de scroller
  energy += (target - energy) * SMOOTH;

  const animating = step();
  draw();

  if (energy > 0.003 || target > 0.003 || animating) {
    requestAnimationFrame(loop);
  } else {
    energy = 0;
    target = 0;
    running = false;
    step(true);
    draw(); // état de repos
  }
}

addEventListener(
  "scroll",
  () => {
    const dy = Math.abs(scrollY - lastY);
    lastY = scrollY;
    target = Math.max(target, Math.min(1, dy / SENSITIVITY));
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  },
  { passive: true }
);

addEventListener("resize", setup);
setup();
// ---------- Réglages ----------
const CELL = 14; // taille d'un "pixel" en px
const BASE = 0.15; // hauteur de la bande au repos (fraction de la hauteur du canvas)
const BOOST = 0.5; // hauteur max de la bande pendant le scroll (1 = toute la hauteur du canvas)
const SENSITIVITY = 40; // vitesse de scroll (px/frame) pour atteindre l'effet maximum
const SMOOTH = 0.14; // fluidité de la montée / descente de l'effet (0.05 = lent, 0.3 = nerveux)
const PIXEL_COLOR = "#444";

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

// Le canvas est sorti de ses parents (un parent avec transform casserait position: fixed)
// et collé en bas de l'écran, fond transparent, sans bloquer les clics.
document.body.appendChild(canvas);
[
  ["position", "fixed"],
  ["left", "0"],
  ["right", "auto"],
  ["top", "auto"],
  ["bottom", "0"],
  ["width", "100%"],
  ["height", "40vh"], // hauteur maximale de la zone de pixels
  ["background", "transparent"],
  ["pointer-events", "none"],
  ["z-index", "9999"],
  ["display", "block"],
].forEach(([k, v]) => canvas.style.setProperty(k, v, "important"));

let W, H, dpr, cols, rows;
let lastY = scrollY;
let energy = 0; // 0 = repos, 1 = scroll rapide
let target = 0;
let running = false;

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
  draw();
}

function draw() {
  ctx.clearRect(0, 0, W, H); // fond transparent

  // Hauteur de la bande : petite au repos, grandit pendant le scroll
  const reach = BASE + (BOOST - BASE) * energy;
  const bandH = H * reach;

  // Les cellules sont "accrochées" à la page : quand on scrolle, le motif défile,
  // ce qui donne l'impression que les pixels bougent.
  const scrollRow = Math.floor(scrollY / CELL);

  ctx.fillStyle = PIXEL_COLOR;
  for (let y = 0; y < rows; y++) {
    const dist = H - (y + 1) * CELL; // distance au bord bas de l'écran
    if (dist >= bandH) continue;
    const vis = 1 - Math.max(0, dist) / bandH; // dense en bas, rare en haut
    for (let x = 0; x < cols; x++) {
      if (hash(x, y + scrollRow) > vis) continue;
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    }
  }
}

function loop() {
  target *= 0.9; // la cible retombe quand on arrête de scroller
  energy += (target - energy) * SMOOTH;
  draw();
  if (energy > 0.003 || target > 0.003) {
    requestAnimationFrame(loop);
  } else {
    energy = 0;
    target = 0;
    running = false;
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
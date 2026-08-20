gsap.registerPlugin(ScrollTrigger);

// --- Constantes de configuration ---
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=<>?/\\|";
const TEXT_IN = "SCRIPT'ENJOYER LOADED";
const TEXT_OUT = "Good By";
const OVERLAY_ID = "transition-overlay";
const VIDEO_ID = "loading-movie";
const METER_ID = "load-meter";

let meterIntervalId = null;

// --- Effet de déchiffrage progressif du texte ---
function loadingMeter(targetText, options = {}) {
  const alphaMeter = document.getElementById(METER_ID);
  if (!alphaMeter) return null;

  stopLoadingMeter(); // stoppe tout scramble déjà en cours avant d'en lancer un nouveau

  const revealSpeed = options.revealSpeed || 40;
  const lockDelay = options.lockDelay || 3;

  let resolvedCount = 0;
  let frame = 0;

  function randomChar() {
    return CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  meterIntervalId = setInterval(() => {
    frame++;
    if (frame % lockDelay === 0 && resolvedCount < targetText.length) {
      resolvedCount++;
    }

    let display = "";
    for (let i = 0; i < targetText.length; i++) {
      if (i < resolvedCount) {
        display += targetText[i];
      } else if (targetText[i] === " ") {
        display += " ";
      } else {
        display += randomChar();
      }
    }

    alphaMeter.textContent = display;

    if (resolvedCount >= targetText.length) {
      stopLoadingMeter();
    }
  }, revealSpeed);

  return meterIntervalId;
}

function stopLoadingMeter() {
  if (meterIntervalId) {
    clearInterval(meterIntervalId);
    meterIntervalId = null;
  }
}

// --- Contrôle de la vidéo de fond ---
function playTransitionVideo() {
  const video = document.getElementById(VIDEO_ID);
  if (!video) return;
  video.currentTime = 0;
  video.play().catch(() => {}); // ignore le rejet si l'autoplay est bloqué
}

function pauseTransitionVideo() {
  const video = document.getElementById(VIDEO_ID);
  if (video) video.pause();
}

// --- Transition d'ENTRÉE sur la nouvelle page (overlay opaque -> transparent) ---
function pageTransitionIn() {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) return;

  gsap.set(overlay, { opacity: 1 }); // état de départ garanti, peu importe le CSS

  playTransitionVideo();
  loadingMeter(TEXT_IN, { revealSpeed: 20, lockDelay: 4 });

  gsap.to(overlay, {
    opacity: 0,
    duration: 5.6,
    delay: 0.3,
    ease: "power2.inOut",
    onComplete: () => {
      stopLoadingMeter();
      pauseTransitionVideo();
    },
  });
}

// --- Transition de SORTIE avant de quitter la page (overlay transparent -> opaque) ---
function pageTransitionOut(url) {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) {
    window.location.href = url; // fallback si l'overlay n'existe pas
    return;
  }

  playTransitionVideo();
  loadingMeter(TEXT_OUT, { revealSpeed: 50, lockDelay: 10 });

  gsap.to(overlay, {
    opacity: 1,
    duration: 4.6,
    ease: "power2.inOut",
    delay: 0.3,
    onComplete: () => {
      window.location.href = url;
    },
  });
}

// --- Initialisation ---
window.addEventListener("load", pageTransitionIn);

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const url = link.getAttribute("href");
    if (!url || url.startsWith("http") || url.startsWith("#")) return;
    e.preventDefault();
    pageTransitionOut(url);
  });
});

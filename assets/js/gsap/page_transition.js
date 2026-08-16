gsap.registerPlugin(ScrollTrigger);

let meterIntervalId = null;

function loadingMeter(targetText, options = {}) {
  const alphaMeter = document.getElementById("load-meter");
  if (!alphaMeter) return null;

  // stoppe tout scramble déjà en cours avant d'en lancer un nouveau
  if (meterIntervalId) {
    clearInterval(meterIntervalId);
    meterIntervalId = null;
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=<>?/\\|";
  const revealSpeed = options.revealSpeed || 40;
  const lockDelay = options.lockDelay || 3;

  let resolvedCount = 0;
  let frame = 0;

  function randomChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
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
      clearInterval(meterIntervalId);
      meterIntervalId = null;
    }
  }, revealSpeed);

  return meterIntervalId;
}

// --- transition d'ENTRÉE sur la nouvelle page (overlay opaque -> transparent) ---
function pageTransitionIn() {
  const overlay = document.getElementById("transition-overlay");
  if (!overlay) return;

  gsap.set(overlay, { opacity: 1 }); // état de départ garanti, peu importe le CSS

  loadingMeter("SCRIPT'ENJOYER LOADED", { revealSpeed: 20, lockDelay: 4 });

  gsap.to(overlay, {
    opacity: 0,
    duration: 2.6,
    delay: 0.2,
    ease: "power2.inOut",
    onComplete: () => {
      if (meterIntervalId) {
        clearInterval(meterIntervalId);
        meterIntervalId = null;
      }
    },
  });
}

// --- transition de SORTIE avant de quitter la page (overlay transparent -> opaque) ---
function pageTransitionOut(url) {
  const overlay = document.getElementById("transition-overlay");
  if (!overlay) {
    window.location.href = url; // fallback si l'overlay n'existe pas
    return;
  }

  loadingMeter("Good by", { revealSpeed: 30, lockDelay: 4 });

  gsap.to(overlay, {
    opacity: 1,
    duration: 1.6,
    ease: "power2.inOut",
    onComplete: () => {
      window.location.href = url;
    },
  });
}

window.addEventListener("load", pageTransitionIn);

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const url = link.getAttribute("href");
    if (!url || url.startsWith("http") || url.startsWith("#")) return;
    e.preventDefault();
    pageTransitionOut(url);
  });
});

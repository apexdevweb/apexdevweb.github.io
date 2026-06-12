document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* =========================
     ELEMENTS
  ========================= */
  const features = gsap.utils.toArray(".feature__el");
  const featureTxt = gsap.utils.toArray(".feature__txt");
  const searchBar = document.querySelector(".search__bar");
  const barTxt = gsap.utils.toArray(".ai__txt");
  const elementIntro = document.getElementById("intro_texte");
  const aiVid = document.querySelector(".ai__vid");
  const visualizer = document.getElementById("visualizer");

  const texteIntro =
    "Welcome to Script'Enjoyer! If you're looking for a website tailored to your needs, you've come to the right place.";

  let texteStarted = false;
  let audioStarted = false;

  /* =========================
     AUDIO VISUALIZER
  ========================= */
  let audioCtx, analyser, dataArray;
  const bars = [];
  const BAR_COUNT = 20;

  function createBars() {
    if (!visualizer) return;
    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement("div");
      bar.className = "bar";
      visualizer.appendChild(bar);
      bars.push(bar);
    }
  }

  function startAudioVisualizer() {
    if (audioStarted || !aiVid) return;
    audioStarted = true;

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;

    const source = audioCtx.createMediaElementSource(aiVid);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    audioCtx.resume();
    animateBars();
  }

  function animateBars() {
    requestAnimationFrame(animateBars);
    analyser.getByteFrequencyData(dataArray);

    bars.forEach((bar, i) => {
      const value = dataArray[i] || 0;
      const height = Math.max(6, (value / 255) * 60);
      bar.style.height = `${height}px`;
    });
  }

  createBars();

  /* =========================
     POSITIONS INITIALES
  ========================= */
  const startPositions = [
    { top: 10, left: 15 },
    { top: 3.2, left: 50 },
    { top: 18.5, left: 75 },
    { top: 40, left: 90.5 },
    { top: 50, left: 10 },
    { top: 80, left: 20 },
    { top: 40, left: 30 },
    { top: 40, left: 70 },
    { top: 75, left: 75 },
    { top: 75, left: 75 },
  ];

  features.forEach((el, i) => {
    if (!startPositions[i]) return;
    gsap.set(el, {
      top: `${startPositions[i].top}%`,
      left: `${startPositions[i].left}%`,
      borderRadius: "10px",
    });
  });

  /* =========================
     FEATURE TEXT DIMENSIONS
  ========================= */
  const startDims = featureTxt.map((txt) => {
    const r = txt.getBoundingClientRect();
    return { w: r.width, h: r.height };
  });

  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const targetSize = 3 * rem;

  /* =========================
     SEARCH BAR WIDTH
  ========================= */
  const getSearchBarFinalWidth = () => (window.innerWidth < 1000 ? 20 : 90);
  let searchBarFinalWidth = getSearchBarFinalWidth();

  window.addEventListener("resize", () => {
    searchBarFinalWidth = getSearchBarFinalWidth();
    ScrollTrigger.refresh();
  });

  /* =========================
     SCROLLTRIGGER
  ========================= */
  ScrollTrigger.create({
    trigger: ".sect__prima",
    start: "top top",
    end: () => "+=" + window.innerHeight * 0.4,
    pin: true,
    pinSpacing: false,
    scrub: 1.5,
    anticipatePin: 1,

    onUpdate(self) {
      const p = self.progress;

      /* === FEATURES → CENTRE === */
      features.forEach((el, i) => {
        const s = startPositions[i];
        if (!s) return;

        gsap.set(el, {
          top: `${s.top + (50 - s.top) * p}%`,
          left: `${s.left + (50 - s.left) * p}%`,
          opacity: 1 - p * 1.2,
          borderRadius: `${10 + 18 * p}px`,
        });
      });
      /* === FEATURE TEXT MORPH === */
      featureTxt.forEach((txt, i) => {
        const d = startDims[i];
        if (!d) return;

        gsap.set(txt, {
          width: d.w + (targetSize - d.w) * p,
          height: d.h + (targetSize - d.h) * p,
          borderRadius: `${0.5 + 2 * p}rem`,
          borderWidth: `${0.125 + 0.2 * p}rem`,
        });
      });

      /* === SWITCH FEATURE / SEARCH === */
      gsap.set(".feature__ctnr", { opacity: p < 0.5 ? 1 : 0 });
      gsap.set(searchBar, { opacity: p >= 0.5 ? 1 : 0 });

      /* === SEARCH BAR MORPH + TEXTE + AUDIO === */
      if (p >= 0.5) {
        const sp = Math.min((p - 0.5) / 0.5, 1);

        gsap.set(searchBar, {
          width: `${3 + (searchBarFinalWidth - 3) * sp}rem`,
          height: `${3 + 2 * sp}rem`,
          transform: `translate(-50%, ${-50 + 100 * sp}%)`,
          borderRadius: `${0.5 + 2 * sp}rem`,
        });

        barTxt.forEach((txt, i) => {
          const delay = i * 0.1;
          const lp = Math.max(sp - delay, 0);
          gsap.set(txt, { opacity: lp, y: (1 - lp) * 20 });
        });

        if (!texteStarted && sp === 1) {
          texteStarted = true;

          aiVid?.play();
          startAudioVisualizer();

          gsap.to(aiVid, { opacity: 1, duration: 1.5 });

          setTimeout(() => {
            afficherLettreParLettre(elementIntro, texteIntro, 295);
          }, 300);
        }
      }
    },
  });
  /* =========================
     TEXTE LETTRE PAR LETTRE
  ========================= */
  function afficherLettreParLettre(el, text, speed = 3000) {
    let i = 0;
    const mots = text.split(" ");
    el.textContent = "";
  
    const interval = setInterval(() => {
      el.textContent += mots[i++] + " ";
      if (i >= mots.length) clearInterval(interval);
    }, speed);
  }
});
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});


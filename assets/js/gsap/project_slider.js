////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION SLIDER VIDEO DE PROJET
////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ============================================================
   1. CONFIG
   ============================================================ */

const VIDEO_SOURCES = [
  "./assets/video/AGdemo.mp4",
  "./assets/video/codefarmers.mp4",
  "./assets/video/ofrDemo.mp4",
  "./assets/video/sollineDemo.mp4",
  "./assets/video/architect.mp4",
  "./assets/video/tourisme.mp4",
  "./assets/video/streaming.mp4",
  "./assets/video/numericash.mp4",
];

// Position des 2 titres (h3, h4) de chaque slide quand la vidéo est ouverte.
// On anime left/top (et pas x/y) pour ne jamais entrer en conflit avec la
// timeline du slider, qui anime y / scaleY / opacity / filter sur ces titres.
// => CSS requis : .project-el__title-el { position: relative; }
const TITLE_OPEN_POS = [
  [
    { left: -500, top: -90 },
    { left: -360, top: -40 },
  ], // slide 1
  [
    { left: -470, top: -90 },
    { left: -200, top: -40 },
  ], // slide 2
  [
    { left: -480, top: -90 },
    { left: -260, top: -40 },
  ], // slide 3
  [
    { left: -350, top: -90 },
    { left: -260, top: -40 },
  ], // slide 4
  [
    { left: -380, top: -90 },
    { left: -290, top: -40 },
  ], // slide 5
  [
    { left: -580, top: -90 },
    { left: -190, top: -40 },
  ], // slide 6
  [
    { left: -480, top: -90 },
    { left: -130, top: -40 },
  ], // slide 7
  [
    { left: -480, top: -90 },
    { left: -130, top: -40 },
  ], // slide 8 (à ajuster)
];
const TITLE_DELAYS = [0.3, 0.5];

// Slider
const SLIDE_SCROLL_DISTANCE = 900; // px de scroll alloués par slide
const SLIDE_OFFSET = 1.8; // décalage (temps timeline) entre deux slides
const TEXT_DELAY = 0.1;
const VID_DELAY = 0.3;
const SCRAMBLE_TEXT_DELAY = 0.1;
const SCRAMBLE_MINI_DELAY = 0.3;
const IMAGE_HOLD = 1; // moment où la slide commence à disparaître
const TEXT_HOLD = 1.8; // moment où le titre commence à disparaître
const SCRAMBLE_CHARS = "!@#$%^&*()-_=+<>?/[]{}";

/* ============================================================
     2. ÉLÉMENTS DU DOM
     ============================================================ */

const DOM = {
  sliderSection: document.querySelector(".sect__beta"),
  projectTitle: document.querySelector(".project__title"),
  projectInfo: document.querySelector(".project__info"),
  indicator: document.querySelector(".slider-indicator"),
  indicatorData: document.getElementById("dataProg"),

  // morphing
  morphTriangle: document.querySelector("#triangleup-slide"),
  morphLosange: document.querySelector("#losange-slide"),
  morphSquare: document.querySelector("#squareframe-combined"),

  // slides
  stickers: document.querySelectorAll(".project-el__sticker"),
  titles: document.querySelectorAll(".project-el__title-el"),
  types: document.querySelectorAll(".project-el__details-mini"),
  links: document.querySelectorAll(".project-el__txt-link"),
  texts: document.querySelectorAll(".project-el__txt-el"),

  // lecteur vidéo
  vidModal: document.querySelector(".vid-modal"),
  video: document.getElementById("vid-el"),
  btnClose: document.querySelector(".vid-modal__close"),
  frameTech: document.querySelector(".tech-path"),
  vidFrame: document.querySelector(".vid-path"),
  hoverFrames: [
    ...document.querySelectorAll(".up-frame__slider"),
    ...document.querySelectorAll(".down-frame__slider"),
  ],
};

const frameTechOriginalD = DOM.frameTech.getAttribute("d");

/* ============================================================
     3. ÉTAT
     ============================================================ */

// Les slides sont empilées (position: absolute) : un clic arrive toujours sur
// celle du dessus. L'index de la slide visible vient donc du scroll, pas du clic.
let activeSlide = 0;
let openedSlide = null; // slide dont la vidéo est ouverte

const isVideoOpen = () => DOM.vidModal.classList.contains("vid-visualiser");

// éléments appartenant à une slide donnée
const getSlideEls = (i) => ({
  titles: [DOM.titles[i * 2], DOM.titles[i * 2 + 1]].filter(Boolean),
  type: DOM.types[i],
  link: DOM.links[i],
  text: DOM.texts[i],
});

/* ============================================================
     4. MORPHING (fond)
     ============================================================ */

function initMorph() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: DOM.sliderSection,
        start: "top top",
        end: "bottom bottom",
        scrub: 6,
      },
    })
    .from(DOM.morphLosange, {
      x: 1850,
      rotation: 180,
      morphSVG: DOM.morphTriangle,
      transformOrigin: "center center",
      ease: "expo.inOut",
    })
    .to(DOM.morphLosange, {
      x: "35%",
      morphSVG: DOM.morphSquare,
      transformOrigin: "center center",
      ease: "expo.inOut",
    });
}

/* ============================================================
     5. LECTEUR VIDÉO (ouverture / fermeture)
     ============================================================ */

function openVideo(i) {
  if (isVideoOpen() || !VIDEO_SOURCES[i]) return;

  const { titles, type, link, text } = getSlideEls(i);
  openedSlide = i;
  DOM.vidModal.classList.add("vid-visualiser");

  DOM.video.src = VIDEO_SOURCES[i];
  DOM.video.load();

  // titres de la slide courante uniquement
  titles.forEach((el, n) => {
    gsap.to(el, {
      ...TITLE_OPEN_POS[i][n],
      delay: TITLE_DELAYS[n],
      x: -80,
      duration: 0.8,
      ease: "expo.inOut",
      overwrite: "auto",
      stagger: 0.3,
    });
  });

  gsap.to(type, { opacity: 0, duration: 0.4, overwrite: "auto" });
  gsap.to(link, { opacity: 0, duration: 0.6, overwrite: "auto" });
  gsap.to(text, {
    delay: 0.8,
    y: -50,
    x: 75,
    opacity: 1,
    duration: 0.5,
    overwrite: "auto",
  });

  gsap.to(DOM.frameTech, {
    y: -200,
    x: -120,
    duration: 0.9,
    morphSVG: DOM.vidFrame,
    transformOrigin: "center center",
    ease: "expo.inOut",
    overwrite: "auto",
  });
  gsap.to(DOM.video, { opacity: 1, ease: "expo.inOut", overwrite: "auto" });

  lenis.stop();
}

function closeVideo() {
  if (!isVideoOpen() || openedSlide === null) return;

  const { titles, type, link, text } = getSlideEls(openedSlide);
  DOM.vidModal.classList.remove("vid-visualiser");

  DOM.video.pause();
  DOM.video.removeAttribute("src");
  DOM.video.load();

  gsap.to(titles, {
    left: 0,
    top: 0,
    x: 0,
    duration: 0.5,
    ease: "expo.inOut",
    overwrite: "auto",
    stagger: 0.8,
  });
  gsap.to(type, { opacity: 1, duration: 0.4, overwrite: "auto" });
  gsap.to(link, { opacity: 1, duration: 0.6, overwrite: "auto" });
  gsap.to(text, { y: 0, opacity: 0, duration: 0.8, overwrite: "auto" });

  gsap.to(DOM.frameTech, {
    y: 0,
    x: 0,
    duration: 0.9,
    morphSVG: frameTechOriginalD,
    transformOrigin: "center center",
    ease: "expo.inOut",
    overwrite: "auto",
  });

  openedSlide = null;
  lenis.start();
}

function initVideoPlayer() {
  DOM.stickers.forEach((sticker) => {
    // effet hover (cadres décoratifs)
    sticker.addEventListener("mouseover", () =>
      gsap.to(DOM.hoverFrames, {
        opacity: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: "expo.inOut",
        overwrite: true,
      })
    );
    sticker.addEventListener("mouseleave", () =>
      gsap.to(DOM.hoverFrames, {
        opacity: 0,
        duration: 0.3,
        ease: "expo.inOut",
        overwrite: true,
      })
    );

    // clic : on utilise la slide visible, pas celle qui reçoit le clic
    sticker.addEventListener("click", () => openVideo(activeSlide));
  });

  // branché UNE seule fois, hors de toute boucle
  DOM.btnClose.addEventListener("click", closeVideo);
}

/* ============================================================
     6. ANIMATION D'INTRO (titre / info / indicateur)
     ============================================================ */

function animateIntroText() {
  const splitInfo = new SplitText(DOM.projectInfo, { type: "words" });
  const splitTitle = new SplitText(DOM.projectTitle, { type: "lines" });

  const scrollTrigger = {
    trigger: DOM.sliderSection,
    start: "top top",
    end: "bottom bottom",
    scrub: 5,
  };

  gsap.to(splitInfo.words, {
    y: -20,
    x: -500,
    transformOrigin: "left",
    fontSize: "2.1em",
    duration: 1.5,
    opacity: 1,
    stagger: 0.2,
    ease: "expo.inOut",
    scrollTrigger,
  });

  gsap.to(splitTitle.lines, {
    y: 40,
    x: 30,
    transformOrigin: "top top",
    fontSize: "1.2rem",
    duration: 1.2,
    opacity: 1,
    stagger: 0.2,
    ease: "expo.inOut",
    scrollTrigger,
  });

  gsap.from(DOM.indicator, {
    x: -50,
    scaleX: 0,
    transformOrigin: "left",
    opacity: 0,
    duration: 1.2,
    ease: "expo.inOut",
    scrollTrigger,
  });
}

/* ============================================================
     7. DÉFILEMENT DES SLIDES (crossfade)
     ============================================================ */

// met à jour la slide active, l'index et la progress-bar
function updateSliderIndicator(progress, total, indexEls) {
  activeSlide = Math.round(progress * (total - 1));

  indexEls.forEach((el, i) =>
    el.classList.toggle("is-active", i === activeSlide)
  );

  gsap.to(DOM.indicatorData, {
    scaleX: progress,
    duration: 0.2,
    ease: "none",
    overwrite: true,
  });
}

// timeline d'apparition + disparition d'une slide
function addSlideToTimeline(tl, slide, i) {
  const at = i * SLIDE_OFFSET;
  const q = (sel) => slide.querySelectorAll(sel);

  const titles = q(".project-el__title-el");
  const sticker = q(".project-el__sticker");
  const scrambleInfo = q(".project-el__details-info");
  const scrambleMini = q(".project-el__details-mini");
  const linkSplit = new SplitText(q(".project-el__txt-link"), {
    type: "chars",
  });

  const scramble = (speed) => ({
    duration: 0.7,
    scrambleText: {
      text: "{original}",
      chars: SCRAMBLE_CHARS,
      revealDelay: 0.1,
      speed,
      delimiter: "",
    },
    ease: "power5.out",
  });

  // apparition
  tl.fromTo(
    slide,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 1 },
    at
  )
    .fromTo(
      titles,
      { y: 30, scaleY: 0, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        scaleY: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.inOut",
        transformOrigin: "center center",
      },
      at + TEXT_DELAY
    )
    .fromTo(
      sticker,
      { opacity: 0 },
      { opacity: 1, ease: "expo.inOut" },
      at + VID_DELAY
    )
    .fromTo(
      linkSplit.chars,
      { x: 30, scaleX: 0, opacity: 0, filter: "blur(5px)" },
      {
        x: 0,
        scaleX: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.inOut",
        transformOrigin: "right right",
      },
      at + TEXT_DELAY
    )
    .to(scrambleInfo, scramble(0.01), at + SCRAMBLE_TEXT_DELAY)
    .to(scrambleMini, scramble(0.1), at + SCRAMBLE_MINI_DELAY);

  // disparition
  tl.to(slide, { opacity: 0, scale: 1, duration: 1 }, at + IMAGE_HOLD).to(
    titles,
    { y: 0, opacity: 0, filter: "blur(5px)", duration: 0.8 },
    at + TEXT_HOLD
  );
}

function animateProjectSlides() {
  const slides = document.querySelectorAll(".project-el");
  if (!slides.length) return;

  const indexEls = document.querySelectorAll(".slider-indicator .index");

  gsap.set(slides, { position: "absolute", top: 250, left: 0 });

  // un seul pin, sur la section (pas de pin imbriqué sur un enfant)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: DOM.sliderSection,
      start: "top top",
      end: "+=" + slides.length * SLIDE_SCROLL_DISTANCE,
      scrub: 2,
      pin: true,
      pinSpacing: true,
      anticipatePin: 0.2,
      invalidateOnRefresh: true,
      onUpdate: (self) =>
        updateSliderIndicator(self.progress, slides.length, indexEls),
    },
  });

  slides.forEach((slide, i) => {
    slide.style.zIndex = i + 1;
    addSlideToTimeline(tl, slide, i);
  });
}

/* ============================================================
     8. INIT
     ============================================================ */

initMorph();
initVideoPlayer();
animateIntroText();

window.addEventListener("load", () => {
  const start = () => {
    animateProjectSlides();
    ScrollTrigger.refresh();
  };
  document.fonts?.ready ? document.fonts.ready.then(start) : start();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION SLIDER VIDEO DE PROJET fin
////////////////////////////////////////////////////////////////////////////////////////////////////////

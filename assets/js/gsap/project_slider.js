////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION SLIDER VIDEO DE PROJET
////////////////////////////////////////////////////////////////////////////////////////////////////////
//morphing
const morphTriangle = document.querySelector("#triangleup-slide");
const morphLosange = document.querySelector("#losange-slide");
const morphSquare = document.querySelector("#squareframe-combined");
const morphTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sect__beta",
    start: "top top",
    end: "bottom bottom",
    scrub: 6,
    // markers: true,
  },
});
morphTl
  .from(morphLosange, {
    x: 1850,
    rotation: 180,
    morphSVG: morphTriangle,
    transformOrigin: "center center",
    ease: "expo.inOut",
  })
  .to(morphLosange, {
    x: "35%",
    morphSVG: morphSquare,
    transformOrigin: "center center",
    ease: "expo.inOut",
  });
//morphing fin
//hover
const hoverVidCtnr = document.querySelectorAll(".project-el__sticker");
const hoverUpFrame = document.querySelectorAll(".up-frame__slider");
const hoverDownFrame = document.querySelectorAll(".down-frame__slider");
const vidModal = document.querySelector(".vid-modal");
const frameTech = document.querySelector(".tech-path");
const vidFrame = document.querySelector(".vid-path");
const frameTechOriginalD = frameTech.getAttribute("d");
const videoEl = document.getElementById("vid-el");
const titleVideo = document.querySelectorAll(".project-el__title-el");
const typeVideo = document.querySelectorAll(".project-el__details-mini");
const linkVideo = document.querySelectorAll(".project-el__txt-link");
const textVideo = document.querySelectorAll(".project-el__txt-el");
let rootVid = [
  "./assets/video/AGdemo.mp4",
  "./assets/video/codefarmers.mp4",
  "OFR",
  "./assets/sollineDemo.mp4",
  "",
  "",
  "",
  "",
];
hoverVidCtnr.forEach((vidEl, index) => {
  vidEl.addEventListener("mouseover", () => {
    gsap.to([hoverUpFrame, hoverDownFrame], {
      opacity: 1,
      stagger: 0.05,
      duration: 0.3,
      ease: "expo.inOut",
      overwrite: true,
    });
  });
  vidEl.addEventListener("mouseleave", () => {
    gsap.to([hoverUpFrame, hoverDownFrame], {
      opacity: 0,
      duration: 0.3,
      ease: "expo.inOut",
      overwrite: true,
    });
  });
  //<=========A PEAUFINER=======>
  vidEl.addEventListener("click", () => {
    if (!vidModal.classList.contains("vid-visualiser")) {
      vidModal.classList.add("vid-visualiser");
      //<==video au click==>
      if (rootVid[index]) {
        videoEl.src = rootVid[index];
        videoEl.load();
        gsap.to(titleVideo[0], {
          y: -110,
          x: -570,
          delay: 0.3,
          fontSize: "1.8rem",
          letterSpacing: "2px",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(titleVideo[1], {
          y: -40,
          x: -460,
          delay: 0.5,
          fontSize: "1.8rem",
          letterSpacing: "2px",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(titleVideo[2], {
          y: -110,
          x: -540,
          delay: 0.3,
          fontSize: "1.8rem",
          letterSpacing: "2px",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(titleVideo[3], {
          y: -40,
          x: -320,
          delay: 0.5,
          fontSize: "1.8rem",
          letterSpacing: "2px",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(titleVideo[4], {
          y: -110,
          x: -560,
          delay: 0.3,
          fontSize: "1.8rem",
          letterSpacing: "2px",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(titleVideo[5], {
          y: -40,
          x: -140,
          delay: 0.5,
          fontSize: "1.8rem",
          letterSpacing: "2px",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(typeVideo, {
          opacity: 0,
          duration: 0.4,
        });
        gsap.to(linkVideo, {
          opacity: 0,
          duration: 0.6,
        });
        gsap.to(textVideo, {
          opacity: 0,
          duration: 0.8,
        });
      }
      //<==video au click fin==>
      gsap.to(frameTech, {
        y: -200,
        x: -120,
        duration: 0.9,
        morphSVG: vidFrame,
        transformOrigin: "center center",
        ease: "expo.inOut",
        overwrite: "auto",
      });
      gsap.to(videoEl, {
        opacity: 1,
        ease: "expo.inOut",
      });
      lenis.stop();
    } else {
      vidModal.classList.remove("vid-visualiser");
      videoEl.pause();
      videoEl.src = "";
      videoEl.load();
      gsap.to(titleVideo, {
        y: 0,
        x: 0,
        fontSize: "3.2rem",
        letterSpacing: "-5px",
        duration: 0.8,
        transformOrigin: "center center",
        ease: "power3.inOut",
      });
      gsap.to(typeVideo, {
        opacity: 1,
        duration: 0.4,
      });
      gsap.to(linkVideo, {
        opacity: 1,
        duration: 0.6,
      });
      gsap.to(textVideo, {
        opacity: 1,
        duration: 0.8,
      });
      gsap.to(frameTech, {
        y: 0,
        x: 0,
        duration: 0.9,
        morphSVG: frameTechOriginalD,
        transformOrigin: "center center",
        ease: "expo.inOut",
        overwrite: "auto",
      });
      lenis.start();
    }
  });
  //<=========A PEAUFINER=======>
});
//hover fin
const DOM = {
  sliderSection: document.querySelector(".sect__beta"),
  projectTitle: document.querySelector(".project__title"),
  projectInfo: document.querySelector(".project__info"),
  slideWrapper: document.querySelector(".project-wrapper"),
  indicator: document.querySelector(".slider-indicator"),
  indicatorData: document.getElementById("dataProg"),
};
/* ---------- Pin principal de la section (référence gardée pour les autres ScrollTrigger) ---------- */

// NB : un seul pin sur toute la section. Ne plus ajouter de "pin: true" sur un
// élément enfant (ex: .project-wrapper) — un pin imbriqué casse le calcul de
// progression (self.progress) du ScrollTrigger enfant.

/* ---------- Animation d'intro (titre / info / indicateur) ---------- */

function animateIntroText() {
  const splitInfo = new SplitText(DOM.projectInfo, {
    type: "chars, words, lines",
  });
  const splitTitle = new SplitText(DOM.projectTitle, {
    type: "chars, words, lines",
  });

  // même ScrollTrigger réutilisé pour les 3 animations d'intro
  const introTrigger = {
    trigger: DOM.sliderSection,
    start: "top top",
    end: "bottom bottom",
    scrub: 5,
    // markers: true,
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
    scrollTrigger: introTrigger,
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
    scrollTrigger: introTrigger,
  });

  gsap.from(DOM.indicator, {
    x: -50,
    scaleX: 0,
    transformOrigin: "left",
    opacity: 0,
    duration: 1.2,
    ease: "expo.inOut",
    scrollTrigger: introTrigger,
  });
}

/* ---------- Défilement des slides (crossfade) ---------- */

const SLIDE_SCROLL_DISTANCE = 900; // px de scroll alloués par slide
const SLIDE_OFFSET = 1.8; // décalage (en "temps" de timeline) entre deux slides
const TEXT_DELAY = 0.1; // décalage du texte par rapport à l'apparition de l'image
const VID_DELAY = 0.3;
const SCRAMBLE_TEXT_DELAY = 0.1;
const SCRAMBLE_MINI_DELAY = 0.3;
const IMAGE_HOLD = 1; // moment où l'image commence à disparaître
const TEXT_HOLD = 1.8; // moment où le texte commence à disparaître

// met à jour l'index actif (classe is-active) et la progress-bar selon la progression du scroll
function updateSliderIndicator(progress, total, indexEls, progressData) {
  const activeIndex = Math.round(progress * (total - 1));

  indexEls.forEach((el, i) => {
    el.classList.toggle("is-active", i === activeIndex);
  });

  gsap.to(progressData, {
    scaleX: progress,
    duration: 0.2,
    ease: "none",
    overwrite: true,
  });
}

function animateProjectSlides() {
  const slides = document.querySelectorAll(".project-el");
  if (!slides.length) return;

  const indexEls = document.querySelectorAll(".slider-indicator .index");
  const progressData = DOM.indicatorData;

  gsap.set(slides, { position: "absolute", top: 250, left: 0 });

  const tlSlides = gsap.timeline({
    scrollTrigger: {
      trigger: DOM.sliderSection, // <- pin unique, sur la section (plus sur slideWrapper)
      start: "top top",
      end: "+=" + slides.length * SLIDE_SCROLL_DISTANCE,
      scrub: 2,
      pin: true,
      pinSpacing: true,
      anticipatePin: 0.2,
      invalidateOnRefresh: true,
      // markers: true,
      onUpdate: (self) =>
        updateSliderIndicator(
          self.progress,
          slides.length,
          indexEls,
          progressData
        ),
    },
  });
  slides.forEach((slide, i) => {
    slide.style.zIndex = i + 1;
    const appearAt = i * SLIDE_OFFSET;
    const text = slide.querySelectorAll(".project-el__title-el");
    const projectVideo = slide.querySelectorAll(".project-el__sticker");
    const projectLink = slide.querySelectorAll(".project-el__txt-link");
    const projectTextScramble = slide.querySelectorAll(
      ".project-el__details-info"
    );
    const projectMiniScramble = slide.querySelectorAll(
      ".project-el__details-mini"
    );
    let linkSplit = new SplitText(projectLink, {
      type: "chars, words, lines",
    });

    tlSlides
      .fromTo(
        slide,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        appearAt
      )
      .fromTo(
        text,
        {
          y: 30,
          scaleY: 0,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          scaleY: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "expo.inOut",
          transformOrigin: "center center",
        },
        appearAt + TEXT_DELAY
      )
      .fromTo(
        projectVideo,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "expo.inOut",
        },
        appearAt + VID_DELAY
      )
      .fromTo(
        linkSplit.chars,
        {
          x: 30,
          scaleX: 0,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          x: 0,
          scaleX: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "expo.inOut",
          transformOrigin: "right right",
        },
        appearAt + TEXT_DELAY
      )
      .to(
        projectTextScramble,
        {
          duration: 0.7,
          scrambleText: {
            text: "{original}",
            chars: "!@#$%^&*()-_=+<>?/[]{}",
            revealDelay: 0.1,
            speed: 0.01,
            delimiter: "",
          },
          ease: "power5.out",
        },
        appearAt + SCRAMBLE_TEXT_DELAY
      )
      .to(
        projectMiniScramble,
        {
          duration: 0.7,
          scrambleText: {
            text: "{original}",
            chars: "!@#$%^&*()-_=+<>?/[]{}",
            revealDelay: 0.1,
            speed: 0.1,
            delimiter: "",
          },
          ease: "power5.out",
        },
        appearAt + SCRAMBLE_MINI_DELAY
      );

    tlSlides
      .to(slide, { opacity: 0, scale: 1, duration: 1 }, appearAt + IMAGE_HOLD)
      .to(
        text,
        { y: 0, opacity: 0, filter: "blur(5px)", duration: 0.8 },
        appearAt + TEXT_HOLD
      );
  });
}

/* ---------- Init ---------- */
animateIntroText();
function initSlidesWhenReady() {
  animateProjectSlides();
  ScrollTrigger.refresh();
}
window.addEventListener("load", () => {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initSlidesWhenReady);
  } else {
    initSlidesWhenReady();
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION SLIDER VIDEO DE PROJET fin
////////////////////////////////////////////////////////////////////////////////////////////////////////

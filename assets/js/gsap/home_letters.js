gsap.registerPlugin(ScrollTrigger, SplitText);
const toolsItems = document.querySelectorAll(".tools__item");
let tlX = gsap.timeline({
  repeat: -1, // -1 signifie l'infini
  repeatDelay: 1,
});
toolsItems.forEach((toolsEl) => {
  let split = new SplitText(toolsEl, {
    type: "chars, words, lines",
  });
  gsap.to(split.chars, {
    x: 20,
    transformOrigin: "right",
    scaleX: 0,
    duration: 0.6,
    opacity: 0,
    stagger: 0.3,
    scrollTrigger: {
      trigger: toolsEl,
      start: "10% top",
      end: "bottom bottom",
      scrub: 2,
      // markers: true,
    },
    ease: "power2.inOut",
  });
});
const serviceTitle = document.querySelector(".service__title");
let splitB = new SplitText(serviceTitle, {
  type: "chars, words, lines",
});
gsap.from(splitB.chars, {
  y: 20,
  transformOrigin: "bottom",
  scaleY: 0,
  duration: 1.5,
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: serviceTitle,
    start: "center top",
    end: "bottom bottom",
    scrub: 5,
    // markers: true,
  },
  ease: "power2.inOut",
});
const projectTitle = document.querySelector(".project__title");
let splitC = new SplitText(projectTitle, {
  type: "chars, words, lines",
});
gsap.from(splitC.chars, {
  x: 20,
  transformOrigin: "right",
  scaleX: 0,
  duration: 1.5,
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: projectTitle,
    start: "center top",
    end: "bottom bottom",
    scrub: 5,
    // markers: true,
  },
  ease: "power2.inOut",
});
const aboutTitle = document.querySelector(".description__title");
let splitD = new SplitText(aboutTitle, {
  type: "chars, words, lines",
});
gsap.from(splitD.chars, {
  y: 20,
  transformOrigin: "bottom",
  scaleY: 0,
  duration: 0.5,
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: aboutTitle,
    start: "top center",
    end: "bottom bottom",
    scrub: 5,
    // markers: true,
  },
  ease: "power2.inOut",
});
const aboutItems = document.querySelectorAll(".description__sub__title");
aboutItems.forEach((aboutEl) => {
  let splitE = new SplitText(aboutEl, {
    type: "chars, words, lines",
  });
  gsap.from(splitE.chars, {
    x: 50,
    transformOrigin: "right",
    scaleX: 0,
    duration: 1.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: aboutEl,
      start: "top center",
      end: "bottom bottom",
      scrub: 3,
      // markers: true,
    },
    ease: "power2.inOut",
  });
});
const modelTitle = document.querySelector(".model__title");
let splitF = new SplitText(modelTitle, {
  type: "chars, words, lines",
});
gsap.from(splitF.chars, {
  y: 20,
  transformOrigin: "bottom",
  scaleY: 0,
  duration: 3.5,
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: modelTitle,
    start: "top 70%",
    end: "bottom bottom",
    scrub: 5,
    // markers: true,
  },
  ease: "power2.inOut",
});
const budgetTitle = document.querySelectorAll(".budget__title");
let splitG = new SplitText(budgetTitle, {
  type: "chars, words, lines",
});
gsap.from(splitG.words, {
  x: -20,
  transformOrigin: "left",
  scaleX: 0,
  duration: 8.5,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
    trigger: budgetTitle,
    start: "top center",
    end: "bottom bottom",
    scrub: 4,
    // markers: true,
  },
  ease: "power2.inOut",
});
const rdvLink = document.querySelectorAll(".rdv__link--item");
let splitH = new SplitText(rdvLink, {
  type: "chars, words, lines",
});
gsap.from(splitH.chars, {
  y: 20,
  transformOrigin: "bottom",
  scaleY: 0,
  duration: 8.5,
  opacity: 0,
  stagger: 0.8,
  scrollTrigger: {
    trigger: rdvLink,
    start: "top 88%",
    end: "bottom bottom",
    scrub: 4,
    // markers: true,
  },
  ease: "power2.inOut",
});
const morphTxt = document.querySelector(".morphing-txt");
let splitI = new SplitText(morphTxt, {
  type: "chars, words, lines",
});
gsap.from(splitI.chars, {
  x: -20,
  transformOrigin: "left",
  scale: 0,
  opacity: 0,
  filter: "blur(25px)",
  duration: 8,
  stagger: {
    amount: 3,
    from: "random",
  },
  scrollTrigger: {
    trigger: morphTxt,
    start: "top 58%",
    end: "bottom bottom",
    scrub: 5,
    // markers: true,
  },
  ease: "expo.inOut",
});
const globalServiceTxt = document.querySelectorAll(".globale-service__txt");
let splitJ = new SplitText(globalServiceTxt, {
  type: "chars, words, lines",
});
gsap.from(splitJ.lines, {
  y: 10,
  transformOrigin: "center center",
  scaleY: 0,
  opacity: 0,
  filter: "blur(25px)",
  duration: 3.5,
  stagger: {
    amount: 1,
    from: "random",
  },
  scrollTrigger: {
    trigger: globalServiceTxt,
    start: "top 58%",
    end: "bottom bottom",
    scrub: 6,
    // markers: true,
  },
  ease: "expo.inOut",
});

const txtCode = document.querySelectorAll(".code__el");
let splitk = new SplitText(txtCode, {
  type: "chars, words, lines",
});
gsap.from(splitk.chars, {
  x: -6,
  y: -6,
  transformOrigin: "left bottom",
  scale: 4,
  autoAlpha: 0.01,
  opacity: 0,
  duration: 9,
  stagger: {
    amount: 5.8,
    from: "random",
  },
  scrollTrigger: {
    trigger: txtCode,
    start: "top 58%",
    end: "bottom bottom",
    scrub: 9,
    // markers: true,
  },
  ease: "expo.inOut",
});

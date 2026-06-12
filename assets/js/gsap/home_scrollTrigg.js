gsap.registerPlugin(ScrollTrigger);
let tlB = gsap.timeline();
const slider = document.querySelector(".content");
tlB.from(slider, {
  x: -80,
  transformOrigin: "left",
  scale: 1,
  autoAlpha: 0,
  duration: 3,
  opacity: 0,
  stagger: {
    amount: 0.3,
    from: "left",
  },
  scrollTrigger: {
    trigger: ".content",
    start: "center center",
    end: "bottom bottom",
    scrub: 3,
    // markers: true,
  },
  ease: "power2.inOut",
});
const tlD = gsap.timeline({
  scrollTrigger: {
    trigger: ".project__item__ctnr", // 1 seul déclencheur
    start: "top 80%",
    end: "bottom 10%",
    scrub: 3,
    // markers: true,
  },
});
const vidItems = document.querySelectorAll(".project__item__ctnr");
tlD.from(vidItems, {
  x: -200,
  transformOrigin: "left",
  scaleX: 0,
  rotation: 0,
  opacity: 0,
  duration: 1.5,
  ease: "back.out(1.7)",
  stagger: 0.4,
});
const descriptionTxt = document.querySelector(".description__sub__ctnr");
if (window.matchMedia("(max-width: 600px)").matches) {
  tlB.from(descriptionTxt, {
    opacity: 0,
    duration: 1.5,
    stagger: 0.4,
    scrollTrigger: {
      trigger: ".description__sub__ctnr",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 3,
      // markers: true,
    },
    ease: "power2.inOut",
  });
} else {
  tlB.from(descriptionTxt, {
    y: 20,
    transformOrigin: "bottom",
    scaleY: 0,
    rotation: 0,
    opacity: 0,
    duration: 1.5,
    stagger: 0.4,
    scrollTrigger: {
      trigger: ".description__sub__ctnr",
      start: "top 80%",
      end: "bottom bottom",
      scrub: 3,
      // markers: true,
    },
    ease: "power2.inOut",
  });
}

const dlCtnr = document.querySelector(".dl__ctnr");
tlB.from(dlCtnr, {
  y: -50,
  transformOrigin: "bottom",
  scaleY: 0,
  rotation: 0,
  opacity: 0,
  duration: 2.5,
  stagger: 0.4,
  scrollTrigger: {
    trigger: ".dl__ctnr",
    start: "top 70%",
    end: "bottom bottom",
    scrub: 4,
    // markers: true,
  },
  ease: "power5.inOut",
});

const dlBtn = document.querySelector(".free__pack");
const dlContent = document.querySelectorAll(".dl__item");
dlBtn.addEventListener("click", () => {
  gsap.from(dlContent, {
    x: 50,
    transformOrigin: "right",
    scaleX: 0,
    rotation: 0,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.3,
  });
});

const tlF = gsap.timeline({
  scrollTrigger: {
    trigger: ".model__3d", // 1 seul déclencheur
    start: "top bottom",
    end: "bottom bottom",
    scrub: 3,
    // markers: true,
  },
});
const modelItems = document.querySelectorAll(".model__3d");
tlF.from(modelItems, {
  y: 20,
  transformOrigin: "bottom",
  scaleY: 0,
  rotation: 0,
  opacity: 0,
  duration: 3.5,
  ease: "power2.out",
  stagger: 3,
});
const lowCostTxt = document.querySelectorAll(".fast__choice__txt");
tlB.from(lowCostTxt, {
  y: 80,
  transformOrigin: "bottom bottom",
  scaleY: 0,
  opacity: 0,
  duration: 1.5,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".fast__choice__txt",
    start: "top 95%",
    end: "bottom bottom",
    scrub: 2,
    // markers: true,
  },
  ease: "power5.out",
});
const lowCostEl = document.querySelectorAll(".fast__choice");
tlB.from(lowCostEl, {
  x: 80,
  scale: 2,
  rotation: 0,
  opacity: 0,
  duration: 2.5,
  stagger: 2.3,
  scrollTrigger: {
    trigger: ".fast__choice",
    start: "top 30%",
    end: "bottom bottom",
    scrub: 2,
    // markers: true,
  },
  ease: "power5.out",
});
const paths = document.querySelectorAll("#mySVG path");
paths.forEach((path) => {
  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 5,
    scrollTrigger: {
      trigger: "path",
      start: "top 10%",
      once: true,
      end: "bottom bottom",
      scrub: false,
      // markers: true,
    },
    ease: "power2.inOut",
  });
});

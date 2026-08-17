gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);
const statInfo = document.querySelectorAll(".stat-container__info");
let meterInterval = null;
gsap.to("#triangle-inverse", {
  morphSVG: "#stat-pentagon-full",
  duration: 2.5,
  scrollTrigger: {
    trigger: ".slider-wrapper__subcontainer",
    start: "top 40%",
    end: "bottom bottom",
    scrub: 4,
    // markers: true,
  },
  ease: "expo.inOut",
});

gsap.from(statInfo, {
  x: -50,
  transformOrigin: "right",
  scaleX: 0,
  opacity: 0,
  duration: 2.5,
  stagger: 0.9,
  scrollTrigger: {
    trigger: ".stat-container",
    start: "top 40%",
    end: "bottom bottom",
    scrub: 3,
    // markers: true,
  },
  ease: "expo.inOut",
});

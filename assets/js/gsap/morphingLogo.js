gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);
let meterInterval = null; // ← manquait
gsap.to("#triangle-inverse", {
  morphSVG: "#stat-pentagon-full",
  duration: 2.5,
  scrollTrigger: {
    trigger: ".slider-wrapper__subcontainer",
    start: "center 70%",
    end: "bottom bottom",
    scrub: 4,
    // markers: true,
  },
  ease: "expo.inOut",
});

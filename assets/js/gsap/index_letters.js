gsap.registerPlugin(ScrollTrigger, SplitText);
let tlA = gsap.timeline();
const primaryEl = document.querySelectorAll(".primary__title__el");
primaryEl.forEach((titleEl) => {
  let split = new SplitText(titleEl, {
    type: "chars, words, lines",
  });
  tlA.from(split.words, {
    z: 50,
    scale: 4,
    autoAlpha: 0,
    duration: 0.5,
    opacity: 0,
    stagger: {
      amount: 0.2,
      from: "bottom",
    },
    ease: "power2.inOut",
  });
});
let secondaryTitle = new SplitText(".secondary__title", {
  type: "chars, words, lines",
});
tlA.from(secondaryTitle.chars, {
  x: -50,
  transformOrigin: "center center",
  scale: 0,
  autoAlpha: 0,
  duration: 0.2,
  opacity: 0,
  stagger: {
    amount: 0.9,
    from: "top",
  },
  ease: "power2.inOut",
});

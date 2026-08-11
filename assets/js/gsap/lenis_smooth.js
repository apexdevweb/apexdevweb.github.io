const lenis = new Lenis({
  syncTouch: true,
});
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 300);
});

gsap.ticker.lagSmoothing(0);

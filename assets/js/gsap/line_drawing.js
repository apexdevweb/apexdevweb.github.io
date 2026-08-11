gsap.registerPlugin(ScrollTrigger);

(() => {
  const frame = document.querySelector(".title-frame");
  if (!frame) return;

  const entry = frame.querySelector(".tf-entry");
  const top = frame.querySelector(".tf-top");
  const bottom = frame.querySelector(".tf-bottom");
  const exit = frame.querySelector(".tf-exit");
  const text = frame.querySelector(".title-frame__text");

  [entry, top, bottom, exit].forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set(text, { autoAlpha: 0, y: 10 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: frame,
      start: "top 80%",
      end: "top 30%",
      scrub: 3,
      // markers: true,
    },
  });

  // 1. Ligne d'entrée
  tl.to(entry, { strokeDashoffset: 0, ease: "none", duration: 0.5 })
    // 2. Les deux ailes se dessinent en même temps
    .to(top, { strokeDashoffset: 0, ease: "none", duration: 1 })
    .to(bottom, { strokeDashoffset: 0, ease: "none", duration: 1 }, "<")
    // 3. Le texte apparaît une fois le cadre formé
    .to(
      text,
      { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.3"
    )
    // 4. Ligne de sortie
    .to(exit, { strokeDashoffset: 0, ease: "none", duration: 0.5 });
})();

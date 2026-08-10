gsap.registerPlugin(ScrollTrigger);

(() => {
  const sectionPrima = document.querySelector(".sect-prima");
  const container = document.querySelector(".line-container");
  if (!sectionPrima || !container) return;

  const paths = container.querySelectorAll(".tt-seg");
  const bubbles = container.querySelectorAll(".tt-bubble");
  const originPoint = container.querySelector(".tt-origin-point");

  // --- Préparation : tous les tracés cachés au départ ---
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set(bubbles, { autoAlpha: 0, scale: 0.8 });
  gsap.set(originPoint, { autoAlpha: 0, scale: 0 });

  const getPath = (cls) => container.querySelector(`.${cls}`);
  const getBubble = (n) => container.querySelector(`.tt-bubble[data-n="${n}"]`);

  // --- Timeline unique : pin de la section + dessin de l'arbre ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionPrima,
      start: "top top",
      end: "+=900",
      scrub: 2,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      markers: true,
    },
  });

  const drawLine = (path, dur = 0.4) =>
    tl.to(path, { strokeDashoffset: 0, ease: "none", duration: dur });

  const popBubble = (bubble, pos = "<") =>
    tl.to(bubble, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, pos);

  // 1. Segment tout en haut du tronc (départ)
  drawLine(getPath("tt-seg4"), 0.3);

  // 2. Branche vers bulles 7 et 8 (en haut)
  drawLine(getPath("tt-branch78"), 0.35);
  drawLine(getPath("tt-b7"), 0.35);
  popBubble(getBubble(7));
  drawLine(getPath("tt-b8"), 0.35);
  popBubble(getBubble(8));

  // 3. Segment 3 du tronc, puis branche vers 4
  drawLine(getPath("tt-seg3"), 0.35);
  drawLine(getPath("tt-b4"), 0.35);
  popBubble(getBubble(4));

  // 4. Segment 2 du tronc, puis branche vers 3
  drawLine(getPath("tt-seg2"), 0.35);
  drawLine(getPath("tt-b3"), 0.35);
  popBubble(getBubble(3));

  // 5. Segment 1 du tronc, puis branche vers 5 et 6
  drawLine(getPath("tt-seg1"), 0.35);
  drawLine(getPath("tt-branch56"), 0.35);
  drawLine(getPath("tt-b5"), 0.35);
  popBubble(getBubble(5));
  drawLine(getPath("tt-b6"), 0.35);
  popBubble(getBubble(6));

  // 6. Segment 0 du tronc (dernier morceau, en bas)
  drawLine(getPath("tt-seg0"), 0.35);

  // 7. Descente diagonale vers le point de branchement bas
  drawLine(getPath("tt-toTrunk"), 0.6);

  // 8. Branches vers bulles 1 et 2
  drawLine(getPath("tt-b1"), 0.4);
  popBubble(getBubble(1));
  drawLine(getPath("tt-b2"), 0.4);
  popBubble(getBubble(2));

  // 9. Ligne finale vers le point d'origine
  drawLine(getPath("tt-origin"), 0.5);

  // 10. Point d'origine apparaît en dernier
  tl.to(originPoint, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });

  // --- Recalcul final ---
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();

gsap.registerPlugin(MorphSVGPlugin, SplitText);

let tlSpecial = gsap.timeline();
let currentSplit = null;

const svgFrame = document.getElementById("cursor-frame");
const svgDiagram = document.getElementById("branch-diagram");
const cursorInfo = document.querySelector(".cursor__txt");
const infoRust = document.getElementById("info-rust");
let progressRustData = 20;

// sauvegarde la forme d'origine du frame, une seule fois, avant tout morph
const originalFrameD = svgFrame.getAttribute("d");

infoRust.addEventListener("click", () => {
  cursorInfo.textContent = `Rust-${progressRustData}%`;

  if (currentSplit) currentSplit.revert();
  currentSplit = new SplitText(cursorInfo, { type: "chars, words, lines" });

  tlSpecial.clear();
  tlSpecial
    .from(currentSplit.chars, {
      z: -50,
      scale: 4,
      autoAlpha: 0,
      duration: 0.5,
      stagger: { amount: 0.2, from: "bottom" },
      ease: "power2.inOut",
    })
    .to(svgFrame, {
      morphSVG: svgDiagram, // frame -> diagramme
      duration: 2.5,
    });
});

infoRust.addEventListener("mouseout&", () => {
  tlSpecial.to(svgFrame, {
    morphSVG: originalFrameD, // diagramme -> frame (retour à l'état sauvegardé)
    duration: 1.5,
  });
});

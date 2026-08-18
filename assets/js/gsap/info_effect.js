gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, SplitText);
let tlSpecial = gsap.timeline();
//↓↓↓CURSEUR SOURIS↓↓↓
const cursorContainer = document.querySelector(".cursor__effect");
const cursorInfo = document.querySelector(".cursor__txt");
//↓↓↓TEXT INFOS DU MORPHING DU PENTAGONE↓↓↓
const infoPhp = document.getElementById("info-php");
const infoMysql = document.getElementById("info-sql");
const infoRust = document.getElementById("info-rust");
let progressRustData = 20;
const infoSass = document.getElementById("info-sass");
const infoJs = document.getElementById("info-js");
//↓↓↓RUST EVENT MECANIC↓↓↓
infoRust.addEventListener("click", () => {
  cursorInfo.textContent = `Rust-${progressRustData}%`;
  let splitRust = new SplitText(cursorInfo, {
    type: "chars, words, lines",
  });
  tlSpecial.from(splitRust.chars, {
    z: -50,
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

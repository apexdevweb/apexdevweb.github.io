gsap.registerPlugin(SplitText);
const cursor = document.querySelector(".cursor__effect");
const cursorTxt = document.querySelector(".cursor__txt");
const featureBoxes = document.querySelectorAll(".feature__el");
let isOverFeature = false;

let txtArray = ["Surgical precision for ultra-polished interfaces.<br>Because almost perfect is not an option.",
"Interactive storytelling through code.<br>Making the web feel alive",
"Flawless performance <br> from mobile to ultra-wide.",
"Bridging the gap <br> between design, tech, and success.",
"Pivoting quickly <br> to find the best technical path.",
"Engineered for consistency <br> and long-term resilience.",
"From solid foundations <br> to cutting-edge tech.",
"Because trust is the foundation <br> of every digital experience.",
"Crafting digital experiences <br> that just feel right.",
];

document.addEventListener("mousemove", (e) => {
  const xPct = Math.round((e.clientX / window.innerWidth) * 100);
  const yPct = Math.round((e.clientY / window.innerHeight) * 100);

  gsap.to(cursor, {
    x: e.clientX + 40,
    y: e.clientY + 15,
    duration: 0.7,
    ease: "power2.out",
  });

  if (!isOverFeature) {
    cursorTxt.textContent = `${xPct}%-${yPct}%`;
  }
});

featureBoxes.forEach((fBox, i) => {
  fBox.addEventListener("mouseenter", () => {
    isOverFeature = true;
  
    cursorTxt.innerHTML = txtArray[i];
    const splitI = new SplitText(cursorTxt, { type: "lines, words" });

    gsap.from(splitI.words, {
      y: 20,
      transformOrigin: "bottom",
      scaleY: 0,
      opacity: 0,
      duration: 0.7,
      stagger: 0.03,
      ease: "power2.out",
      onComplete: () => splitI.revert() 
    });
  });

  fBox.addEventListener("mouseleave", () => {
    isOverFeature = false;
  });
});



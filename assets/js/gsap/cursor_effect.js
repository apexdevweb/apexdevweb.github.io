gsap.registerPlugin(SplitText);
const cursor = document.querySelector(".cursor__effect");
const cursorTxt = document.querySelector(".cursor__txt");
document.addEventListener("mousemove", (e) => {
  const xPct = Math.round((e.clientX / window.innerWidth) * 100);
  const yPct = Math.round((e.clientY / window.innerHeight) * 100);
  gsap.to(cursor, {
    x: e.clientX + 40,
    y: e.clientY + 15,
    duration: 0.7,
    ease: "power2.out",
  });
    cursorTxt.textContent = `${xPct}%-${yPct}%`;
});




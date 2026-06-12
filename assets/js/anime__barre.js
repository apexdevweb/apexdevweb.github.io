document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("enterbtn");
  const topBars = document.querySelectorAll(".top_bar");
  const bottomBars = document.querySelectorAll(".bottom_bar");

  // Timeline plus rapide
  const tl = gsap.timeline({ paused: true });

  tl.to(topBars, {
    opacity: 1,
    y: -5,
    stagger: 0.05, // plus serré
    duration: 0.15, // plus rapide
    ease: "power2.out",
  });
  tl.to(
    bottomBars,
    {
      opacity: 1,
      y: 5,
      stagger: 0.05,
      duration: 0.15,
      ease: "power2.out",
    },
    "-=0.1"
  ); // chevauchement plus court

  btn.addEventListener("mouseenter", () => {
    tl.play();
  });

  btn.addEventListener("mouseleave", () => {
    tl.reverse();
  });

  //morphing barre
  const morphEl = document.querySelectorAll(".feature__el");
  const featTopBar = document.querySelectorAll(".feature__top__barre");
  const featBottomBar = document.querySelectorAll(".feature__bottom__barre");

  morphEl.forEach((featEl, index) => {
    featEl.addEventListener("mouseenter", () => {
      featTopBar[index]?.classList.add("view__feat__barreTop");
      featBottomBar[index]?.classList.add("view__feat__barreBottom");
    });
  
    featEl.addEventListener("mouseleave", () => {
      featTopBar[index]?.classList.remove("view__feat__barreTop");
      featBottomBar[index]?.classList.remove("view__feat__barreBottom");
    });
  });
});

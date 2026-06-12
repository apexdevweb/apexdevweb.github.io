// On récupère les éléments une seule fois pour la performance
const cursorIndex = document.querySelector(".cursor-index");
const maskTop = document.querySelector(".one");
const maskBottom = document.querySelector(".two");
const scrollInfo = document.querySelector(".scroll");

gsap.to(cursorIndex, {
  x: "100vw",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3,
    onUpdate: (self) => {

      const progress = Math.round(self.progress * 100);

      maskTop.textContent = `${progress}%`;
      maskBottom.textContent = `-${progress}%`;
      if (self.progress > 0.2) {
        gsap.to(scrollInfo, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(scrollInfo, { opacity: 0, duration: 0.3 });
      }
    },
  },
});

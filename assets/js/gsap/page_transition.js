gsap.registerPlugin(ScrollTrigger);

function pageTransitionIn() {
  gsap.from("#transition-overlay", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to("#transition-overlay", {
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    delay: 0.2,
  });
}

function pageTransitionOut(url) {
  gsap.to("#transition-overlay", {
    opacity: 1,
    duration: 1.4,
    ease: "power2.inOut",
    onComplete: () => {
      window.location.href = url;
    },
  });
}

window.onload = pageTransitionIn;

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const url = link.getAttribute("href");
    if (url.startsWith("http")) return;
    e.preventDefault();
    pageTransitionOut(url);
  });
});

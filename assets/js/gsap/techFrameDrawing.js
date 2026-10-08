////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION LINE DRAWING (techframe SVG)
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION LINE DRAWING (techframe SVG)
////////////////////////////////////////////////////////////////////////////////////////////////////////
const svgContainer = document.querySelector(".project-wrapper");

function initLineDrawing({
  container,
  pathSelector = ".tech-path",
  triggerEl = svgContainer, // élément utilisé comme trigger de scroll
  start = "top top",
  end = "bottom bottom",
  scrub = 3,
} = {}) {
  const root =
    typeof container === "string"
      ? document.querySelector(container)
      : container;
  if (!root) return;

  const path = root.querySelector(pathSelector);
  if (!path) return;

  // Mesure chaque sous-tracé (chaque "M ... L ...") séparément avec un path temporaire
  const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const lengths = path
    .getAttribute("d")
    .split(/(?=M)/)
    .filter((seg) => seg.trim())
    .map((seg) => {
      probe.setAttribute("d", seg);
      return probe.getTotalLength();
    });
  const maxLength = Math.max(...lengths);

  // dasharray = longueur du plus long trait : tous les traits se dessinent depuis leur point de départ
  gsap.set(path, {
    strokeDasharray: maxLength,
    strokeDashoffset: maxLength,
  });

  const drawTween = gsap.to(path, {
    strokeDashoffset: 0,
    ease: "expo.inOut",
    scrollTrigger: {
      trigger:
        typeof triggerEl === "string"
          ? document.querySelector(triggerEl)
          : triggerEl,
      start,
      end,
      scrub,
      // markers: true,
    },
    // Une fois entièrement dessiné, on retire les tirets : sinon ils couperaient
    // le tracé après le morph (les nouvelles formes n'ont pas les mêmes longueurs)
    onUpdate: () => {
      path.style.strokeDasharray =
        drawTween.progress() === 1 ? "none" : maxLength;
    },
  });
}

initLineDrawing({ container: ".slider-tech__frame" });

////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION LINE DRAWING fin
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION LINE DRAWING fin
////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION LINE DRAWING (techframe SVG)
////////////////////////////////////////////////////////////////////////////////////////////////////////
const svgContainer = document.querySelector(".project-wrapper");
function initLineDrawing({
  container,
  lineSelector = "line",
  triggerEl = svgContainer, // élément utilisé comme trigger de scroll (peut différer du svg lui-même)
  start = "top top",
  end = "bottom bottom",
  scrub = 3,
  stagger = 1.02,
} = {}) {
  const root =
    typeof container === "string"
      ? document.querySelector(container)
      : container;
  if (!root) return;

  const lines = root.querySelectorAll(lineSelector);
  if (!lines.length) return;

  // pour chaque ligne : on fixe dasharray = sa propre longueur, dashoffset = même valeur (donc invisible au départ)
  lines.forEach((line) => {
    const length = line.getTotalLength();
    gsap.set(line, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });

  gsap.to(lines, {
    strokeDashoffset: 0,
    ease: "expo.inOut",
    stagger, // léger décalage entre chaque trait pour un effet "dessiné" plutôt que toutes en même temps
    scrollTrigger: {
      trigger:
        typeof triggerEl === "string"
          ? document.querySelector(triggerEl)
          : triggerEl,
      start,
      end,
      scrub,
    //   markers: true,
    },
  });
}
initLineDrawing({ container: ".slider-tech__frame" });

////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION LINE DRAWING fin
////////////////////////////////////////////////////////////////////////////////////////////////////////

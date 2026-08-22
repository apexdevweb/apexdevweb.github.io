gsap.registerPlugin(ScrollTrigger, SplitText);

const progressInfo = document.querySelector(".coding-rank");
const infoLanguage = document.querySelectorAll(".stat-container__info");
const progressData = [70, 50, 20, 50, 60];

let currentSplit = null;
let currentAnimation = null;


// ========================================
// NETTOYAGE
// ========================================

function cleanupAnimation() {

  // Nettoyage de l'animation GSAP
  if (currentAnimation) {

    // Nettoyage du ScrollTrigger associé
    if (currentAnimation.scrollTrigger) {
      currentAnimation.scrollTrigger.kill();
    }

    // Suppression de l'animation
    currentAnimation.kill();

    currentAnimation = null;
  }

  // Nettoyage du SplitText
  if (currentSplit) {
    currentSplit.revert();
    currentSplit = null;
  }
}


// ========================================
// CLICK SUR UN LANGAGE
// ========================================

infoLanguage.forEach((language, index) => {

  language.addEventListener("click", () => {

    // -------------------------------
    // Nettoyage de l'ancien état
    // -------------------------------

    cleanupAnimation();


    // -------------------------------
    // Récupération de la valeur
    // -------------------------------

    const dataValue = progressData[index];


    // -------------------------------
    // Affichage de la valeur
    // -------------------------------

    progressInfo.textContent = `${dataValue}%`;


    // -------------------------------
    // SplitText
    // -------------------------------

    currentSplit = new SplitText(progressInfo, {
      type: "chars"
    });


    // -------------------------------
    // Animation d'apparition
    // -------------------------------

    gsap.fromTo(
      currentSplit.chars,

      {
        z: -50,
        scale: 4,
        autoAlpha: 0
      },

      {
        z: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.inOut"
      }
    );


    // -------------------------------
    // Animation de disparition
    // au scroll
    // -------------------------------

    currentAnimation = gsap.to(
      currentSplit.chars,

      {
        x: 20,
        scaleX: 0,
        opacity: 0,

        stagger: 0.05,

        ease: "power2.inOut",

        scrollTrigger: {
          trigger: ".stat-container",

          start: "top center",
          end: "bottom center",

          scrub: 1,

          // markers: true
        }
      }
    );

  });

});

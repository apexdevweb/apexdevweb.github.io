window.addEventListener("DOMContentLoaded", () => {
  // --- SÉLECTEURS ---
  const choiceContainer = document.querySelector(".choice__el");
  const subChoice = document.querySelectorAll(".sector__el");
  const subSectorInputs = document.querySelectorAll(".sector__input");
  const sectorTitleB = document.querySelector(".sector__title--B");
  const sectorFooter = document.querySelector(".sector__footer")
  // --- DONNÉES ---
  const DATA = {
    "Showcase": ["Craftsmen", "Independents", "Local small businesses", "Associations"],
    "Landing-page": ["Coaches", "Trainers", "Freelancers", "Advertising campaigns"],
    "Portfolio": ["Photographers", "Designers", "Artists", "Craftspeople"]
  };

  // --- FONCTION MORPHING GSAP ---
  const morphText = (target, newText) => {
    if (!target || target.textContent === newText) return;

    gsap.timeline()
      .to(target, { duration: 0.3, filter: "blur(10px)", opacity: 0, y: -5, ease: "power6.in" })
      .set(target, { textContent: newText }) // Change le texte au milieu
      .to(target, { duration: 0.5, filter: "blur(0px)", opacity: 1, y: 0, ease: "back.out(1.7)" });
  };

  // --- LOGIQUE INITIALE (URL PARAMS) ---
  const urlParams = new URLSearchParams(window.location.search);
  const selection = urlParams.get("type");

  if (selection && DATA[selection]) {
    if (choiceContainer) choiceContainer.textContent = selection;
    // Remplissage initial des sous-choix
    subChoice.forEach((el, i) => {
      if (DATA[selection][i]) el.textContent = DATA[selection][i];
    });
  }

  // --- GESTION DES CLICS CATÉGORIES (Showcase, Landing, etc.) ---
  ["Showcase", "Landing-page", "Portfolio"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => {
        morphText(choiceContainer, id);
        // Mise à jour optionnelle des textes des labels secteurs ici si besoin
      });
    }
  });

  // --- GESTION DES CLICS SECTEURS (Inputs) ---
  subSectorInputs.forEach((input, index) => {
    input.addEventListener("click", () => {
      const currentCategory = choiceContainer?.textContent;
      const categoryData = DATA[currentCategory];
      sectorFooter.style.visibility = "visible";
      
      const newText = categoryData ? categoryData[index] : "Aucun secteur sélectionné";
      morphText(sectorTitleB, newText);
    });
  });
});


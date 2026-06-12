const sectorSubChoice = document.querySelectorAll(".sector__ctnr");
const checkEl = document.getElementById("sector__checked");

checkEl.addEventListener("change", ()=> {
    sectorSubChoice.forEach((subChoiceEl)=> {
        if (checkEl.checked) {
            subChoiceEl.style.opacity = "0.3";
            subChoiceEl.style.pointerEvents = "none"; // Bloque les clics (liens, boutons, etc.)
            subChoiceEl.style.userSelect = "none"; // Empêche la séléction du texte
        } else {
            subChoiceEl.style.opacity = "1";
            subChoiceEl.style.pointerEvents = "auto"; //Rétablis les clics (liens, boutons, etc.)
            subChoiceEl.style.userSelect = "auto"; // Rétablis la séléction du texte
        }
    });
});


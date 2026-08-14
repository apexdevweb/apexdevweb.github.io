function initCipher() {
  const text = "SCRIPT'ENJOYER";
  const cipherEl = document.getElementById("ciphing");

  cipherEl.innerHTML = text
    .split("")
    .map((char) => `<span class="cipher-char">${char}</span>`)
    .join("");
  runFullCycle(cipherEl, text);
}
const START_DELAY = 3000;
function runFullCycle(cipherEl, text) {
  setTimeout(() => {
    const spans = cipherEl.querySelectorAll(".cipher-char");
    let index = 0;

    // Phase 1 : remplacement fluide, lettre par lettre, dans l'ordre
    const revealInterval = setInterval(() => {
      if (index >= spans.length) {
        clearInterval(revealInterval);
        runDigitCycles(cipherEl, spans, text);
        return;
      }
      swapChar(spans[index], Math.floor(Math.random() * 10));
      index++;
    }, 200);
  }, START_DELAY);
}
function runDigitCycles(cipherEl, spans, text) {
  let index = 0;
  let cycles = 0;
  const maxCycles = 2;

  const digitInterval = setInterval(() => {
    swapChar(spans[index], Math.floor(Math.random() * 10));
    index++;

    if (index >= spans.length) {
      index = 0;
      cycles++;
    }

    if (cycles >= maxCycles) {
      clearInterval(digitInterval);
      // retour aux lettres, puis on relance tout le cycle
      setTimeout(() => {
        restoreLetters(cipherEl, spans, text, () => {
          runFullCycle(cipherEl, text);
        });
      }, 300);
    }
  }, 150);
}
function restoreLetters(cipherEl, spans, text, callback) {
  let index = 0;
  const restoreInterval = setInterval(() => {
    if (index >= spans.length) {
      clearInterval(restoreInterval);
      callback();
      return;
    }
    swapChar(spans[index], text[index]);
    index++;
  }, 100);
}
function swapChar(span, newValue) {
  span.classList.add("cipher-char--fade");
  setTimeout(() => {
    span.textContent = newValue;
    span.classList.remove("cipher-char--fade");
  }, 200);
}
initCipher();

function initCipher() {
  const textA = "SCRIPT'ENJOYER";
  const textB = "APEXDEVWEB@GMAIL.COM";
  const cipherEl = document.getElementById("ciphing");

  cipherEl.innerHTML = textA
    .split("")
    .map((char) => `<span class="cipher-char">${char}</span>`)
    .join("");
  runFullCycle(cipherEl, textA, textB, textA);
}

const START_DELAY = 3000;

function runFullCycle(cipherEl, textA, textB, currentText) {
  setTimeout(() => {
    const spans = cipherEl.querySelectorAll(".cipher-char");
    let index = 0;

    // Phase 1 : remplacement fluide, lettre par lettre, dans l'ordre
    const revealInterval = setInterval(() => {
      if (index >= spans.length) {
        clearInterval(revealInterval);
        runDigitCycles(cipherEl, spans, textA, textB, currentText);
        return;
      }
      swapChar(spans[index], Math.floor(Math.random() * 10));
      index++;
    }, 200);
  }, START_DELAY);
}

function runDigitCycles(cipherEl, spans, textA, textB, currentText) {
  let index = 0;
  let cycles = 0;
  const maxCycles = 1;

  const digitInterval = setInterval(() => {
    swapChar(spans[index], Math.floor(Math.random() * 10));
    index++;

    if (index >= spans.length) {
      index = 0;
      cycles++;
    }

    if (cycles >= maxCycles) {
      clearInterval(digitInterval);
      const nextText = currentText === textA ? textB : textA;

      setTimeout(() => {
        transitionToText(cipherEl, nextText, () => {
          const newSpans = cipherEl.querySelectorAll(".cipher-char");
          runFullCycleFromDigits(cipherEl, newSpans, textA, textB, nextText);
        });
      }, 100);
    }
  }, 150);
}

// Transition fluide lettre par lettre vers un nouveau texte, en gérant les longueurs différentes
function transitionToText(cipherEl, nextText, callback) {
  const spans = Array.from(cipherEl.querySelectorAll(".cipher-char"));
  const oldLength = spans.length;
  const newLength = nextText.length;
  const maxLength = Math.max(oldLength, newLength);
  let index = 0;

  const transitionInterval = setInterval(() => {
    if (index >= maxLength) {
      clearInterval(transitionInterval);
      callback();
      return;
    }

    if (index < oldLength && index < newLength) {
      // position commune : remplacement normal
      swapChar(spans[index], nextText[index]);
    } else if (index < newLength) {
      // nouveau texte plus long : on ajoute une lettre en fade-in
      const newSpan = document.createElement("span");
      newSpan.className = "cipher-char cipher-char--fade";
      newSpan.textContent = nextText[index];
      cipherEl.appendChild(newSpan);
      requestAnimationFrame(() => {
        newSpan.classList.remove("cipher-char--fade");
      });
    } else if (index < oldLength) {
      // nouveau texte plus court : on fait disparaître la lettre en trop
      spans[index].classList.add("cipher-char--fade");
      setTimeout(() => {
        spans[index].remove();
      }, 200);
    }

    index++;
  }, 100);
}

// reprend le cycle normal (reveal en chiffres) après la transition de texte
function runFullCycleFromDigits(cipherEl, spans, textA, textB, currentText) {
  setTimeout(() => {
    const freshSpans = cipherEl.querySelectorAll(".cipher-char");
    let index = 0;

    const revealInterval = setInterval(() => {
      if (index >= freshSpans.length) {
        clearInterval(revealInterval);
        runDigitCycles(cipherEl, freshSpans, textA, textB, currentText);
        return;
      }
      swapChar(freshSpans[index], Math.floor(Math.random() * 10));
      index++;
    }, 100);
  }, START_DELAY);
}

function swapChar(span, newValue) {
  span.classList.add("cipher-char--fade");
  setTimeout(() => {
    span.textContent = newValue;
    span.classList.remove("cipher-char--fade");
  }, 200);
}

initCipher();
gsap.registerPlugin(ScrollTrigger, SplitText);
const sliderContainer = document.querySelector(".slider-wrapper");
const cursorSlider = document.querySelector(".cursor__effect");
const cursorSliderTxt = document.querySelector(".cursor__txt");
const titleArray = [
  "HTML5",
  "CSS3",
  "SASS",
  "JAVASCRIPT",
  "PHP",
  "MYSQL",
  "PYTHON",
  "RUST",
];
for (let i = 0; i < 8; i++) {
  const cardsEl = document.createElement("div");
  const cardsTitle = document.createElement("h2");

  cardsEl.setAttribute("class", "card");
  cardsTitle.setAttribute("class", "card__title");

  cardsTitle.textContent = titleArray[i];

  cardsEl.appendChild(cardsTitle);
  sliderContainer.appendChild(cardsEl);

  cardsEl.addEventListener("click", () => {
    if (cursorSliderTxt.textContent === titleArray[i]) {
      cursorSliderTxt.style.fontSize = "1.2rem";
      cursorSliderTxt.textContent = "";
    } else {
      cursorSliderTxt.style.fontSize = "3rem";
      cursorSliderTxt.textContent = titleArray[i];
    }
  });
}

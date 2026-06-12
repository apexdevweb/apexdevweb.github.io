const sliderCtnr = document.querySelector(".slider__container");
sliderCtnr.innerHTML += sliderCtnr.innerHTML;
const sliderEl = document.querySelectorAll(".slider__el");

let tlSlide = gsap.timeline({
  repeat: -1,
  defaults: { ease: "none" },
});
tlSlide.to(sliderCtnr, {
  xPercent: -50,
  duration: 15,
});
sliderCtnr.addEventListener("mouseenter", () => tlSlide.pause());
sliderCtnr.addEventListener("mouseleave", () => tlSlide.play());
sliderEl.forEach((slideFig) => {
  slideFig.addEventListener("click", () => {
    const sliderTxt = slideFig.querySelector(".slider__txt");
    const sliderCapt = slideFig.querySelector(".slider__caption");
    let splitSlide = new SplitText(sliderCapt, {
      type: "lines, words",
    });
    const sliderSepar = slideFig.querySelector(".slider__el--separate");
    const sliderImg = slideFig.querySelector(".slider__img");

    if (slideFig.classList.contains("scaling__slide")) {
      slideFig.classList.remove("scaling__slide");
      if (sliderTxt) {
        sliderTxt.classList.remove("translate__txt");
      }
      if (sliderCapt) {
        sliderCapt.classList.remove("slider__caption--view");
      }
      if (sliderSepar) {
        sliderSepar.classList.remove("translate__separate");
      }
      if (sliderImg) {
        sliderImg.classList.remove("morph__img");
      }
    } else {
      slideFig.classList.add("scaling__slide");
      if (sliderTxt) {
        sliderTxt.classList.add("translate__txt");
      }
      if (sliderCapt) {
        sliderCapt.classList.add("slider__caption--view");
        gsap.from(splitSlide.words, {
          y: 20,
          transformOrigin: "bottom",
          scaleY: 0,
          duration: 0.5,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.inOut",
        });
      }
      if (sliderSepar) {
        sliderSepar.classList.add("translate__separate");
      }
      if (sliderImg) {
        sliderImg.classList.add("morph__img");
      }
    }
  });
});

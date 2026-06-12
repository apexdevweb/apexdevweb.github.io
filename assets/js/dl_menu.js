const mblCtnr = document.querySelector(".free__pack");
const navContent = document.querySelector(".dl__sub__ctnr");
mblCtnr.addEventListener("click", () => {
  navContent.classList.toggle("view__dl");
});

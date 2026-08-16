gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);
let meterInterval = null; // ← manquait
gsap.to("#triangle-inverse", {
  morphSVG: "#stat-pentagon-full",
  duration: 2.5,
  scrollTrigger: {
    trigger: ".slider-wrapper__subcontainer",
    start: "center 70%",
    end: "bottom bottom",
    scrub: 4,
    // markers: true,
  },
  ease: "expo.inOut",
});
function loadingMeter(options = {}) {
  const alphaMeter = document.getElementById("load-meter");
  if (!alphaMeter) return;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=<>?/\\|";
  const length = options.length || 12; // nombre de caractères affichés
  const speed = options.speed || 1000; // intervalle en ms entre chaque changement
  function randomString() {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const intervalId = setInterval(() => {
    alphaMeter.textContent = randomString();
  }, speed);
  return intervalId; // garde la référence pour pouvoir l'arrêter plus tard
}
ScrollTrigger.create({
  trigger: "#load-meter",
  start: "top center",
  end: "bottom top",
  // markers: true,
  onEnter: () => {
    if (!meterInterval)
      meterInterval = loadingMeter({ length: 18, speed: 150 });
  },
  onLeave: () => {
    clearInterval(meterInterval);
    meterInterval = null;
  },
  onEnterBack: () => {
    if (!meterInterval)
      meterInterval = loadingMeter({ length: 18, speed: 150 });
  },
  onLeaveBack: () => {
    clearInterval(meterInterval);
    meterInterval = null;
  },
});

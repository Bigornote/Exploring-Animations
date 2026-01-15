/**
 * swup.js (Router)
 * ------------------------------------------------------------
 * Gère UNIQUEMENT :
 * - transitions (animateIn / animateOut)
 * - reset des systèmes de page (destroyAnimations, destroyLenis…)
 * - ré-initialisation via initPage()
 *
 * ❌ Ne jamais mettre ici :
 * - des animations
 * - des modules
 * - du code de page
 *
 * 💡 Règle :
 * "swup.js ne fait qu’orchestrer le cycle de vie des pages"
 */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Swup from "swup";

import { clearBase, initBase } from "../init/initBase";
import { initPage } from "../init/initPage";
import { initIntro } from "../three/intro";


gsap.registerPlugin(ScrollTrigger);

let swup;
let overlay;

// Animate Swup Overlay
// OUT : avant le changement de page
// function animateOut() {
//   return gsap.to(overlay, {
//     translateX: "0%",
//     duration: 1.0,
//     ease: "power3.inOut"
//   });
// }

// IN : après le changement de page
// function animateIn() {
//   return gsap.to(overlay, {
//     translateX: "-100%", // traverse et sort à gauche
//     duration: 1.0,
//     ease: "power3.inOut",
//     onStart() {
//       // Lancer les animations après que l'overlay est traversé la page
//       setTimeout(() => initAnimations(), 150);
//     },
//     onComplete() {
//       // On le remet à droite instantanément (invisible)
//       gsap.set(overlay, { translateX: "100%" });
//     }
//   });
// }


document.addEventListener("DOMContentLoaded", () => {
  overlay = document.getElementById("transition-overlay");

  initBase();
  initPage();
  initIntro()

  // let firstVisit = !sessionStorage.getItem("transition-done");

  // if (firstVisit) {
  //   // Première visite OU refresh → pas d’animation IN
  //   gsap.set(overlay, { translateX: "100%" });

  //   // Marque la session, mais ne joue aucune anim
  //   sessionStorage.setItem("transition-done", true);
  // }

  swup = new Swup({
    containers : ['#swup'],
    animationSelector: false,
  })

  // Exit page
  swup.hooks.on('visit:start', async() => {
    clearBase();

    await animateOut();
  })

  // Enter page
  swup.hooks.on("content:replace", () => {
    initPage();
    initBase();

    animateIn()
  })
})
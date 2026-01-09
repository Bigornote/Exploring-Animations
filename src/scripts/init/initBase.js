/**
 * initBase()
 * ------------------------------------------------------------
 * Exécuté UNE SEULE FOIS au chargement initial.
 *
 * On y place :
 * - les systèmes "globaux" (ex : Lenis smooth scroll)
 * - les listeners uniques
 * - la config de base qui ne dépend PAS du DOM injecté par Swup
 *
 * ❌ Ne jamais mettre ici :
 * - GSAP/ScrollTrigger liés à des éléments du DOM
 * - modules qui doivent être réinitialisés après chaque transition
 *
 * 💡 Règle simple :
 * "Si ça vit pour toute la session —> initBase()"
 */

import { destroyAnimations, initAnimations } from "../animations/effects";
import { initLayeredScroll } from "../animations/layeringScroll";
import { initSmoothParallaxScroll } from "../animations/smoothParallaxScroll";
import { initSmoothSectionParallax } from "../animations/smoothSectionParallax";
import { destroySmoothScrolling, initSmoothScrolling } from "../scroll/smoothScroll";

export function initBase() {
  initSmoothScrolling();

  initAnimations();
  initSmoothParallaxScroll();
  initSmoothSectionParallax();
  initLayeredScroll();
}

export function clearBase() {
  destroyAnimations();

  destroySmoothScrolling();
}
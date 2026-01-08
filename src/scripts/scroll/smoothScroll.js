import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger)

let lenis;

export const initSmoothScrolling = () => {
  lenis = new Lenis({ lerp: 0.15 });

  window.lenis = lenis;

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(raf);
};

function raf(time) {
  lenis.raf(time * 1000);
}

export const destroySmoothScrolling = () => {
  if (!lenis) return;

  gsap.ticker.remove(raf);
  lenis.destroy();
  window.lenis = null;
};

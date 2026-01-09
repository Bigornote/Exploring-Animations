import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger)

let lenis;

function raf(time) {
  lenis.raf(time * 1000);
}

export const initSmoothScrolling = () => {
  if (lenis) return; 
  lenis = new Lenis({
    lerp: 0.066,         // 0.1 = plus fluide/lent, 0.15 = ton défaut, 0.2 = plus réactif
    smoothWheel: true,   // smooth sur molette (défaut: true)
    wheelMultiplier: 1,  // sensibilité molette (0.5 = plus lent, 2 = plus rapide)
    touchMultiplier: 2,  // sensibilité touch (souvent augmenté)
    infinite: false,     // scroll infini (rare, pour des effets spéciaux)
  });

  window.lenis = lenis;

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add(raf);

  ScrollTrigger.refresh(); // ← recalcule après que Lenis est prêt
};

export const destroySmoothScrolling = () => {
  if (!lenis) return;

  gsap.ticker.remove(raf);
  lenis.destroy();
  window.lenis = null;
};

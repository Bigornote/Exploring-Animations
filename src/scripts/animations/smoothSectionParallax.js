// smoothParallaxScroll
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSmoothSectionParallax = () => {
  const section = document.querySelector('[data-name="smooth-section-parallax"]');
  if (!section) return;

  const inner = section.querySelector('[data-parallax-inner]');
  const overlay = section.querySelector('[data-overlay="overlay-section"]');

  if (inner) {
    gsap.fromTo(inner,
      { yPercent: 0 },
      {
        yPercent: 2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }

  if (overlay) {
    gsap.to(overlay, {
      opacity: 0.6,
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "bottom top",
        scrub: true
      }
    });
  }
};

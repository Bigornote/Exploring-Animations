// layeringScroll
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initLayeredScroll = () => {
  const sections = document.querySelectorAll('[data-layered]');
  

  sections.forEach((section) => {
    const overlay = section.querySelector('[data-overlay="overlay-section"]');

    const speed = parseFloat(section.dataset.speed) || 1;
    if (speed === 1) return; // vitesse normale = pas d'animation

    gsap.to(section, {
      yPercent: (1 - speed) * 100,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    if (overlay) {
      gsap.to(overlay, {
        opacity: 0.6,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });
};
// smoothParallaxScroll
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSmoothParallaxScroll = () => {
  const component = document.querySelector('[data-name="smooth-parallax-scroll"]');

  if(!component) return;

  const gallery = component.querySelector('[data-name="gallery"]');
  const columns = gsap.utils.toArray('[data-name="column"]')

  if(columns.length > 0 ) {
    const configs = [
      { from: 0, to: -50 },   // colonne 0 : monte
      { from: -50, to: 0 },   // colonne 1 : descend
      { from: 10, to: -40 },   // colonne 2 : monte plus fort
    ];

    columns.forEach((el, index) => {
      const config = configs[index];
      if (!config) return;

      gsap.fromTo(el,
        { yPercent: config.from },
        {
          yPercent: config.to,
          scrollTrigger: {
            trigger: gallery,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          }
        }
      );
    });
  }
  
}
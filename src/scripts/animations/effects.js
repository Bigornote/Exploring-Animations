import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const initAnimations = () => {

  // Scale up images
  const scaleUpEls = gsap.utils.toArray('[data-scale-up]');
  if (scaleUpEls.length) {
    scaleUpEls.forEach(el => {
      const scale = parseFloat(el.dataset.scale) || 1.2;
      const start = el.dataset.start || "top 80%";
      const end = el.dataset.end || "bottom 20%";

      gsap.fromTo(el, 
        { scale: 1 },
        {
          scale: scale,
          scrollTrigger: {
            trigger: el,
            start: start,
            end: end,
            scrub: 1,
          }
        }
      );
    });
  }

  // Split by lines with mask reveal
  document.fonts.ready.then(() => {
    const splitEls = gsap.utils.toArray('[data-split-mask-lines]');
    if (!splitEls.length) return;

    splitEls.forEach(el => {

      const duration = parseFloat(el.dataset.duration) || 1.2;
      const delay = parseFloat(el.dataset.delay) || 0;
      const stagger = parseFloat(el.dataset.stagger) || 0.05;
      const ease = el.dataset.ease || "power4.out";
      const start = el.dataset.start || "top 90%";

      el.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, '<span class="br-line"></span>');

      const split = new SplitText(el, { 
        type: "lines",
        linesClass: "line",
      });

      split.lines.forEach(line => {
        line.innerHTML = `<div class="line-inner">${line.innerHTML}</div>`;
      });

      const inners = el.querySelectorAll('.line-inner');
      gsap.fromTo(inners,
        { yPercent: 100,
          opacity: 1
         },
        {
          yPercent: 0,
          opacity: 1,
          stagger: stagger,
          duration: duration,
          delay: delay,
          ease: ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: "play none none none",
          }
        }
      );
    });
  });

  // Parallax images
  const parallaxEls = gsap.utils.toArray('[data-parallax-image]');
  if (parallaxEls.length) {
    parallaxEls.forEach(img => {
      const speed = parseFloat(img.dataset.parallaxSpeed) || 0.2;
      const direction = img.dataset.parallaxDirection || 'down';
      const start = img.dataset.start || "top bottom";
      const end = img.dataset.end || "bottom top";

      const yStart = direction === 'down' ? -10 : 10;
      const yEnd = direction === 'down' ? 10 : -10;

      gsap.fromTo(img,
        { yPercent: yStart },
        {
          yPercent: yEnd,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest('[data-parallax-image]'),
            start: start,
            end: end,
            scrub: speed,
          }
        }
      );
    });
  }
};


export const destroyAnimations = () => {
  ScrollTrigger.getAll().forEach(t => t.kill());
  gsap.globalTimeline.clear();
};
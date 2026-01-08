// import { initAccordion } from "./faq.js";
// import { initHeader } from './header.js';
// import { initOffers } from './offers.js';

// const registry = {
//   accordion: initAccordion,
//   offers: initOffers,
//   header: initHeader,
// };

// export function initModules() {
//   document.querySelectorAll('[data-module]').forEach(el => {
//     const modules = el.dataset.module.split(',').map(m => m.trim());

//     modules.forEach(name => {
//       if (registry[name]) {
//         registry[name](el);
//       }
//     });
//   });
// }
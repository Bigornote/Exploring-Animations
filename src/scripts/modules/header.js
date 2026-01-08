const initHeaderScrollLine = (el) => {
  const header = el;
  if (!header) return;

  const SCROLL_THRESHOLD = 30;
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
      ticking = true;
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
};

export function initMobileNav(el) {
  const toggle = el.querySelector(".nav__toggle");
  const panel = el.querySelector(".navigation");
  const closeBtn = el.querySelector(".navigation__close");
  const links = panel?.querySelectorAll(".nav__list a");
  const ctaButton = panel?.querySelector(".navigation__cta a.btn"); // ← Sélecteur ajusté

  if (!toggle || !panel) return;

  function openNav() {
    panel.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    // Swap dark → light en mobile
    if (ctaButton) {
      ctaButton.classList.remove("dark");
      ctaButton.classList.add("light");
    }
  }

  function closeNav() {
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    // Restore light → dark quand fermé
    if (ctaButton) {
      ctaButton.classList.remove("light");
      ctaButton.classList.add("dark");
    }
  }

  // Toggle ouverture
  toggle.addEventListener("click", openNav);

  // Fermeture via bouton close
  closeBtn?.addEventListener("click", closeNav);

  // Fermeture via clic sur lien
  links?.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Fermeture via clic en dehors
  document.addEventListener("click", (e) => {
    if (
      panel.classList.contains("is-open") &&
      !panel.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  // Fermeture via Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) {
      closeNav();
    }
  });
}

export function initHeader(el) {
  initHeaderScrollLine(el);
  initMobileNav(el);
  return "header ok";
}

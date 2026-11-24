// Grows each [data-grow] section as it scrolls toward the middle of the screen.
// Sets a --grow custom property (0 to 1) that kehra.css uses for scale, opacity and glow.
(() => {
  const sections = Array.from(document.querySelectorAll("[data-grow]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!sections.length) {
    return;
  }

  let ticking = false;

  const update = () => {
    ticking = false;
    const viewport = window.innerHeight;

    sections.forEach((section) => {
      if (reduceMotion.matches) {
        section.style.setProperty("--grow", "1");
        return;
      }

      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      // 0 when the section's centre is at the bottom edge, 1 once it reaches 55% up the screen.
      const progress = (viewport - center) / (viewport * 0.45);
      const grow = Math.min(1, Math.max(0, progress));
      section.style.setProperty("--grow", grow.toFixed(3));
    });
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reduceMotion.addEventListener("change", requestUpdate);
})();

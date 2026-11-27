// Grows each [data-grow] section as it scrolls toward the middle of the screen,
// then shrinks it again as it scrolls away.
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
      // Distance of the section's centre from the middle of the screen:
      // 0 at the middle, 1 at the top or bottom edge.
      const distance = Math.abs(center - viewport / 2) / (viewport / 2);
      // Full size while within 20% of the middle, shrinking to 0 by the edge.
      const grow = Math.min(1, Math.max(0, (1 - distance) / 0.8));
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

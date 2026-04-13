// ============================================================
// scroll.js — Scroll progress bar + IntersectionObserver animations
// ============================================================

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.transform = `scaleX(${progress / 100})`;
  }, { passive: true });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Re-trigger on scroll out then back in
      } else {
        entry.target.classList.remove('animate-in');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ============================================================
// Main.js — Khởi động tất cả modules
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cursor
  initCursor();

  // 2. Scroll Progress Bar
  initScrollProgress();

  // 3. Intro Screen
  runIntroScreen(() => {
    // Sau khi intro xong, hiện toàn bộ trang
    document.getElementById('main-site').style.display = 'block';
    document.getElementById('main-site').style.opacity = '0';
    requestAnimationFrame(() => {
      document.getElementById('main-site').style.transition = 'opacity 0.6s ease';
      document.getElementById('main-site').style.opacity = '1';
    });

    // 4. Navbar
    initNavbar();

    // 5. Hero
    initHero();

    // 6. Build dynamic sections (must run BEFORE scroll animations
    //    so the observer picks up all dynamically created elements)
    buildAbout();
    buildAcademic();
    buildPortfolio();
    buildContact();
    buildFooter();

    // 7. Scroll animations (IntersectionObserver) — after all DOM is built
    initScrollAnimations();

    // 8. ChatBot
    initChatBot();

    // 9. Lenis smooth scroll (nếu có CDN)
    if (window.Lenis) {
      const lenis = new window.Lenis({ lerp: 0.08, smoothWheel: true });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  });
});

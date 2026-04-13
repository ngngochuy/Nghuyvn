// ============================================================
// navbar.js — Navbar scroll, mobile menu, active section
// ============================================================

function initNavbar() {
  const container = document.querySelector('.navbar-container');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link-pill, .navbar-link');
  const backBtn = document.getElementById('mobile-back-btn');
  const ctaEmail = document.querySelectorAll('.navbar-cta, .hub-action-btn-hire-full');
  const aiBtn = document.querySelectorAll('.navbar-ai-icon-btn, .hub-action-btn-ai-full');
  const floatingChatBtn = document.getElementById('floating-chat-btn');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      container?.classList.add('scrolled');
    } else {
      container?.classList.remove('scrolled');
    }
    updateActiveSection();
  }, { passive: true });

  // Mobile hamburger
  mobileToggle?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backBtn?.addEventListener('click', closeMenu);

  function openMenu() {
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
    mobileToggle?.setAttribute('aria-expanded', 'true');
    // Animate icon to X
    const icon = mobileToggle?.querySelector('.menu-icon');
    if (icon) icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
    mobileToggle?.setAttribute('aria-expanded', 'false');
    // Restore hamburger icon
    const icon = mobileToggle?.querySelector('.menu-icon');
    if (icon) icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  }

  // Nav link scroll behaviour
  document.querySelectorAll('[data-scroll-to]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-scroll-to');
      const el = document.querySelector(target);
      if (el) {
        closeMenu();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // AI chat btn
  aiBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      closeMenu();
      openChatBot();
    });
  });

  // Floating chat btn
  floatingChatBtn?.addEventListener('click', () => openChatBot());

  // Active section tracker
  function updateActiveSection() {
    const sections = ['home', 'about', 'academic', 'portfolio', 'contact'];
    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
        current = id;
      }
    });

    document.querySelectorAll('.navbar-link, .mobile-menu-link-pill').forEach(link => {
      const href = link.getAttribute('data-scroll-to') || link.getAttribute('href') || '';
      const id = href.replace('#', '');
      if (id === current) {
        link.classList.add('active');
        link.querySelector('.navbar-link-text')?.classList.add('active');
      } else {
        link.classList.remove('active');
        link.querySelector('.navbar-link-text')?.classList.remove('active');
      }
    });
  }

  updateActiveSection();
}

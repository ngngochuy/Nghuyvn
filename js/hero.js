// ============================================================
// hero.js — Hero typewriter effect
// ============================================================

function initHero() {
  initHeroTypewriter();
  initScrollIndicatorBlink();
}

function initHeroTypewriter() {
  const el = document.getElementById('hero-typewriter-text');
  if (!el) return;

  const words = ['Kỹ Sư Phần Mềm', 'UI/UX Tối Giản', 'Full-Stack Developer', 'Độc Lập'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (!deleting && charIndex < word.length) {
      el.textContent = word.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(tick, 60);
    } else if (!deleting && charIndex === word.length) {
      setTimeout(() => { deleting = true; tick(); }, 2500);
    } else if (deleting && charIndex > 0) {
      el.textContent = word.slice(0, charIndex - 1);
      charIndex--;
      setTimeout(tick, 35);
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 300);
    }
  }
  tick();

  // Blinking cursor
  const cursor = document.querySelector('.typewriter-cursor');
  if (cursor) {
    setInterval(() => cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0', 400);
  }
}

function initScrollIndicatorBlink() {
  // Small scroll arrow animation already CSS-driven
}

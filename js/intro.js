// ============================================================
// intro.js — Intro splash screen animation
// ============================================================

function runIntroScreen(onComplete) {
  const intro = document.getElementById('intro-screen');
  if (!intro) { onComplete(); return; }

  let phase = 'enter';

  // Phase transitions
  const t1 = setTimeout(() => setPhase('reveal'), 800);
  const t2 = setTimeout(() => setPhase('typing'), 2800);
  const t3 = setTimeout(() => setPhase('exit'), 5200);
  const t4 = setTimeout(() => {
    intro.style.display = 'none';
    onComplete();
  }, 6000);

  function setPhase(p) {
    phase = p;
    intro.setAttribute('data-phase', p);

    if (p === 'reveal') {
      // Animate words in
      const words = intro.querySelectorAll('.intro-word');
      words.forEach((w, i) => {
        setTimeout(() => {
          w.style.opacity = '1';
          w.style.transform = 'translateY(0) scale(1)';
          w.style.filter = 'blur(0px)';
        }, i * 250);
      });
      // Show loader track
      const track = intro.querySelector('.intro-loader-track');
      if (track) {
        track.style.opacity = '1';
        track.style.width = '240px';
      }
      // Loader bar to 30%
      const bar = intro.querySelector('.intro-loader-bar');
      if (bar) {
        bar.style.transition = 'width 2.5s cubic-bezier(0.65, 0, 0.35, 1)';
        bar.style.width = '30%';
      }
    }

    if (p === 'typing') {
      // Show subtext and start typewriter
      const sub = intro.querySelector('.intro-subtext-container');
      if (sub) {
        sub.style.opacity = '1';
      }
      startIntroTypewriter('https://nghuy.vn/', intro.querySelector('.intro-typewriter-text'));
      // Loader bar to 100%
      const bar = intro.querySelector('.intro-loader-bar');
      if (bar) {
        bar.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
        bar.style.width = '100%';
      }
    }

    if (p === 'exit') {
      intro.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease';
      intro.style.opacity = '0';
      intro.style.transform = 'scale(1.05)';
      intro.style.filter = 'blur(20px)';
    }
  }

  // Animate icons in
  const icons = intro.querySelectorAll('.intro-icon-item');
  icons.forEach((icon, i) => {
    setTimeout(() => {
      icon.style.opacity = '1';
      icon.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    }, i * 150 + 100);
  });
}

function startIntroTypewriter(text, el) {
  if (!el) return;
  let i = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 75);
}

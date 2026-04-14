// ============================================================
// sections.js — Build About, Academic, Portfolio, Contact, Footer
// ============================================================

// ── About ────────────────────────────────────────────────────
function buildAbout() {
  // Stats are already in HTML, just inject data
  const statsGrid = document.getElementById('stats-grid');
  if (!statsGrid) return;

  const iconSVG = {
    code: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    award: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    globe: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  };

  const arrowSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

  statsGrid.innerHTML = stats.map(stat => `
    <div class="concept-stat-card glass-card" data-animate="fade-up">
      <div class="stat-icon-box">${iconSVG[stat.icon] || iconSVG.code}</div>
      <div class="stat-number-big">${stat.value}</div>
      <div class="stat-label-group">
        <span class="stat-main-label">${stat.label}</span>
        <span class="stat-sub-label">${stat.description}</span>
      </div>
      <div class="stat-card-arrow">${arrowSVG}</div>
    </div>
  `).join('');

  // Name injection
  const nameEl = document.getElementById('about-name');
  if (nameEl) nameEl.textContent = personal.name;
  const bio2El = document.getElementById('about-bio2');
  if (bio2El) bio2El.textContent = personal.bio2;
}

// ── Academic / Timeline ───────────────────────────────────────
function buildAcademic() {
  const container = document.getElementById('timeline-items');
  if (!container) return;

  const iconSVG = {
    code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    database: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    layers: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    activity: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  };

  container.innerHTML = academic.timeline.map((item, index) => {
    const isRight = index % 2 !== 0;
    return `
      <div class="timeline-item ${isRight ? 'right' : 'left'}" data-animate="fade-up">
        <div class="timeline-dot-wrapper">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content-card shadow-premium">
          <div class="timeline-header">
            <div class="timeline-icon-box">${iconSVG[item.icon] || iconSVG.code}</div>
            <span class="timeline-year-badge">${item.year}</span>
          </div>
          <h3 class="timeline-title">${item.title}</h3>
          <span class="timeline-focus">${item.focus}</span>
          <div class="timeline-body">
            ${item.concepts ? `<div class="timeline-info-group">
              <span class="info-label">Trọng Tâm</span>
              <p class="info-value">${item.concepts.join(', ')}</p>
            </div>` : ''}
            ${item.stack ? `<div class="timeline-info-group">
              <span class="info-label">Công Nghệ</span>
              <div class="stack-tags">${item.stack.map(t => `<span class="stack-tag">${t}</span>`).join('')}</div>
            </div>` : ''}
            ${item.project ? `<div class="timeline-info-group">
              <span class="info-label">Dự Án Chính</span>
              <p class="info-value">${item.project}</p>
            </div>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── Portfolio ─────────────────────────────────────────────────
let activeModalProject = null;

function buildPortfolio() {
  initPortfolioTabs();
  initProjectModal();
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const extLinkSVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const arrSVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  grid.innerHTML = projects.map(p => `
    <div class="glass-card glass-card-hover project-card ${p.span === 2 ? 'project-span-2' : ''}" data-animate="fade-up" data-project-id="${p.id}">
      <div class="project-card-header" style="background: linear-gradient(135deg, ${p.color}22 0%, ${p.color}08 100%)">
        <div class="project-card-bg" style="background-image: radial-gradient(circle at 25% 40%, ${p.color}30 0%, transparent 55%), radial-gradient(circle at 75% 70%, ${p.color}15 0%, transparent 45%)"></div>
        <img src="${p.image}" alt="${p.title}" class="project-card-preview-img" loading="lazy" />
        <div class="project-status-badges">
          <span class="project-status-badge ${p.status === 'Hoạt động' ? 'status-deployed' : 'status-developing'}">
            ${p.status === 'Hoạt động' ? '● Hoạt Động' : `○ ${p.status}`}
          </span>
        </div>
        <div class="project-card-tags">
          ${p.tags.slice(0, 2).map(t => `<span class="project-card-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description}</p>
        <div class="project-card-actions">
          ${p.status === 'Hoạt động' ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-card-link-primary">${extLinkSVG} Truy cập</a>` : '<span></span>'}
          <button class="project-card-link-secondary" onclick="openProjectModal(${p.id})">Chi tiết ${arrSVG}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCerts() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;
  const awardSVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;

  grid.innerHTML = certificates.map((cert, i) => `
    <div class="glass-card glass-card-hover cert-card" data-animate="fade-up">
      <div class="cert-card-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="cert-card-content">
        <p class="cert-card-title">${cert.title}</p>
        <p class="cert-card-meta">${cert.issuer} · ${cert.year}</p>
      </div>
      <div class="cert-card-icon">${awardSVG}</div>
    </div>
  `).join('');
}

function renderTechStack() {
  const container = document.getElementById('tech-stack-container');
  if (!container) return;
  const codeSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;

  container.innerHTML = techStack.map(group => `
    <div class="tech-category-section-elite" data-animate="fade-up">
      <div class="tech-category-header-centered">
        <div class="tech-category-separator"></div>
        <h3 class="tech-category-title-elite">${group.category}</h3>
        <div class="tech-category-separator"></div>
      </div>
      <div class="portfolio-tech-grid-elite">
        ${group.techs.map(tech => `
          <div class="glass-card glass-card-hover tech-card">
            <div class="tech-card-icon-wrapper">
              <div class="tech-card-glow"></div>
              <img src="${tech.icon}" alt="${tech.name}" class="tech-card-icon" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
              <div style="display:none">${codeSVG}</div>
            </div>
            <span class="tech-card-name">${tech.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function initPortfolioTabs() {
  const tabs = document.querySelectorAll('.portfolio-tab-btn-elite');
  const panels = {
    projects: document.getElementById('tab-projects'),
    certificates: document.getElementById('tab-certificates'),
    techstack: document.getElementById('tab-techstack'),
  };

  function showTab(id) {
    tabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === id);
      const hl = t.querySelector('.portfolio-tab-highlight');
      if (hl) hl.style.display = t.getAttribute('data-tab') === id ? 'block' : 'none';
    });
    Object.keys(panels).forEach(k => {
      if (!panels[k]) return;
      if (k === id) {
        panels[k].style.display = 'block';
        panels[k].style.opacity = '0';
        panels[k].style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          panels[k].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          panels[k].style.opacity = '1';
          panels[k].style.transform = 'translateY(0)';
        });
      } else {
        panels[k].style.display = 'none';
      }
    });
    // Re-trigger scroll animations for newly shown items
    setTimeout(() => initScrollAnimations(), 100);
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => showTab(t.getAttribute('data-tab')));
  });
  showTab('projects');
}

// ── Project Modal ─────────────────────────────────────────────
function initProjectModal() {
  const overlay = document.getElementById('project-modal');
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeProjectModal();
  });
  document.getElementById('modal-close-btn')?.addEventListener('click', closeProjectModal);
}

function openProjectModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  const extLinkSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  document.getElementById('modal-project-num').textContent = String(project.id).padStart(3, '0');
  document.getElementById('modal-project-status-text').textContent = project.status;
  document.getElementById('modal-status-dot').className = `project-status-dot dot-${project.status === 'Hoạt động' ? 'deployed' : 'inprogress'}`;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-img').src = project.image;
  document.getElementById('modal-img').alt = project.title;
  document.getElementById('modal-tags').innerHTML = project.tags.map(t => `<span class="floating-tag">${t}</span>`).join('');
  document.getElementById('modal-desc').textContent = project.description;
  document.getElementById('modal-ext-desc').textContent = project.extendedDescription;
  document.getElementById('modal-spec-focus').textContent = project.tags[0];
  document.getElementById('modal-spec-status').textContent = project.status === 'Hoạt động' ? 'Success & Live' : 'Active Prototype';

  const liveBtn = document.getElementById('modal-live-btn');
  if (project.status === 'Hoạt động') {
    liveBtn.style.display = 'flex';
    liveBtn.href = project.liveUrl;
  } else {
    liveBtn.style.display = 'none';
  }

  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    const container = overlay.querySelector('.project-modal-container');
    if (container) {
      container.style.opacity = '1';
      container.style.transform = 'none';
    }
  });
}

function closeProjectModal() {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

// ── Contact ────────────────────────────────────────────────────
function buildContact() {
  const emailLinks = document.querySelectorAll('.contact-email-link, .navbar-cta');
  emailLinks.forEach(el => {
    el.href = `mailto:${personal.email}`;
    const span = el.querySelector('span');
    if (span && span.classList.contains('contact-email-text')) span.textContent = personal.email;
  });

  const locationEl = document.getElementById('contact-location');
  if (locationEl) locationEl.textContent = personal.location;

  initContactForm();
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.contact-submit-btn');
    const sendSVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    const spinSVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
    const checkSVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    btn.disabled = true;
    btn.innerHTML = `${spinSVG} Đang Gửi...`;
    btn.style.background = '';

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `New Portfolio Message: ${data.subject || 'Inquiry'}`,
          _captcha: 'false'
        }),
      });
      const result = await res.json();
      if (result.success === 'true' || result.success === true) {
        btn.innerHTML = `${checkSVG} Tin Nhắn Đã Gửi!`;
        btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = `${sendSVG} Gửi Tin Nhắn`;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      } else throw new Error();
    } catch {
      alert('Submission failed. Check your inbox to confirm with FormSubmit first!');
      btn.innerHTML = `${sendSVG} Gửi Tin Nhắn`;
      btn.disabled = false;
    }
  });
}

// ── Footer ─────────────────────────────────────────────────────
function buildFooter() {
  const year = new Date().getFullYear();
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(el => el.textContent = year);

  const nameEls = document.querySelectorAll('.footer-person-name');
  nameEls.forEach(el => el.textContent = personal.name);

  const aliasEls = document.querySelectorAll('.footer-alias');
  aliasEls.forEach(el => el.textContent = personal.alias);

  const locationEls = document.querySelectorAll('.footer-location-text');
  locationEls.forEach(el => el.textContent = personal.location);

  const emailEls = document.querySelectorAll('.footer-email-link');
  emailEls.forEach(el => {
    el.href = `mailto:${personal.email}`;
    const span = el.querySelector('span');
    if (span) span.textContent = personal.email;
  });

  // Social links
  document.querySelectorAll('[data-social]').forEach(el => {
    const key = el.getAttribute('data-social');
    if (personal.links[key]) el.href = personal.links[key];
  });
}

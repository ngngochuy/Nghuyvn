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
  renderProjects();
  renderCerts();
  renderTechStack();
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

  const googleSVG = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`;
  const geminiSVG = `<svg width="32" height="32" viewBox="0 0 28 28" fill="none"><path d="M14 28C14 21.37 8.63 16 2 16V12C8.63 12 14 6.63 14 0C14 6.63 19.37 12 26 12V16C19.37 16 14 21.37 14 28Z" fill="url(#gemini-grad)"/><defs><linearGradient id="gemini-grad" x1="2" y1="0" x2="26" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#4285F4"/><stop offset="0.33" stop-color="#9B72CB"/><stop offset="0.66" stop-color="#D96570"/><stop offset="1" stop-color="#D96570"/></linearGradient></defs></svg>`;
  const extSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const checkSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

  grid.innerHTML = certificates.map(cert => `
    <div class="cert-featured-card glass-card" style="grid-column: 1 / -1;">
      <div class="cert-featured-inner">
        <div class="cert-featured-img-section">
          <a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="cert-featured-img-link">
            <img src="Images/gemini-cert.png" alt="${cert.title}" class="cert-featured-img" />
          </a>
        </div>
        <div class="cert-featured-body">
          <div class="cert-featured-top-row">
            <div class="cert-featured-icon">${geminiSVG}</div>
            <div class="cert-featured-verified">${checkSVG} <span>Verified</span></div>
          </div>
          <h3 class="cert-featured-title">${cert.title}</h3>
          <div class="cert-featured-level">${cert.level}</div>
          <p class="cert-featured-recipient">Awarded to <strong>${cert.recipient}</strong></p>
          <p class="cert-featured-desc">for having demonstrated the knowledge, skills and basic competencies needed to use Google AI in education.</p>
          <div class="cert-featured-meta-row">
            <div class="cert-featured-meta-item">
              <span class="cert-featured-meta-label">Issued</span>
              <span class="cert-featured-meta-value">${cert.issued}</span>
            </div>
            <div class="cert-featured-meta-item">
              <span class="cert-featured-meta-label">Valid Until</span>
              <span class="cert-featured-meta-value">${cert.validUntil}</span>
            </div>
            <div class="cert-featured-meta-item">
              <span class="cert-featured-meta-label">Issuer</span>
              <span class="cert-featured-meta-value">${cert.issuer}</span>
            </div>
          </div>
          <div class="cert-featured-footer">
            <div class="cert-featured-google">${googleSVG} <span>Google for Education</span></div>
            <a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="cert-featured-verify-btn">${extSVG} Xác Minh Chứng Chỉ</a>
          </div>
        </div>
      </div>
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
  // Tabs removed — all sections are always visible now
  // Just trigger scroll animations for the content
  setTimeout(() => initScrollAnimations(), 100);
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

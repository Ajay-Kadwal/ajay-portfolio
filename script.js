/* ============================================
   AJAY · iOS DEVELOPER PORTFOLIO
   script.js — All interactivity & data
   ============================================ */

'use strict';

/* ============================================
   1. DATA — Edit these to update content
   ============================================ */

// --- Projects ---
const projects = [
  {
    title: "Finance Tracker",
    category: "SwiftUI",
    emoji: "💰",
    description: "Personal finance tracking app with beautiful charts, spending categories, and monthly analytics built with SwiftUI and Firebase.",
    tech: ["SwiftUI", "Firebase", "Charts"],
    github: "https://github.com/Ajay-Kadwal",
    demo: "#"
  },
  {
    title: "Fitness Pro",
    category: "SwiftUI",
    emoji: "🏋️",
    description: "Comprehensive workout planner with custom routines, progress photos, and HealthKit integration.",
    tech: ["SwiftUI", "HealthKit", "CoreData"],
    github: "https://github.com/Ajay-Kadwal",
    demo: "#"
  },
  {
    title: "Social Notes",
    category: "UIKit",
    emoji: "📝",
    description: "Collaborative note-taking app with rich text editor, real-time sync, and team workspaces.",
    tech: ["UIKit", "Firebase", "WebSockets"],
    github: "https://github.com/Ajay-Kadwal",
    demo: "#"
  },
  {
    title: "Weather Atlas",
    category: "UIKit",
    emoji: "🌤",
    description: "Beautiful weather app with animated backgrounds, hourly forecasts, and widgets using OpenWeatherMap API.",
    tech: ["UIKit", "REST API", "WidgetKit"],
    github: "#",
    demo: "#"
  },
  {
    title: "TaskFlow",
    category: "Full Stack",
    emoji: "✅",
    description: "Full-stack productivity app with iOS frontend, Node.js backend, and real-time push notifications.",
    tech: ["SwiftUI", "Node.js", "MongoDB"],
    github: "https://github.com/Ajay-Kadwal",
    demo: "#"
  },
  {
    title: "Shop Quick",
    category: "Full Stack",
    emoji: "🛍",
    description: "E-commerce iOS app with Stripe payments, order tracking, and an admin dashboard.",
    tech: ["UIKit", "Stripe", "Express.js"],
    github: "https://github.com/Ajay-Kadwal",
    demo: "#"
  }
];

// --- Skills (bars) ---
const skills = [
  { name: "Swift",       pct: 92, color: "linear-gradient(90deg, #ff5f57, #ff8a7f)" },
  { name: "SwiftUI",     pct: 88, color: "linear-gradient(90deg, #3b82f6, #60a5fa)" },
  { name: "UIKit",       pct: 85, color: "linear-gradient(90deg, #818cf8, #a78bfa)" },
  { name: "Firebase",    pct: 80, color: "linear-gradient(90deg, #fbbf24, #fcd34d)" },
  { name: "REST APIs",   pct: 82, color: "linear-gradient(90deg, #22c55e, #4ade80)" },
  { name: "CoreData",    pct: 75, color: "linear-gradient(90deg, #38bdf8, #7dd3fc)" },
  { name: "Git/GitHub",  pct: 88, color: "linear-gradient(90deg, #ef4444, #f87171)" },
  { name: "Combine",     pct: 72, color: "linear-gradient(90deg, #a78bfa, #c4b5fd)" }
];

// --- Tools ---
const tools = [
  "Xcode", "Instruments", "TestFlight", "App Store Connect",
  "Figma", "Postman", "GitHub Actions", "CocoaPods", "SPM", "Jira"
];

// --- Timeline ---
const timeline = [
  {
    date: "2020 · Beginner",
    title: "Started my iOS Journey",
    desc: "Picked up Swift and discovered the magic of Xcode. Built my first 'Hello World' app and was immediately hooked.",
    badge: "Swift Basics"
  },
  {
    date: "2021 · Intermediate",
    title: "Mastered UIKit",
    desc: "Deep-dived into UIKit — view controllers, auto-layout, table views, and custom animations. Shipped first personal project.",
    badge: "First App Shipped"
  },
  {
    date: "2022 · Advancing",
    title: "Embraced SwiftUI & Firebase",
    desc: "Switched to SwiftUI for new projects and integrated Firebase for auth, Firestore, and cloud functions.",
    badge: "Full Stack iOS"
  },
  {
    date: "2023 · Proficient",
    title: "Architecture & Patterns",
    desc: "Levelled up with MVVM, Clean Architecture, Combine, and async/await. Started contributing to open-source Swift packages.",
    badge: "Open Source"
  },
  {
    date: "2024 · Senior",
    title: "Shipping Real Products",
    desc: "Launched multiple apps to the App Store, onboarded thousands of users, and mentored junior iOS devs.",
    badge: "15k+ Downloads"
  },
  {
    date: "2025 · Now",
    title: "Exploring AI & New Frontiers",
    desc: "Integrating on-device ML with Core ML, building Vision API features, and exploring visionOS for spatial computing.",
    badge: "Core ML · visionOS"
  }
];

// --- Typing phrases ---
const typingPhrases = [
  "iOS Apps.",
  "SwiftUI Interfaces.",
  "Smooth Animations.",
  "App Store Products."
];

/* ============================================
   2. LOADER
   ============================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }
    startTyping();
    initCounters();
  }, 1600);
});
// Prevent scroll during load
document.body.style.overflow = 'hidden';

/* ============================================
   3. SCROLL PROGRESS
   ============================================ */
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct   = (window.scrollY / total) * 100;
  if (scrollBar) scrollBar.style.width = pct + '%';
}, { passive: true });

/* ============================================
   4. NAVBAR
   ============================================ */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

// Scrolled style
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Active nav link on scroll
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observerNav.observe(s));

// Mobile menu toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================
   5. SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ============================================
   6. TYPING ANIMATION
   ============================================ */
function startTyping() {
  const el = document.getElementById('typing-target');
  if (!el) return;

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pausing   = false;

  function type() {
    const phrase = typingPhrases[phraseIdx];

    if (pausing) {
      pausing = false;
      setTimeout(type, 1200);
      return;
    }

    if (!deleting) {
      el.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        pausing  = true;
        setTimeout(type, 80);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % typingPhrases.length;
      }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
}

/* ============================================
   7. COUNTER ANIMATION
   ============================================ */
function initCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current  = 0;
    const step   = Math.ceil(target / 40);
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

/* ============================================
   8. SCROLL REVEAL
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add stagger delay for siblings in a grid
      const parent = entry.target.closest('.projects-grid, .skills-grid, .skills-bars-grid');
      if (parent) {
        const siblings = [...parent.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 60) + 'ms';
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ============================================
   9. PROJECTS
   ============================================ */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  filtered.forEach((project, i) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.setAttribute('role', 'listitem');
    card.style.transitionDelay = (i * 80) + 'ms';
    card.innerHTML = `
      <div class="project-img-wrap">
        <div class="project-placeholder">${project.emoji}</div>
        <span class="project-category-badge">${project.category}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.github}" class="project-btn" aria-label="View ${project.title} on GitHub" rel="noopener noreferrer" target="_blank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="${project.demo}" class="project-btn primary-btn" aria-label="View ${project.title} live demo" rel="noopener noreferrer" target="_blank">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            App Store
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Re-observe newly added cards
  grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    renderProjects(btn.dataset.filter);
  });
});

/* ============================================
   10. SKILLS BARS
   ============================================ */
function renderSkillBars() {
  const grid = document.querySelector('.skills-bars-grid');
  if (!grid) return;

  skills.forEach((skill, i) => {
    const item = document.createElement('div');
    item.className = 'skill-bar-item';
    item.innerHTML = `
      <div class="skill-bar-header">
        <span class="skill-bar-name">${skill.name}</span>
        <span class="skill-bar-pct">${skill.pct}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="background: ${skill.color}" data-pct="${skill.pct}"></div>
      </div>
    `;
    grid.appendChild(item);
  });

  // Animate bars on scroll
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        item.classList.add('visible');
        const fill = item.querySelector('.skill-bar-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.pct + '%';
          }, 150);
        }
        barObserver.unobserve(item);
      }
    });
  }, { threshold: 0.3 });

  grid.querySelectorAll('.skill-bar-item').forEach(item => barObserver.observe(item));
}

/* ============================================
   11. TOOLS
   ============================================ */
function renderTools() {
  const container = document.getElementById('tools-chips');
  if (!container) return;
  tools.forEach(tool => {
    const chip = document.createElement('span');
    chip.className = 'tool-chip';
    chip.textContent = tool;
    container.appendChild(chip);
  });
}

/* ============================================
   12. TIMELINE
   ============================================ */
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  timeline.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.setAttribute('role', 'listitem');
    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-date">${item.date}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-desc">${item.desc}</p>
        <span class="timeline-badge">${item.badge}</span>
      </div>
    `;
    container.appendChild(el);
  });

  // Observe timeline items
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  container.querySelectorAll('.timeline-item').forEach(el => tlObserver.observe(el));
}

/* ============================================
   13. CONTACT FORM
   ============================================ */
const sendBtn    = document.getElementById('send-btn');
const formStatus = document.getElementById('form-status');

if (sendBtn) {
  sendBtn.addEventListener('click', async () => {
    const name    = document.getElementById('contact-name')?.value.trim();
    const email   = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';

    try {
      const res = await fetch('https://formspree.io/f/mzdwkokn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (res.ok) {
        showStatus('✓ Message sent! I\'ll get back to you soon.', 'success');
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-subject').value = '';
        document.getElementById('contact-message').value = '';
      } else {
        showStatus('Something went wrong. Try again.', 'error');
      }
    } catch (err) {
      showStatus('Network error. Please try again.', 'error');
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
        Send Message
      `;
    }
  });
}

function showStatus(msg, type) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.className   = type;
  setTimeout(() => { formStatus.textContent = ''; formStatus.className = ''; }, 5000);
}

/* ============================================
   14. BACK TO TOP
   ============================================ */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (!backToTop) return;
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   15. THEME TOGGLE
   ============================================ */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

const moonSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
const sunSVG  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function applyTheme(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  if (themeIcon) themeIcon.outerHTML; // just update button icon below
  if (themeToggle) themeToggle.innerHTML = mode === 'light' ? moonSVG : sunSVG;
  localStorage.setItem('theme', mode);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ============================================
   16. FOOTER YEAR
   ============================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================
   17. INIT
   ============================================ */
function init() {
  renderProjects();
  renderSkillBars();
  renderTools();
  renderTimeline();
  observeReveal();
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
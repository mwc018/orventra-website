// ── Hamburger menu ──
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked, and handle custom scroll offsets
const scrollOffsets = { services: 5, about: -70 };

function scrollToId(id) {
  const target = document.getElementById(id);
  if (target) {
    const y = target.getBoundingClientRect().top + window.scrollY + (scrollOffsets[id] || 0);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    if (scrollOffsets[id] !== undefined) {
      e.preventDefault();
      scrollToId(id);
    }
  });
});

navLinks?.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.classList.remove('open');
    const id = link.getAttribute('href').slice(1);
    if (scrollOffsets[id]) {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY + scrollOffsets[id];
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// ── Nav shrink on scroll ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 20
    ? 'rgba(9, 9, 11, 0.95)'
    : 'rgba(9, 9, 11, 0.8)';
}, { passive: true });

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
  '.card, .step, .testimonial, .section-header, .about-text, .about-visual, .hero-stats'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent grid
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const btn    = e.target.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  // Simulate async send (replace with real fetch/API call)
  setTimeout(() => {
    btn.textContent = 'Message sent!';
    status.textContent = "Thanks! We'll be in touch within 24 hours.";
    status.style.color = '#4ade80';
    e.target.reset();

    setTimeout(() => {
      btn.disabled    = false;
      btn.textContent = 'Send message';
      status.textContent = '';
    }, 5000);
  }, 1200);
}

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--text-primary)'
      : '';
  });
}, { passive: true });

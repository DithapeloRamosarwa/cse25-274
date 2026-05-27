/* =========================================================
   DEBSWANA DIAMOND COMPANY - INTERACTIVE JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ---------- Theme toggle (light / dark) ---------- */
  const themeBtn = document.querySelector('.theme-toggle');
  const saved = localStorage.getItem('debswana-theme');
  if (saved === 'light') document.body.classList.add('light');
  if (themeBtn) {
    const updateLabel = () => {
      themeBtn.textContent = document.body.classList.contains('light') ? 'Dark' : 'Light';
    };
    updateLabel();
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      localStorage.setItem('debswana-theme', document.body.classList.contains('light') ? 'light' : 'dark');
      updateLabel();
    });
  }

  /* ---------- Active nav link based on URL ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterIO.observe(c));

  /* ---------- Diamond price ticker (fake live data) ---------- */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    const items = [
      { grade: '1ct D-Flawless', price: 18450 },
      { grade: '2ct E-VVS1',     price: 41200 },
      { grade: '0.5ct F-VS2',    price: 6300  },
      { grade: '3ct G-SI1',      price: 52100 },
      { grade: '1.5ct D-IF',     price: 36900 },
      { grade: 'Industrial Carat',price: 220   },
      { grade: 'Rough/ct avg',   price: 145   },
      { grade: '5ct H-VS1',      price: 98700 },
    ];
    const buildItem = (it) => {
      const change = (Math.random() * 6 - 3).toFixed(2);
      const cls = +change >= 0 ? 'up' : 'down';
      const arrow = +change >= 0 ? '▲' : '▼';
      return `<div class="ticker-item"><strong>${it.grade}</strong> $${it.price.toLocaleString()} <span class="${cls}">${arrow} ${Math.abs(change)}%</span></div>`;
    };
    const html = items.map(buildItem).join('');
    tickerTrack.innerHTML = html + html; // duplicate for seamless loop

    // Periodically refresh prices
    setInterval(() => {
      items.forEach(it => { it.price = Math.max(50, Math.round(it.price * (1 + (Math.random() * 0.04 - 0.02)))); });
      const fresh = items.map(buildItem).join('');
      tickerTrack.innerHTML = fresh + fresh;
    }, 6000);
  }

  /* ---------- Journey step click → expand detail ---------- */
  document.querySelectorAll('.journey-step').forEach((step) => {
    step.addEventListener('click', () => {
      const wasOpen = step.classList.contains('is-open');
      document.querySelectorAll('.journey-step').forEach(s => s.classList.remove('is-open'));
      if (!wasOpen) step.classList.add('is-open');
    });
  });

  /* ---------- Contact form ---------- */
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = '✓ Thank you! Your message has been received. We will get back to you within 2 business days.';
        note.style.color = 'var(--green)';
        note.style.marginTop = '1rem';
      }
      form.reset();
    });
  }

  /* ---------- Newsletter form ---------- */
  const news = document.querySelector('#newsletterForm');
  if (news) {
    news.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = news.querySelector('input');
      const msg = news.querySelector('.form-note');
      if (msg) {
        msg.textContent = `✓ Subscribed! ${inp.value} added to our updates.`;
        msg.style.color = 'var(--gold)';
      }
      news.reset();
    });
  }

  /* ---------- Navbar shadow on scroll ---------- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 30) navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    else navbar.style.boxShadow = 'none';
  });
});

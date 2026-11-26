// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Nav border once the page scrolls
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Yearly / monthly pricing toggle
document.querySelectorAll('[data-billing]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.billing === 'yearly' ? 'Yearly' : 'Monthly';
    document.querySelectorAll('[data-billing]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelectorAll('[data-price-yearly]').forEach((el) => {
      el.querySelector('.amount').textContent = el.dataset[`price${key}`];
      const small = el.querySelector('small');
      small.textContent = small.dataset[`period${key}`];
    });
    document.querySelectorAll('[data-per-yearly]').forEach((el) => { el.textContent = el.dataset[`per${key}`]; });
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal sections as they scroll into view
const revealables = document.querySelectorAll('.reveal, .has-notif');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('in'));
}

// Count the protected amount up once
const money = document.querySelector('[data-count]');
if (money && !reduceMotion) {
  const target = parseFloat(money.dataset.count);
  const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const start = performance.now() + 500;
  const step = (now) => {
    const p = Math.min(1, Math.max(0, (now - start) / 1600));
    money.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  money.textContent = fmt(0);
  requestAnimationFrame(step);
}

// The film: play with sound on demand
const film = document.getElementById('film-video');
if (film) {
  const frame = film.closest('.film-frame');
  const play = () => {
    film.muted = false;
    film.controls = true;
    frame.classList.add('playing');
    film.play().catch(() => { film.muted = true; film.play(); });
  };
  frame.querySelector('.film-play').addEventListener('click', play);
  film.addEventListener('ended', () => { frame.classList.remove('playing'); film.controls = false; film.currentTime = 0; });
  document.querySelectorAll('.film-chapters [data-t]').forEach((li) => {
    const seek = () => { film.currentTime = parseFloat(li.dataset.t); play(); };
    li.addEventListener('click', seek);
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); seek(); } });
  });
  document.querySelectorAll('[data-play-film]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('film').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(play, reduceMotion ? 0 : 650);
  }));
}

// Share with a friend
document.querySelectorAll('[data-share]').forEach((button) => {
  button.addEventListener('click', async () => {
    const data = { title: 'ReturnGuard', text: 'This app tracks every return and warranty for you. You need this.', url: 'https://returnguards.com/' };
    if (navigator.share) {
      try { await navigator.share(data); } catch (_) { /* dismissed */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${data.text} ${data.url}`);
      const label = button.lastChild;
      const old = label.textContent;
      label.textContent = ' Link copied. Send it!';
      setTimeout(() => { label.textContent = old; }, 2200);
    } catch (_) {
      window.location.href = `mailto:?subject=${encodeURIComponent('You need this app')}&body=${encodeURIComponent(`${data.text} ${data.url}`)}`;
    }
  });
});

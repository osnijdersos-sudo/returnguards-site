// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));
}

// Yearly / monthly pricing toggle
document.querySelectorAll('[data-billing]').forEach((button) => {
  button.addEventListener('click', () => {
    const period = button.dataset.billing;
    document.querySelectorAll('[data-billing]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelectorAll('[data-price-yearly]').forEach((el) => {
      el.querySelector('.amount').textContent = el.dataset[`price${period === 'yearly' ? 'Yearly' : 'Monthly'}`];
      const small = el.querySelector('small');
      small.textContent = small.dataset[`period${period === 'yearly' ? 'Yearly' : 'Monthly'}`];
    });
    document.querySelectorAll('[data-per-yearly]').forEach((el) => {
      el.textContent = el.dataset[`per${period === 'yearly' ? 'Yearly' : 'Monthly'}`];
    });
  });
});

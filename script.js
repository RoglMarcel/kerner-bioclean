/* Kerner bioClean – progressive enhancement; the content works without JavaScript. */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  const mobile = window.matchMedia('(max-width: 768px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setMenu = (open, restoreFocus = false) => {
    if (!toggle || !links) return;
    toggle.classList.toggle('active', open);
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    links.inert = mobile.matches && !open;
    document.body.classList.toggle('menu-open', open);
    if (restoreFocus) toggle.focus();
  };

  if (toggle && links) {
    setMenu(false);
    toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    mobile.addEventListener('change', () => setMenu(false));
    document.addEventListener('keydown', event => {
      if (!links.classList.contains('open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenu(false, true);
      } else if (event.key === 'Tab') {
        const items = [toggle, ...links.querySelectorAll('a[href]')];
        const current = items.indexOf(document.activeElement);
        const next = (current + (event.shiftKey ? -1 : 1) + items.length) % items.length;
        event.preventDefault();
        items[next].focus();
      }
    });
  }

  // Read geometry before changing classes; batch scroll work into one frame.
  const sections = [...document.querySelectorAll('section[id]')];
  const anchors = [...document.querySelectorAll('.nav-links a')];
  let pending = false;
  const updateNavigation = () => {
    pending = false;
    if (!navbar) return;
    const scrolled = window.scrollY > 60;
    const position = window.scrollY + navbar.offsetHeight + 100;
    const active = sections.find(section => position >= section.offsetTop && position < section.offsetTop + section.offsetHeight);
    navbar.classList.toggle('scrolled', scrolled);
    anchors.forEach(anchor => {
      const selected = Boolean(active && anchor.getAttribute('href') === `#${active.id}`);
      anchor.classList.toggle('is-active', selected);
      if (selected) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; window.requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  updateNavigation();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const hash = anchor.getAttribute('href');
      const target = hash === '#' ? document.body : document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      if (anchor.classList.contains('skip-link')) {
        target.focus({ preventScroll: true });
      }
      const top = hash === '#' ? 0 : target.getBoundingClientRect().top + window.scrollY - (navbar ? navbar.offsetHeight : 0) - 20;
      window.scrollTo({ top, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', hash === '#' ? window.location.pathname : hash);
    });
  });

  // Visibility never depends on this observer, including on script failure.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal:not(.hero-content)').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-animate');
        observer.observe(element);
      }
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const error = document.getElementById('contactError');
    const button = form.querySelector('button[type="submit"]');
    const date = document.getElementById('date');
    const localDate = () => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    };
    const updateDateMinimum = () => { if (date) date.min = localDate(); };
    updateDateMinimum();
    if (date) date.addEventListener('focus', updateDateMinimum);
    const clearError = () => {
      email.removeAttribute('aria-invalid'); phone.removeAttribute('aria-invalid');
      error.textContent = '';
    };
    email.addEventListener('input', clearError);
    phone.addEventListener('input', clearError);
    form.addEventListener('submit', event => {
      updateDateMinimum();
      if (!email.value.trim() && !phone.value.trim()) {
        event.preventDefault();
        email.setAttribute('aria-invalid', 'true'); phone.setAttribute('aria-invalid', 'true');
        error.textContent = 'Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.';
        email.focus();
        return;
      }
      if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); return; }
      button.disabled = true;
      button.textContent = 'Wird gesendet …';
      form.setAttribute('aria-busy', 'true');
    });
    window.addEventListener('pageshow', () => {
      button.disabled = false;
      button.textContent = 'Anfrage absenden';
      form.removeAttribute('aria-busy');
    });
  }
});

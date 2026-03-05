/* ============================================================
   Kerner bioClean – Website JavaScript
   Scroll animations, sticky nav, mobile menu, cookie banner
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ======================== STICKY NAVIGATION ========================
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ======================== MOBILE MENU ========================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ======================== SCROLL REVEAL ANIMATIONS ========================
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // ======================== SMOOTH SCROLL FOR ANCHORS ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ======================== CONTACT FORM ========================
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', () => {
    // Let the native form POST go through to Formsubmit.co
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Wird gesendet …';
    submitBtn.style.opacity = '0.7';
  });

  // ======================== COOKIE BANNER ========================
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  // Check if user already made a choice
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1500);
  }

  const hideCookieBanner = (choice) => {
    localStorage.setItem('cookieConsent', choice);
    cookieBanner.classList.remove('show');
  };

  cookieAccept.addEventListener('click', () => hideCookieBanner('accepted'));
  cookieDecline.addEventListener('click', () => hideCookieBanner('declined'));

  // ======================== ACTIVE NAV LINK ON SCROLL ========================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--primary)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ======================== CUSTOM DATE PICKER ========================
  const dateInput = document.getElementById('date');
  const dropdown = document.getElementById('datepickerDropdown');

  if (dateInput && dropdown) {
    const MONTHS_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const WEEKDAYS_DE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDate = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function renderCalendar() {
      const firstDay = new Date(currentYear, currentMonth, 1);
      // Monday = 0 in our grid (ISO)
      let startDay = firstDay.getDay() - 1;
      if (startDay < 0) startDay = 6;
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      let html = `
        <div class="datepicker-header">
          <button type="button" class="dp-prev" aria-label="Vorheriger Monat">&#8249;</button>
          <span class="dp-month-year">${MONTHS_DE[currentMonth]} ${currentYear}</span>
          <button type="button" class="dp-next" aria-label="Nächster Monat">&#8250;</button>
        </div>
        <div class="datepicker-weekdays">
          ${WEEKDAYS_DE.map(d => `<span>${d}</span>`).join('')}
        </div>
        <div class="datepicker-days">
      `;

      // Empty cells before first day
      for (let i = 0; i < startDay; i++) {
        html += `<button type="button" class="dp-empty" disabled></button>`;
      }

      // Day cells
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        date.setHours(0, 0, 0, 0);
        const isPast = date < today;
        const isToday = date.getTime() === today.getTime();
        const isSelected = selectedDate && date.getTime() === selectedDate.getTime();

        let cls = '';
        if (isToday) cls += ' dp-today';
        if (isSelected) cls += ' dp-selected';

        html += `<button type="button" data-day="${day}" class="${cls}" ${isPast ? 'disabled' : ''}>${day}</button>`;
      }

      html += `</div>`;
      dropdown.innerHTML = html;

      // Event: prev month
      dropdown.querySelector('.dp-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar();
      });

      // Event: next month
      dropdown.querySelector('.dp-next').addEventListener('click', (e) => {
        e.stopPropagation();
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar();
      });

      // Event: select day
      dropdown.querySelectorAll('.datepicker-days button:not(:disabled):not(.dp-empty)').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const day = parseInt(btn.dataset.day);
          selectedDate = new Date(currentYear, currentMonth, day);
          const formatted = `${String(day).padStart(2, '0')}.${String(currentMonth + 1).padStart(2, '0')}.${currentYear}`;
          dateInput.value = formatted;
          dropdown.classList.remove('open');
          renderCalendar();
        });
      });
    }

    // Toggle dropdown
    dateInput.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      if (isOpen) {
        dropdown.classList.remove('open');
      } else {
        renderCalendar();
        dropdown.classList.add('open');
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== dateInput) {
        dropdown.classList.remove('open');
      }
    });
  }

});

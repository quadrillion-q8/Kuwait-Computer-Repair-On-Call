/* ===========================
   SCRIPT.JS
   Kuwait Computer Repair On Call
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------
     1. NAVBAR SCROLL EFFECT
  ---------------------------------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });


  /* ----------------------------------
     2. MOBILE NAV TOGGLE
  ---------------------------------- */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileNav = () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMobileNav = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));


  /* ----------------------------------
     3. HERO PARTICLE ANIMATION
  ---------------------------------- */
  const particlesContainer = document.getElementById('hero-particles');
  const PARTICLE_COUNT = 40;

  const colors = ['#3b82f6', '#06b6d4', '#f59e0b', '#10b981', '#8b5cf6'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle();
  }

  function createParticle() {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 20;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    particlesContainer?.appendChild(p);
  }


  /* ----------------------------------
     4. SCROLL REVEAL (Intersection Observer)
  ---------------------------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ----------------------------------
     5. ANIMATED COUNTER (Hero Stats)
  ---------------------------------- */
  const counters = document.querySelectorAll('[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(update);
  }


  /* ----------------------------------
     6. STAT BARS ANIMATION
  ---------------------------------- */
  const statBars = document.querySelectorAll('.stat-bar[data-width]');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        // slight delay for visual polish
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  statBars.forEach(bar => barObserver.observe(bar));


  /* ----------------------------------
     7. SMOOTH SCROLL FOR ANCHOR LINKS
  ---------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ----------------------------------
     8. BOOKING FORM SUBMISSION
  ---------------------------------- */
  const bookingForm = document.getElementById('booking-form');
  const formContent = document.getElementById('form-content');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit-btn');

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const area = document.getElementById('area').value;
    const service = document.getElementById('service-type').value;

    if (!name || !phone || !area || !service) {
      shakeForm();
      highlightEmptyFields([
        { id: 'full-name', val: name },
        { id: 'phone-number', val: phone },
        { id: 'area', val: area },
        { id: 'service-type', val: service },
      ]);
      return;
    }

    // Simulate submission (loading state)
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    setTimeout(() => {
      formContent.style.display = 'none';
      formSuccess.classList.add('show');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1400);
  });

  function shakeForm() {
    const form = document.querySelector('.booking-form');
    form.style.animation = 'none';
    form.style.transform = 'translateX(-6px)';
    setTimeout(() => { form.style.transform = 'translateX(6px)'; }, 60);
    setTimeout(() => { form.style.transform = 'translateX(-4px)'; }, 120);
    setTimeout(() => { form.style.transform = 'translateX(4px)'; }, 180);
    setTimeout(() => { form.style.transform = 'translateX(0)'; }, 240);
  }

  function highlightEmptyFields(fields) {
    fields.forEach(({ id, val }) => {
      const el = document.getElementById(id);
      if (!val && el) {
        el.style.borderColor = 'var(--red)';
        el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        el.addEventListener('input', () => {
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }, { once: true });
      }
    });
  }


  /* ----------------------------------
     9. ACTIVE NAV LINK ON SCROLL
  ---------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = '';
          link.style.setProperty('--after-width', '0');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => sectionObserver.observe(section));


  /* ----------------------------------
     10. SERVICE CARD TILT EFFECT
  ---------------------------------- */
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;
      card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

});

/* ============================================
   XCEL CONSULTANCY — Main JavaScript
   Lead Capture, WhatsApp Integration, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- CONFIG ----
  const WHATSAPP_NUMBER = '919954098174';
  const EMAIL_ADDRESS = 'xcelconsultancysilchar@gmail.com';
  const DEFAULT_MESSAGE = `Hello Xcel Consultancy! 👋

I'm interested in learning more about your investment and financial consultancy services. I'd like to schedule a free consultation to discuss my financial goals and planning needs.

Please let me know the next available slot. Thank you!`;

  const DEFAULT_EMAIL_SUBJECT = 'Consultation Request — Xcel Consultancy';
  const DEFAULT_EMAIL_BODY = `Dear Xcel Consultancy Team,

I am interested in learning more about your investment and financial consultancy services. I would like to schedule a free consultation to discuss my financial goals and planning needs.

Please let me know the next available slot.

Thank you!`;

  // ---- NAVBAR SCROLL ----
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('.navbar-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close menu on link click
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // ---- WHATSAPP INTEGRATION ----
  function openWhatsApp(message) {
    const msg = encodeURIComponent(message || DEFAULT_MESSAGE);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, '_blank');
  }

  // ---- EMAIL INTEGRATION ----
  function openEmail(subject, body) {
    const sub = encodeURIComponent(subject || DEFAULT_EMAIL_SUBJECT);
    const bod = encodeURIComponent(body || DEFAULT_EMAIL_BODY);
    const url = `mailto:${EMAIL_ADDRESS}?subject=${sub}&body=${bod}`;
    window.location.href = url;
  }

  // Bind all WhatsApp buttons
  document.querySelectorAll('[data-whatsapp]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customMsg = btn.getAttribute('data-whatsapp-message');
      openWhatsApp(customMsg || DEFAULT_MESSAGE);
    });
  });

  // Bind all Email buttons
  document.querySelectorAll('[data-email]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customSubject = btn.getAttribute('data-email-subject');
      const customBody = btn.getAttribute('data-email-body');
      openEmail(customSubject, customBody);
    });
  });

  // Service-specific WhatsApp messages
  document.querySelectorAll('.service-cta-wa[data-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      const msg = `Hello Xcel Consultancy! 👋\n\nI'm interested in your "${service}" service. I'd like to learn more and schedule a consultation.\n\nPlease share the details. Thank you!`;
      openWhatsApp(msg);
    });
  });

  // Service-specific Email links
  document.querySelectorAll('.service-cta-email[data-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openEmail(
        `Enquiry: ${service} — Xcel Consultancy`,
        `Dear Xcel Consultancy Team,\n\nI am interested in your "${service}" service. I would like to learn more and schedule a consultation.\n\nPlease share the details and let me know the next available slot.\n\nThank you!`
      );
    });
  });

  // ---- LEAD CAPTURE FORM ----
  const leadForm = document.getElementById('lead-form');
  const formContainer = document.querySelector('.form-container');
  const formSuccess = document.querySelector('.form-success');

  function validateForm() {
    const name = document.getElementById('form-name').value.trim();
    const whatsapp = document.getElementById('form-whatsapp').value.trim();
    const email = document.getElementById('form-email').value.trim();

    if (!name || !whatsapp || !email) {
      alert('Please fill in all mandatory fields.');
      return null;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(whatsapp)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return null;
    }

    const service = document.getElementById('form-service').value;
    return { name, whatsapp, email, service };
  }

  function showFormSuccess() {
    if (formContainer && formSuccess) {
      formContainer.style.display = 'none';
      formSuccess.classList.add('show');
    }
    setTimeout(() => {
      leadForm.reset();
      if (formContainer && formSuccess) {
        formContainer.style.display = 'block';
        formSuccess.classList.remove('show');
      }
    }, 8000);
  }

  // Form submit → WhatsApp
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = validateForm();
      if (!data) return;

      const formMessage = `Hello Xcel Consultancy! 👋

New Consultation Request:
━━━━━━━━━━━━━━━━━━
📋 Full Name: ${data.name}
📱 WhatsApp: ${data.whatsapp}
📧 Email: ${data.email}
💼 Service Interest: ${data.service || 'General Consultation'}
━━━━━━━━━━━━━━━━━━

I'd like to schedule a free consultation. Please get in touch at the earliest convenience. Thank you!`;

      openWhatsApp(formMessage);
      showFormSuccess();
    });
  }

  // Form submit → Email
  const emailSubmitBtn = document.getElementById('form-email-submit');
  if (emailSubmitBtn) {
    emailSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateForm();
      if (!data) return;

      openEmail(
        `New Consultation Request — ${data.name}`,
        `Dear Xcel Consultancy Team,

New Consultation Request:
────────────────────────
Full Name: ${data.name}
WhatsApp: ${data.whatsapp}
Email: ${data.email}
Service Interest: ${data.service || 'General Consultation'}
────────────────────────

I would like to schedule a free consultation. Please get in touch at the earliest convenience.

Thank you!`
      );
      showFormSuccess();
    });
  }

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
      });

      // Open clicked (if was not active)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ---- ANIMATED COUNTERS ----
  const counters = document.querySelectorAll('[data-counter]');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = prefix + target.toLocaleString() + suffix;
        } else {
          counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });

    countersStarted = true;
  }

  // ---- SCROLL REVEAL ANIMATIONS ----
  const revealElements = document.querySelectorAll('.reveal');
  const statsSection = document.querySelector('.stats');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger counters when stats section comes into view
        if (entry.target.closest('.stats') || entry.target === statsSection) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Also observe the stats section directly
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- FORM INPUT ANIMATIONS ----
  document.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

  // ---- TYPING EFFECT FOR HERO (subtle) ----
  const heroHighlight = document.querySelector('.hero-title .highlight');
  if (heroHighlight) {
    const words = ['Financial Future', 'Investments', 'Wealth Growth', 'Tax Savings'];
    let wordIndex = 0;

    function rotateWords() {
      heroHighlight.style.opacity = '0';
      heroHighlight.style.transform = 'translateY(10px)';

      setTimeout(() => {
        heroHighlight.textContent = words[wordIndex];
        heroHighlight.style.opacity = '1';
        heroHighlight.style.transform = 'translateY(0)';
        wordIndex = (wordIndex + 1) % words.length;
      }, 400);
    }

    setInterval(rotateWords, 3000);
    heroHighlight.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    heroHighlight.style.display = 'inline-block';
  }

});

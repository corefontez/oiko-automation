/* ============================================
   OIKO AUTOMATION — MAIN JS
   navbar, FAQ, scroll reveal, metric bars
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL ─────────────────────────

  const navbar = document.getElementById('navbar');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  // ─── MOBILE MENU ───────────────────────────

  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navActions = document.getElementById('navActions');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navActions?.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar ao clicar em link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navActions?.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  // ─── FAQ ACCORDION ─────────────────────────

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = content.classList.contains('open');

      // Fechar todos
      faqItems.forEach(other => {
        other.querySelector('.faq-content')?.classList.remove('open');
        const t = other.querySelector('.faq-trigger');
        t?.classList.remove('active');
        t?.setAttribute('aria-expanded', 'false');
      });

      // Abrir clicado (se estava fechado)
      if (!isOpen) {
        content.classList.add('open');
        trigger.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ─── SCROLL REVEAL ─────────────────────────

  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => revealObserver.observe(el));
  }


  // ─── METRIC BARS ───────────────────────────

  const metricCards = document.querySelectorAll('.metric-card');

  if (metricCards.length > 0) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.metric-bar-fill[data-width]').forEach(bar => {
              const width = bar.getAttribute('data-width');
              setTimeout(() => {
                bar.style.width = width + '%';
              }, 200);
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    metricCards.forEach(card => barObserver.observe(card));
  }


  // ─── SMOOTH SCROLL PARA ÂNCORAS ────────────

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) || 72;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    });
  });

});

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
      navbar.classList.toggle('scrolled', window.scrollY > 40);
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


  // ─── STACK ECOSYSTEM: STAGGERED NODE ENTRY ─

  const ecoContainer = document.querySelector('.eco-container');

  if (ecoContainer) {
    const nodes   = ecoContainer.querySelectorAll('.eco-node');
    const center  = ecoContainer.querySelector('.eco-center');
    const lines   = ecoContainer.querySelectorAll('.eco-line-travel');

    // Initially hidden
    [center, ...nodes].forEach(el => {
      if (el) { el.style.opacity = '0'; el.style.transform += ' scale(0.7)'; }
    });
    lines.forEach(l => { l.style.animationPlayState = 'paused'; });

    const ecoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          // Reveal center first
          if (center) {
            center.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
            center.style.opacity = '1';
            center.style.transform = center.style.transform.replace(' scale(0.7)', '');
          }

          // Stagger each node
          nodes.forEach((node, i) => {
            setTimeout(() => {
              node.style.transition = 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.28s, box-shadow 0.28s';
              node.style.opacity = '1';
              node.style.transform = node.style.transform.replace(' scale(0.7)', '');
            }, 200 + i * 80);
          });

          // Start line animations
          setTimeout(() => {
            lines.forEach(l => { l.style.animationPlayState = 'running'; });
          }, 400);

          ecoObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.20 }
    );

    ecoObserver.observe(ecoContainer);
  }


  // ─── HERO STATS: FADE-IN + COUNTER ────────

  const heroStats = document.querySelectorAll('.hero-stat');

  if (heroStats.length > 0) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = Array.from(heroStats).indexOf(el) * 120;

            setTimeout(() => {
              el.classList.add('in-view');

              const numEl = el.querySelector('.stat-num[data-count]');
              if (!numEl) return;

              const target = parseInt(numEl.getAttribute('data-count'), 10);
              const duration = 1200;
              const start = performance.now();

              const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                numEl.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
              };

              requestAnimationFrame(tick);
            }, delay);

            statObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -20px 0px' }
    );

    heroStats.forEach(stat => statObserver.observe(stat));
  }


  // ─── ROADMAP TRACK REVEAL ──────────────────

  const roadmap = document.querySelector('.roadmap');

  if (roadmap) {
    const roadmapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            roadmapObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    roadmapObserver.observe(roadmap);
  }


  // ─── SMOOTH SCROLL PARA ÂNCORAS ────────────

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 72;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    });
  });

});

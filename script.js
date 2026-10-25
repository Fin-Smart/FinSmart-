// FinSmart Promo Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Topbar scroll background adaptation
  const topbar = document.querySelector('.topbar');
  const hero = document.querySelector('.hero');

  if (topbar && hero) {
    const updateTopbar = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom <= 64) {
        topbar.classList.remove('topbar-on-blue');
      } else {
        topbar.classList.add('topbar-on-blue');
      }
    };
    window.addEventListener('scroll', updateTopbar, { passive: true });
    updateTopbar();
  }

  // Interactive Demo Tabs
  const tabBtns = document.querySelectorAll('.demo-tab-btn');
  const panels = document.querySelectorAll('.demo-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabBtns.forEach(b => b.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    });
  });

  // Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherBtn = other.querySelector('.faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        // Toggle current
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Kinetic Band Marquee / Interactive subtle tilt
  const band = document.querySelector('.band');
  if (band) {
    const line1 = band.querySelector('.band-line-1');
    const line2 = band.querySelector('.band-line-2');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = band.getBoundingClientRect();
          const winHeight = window.innerHeight;
          if (rect.top < winHeight && rect.bottom > 0) {
            const progress = (winHeight - rect.top) / (winHeight + rect.height);
            const move1 = (progress - 0.5) * -160;
            const move2 = (progress - 0.5) * 160;
            if (line1) line1.style.transform = `translateX(${move1}px)`;
            if (line2) line2.style.transform = `translateX(${move2}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
});

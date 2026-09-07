// ===================================================
// כלב כיף במודיעין - Interactions
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky navbar shrink on scroll ----
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      navbar.style.padding = '0';
    } else {
      navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
    }
  };
  window.addEventListener('scroll', onScroll);

  // ---- Mobile burger menu ----
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ---- Fade-in on scroll (IntersectionObserver) ----
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(el => appearOnScroll.observe(el));

  // ---- Little easter egg: paw print burst on WhatsApp button click ----
  const waButtons = document.querySelectorAll('.whatsapp-btn, .btn-primary, .floating-whatsapp');
  waButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < 8; i++) {
        createFlyingPaw(btn);
      }
    });
  });

  function createFlyingPaw(origin) {
    const paw = document.createElement('span');
    paw.textContent = '🐾';
    paw.style.position = 'fixed';
    const rect = origin.getBoundingClientRect();
    paw.style.left = (rect.left + rect.width / 2) + 'px';
    paw.style.top = (rect.top + rect.height / 2) + 'px';
    paw.style.fontSize = (16 + Math.random() * 20) + 'px';
    paw.style.pointerEvents = 'none';
    paw.style.zIndex = 999;
    paw.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
    document.body.appendChild(paw);

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 60;

    requestAnimationFrame(() => {
      paw.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
      paw.style.opacity = '0';
    });

    setTimeout(() => paw.remove(), 1050);
  }

});

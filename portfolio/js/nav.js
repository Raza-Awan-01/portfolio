/* ============================================================
   nav.js — Hamburger toggle + active nav link highlighting
   ============================================================ */

(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sections   = document.querySelectorAll('section');

  // ── Hamburger toggle (mobile) ──────────────────────────────
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navAnchors.forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── Active link on scroll ──────────────────────────────────
  function updateActiveLink() {
    let currentId = '';

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentId = section.id;
      }
    });

    navAnchors.forEach((a) => {
      const href = a.getAttribute('href');
      if (href === '#' + currentId) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Run once on load
})();

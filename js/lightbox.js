/* ============================================================
   lightbox.js — Screenshot viewer with prev/next, swipe & keys
   ============================================================ */

(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  const images = Array.from(document.querySelectorAll('.screenshot-item img'));
  let current = 0;

  // ── Build arrows + counter ─────────────────────────────────
  const prevBtn = document.createElement('button');
  prevBtn.className = 'lightbox-nav lightbox-prev';
  prevBtn.setAttribute('aria-label', 'Previous screenshot');
  prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6" /></svg>';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'lightbox-nav lightbox-next';
  nextBtn.setAttribute('aria-label', 'Next screenshot');
  nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6" /></svg>';

  const counter = document.createElement('div');
  counter.className = 'lightbox-counter';

  lightbox.append(prevBtn, nextBtn, counter);

  if (images.length < 2) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
    counter.hidden = true;
  }

  // ── Show / open / close ────────────────────────────────────
  function show(index) {
    current = (index + images.length) % images.length;
    lightboxImg.src = images[current].src;
    lightboxImg.alt = images[current].alt;
    counter.textContent = (current + 1) + ' / ' + images.length;
  }

  window.openLightbox = function (el) {
    const img = el.querySelector('img');
    const index = images.indexOf(img);
    if (index === -1) return;
    show(index);
    lightbox.classList.add('open');
  };

  window.closeLightbox = function () {
    lightbox.classList.remove('open');
  };

  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));

  // Close when clicking the dark backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ── Keyboard ───────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft' && images.length > 1) show(current - 1);
    else if (e.key === 'ArrowRight' && images.length > 1) show(current + 1);
  });

  // ── Swipe (touch) ──────────────────────────────────────────
  const SWIPE_THRESHOLD = 50;
  let touchStartX = 0;
  let touchStartY = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    if (images.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    show(dx < 0 ? current + 1 : current - 1);
  });
})();

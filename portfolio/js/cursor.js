/* ============================================================
   cursor.js — Custom animated cursor (desktop only)
   ============================================================ */

(function () {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (!cursor || !cursorRing) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Animate cursor dot (snaps instantly) and ring (lags behind)
  function animateCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';

    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Grow cursor on interactive elements
  const interactiveSelectors = 'a, button, .project-card, .contact-link, .skill-tag';

  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width     = '20px';
      cursor.style.height    = '20px';
      cursorRing.style.width  = '52px';
      cursorRing.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width     = '12px';
      cursor.style.height    = '12px';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
    });
  });
})();

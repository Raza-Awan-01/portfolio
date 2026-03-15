/* ============================================================
   particles.js — Floating particle effect for the hero section
   ============================================================ */

(function () {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 40;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size     = 1 + Math.random() * 2;
    const color    = Math.random() > 0.5 ? '#00f5ff' : '#a259ff';
    const duration = 4 + Math.random() * 8;
    const delay    = Math.random() * 6;
    const left     = Math.random() * 100;

    p.style.cssText = `
      left:                ${left}%;
      width:               ${size}px;
      height:              ${size}px;
      background:          ${color};
      animation-duration:  ${duration}s;
      animation-delay:     ${delay}s;
    `;

    container.appendChild(p);
  }
})();

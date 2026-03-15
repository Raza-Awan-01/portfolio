/* ============================================================
   contact.js — Contact form submission handler
   ============================================================ */

(function () {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !submitBtn) return;

  const originalHTML = submitBtn.innerHTML;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // ── Show success state ──────────────────────────────────
    submitBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Sent!
    `;
    submitBtn.style.background  = '#44ff88';
    submitBtn.style.boxShadow   = '0 0 30px rgba(68, 255, 136, 0.5)';
    submitBtn.disabled          = true;

    // ── Reset after 3 seconds ──────────────────────────────
    setTimeout(() => {
      submitBtn.innerHTML        = originalHTML;
      submitBtn.style.background = '';
      submitBtn.style.boxShadow  = '';
      submitBtn.disabled         = false;
      form.reset();
    }, 3000);

    // ── TODO: Replace with your real form submission ────────
    // e.g. fetch to your backend, Formspree, EmailJS, etc.
    // fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name:    form.querySelector('[name="name"]').value,
    //     email:   form.querySelector('[name="email"]').value,
    //     message: form.querySelector('[name="message"]').value,
    //   })
    // });
  });
})();

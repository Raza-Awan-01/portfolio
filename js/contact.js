/* ============================================================
   contact.js — Contact form submission handler (Formspree)
   ============================================================ */

(function () {
  const FORMSPREE_URL = 'https://formspree.io/f/myeknaew';
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !submitBtn) return;

  const originalHTML = submitBtn.innerHTML;

  function setButtonState({ html, background, boxShadow, disabled }) {
    submitBtn.innerHTML = html;
    submitBtn.style.background = background;
    submitBtn.style.boxShadow = boxShadow;
    submitBtn.disabled = disabled;
  }

  function resetButton() {
    setButtonState({
      html: originalHTML,
      background: '',
      boxShadow: '',
      disabled: false,
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    setButtonState({
      html: 'Sending...',
      background: '',
      boxShadow: '',
      disabled: true,
    });

    const data = {
      name: form.querySelector('[name="name"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      subject: form.querySelector('[name="subject"]').value.trim(),
      message: form.querySelector('[name="message"]').value.trim(),
    };

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Form submission failed');

      setButtonState({
        html: `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Sent!
        `,
        background: '#44ff88',
        boxShadow: '0 0 30px rgba(68, 255, 136, 0.5)',
        disabled: true,
      });

      form.reset();

      setTimeout(resetButton, 3000);
    } catch {
      setButtonState({
        html: 'Failed — try again',
        background: '#ff4466',
        boxShadow: '0 0 30px rgba(255, 68, 102, 0.4)',
        disabled: false,
      });

      setTimeout(resetButton, 3000);
    }
  });
})();

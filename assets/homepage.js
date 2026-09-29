(() => {
  const button = document.querySelector('.home-copy');
  const status = document.querySelector('.home-copy-status');
  if (button && status) {
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(document.querySelector('#wechat-id').textContent);
        status.textContent = button.dataset.success;
      } catch {
        status.textContent = button.dataset.failure;
        const range = document.createRange();
        range.selectNodeContents(document.querySelector('#wechat-id'));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  }
  const contact = document.querySelector('#contact-lep');
  const mobile = document.querySelector('.home-mobile-contact');
  if (contact && mobile && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      mobile.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, {threshold: 0}).observe(contact);
  }
})();

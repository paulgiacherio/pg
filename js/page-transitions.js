(() => {
  const showPage = () => {
    document.body.classList.add('is-ready');
  };

  window.requestAnimationFrame(showPage);

  window.addEventListener('pageshow', (event) => {
    document.body.classList.remove('is-exiting');

    if (event.persisted) {
      showPage();
    }
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');

    if (!link) {
      return;
    }

    const href = link.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    if (link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) {
      return;
    }

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    document.body.classList.add('is-exiting');

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 280);
  });
})();

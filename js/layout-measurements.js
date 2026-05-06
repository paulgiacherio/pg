// Layout measurements that support CSS-only interactions.
// Keep scroll-linked effects in motion-effects.js.

const setClientCardDescriptionHeights = () => {
  document.querySelectorAll('.client-card').forEach((card) => {
    const desc = card.querySelector('.client-card__desc');

    if (desc) {
      card.style.setProperty('--desc-height', `${desc.offsetHeight}px`);
    }
  });
};

setClientCardDescriptionHeights();
window.addEventListener('resize', setClientCardDescriptionHeights);

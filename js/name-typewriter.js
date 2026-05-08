(() => {
  const target = document.querySelector('[data-name-typewriter]');
  const pronunciation = document.querySelector('.site-footer__pronunciation');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!target || !pronunciation || reduceMotion.matches) return;

  const original = target.dataset.original || target.textContent.trim();
  const phonetic = pronunciation.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
  const startDelay = 5000;
  const holdDelay = 1100;
  const eraseDelay = 70;
  const typeDelay = 95;
  let isRunning = false;

  const wait = (delay) => new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });

  const writeText = async (text, delay) => {
    for (let index = 1; index <= text.length; index += 1) {
      target.textContent = text.slice(0, index);
      await wait(delay);
    }
  };

  const eraseText = async (delay) => {
    while (target.textContent.length) {
      target.textContent = target.textContent.slice(0, -1);
      await wait(delay);
    }
  };

  const run = async () => {
    if (isRunning) return;

    isRunning = true;
    target.classList.add('is-typing');
    await eraseText(eraseDelay);
    target.classList.add('is-phonetic');
    await writeText(phonetic, typeDelay);
    await wait(holdDelay);
    await eraseText(eraseDelay);
    target.classList.remove('is-phonetic');
    await writeText(original, typeDelay);
    target.classList.remove('is-typing');
    isRunning = false;
  };

  window.setTimeout(run, startDelay);
  target.addEventListener('pointerenter', run);
  target.addEventListener('focus', run);
})();

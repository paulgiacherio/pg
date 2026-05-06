import { scroll } from 'motion';

// Scroll-linked visual effects live here. Motion.dev provides the scroll progress;
// site-specific code maps that progress to CSS variables or word highlight state.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

let stopEffects = [];

const setTransformOffset = (element, property, value) => {
  element.style.setProperty(property, `${value.toFixed(2)}px`);
};

const resetEffects = () => {
  document.querySelector('.hero')?.style.setProperty('--hero-offset', '0px');
  document.querySelector('.glamour')?.style.setProperty('--glamour-offset', '0px');
  document.querySelectorAll('.parallax-layer, .role-table__panel, .clients__column, .changelog__panel')
    .forEach((element) => element.style.setProperty('--parallax-offset', '0px'));
};

const trackPageScroll = (callback) => {
  if (typeof scroll === 'function') {
    return scroll((progress) => {
      callback(clamp(progress, 0, 1), window.scrollY);
    });
  }

  let ticking = false;
  const update = () => {
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollRange > 0 ? clamp(window.scrollY / scrollRange, 0, 1) : 0;
    callback(progress, window.scrollY);
    ticking = false;
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  return () => {
    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);
  };
};

const trackElementScroll = (target, callback) => {
  if (typeof scroll === 'function') {
    return scroll((progress) => {
      callback(clamp(progress, 0, 1));
    }, {
      target,
      offset: ['start end', 'end start'],
    });
  }

  let ticking = false;
  const update = () => {
    const rect = target.getBoundingClientRect();
    const travel = target.offsetHeight + window.innerHeight;
    const progress = travel > 0 ? clamp((window.innerHeight - rect.top) / travel, 0, 1) : 0;
    callback(progress);
    ticking = false;
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  return () => {
    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);
  };
};

const setupHeroParallax = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return () => {};

  return trackPageScroll((_, scrollY) => {
    setTransformOffset(hero, '--hero-offset', scrollY * -0.25);
  });
};

const setupGlamourParallax = () => {
  const glamour = document.querySelector('.glamour');
  if (!glamour) return () => {};

  return trackPageScroll((_, scrollY) => {
    setTransformOffset(glamour, '--glamour-offset', scrollY * -0.48);
  });
};

const setupRolePanelParallax = () => {
  const panel = document.querySelector('.role-table__panel');
  const section = document.querySelector('.roles');
  if (!panel || !section) return () => {};

  return trackElementScroll(section, (progress) => {
    setTransformOffset(panel, '--parallax-offset', (progress - 0.5) * 300);
  });
};

const setupClientColumnsParallax = () => {
  const section = document.querySelector('.clients');
  const columns = [
    { element: document.querySelector('.clients__column--left'), stagger: 0.5, travel: -0.75 },
    { element: document.querySelector('.clients__column--center'), stagger: 0.5, travel: 0.5 },
    { element: document.querySelector('.clients__column--right'), stagger: 0, travel: -0.1 },
  ];

  if (!section || columns.some(({ element }) => !element)) return () => {};

  let cardHeight = 0;
  const measureCardHeight = () => {
    const card = section.querySelector('.client-card');
    cardHeight = card ? card.offsetHeight : 300;
  };
  measureCardHeight();

  const stopScroll = trackElementScroll(section, (progress) => {
    columns.forEach(({ element, stagger, travel }) => {
      const offset = stagger * cardHeight - progress * travel * cardHeight;
      setTransformOffset(element, '--parallax-offset', offset);
    });
  });

  window.addEventListener('resize', measureCardHeight);

  return () => {
    window.removeEventListener('resize', measureCardHeight);
    stopScroll();
  };
};

const setupChangelogPanelParallax = () => {
  const panel = document.querySelector('.changelog__panel');
  const section = document.querySelector('.changelog-section');
  if (!panel || !section) return () => {};

  const speed = Number(panel.dataset.parallaxSpeed || -0.2);

  return trackElementScroll(section, (progress) => {
    setTransformOffset(panel, '--parallax-offset', (progress - 0.5) * speed * section.offsetHeight);
  });
};

const setupIntroHighlight = () => {
  const para = document.querySelector('.intro-para__text');
  if (!para) return () => {};

  const sourceText = para.dataset.sourceText || para.textContent.trim();
  para.dataset.sourceText = sourceText;

  const wordMarkup = sourceText
    .split(/(\s+)/)
    .map((token) => (token.trim()
      ? `<span class="intro-para__word">${token}</span>`
      : token))
    .join('');

  para.innerHTML = [
    `<span class="intro-para__layer intro-para__layer--gradient" aria-hidden="true">${wordMarkup}</span>`,
    `<span class="intro-para__layer intro-para__layer--mask">${wordMarkup}</span>`,
  ].join('');

  const gradientWords = Array.from(para.querySelectorAll('.intro-para__layer--gradient .intro-para__word'));
  const words = Array.from(para.querySelectorAll('.intro-para__layer--mask .intro-para__word'));

  if (!words.length) return () => {};

  const setLitCount = (litCount) => {
    words.forEach((word, index) => {
      word.classList.toggle('lit', index < litCount);
    });
    gradientWords.forEach((word, index) => {
      word.classList.toggle('lit', index < litCount);
    });
  };

  if (reduceMotion.matches) {
    setLitCount(words.length);
    return () => setLitCount(words.length);
  }

  return scroll((progress) => {
    const litCount = Math.round(clamp(progress, 0, 1) * words.length);
    setLitCount(litCount);
  }, {
    target: para,
    offset: ['start 72%', 'end 50%'],
  });
};

const startEffects = () => {
  resetEffects();

  stopEffects = [
    setupIntroHighlight(),
    ...(reduceMotion.matches
      ? []
      : [
        setupHeroParallax(),
        setupGlamourParallax(),
        setupRolePanelParallax(),
        setupClientColumnsParallax(),
        setupChangelogPanelParallax(),
      ]),
  ];
};

const stopAllEffects = () => {
  stopEffects.forEach((stop) => stop());
  stopEffects = [];
  resetEffects();
};

const restartEffects = () => {
  stopAllEffects();
  startEffects();
};

if (typeof reduceMotion.addEventListener === 'function') {
  reduceMotion.addEventListener('change', restartEffects);
} else if (typeof reduceMotion.addListener === 'function') {
  reduceMotion.addListener(restartEffects);
}

startEffects();

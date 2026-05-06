# paulgiacherio.com — Site-Specific Instructions

This file layers on top of the root `AGENTS.md` at `pg—live/AGENTS.md`. Read both before working on this site.

---

# Implementation Notes

A living record of architecture decisions and hard-won lessons for the `redesign` branch. Read this before touching layout or spacing.

---

## Branch

Active work is on the `redesign` branch. `main` holds the prior `blogstream` work (mapbox experiment, blog layout). The redesign is a full visual overhaul — dark neutral theme, large display typography in the hero, scroll-driven word highlight intro paragraph.

---

## Core Architecture: Section-Based Grid

**The fundamental rule:** `.page` is a max-width wrapper only — no rows, no display:grid. Every section that needs column alignment independently declares `display: grid; grid-template-columns: var(--page-columns)`.

This was discovered after a painful failure trying to manage a page-level row grid. A page-level grid (`grid-template-rows`) is fundamentally incompatible with section-based content because auto-placed rows fight with explicitly placed elements, creating collisions and uncontrollable gaps.

```css
/* Max-width wrapper only — never add grid-template-rows here */
.page {
  width: min(100%, 1800px);
  margin-inline: auto;
}

/* Each section that needs column alignment: */
.some-section {
  display: grid;
  grid-template-columns: var(--page-columns);
}
```

---

## Key Custom Properties

```css
:root {
  /* Row unit: targets 1/12 viewport height, clamped for extreme aspect ratios */
  --row-unit: clamp(60px, calc(100vh / 12), 100px);

  /* 9-column grid shared across all sections */
  --page-columns: [c1] 5% [c2] 8% [c3] 12% [c4] 25% [c5] 25% [c6] 12% [c7] 8% [c8] 5% [c9];

  /* Colors — fully neutral, no warm or purple undertones */
  --bg:            #171717;
  --text:          #e8e8e8;
  --text-muted:    #888;
  --color-heading: #fff;
  --color-label:   #666;
}
```

**`--row-unit` rules:**
- Clamp it to keep the layout usable at extreme aspect ratios; the target remains `100vh / 12`, but the row unit should not become tiny or enormous.
- Use multiples freely: `calc(var(--row-unit) * 2)`, `calc(var(--row-unit) * 0.5)`, etc.
- "Two row heights" = `calc(var(--row-unit) * 2)`.

**Column line names:**
```
c1 | 5% | c2 | 8% | c3 | 12% | c4 | 25% | c5 | 25% | c6 | 12% | c7 | 8% | c8 | 5% | c9
```
- `c2/c6` = main content area (left-heavy, ~80% of content width)
- `c3/c7` = tighter content column
- `c3/c6` → `c3/c7` for wider spans in the hero

---

## Hero Section

The hero is a real grid container with explicit rows:

```css
.hero {
  display: grid;
  grid-template-columns: var(--page-columns);
  grid-template-rows: repeat(15, var(--row-unit)); /* 15 rows = 125% viewport height */
  transform: translate3d(0, var(--hero-offset, 0px), 0);
  will-change: transform;
}
```

**Grid placement:**
- `.hero__intro-name`: `grid-column: c3/c6; grid-row: 4; align-self: start;`
- `.hero__intro-title`: `grid-column: c3/c7; grid-row: 5; align-self: start;`
- `.glamour`: `grid-column: 4/8; grid-row: 7/16;`
- `.hero__version`: `grid-column: 7; grid-row: 2;`

**Why 15 rows:** Glamour ends at grid line 16 (`grid-row: 7/16`). Hero has 15 rows (lines 1–16). If hero had 16 rows, line 17 would exist but be empty, creating a dead gap below the glamour.

**Hero parallax:** The hero scrolls up at 25% of scroll speed via `js/motion-effects.js`. It should not use the generic `.parallax-layer` root system because the hero would need to reference itself.

```js
// motion-effects.js — hero scroll-up parallax
const hero = document.querySelector('.hero');
scroll(() => {
  hero.style.setProperty('--hero-offset', `${(window.scrollY * -0.25).toFixed(2)}px`);
});
```

**`display: contents` wrappers:** `.hero__text` and `.hero__intro` both use `display: contents` so their children participate directly in the hero grid. This is intentional — the DOM structure is preserved for semantics but has no layout effect.

---

## Glamour (Photo)

```css
.glamour {
  grid-column: 4 / 8;
  grid-row: 7 / 16;
  border-radius: 4px;
}

.glamour__image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

**Glamour parallax:** The photo participates in the page-wide `motion.dev` parallax implementation through `--glamour-offset`. Do not attach `data-parallax-*` attributes to glamour; the older root-based approach calculated bad offsets against the hero. Keep glamour's transform driven directly by `js/motion-effects.js`.

---

## Intro Paragraph Section

```css
.intro-para {
  display: grid;
  grid-template-columns: var(--page-columns);
  padding-block-start: calc(var(--row-unit) * 0.5);
  padding-block-end: calc(var(--row-unit) * 1.5);
}

.intro-para__text {
  grid-column: c2 / c6;
  font-size: clamp(2rem, 4.8vw, 5.5rem);
  font-weight: 300;
  line-height: 1.31;
  background: linear-gradient(108.56deg, #F9CCAF 2.22%, #92ACC3 57.93%);
  -webkit-background-clip: text;
  background-clip: text;
}
```

**Word-by-word highlight:** JS wraps each word in `<span class="intro-para__word">`. Default word color is `#373737` (solid, hides the gradient). When `.lit` is added, color becomes `transparent`, revealing the gradient painted on the parent. The gradient is painted once across the full paragraph box, so warm→cool flows naturally across line breaks.

```css
.intro-para__word { color: #373737; transition: color 0.25s ease; }
.intro-para__word.lit { color: transparent; -webkit-text-fill-color: transparent; }
```

Words light up as they cross 65% of the viewport height. Respects `prefers-reduced-motion` by lighting all words immediately.

---

## Generic Parallax System

`js/motion-effects.js` owns scroll-linked effects using the `motion.dev` `scroll()` helper. It writes `--hero-offset`, `--glamour-offset`, and `--parallax-offset` for the role panel, client columns, and changelog panel, and it drives the intro word highlight. `js/layout-measurements.js` owns non-motion layout measurements such as client card hover description height.

---

## Mobile Breakpoint

Single breakpoint at `768px`. The key override is the column definition on `:root`:

```css
@media (max-width: 768px) {
  :root {
    --page-columns: [c1] 32px [c2] minmax(0, 1fr) [c3] 32px [c4];
  }
}
```

This collapses all 9 columns to a simple 3-track grid (fixed gutters + 1fr center). Every section that uses `var(--page-columns)` inherits the mobile layout automatically — no per-section column overrides needed. Content placed at `c2/c6` on desktop falls to `c2/c3` (the only content column) on mobile.

Hero on mobile switches from explicit rows to `grid-auto-rows: auto` with padding, since the rigid row-unit system doesn't apply at mobile scale.

---

## Interior Pages

Use `.page--interior` which does have `display: grid; grid-template-columns: var(--page-columns)`. This is intentional — interior pages don't have hero sections with their own grids, so the page wrapper itself provides the column structure.

Blog uses `.page--blog` (similar pattern, `row-gap: 0`).

---

## Motion Principles

**Scroll-driven animations must always be bidirectional.** If an animation plays as an element enters the viewport, it must reverse when the user scrolls back up. This is a hard requirement, not a preference.

The common pattern of triggering a class on first intersection and never removing it (the `IntersectionObserver` + `classList.add` approach that most sites use) is explicitly rejected here. It produces a one-way animation that fires once and freezes — exactly the behavior to avoid.

**Accepted approaches:**

1. **Continuous scroll computation** — recalculate state on every scroll event, writing directly to a CSS custom property or style. The word-by-word intro highlight does this: every scroll tick re-evaluates each word's position and adds or removes `.lit` accordingly. This is the preferred pattern.

2. **`ScrollTimeline` / `animation-timeline: scroll()`** — native CSS scroll-driven animations. Inherently bidirectional because they're tied to scroll position, not a one-shot event. Use when browser support allows.

3. **Parallax via continuous offset** — the `--parallax-offset` and `--hero-offset` custom properties are recalculated on every frame. Scroll up: offset reverses. Correct by default.

**What to avoid:**
- `IntersectionObserver` with `classList.add` and no corresponding `classList.remove` — this is one-way only. If you use IntersectionObserver, remove the class when `isIntersecting` is false.
- CSS `animation-fill-mode: forwards` on scroll-triggered classes — locks the end state permanently.
- Any JS that bails out early with `if (element.classList.contains('animated')) return` — prevents reversal.

**The test:** scroll an animated element into view, then scroll back up past it. If it doesn't return to its pre-animation state, it's broken.

**`prefers-reduced-motion`:** All scroll-driven effects must check this. When reduced motion is preferred, either show the final state immediately (as the intro para word highlight does — all words `.lit` on init) or remove the animation entirely. Never just slow it down.

---

## What to Avoid

- **Never add `grid-template-rows` to `.page`** — it will collide with section-level grids.
- **Don't remove the `--row-unit` clamp** — it keeps the site usable at very tall or short viewport aspect ratios.
- **Don't give the glamour `data-parallax-*` attributes** — the parallax root calculation breaks.
- **Don't use `subgrid` on the hero** — attempted and abandoned; creates row-height inconsistencies with the parent.
- **Don't use `grid-auto-rows` on hero at desktop** — explicit `grid-template-rows: repeat(N, var(--row-unit))` is required for row-unit consistency.

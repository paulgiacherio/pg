# PG-005: Disable Parallax Work on Mobile

Priority: High  
Type: Performance / Motion  
Status: Todo

## Problem

CSS disables or neutralizes much of the parallax presentation on mobile, but the JavaScript parallax system can still run unless reduced motion is enabled.

## Scope

Add a mobile media query gate in `js/motion-effects.js` so parallax calculations do not run when the mobile layout disables the visual effect.

## Out of Scope

- Redesigning the mobile layout.
- Removing desktop parallax.
- Changing the reduced-motion policy.

## Acceptance Criteria

- Parallax effects do not run below the mobile breakpoint.
- Parallax starts and stops correctly when resizing across the breakpoint.
- Desktop parallax behavior remains unchanged.
- Reduced-motion behavior still takes precedence.

## Notes

Likely use `window.matchMedia('(max-width: 768px)')` alongside the existing `prefers-reduced-motion` query.

# PG-004: Clarify Motion File Responsibilities

Priority: Medium  
Type: Maintainability  
Status: Done

## Problem

The site previously split motion across `js/site-motion.js` and `js/motion-effects.js`, which made ownership ambiguous. Scroll-linked behavior should be centralized around the motion.dev implementation.

## Scope

Clarify file responsibilities: scroll-linked effects belong to `motion-effects.js`; non-motion layout measurements belong to a separate file.

## Out of Scope

- Rewriting the motion system from scratch.
- Changing the visual animation design.

## Acceptance Criteria

- File-level ownership is clear to a future maintainer.
- No duplicate parallax implementations exist.
- Reduced-motion behavior remains intact.
- The current motion behavior is unchanged.

## Notes

`js/layout-measurements.js` is intentionally not a motion file; it only supports CSS interactions that need measured values.

## Implementation Summary

- Moved the intro word highlight into `js/motion-effects.js` so all scroll-linked effects use the motion.dev `scroll()` helper.
- Renamed `js/site-motion.js` to `js/layout-measurements.js`.
- Kept client card description height measurement separate because it supports CSS layout/hover behavior rather than scroll-linked motion.
- Updated `index.html`, `AGENTS.md`, and `CLAUDE.md` to reflect the new ownership model.

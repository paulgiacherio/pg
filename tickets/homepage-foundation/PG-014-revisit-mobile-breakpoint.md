# PG-014: Revisit Mobile Breakpoint Polish

Priority: High
Type: Mobile UX / Performance
Status: Todo

## Problem

The mobile breakpoint inherits the broad redesign, but it needs a focused pass to make sure the experience is tight, readable, and appropriately lightweight. Some desktop-oriented animation and interaction details may be unnecessary or distracting on small screens.

## Scope

Audit the homepage at and below the mobile breakpoint, remove or simplify unnecessary animations, and tighten layout, spacing, interaction, and performance details without changing the core design direction.

## Out of Scope

- Redesigning the homepage.
- Adding a second mobile-specific visual system.
- Changing the desktop layout or desktop motion behavior except where shared code requires careful gating.
- Reworking content strategy or rewriting major sections.

## Acceptance Criteria

- Mobile layout is reviewed across common narrow viewport sizes.
- Unnecessary mobile animations are removed, disabled, or simplified.
- Scroll-linked effects respect mobile constraints and do not create needless work.
- Touch interactions feel intentional and do not conflict with normal page scrolling.
- Text, cards, images, and section spacing feel polished at the breakpoint and below.
- No content overlaps, clips awkwardly, or creates avoidable horizontal scrolling.
- The mobile experience remains visually aligned with the desktop redesign.
- Any remaining mobile-specific tradeoffs are documented or ticketed.

## Notes

This overlaps with PG-005, but the emphasis is broader. PG-005 is specifically about parallax work below the breakpoint; this ticket is a full mobile experience pass across layout, motion, interaction, and perceived performance.

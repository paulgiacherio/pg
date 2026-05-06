# PG-003: Revisit Main Landmark Structure

Priority: High  
Type: Accessibility / Semantics  
Status: Todo

## Problem

The intro paragraph currently sits before the `<main>` landmark, so the skip link jumps past a meaningful piece of homepage content.

## Scope

Decide whether the intro paragraph should move inside `<main>` or whether the skip target should be placed before the intro content.

## Out of Scope

- Rewriting homepage copy.
- Redesigning the intro paragraph section.

## Acceptance Criteria

- Skip link behavior lands users at the start of primary content.
- Landmark structure accurately represents the page content.
- Existing layout and scroll-driven intro highlight still work.
- No duplicate or confusing landmarks are introduced.

## Notes

This is a small structural decision with meaningful accessibility upside.

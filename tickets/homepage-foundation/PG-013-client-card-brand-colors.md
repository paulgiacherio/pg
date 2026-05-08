# PG-013: Add Client Card Brand Color Hovers

Priority: Low
Type: Visual Enhancement
Status: Todo

## Problem

The client cards currently have a small hover animation, but the cards stay visually neutral. The homepage is not ready for deeper case studies yet, so the client area needs a lightweight way to feel richer and more brand-specific without adding large new content sections.

## Scope

Explore adding brand color accents to client cards on hover, such as subtle background, border, logo, text, or gradient transitions that reference each client's visual identity.

## Out of Scope

- Writing or designing full case studies.
- Adding new client detail pages.
- Reworking the client card layout.
- Introducing heavy animation or motion that competes with the rest of the homepage.
- Using brand colors in a way that harms text contrast or accessibility.

## Acceptance Criteria

- Each client card has an intentional brand color treatment available on hover or focus.
- The enhancement works with the existing card hover animation rather than replacing it unnecessarily.
- Brand colors are defined in a maintainable place, such as CSS custom properties or structured card data.
- Hover and keyboard focus states receive comparable visual treatment.
- Text and logo contrast remain accessible in default and active states.
- The enhancement feels subtle and consistent with the neutral redesign.
- Mobile and touch behavior is considered, even if the final effect is reduced or simplified.

## Notes

This should stay small and expressive: a color animation hint, not a case-study system. Start by auditing which client brand colors are safe to use, then decide whether each card needs one accent color or a small palette.

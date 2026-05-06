# PG-010: Create Viewport and Motion QA Matrix

Priority: Medium  
Type: QA  
Status: Todo

## Problem

The homepage relies on precise spatial composition and scroll-linked motion. It needs a repeatable QA checklist for unusual but realistic viewport and motion settings.

## Scope

Create a small QA matrix covering desktop, mobile, tall viewports, wide viewports, Safari, and reduced-motion behavior.

## Out of Scope

- Automating the full visual QA suite.
- Redesigning breakpoints.
- Adding new test infrastructure unless separately ticketed.

## Acceptance Criteria

- QA matrix identifies target viewport sizes.
- Matrix includes reduced-motion checks.
- Matrix includes parallax reversal checks.
- Matrix includes mobile breakpoint checks.
- Matrix is easy to rerun after layout or motion changes.

## Notes

This could start as manual QA and later become screenshot-based regression testing if the site grows.

# PG-002: Tighten Font Loading Strategy

Priority: High  
Type: Performance  
Status: Todo

## Problem

The page loads the full Outfit weight range from Google Fonts. The typography is central to the design, but the font request should be intentional and optimized.

## Scope

Review which font weights are actually used, then decide whether to narrow the Google Fonts request, add swap behavior, or self-host the variable font.

## Out of Scope

- Changing the typeface.
- Redesigning typography scale or hierarchy.

## Acceptance Criteria

- Font loading includes an intentional display strategy.
- Unused weights are removed or justified.
- The site still renders acceptably during font load.
- Typography remains visually consistent after the loading strategy changes.

## Notes

Possible paths: add `display=swap`, reduce requested weights, or self-host Outfit if deployment control matters more than Google Fonts convenience.

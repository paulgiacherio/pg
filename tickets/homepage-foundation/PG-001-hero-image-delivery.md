# PG-001: Improve Hero Image Delivery

Priority: High  
Type: Performance / Semantics  
Status: Done

## Problem

The hero portrait is currently implemented as a CSS background on `.glamour`. That works visually, but it limits modern image loading controls such as intrinsic dimensions, responsive source selection, decoding strategy, and LCP prioritization.

## Scope

Evaluate converting the glamour portrait into a first-class image asset using `picture` or `img` while preserving the current crop, grid placement, and parallax behavior.

## Out of Scope

- Replacing the portrait.
- Redesigning the hero layout.
- Changing the hero row/grid architecture.

## Acceptance Criteria

- The hero image has explicit intrinsic dimensions or an equally stable sizing strategy.
- Loading behavior is intentional for the first viewport.
- Desktop and mobile crops remain visually consistent with the current design.
- Existing hero and glamour parallax behavior still works.
- No regression to the photo credit interaction.

## Notes

Likely options include `picture`/`img` with `object-fit: cover`, `width`, `height`, and possibly `fetchpriority="high"` if the image is confirmed to affect LCP.

## Implementation Summary

- Replaced the CSS background image with a real `.glamour__image` element.
- Added intrinsic `width` and `height`.
- Marked the image as eager/high priority for first-viewport discovery.
- Preserved the existing crop with `object-fit: cover`.
- Kept parallax on the `.glamour` container so the motion contract remains unchanged.
- Did not generate WebP/AVIF derivatives in this ticket because no local converter is currently available; responsive derivative generation can be handled as a later asset-pipeline task if desired.

# PG-006: Add Image Dimensions and Lazy Decoding

Priority: Medium  
Type: Performance  
Status: Todo

## Problem

Several images and logos are missing intrinsic `width` and `height` attributes, and below-the-fold images could use more explicit loading and decoding hints.

## Scope

Add appropriate image attributes to logo and footer images without changing visual layout.

## Out of Scope

- Replacing image assets.
- Reworking SVG contents.
- Changing client card layout.

## Acceptance Criteria

- Non-critical images use appropriate `loading` and `decoding` attributes.
- Images have intrinsic dimensions where practical.
- Layout does not shift or visually regress.
- Decorative logos remain correctly hidden or exposed to assistive technology.

## Notes

Client logos currently use empty `alt`, which may be acceptable because the visible card name carries the text label. Validate rather than changing reflexively.

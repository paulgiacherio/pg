# PG-012: Send Glamour Shot Doodles

Priority: Medium
Type: Feature / UX
Status: Todo

## Problem

The glamour shot could become a more playful, participatory surface if visitors can draw on it and send the result back with a short note. The site needs a clear share flow that captures the doodled image without making the interaction feel heavy or exposing a raw email address.

## Scope

Add a drawing experience for the glamour shot and a share button that opens a modal where visitors can review the generated image, add a note, and send it to the site owner.

## Out of Scope

- Building a public gallery or moderation workflow.
- Adding user accounts.
- Storing doodles indefinitely unless the chosen submission backend requires it.
- Redesigning the core hero layout or replacing the glamour image.
- Creating a full drawing application with advanced layer, brush, or export tooling.

## Acceptance Criteria

- Visitors can draw on or around the glamour shot with an obvious, touch-friendly control surface.
- The doodle can be reset or cleared before sharing.
- A share button opens an accessible modal with image preview, note field, and send/cancel actions.
- The submission includes the composed doodle image and visitor note.
- Submission behavior has a defined implementation path, such as a static form provider, serverless endpoint, or email workflow.
- Success, failure, loading, and validation states are designed and implemented.
- The drawing and share flow work with keyboard navigation where practical and do not trap focus incorrectly.
- Mobile behavior is usable and does not interfere with normal page scrolling outside the drawing interaction.
- Spam and abuse mitigation are considered without adding heavy friction.

## Notes

This likely overlaps with PG-011's contact submission strategy. Prefer reusing the same backend decision if possible, but keep the doodle share flow distinct enough that it feels like a playful site-specific interaction rather than a generic contact form.

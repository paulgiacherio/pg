# PG-011: Create Contact Form

Priority: Medium
Type: Feature / UX
Status: Todo

## Problem

The site does not currently offer a direct way for visitors to send a message. People need a clear, low-friction contact path that fits the redesign without relying only on external links or visible email addresses.

## Scope

Add a contact form experience for the site, including the front-end form layout, accessible field structure, validation states, and a submission strategy.

## Out of Scope

- Building a full CRM or message dashboard.
- Adding marketing automation.
- Collecting unnecessary personal data.
- Redesigning unrelated homepage sections.

## Acceptance Criteria

- Contact form includes fields for name, email, and message.
- Form fields have accessible labels, clear focus states, and useful validation messages.
- Submission behavior has a defined implementation path, such as a static form provider, serverless endpoint, or email workflow.
- Success and failure states are designed and implemented.
- Spam mitigation is considered without adding heavy friction.
- Layout follows the existing section-based grid and mobile breakpoint conventions.

## Notes

Keep the first version low lift. If back-end handling is not ready, this can ship behind a clear provider decision or a temporary disabled state with the front-end structure in place.

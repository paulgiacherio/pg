# PG-007: Decide on Motion Dependency Strategy

Priority: Medium  
Type: Dependency / Deployment  
Status: Todo

## Problem

The page imports Motion from a CDN import map. That is convenient, but it creates a runtime dependency on an external service and a broadly versioned package path.

## Scope

Decide whether to keep the CDN import, pin the dependency more strictly, vendor the module, or introduce a small build step.

## Out of Scope

- Replacing Motion with a different animation library.
- Removing parallax.

## Acceptance Criteria

- The dependency strategy is explicit and documented.
- Production behavior is stable across deploys.
- Failure behavior is understood if the dependency cannot load.
- The chosen path matches the simplicity of the site.

## Notes

The right answer may still be CDN. The goal is to make it an intentional choice rather than an accidental one.

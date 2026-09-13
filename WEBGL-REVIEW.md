# WebGL rack implementation review

Local review: 2026-08-30. Branch: `codex/astro-operations-manual`.

## Result

The sliced-image inspector is replaced with a procedural Three.js model: four volumetric equipment groups, real raycast selection, drag/keyboard rotation, assembly/explosion, zoom, reset, and paired light/night materials. The existing illustration remains the progressive-enhancement fallback. No routes, evidence copy, public claims, contact API, hosting configuration, or live deployment changed.

The 3D and Astro skills guided a vanilla, dynamically imported scene without a client framework. Impeccable's final audit preserved the approved drafting-paper identity rather than changing the rest of the page.

## Original rollout checks

- `npm test`: 15 tests passed, including five new geometry/material/resource tests.
- `npm run lint`: zero errors, warnings, or hints across 28 files.
- `npm run build`: passed. Vite reports one bundle-size advisory for the dynamic Three.js scene.
- `npm audit`: zero vulnerabilities.
- Production Worker browser suite: passed at 375, 768, and 1440 pixels, light/dark, support/systems/platform.
- Selection, second-activation reset, Escape, keyboard rotation, direct 3D picking, drag without accidental selection, assemble/reset, theme changes, static/3D toggling, and session persistence passed.
- No-JavaScript poster, reduced-motion explicit opt-in, unavailable WebGL, context loss and retry passed.
- Seven axe WCAG-tag scans: zero violations. No browser console errors or horizontal overflow.
- Existing redirects, 404/410 responses, and both résumé downloads passed.
- The original responsive poster is requested once; no external model or texture requests are introduced.
- Final desktop and mobile screenshots inspected. Browser screenshots and Lighthouse JSON are retained locally under `.impeccable/review/` (ignored by Git).

## Lighthouse

Standard headless Chrome against the local production Worker, not the Astro development server:

| Mode | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0.012 |
| Mobile | 97 | 100 | 100 | 100 | 2.4 s | 0 ms | 0.004 |

These are local lab measurements, not production field guarantees. An earlier forced-software-GPU stress run exposed costly shader startup. The final model uses lighter Lambert shading, asynchronous shader compilation, and separate initialization tasks. Functional regression tests also passed under software WebGL after those changes; the final Lighthouse scores above use the standard Chrome configuration.

## Impeccable audit

Implementation integrity: pass. The real equipment geometry, restrained oxide/blueprint state colors, existing HTML capability labels, and illustrative disclaimer retain the product-specific manual design. The one detector pass flagged only `codex-grid-background` in the existing stylesheet; this is an intentional blueprint surface explicitly permitted by the approved design, not a new defect. DESIGN.md and the generated design sidecar were not refreshed.

| Dimension | Review score | Evidence / limit |
| --- | ---: | --- |
| Accessibility | 3/4 | Automated WCAG and keyboard checks pass; physical-device assistive-technology testing remains unperformed |
| Performance | 3/4 | Lighthouse target met; nontrivial optional GPU/JavaScript workload remains |
| Responsive design | 4/4 | All specified viewport/theme/role combinations pass |
| Theming | 4/4 | Both materials and poster sources switch without losing selection |
| Implementation integrity | 4/4 | Real geometry, shared resources, no invented labels or metrics |
| Total | 18/20 | Excellent within the tested scope |

No verified P0, P1, or P2 issue was found in the changed surface. One P3 follow-up: `src/lib/rack-scene.ts` dynamically loads a 557,348-byte minified chunk (139,259 bytes with local gzip). It is not loaded for reduced-motion/data-saving defaults or until the rack approaches the viewport. It meets the measured target, but further bundle reduction could help slow devices. If that becomes necessary, use Impeccable optimize, then polish; this is not a deployment authorization.

Real mobile hardware, touch/assistive-technology combinations, and long-duration GPU/battery behavior have not been exhaustively tested. Static illustration remains available at any time. Cloudflare, DNS, GitHub remote, Vercel, and the live domain were not changed.

## Hover-targeting follow-up

The pointer previously selected Storage from empty space beside the chassis. Recursive raycasting included decorative `LineSegments`, whose default hit tolerance is one world unit. Hover also translated the highlighted chassis, changing its hit target under the cursor.

The picker now tests only solid Mesh/InstancedMesh surfaces, using current CSS canvas bounds and camera/model matrices. Hover changes highlight only; locked selection controls the pull-out movement. Pointer state is refreshed during camera/assembly movement, resize, and scroll, and cleared on exit, cancellation, and Escape.

Follow-up verification: 20 unit tests passed; strict checking passed across 30 files; production build passed with the existing Three.js chunk-size advisory. The full production browser suite passed in all specified role/theme/viewport combinations, including new checks for all four visible faces, nearby empty space, tiny cursor movements, matching click selection, and scrolling with a stationary pointer. Seven axe scans reported no violations and no console errors occurred. The exact reported empty-space hover was also reproduced and verified fixed in the in-app browser. The Lighthouse figures above are the original rollout baseline, not a new benchmark for this patch.

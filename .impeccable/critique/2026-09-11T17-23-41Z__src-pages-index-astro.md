---
target: portfolio rating and evidence-led improvements
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
timestamp: 2026-09-11T17-23-41Z
slug: src-pages-index-astro
---
Method: dual-agent (A: 01a09175-0fe4-7832-af39-571903de585b · B: 01a09175-1196-7421-a814-2343534e23f5).

# Operations Manual Portfolio — Impeccable critique

Assessment of the pre-fix local build on 2026-09-11. Independent design score: **26/32 (81.25%, Good)**, equivalent to 8.1/10 on this rubric. This is not a certification, hiring prediction, or independent post-fix rescore.

## Design specificity

Authored for Lorenz's infrastructure work: condensed display type, hyperlegible prose, disciplined document rules, paired vellum/night themes, and evidence records form one coherent identity. It is not category-interchangeable. The largest opportunity is to align evidence terminology and improve contact recovery, not replace the design.

## Design health

| # | Heuristic | Score | Observation |
|---|---|---|---|
| 1 | Status visibility | 3 | Role, navigation, disclosure, and form states are explicit. |
| 2 | Real-world match | 3 | Some evidence terminology needs interpretation. |
| 3 | User control | 4 | Reversible disclosures, rack reset/static controls, résumé and email alternatives. |
| 4 | Consistency | 3 | About's evidence key differs from Work labels. |
| 5 | Error prevention | 3 | Required fields, type/length validation, role defaults, message guidance. |
| 6 | Recognition | 4 | Role context and matching résumé persist; evidence links are descriptive. |
| 7 | Efficiency | n/a | Experience surface needs no specialist accelerators. |
| 8 | Minimalist aesthetics | 3 | Strong hierarchy; mobile rack creates a lengthy interval. |
| 9 | Error recovery | 3 | Content retained but recovery advice is generic. |
| 10 | Help/documentation | n/a | No separate help system needed for this portfolio. |
| | Total | 26/32 | Good |

## Strengths

- Consistent Barlow/Atkinson/JetBrains roles and equal-quality light/night hierarchy.
- Useful result → contribution → decisions → inspectable evidence → scope sequence.
- Responsive summaries, explicit résumé access, native keyboard disclosure, and a separately scrollable code excerpt.

## Priority issues

1. **P2 — Contact recovery advice conflates all failures.** `src/pages/contact.astro` previously suggested retrying verification for every response/network error. Distinguish existing HTTP categories and unconfirmed delivery, retain inputs, and expose an actionable email link. Suggested command: `$impeccable harden`.
2. **P2 — Evidence key does not match public project labels.** `src/pages/about.astro` used Portfolio lab and Client / employment while Work used Independent project and Contract engagement. Align labels only; preserve definitions and internal provenance. Suggested command: `$impeccable clarify`.

## Cognitive load and personas

Low cognitive load: seven of eight checks passed. Five familiar primary destinations narrowly exceed the checklist's four-option threshold; that does not justify redesigning navigation. Grouping, hierarchy, progressive disclosure and carried role context work well.

- New recruiter: fast role/identity scan; evidence-key mismatch adds interpretation effort.
- Mobile visitor: résumé is prominent; at 390×844 the Relevant work heading starts around y=792 and the rack spans roughly 886px before further work. This is a future attention/spacing tradeoff, not an automatic layout change.
- Keyboard visitor: sampled Space/Enter disclosure and visible focus worked; not a comprehensive assistive-technology audit.

The illustrative model is a memorable peak and the direct contact route gives a reassuring ending. Small mobile utility icons lose visible labels but retain accessible names and contextual alternatives.

## Detector synthesis

One source scan returned 37 advisories: 35 design-system-font-size, one codex-grid-background, one design-system-color. There were 36 in global.css and one in ProjectEvidence.astro. The drafting grid, vellum, deliberate annotation typography and identity lettering are approved; they are not confirmed defects merely because the detector flags them. Collaboration prose at 15px is a small specification residue, with no demonstrated readability failure. The stale generated design.json remains untouched.

Browser injection executed on Home, Work and Contact: 16, 37 and 15 emitted findings respectively, repeating shared chrome warnings. Instrumented desktop width was contaminated by detector overlays; uninstrumented pages and sampled mobile pages fit. The blank rack in native screenshots is unresolved capture evidence, not proof of a live model failure. Final implementation verification should inspect clean rendering.

## Minor observations and questions

Preserve the five routes, current mobile reading order, rack, career facts, role mappings and themes. A future design decision may shorten the rack interval or bring the first mobile project title earlier. No new visual direction is needed for the two fixes.

Questions skipped: only two Priority Issues; the user already authorized improvements from the findings.

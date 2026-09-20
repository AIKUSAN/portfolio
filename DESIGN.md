---
name: Lorenz Tazan Infrastructure Operations Manual
description: Evidence-led technical portfolio rendered as a responsive infrastructure field document.
colors:
  vellum: "#f1efe5"
  raised-vellum: "#f7f4ea"
  navy-black: "#17242c"
  graphite: "#3f5663"
  survey-rule: "#6f8590"
  rule-soft-light: "rgba(23, 36, 44, 0.23)"
  oxide: "#c24d2c"
  oxide-deep: "#a93b20"
  blueprint: "#315f7d"
  focus-blue: "#087daf"
  night-film: "#0c151c"
  night-raised: "#121f28"
  instrument: "#e9e7dc"
  instrument-soft: "#b7c6cc"
  night-rule: "#7893a1"
  rule-soft-dark: "rgba(210, 226, 232, 0.22)"
  night-oxide: "#ef7755"
  night-oxide-deep: "#ff8969"
  night-blueprint: "#79a9c8"
  night-focus: "#7dd3fc"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3rem, 4.8vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  data:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.055em"
rounded:
  control: "2px"
  plate: "3px"
spacing:
  xs: "0.4rem"
  sm: "0.65rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.2rem"
  section: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.navy-black}"
    textColor: "{colors.vellum}"
    typography: "{typography.data}"
    rounded: "{rounded.control}"
    padding: "0.7rem 0.9rem"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.navy-black}"
    typography: "{typography.data}"
    rounded: "{rounded.control}"
    padding: "0.7rem 0.9rem"
    height: "44px"
  operation-record:
    backgroundColor: "{colors.raised-vellum}"
    textColor: "{colors.navy-black}"
    rounded: "{rounded.plate}"
    padding: "0"
  form-field:
    backgroundColor: "{colors.raised-vellum}"
    textColor: "{colors.navy-black}"
    rounded: "{rounded.control}"
    padding: "0.72rem 0.75rem"
---

# Design System: Lorenz Tazan Infrastructure Operations Manual

## Approved UI refinement — September 2026

### Recruiter footer and contact answers

The closing résumé/contact action remains primary. Below it, the shared footer reuses the five-route navigation and adds compact Connect and Information groups, followed by a copyright and document-revision strip. Meaningful footer labels are at least 12px; links use 16px body type and 44px targets. The groups wrap or stack in document order without introducing a second mobile-menu controller.

Contact's “For hiring teams” section uses four independent native disclosures: role interests, explicit résumé-track choices, project provenance, and contact channels. The two explicit PDF links are not role-controlled. The form has a visible, associated contact privacy note describing Turnstile verification and forwarding through Cloudflare to Gmail, without retention or compliance promises. Footer deep links retain the selected role and their anchors. These sections are static HTML; no FAQ schema, new JavaScript, tracking, page, or backend is introduced.

### Usability follow-up

The mobile header uses a labeled Menu / Close disclosure at 620px and below, next to the theme control. Its five links open in document flow as full-width 48px rows with a clear current-page state. Escape returns focus to the menu button; leaving the header closes the disclosure. Navigation DOM order follows the rendered header rows across breakpoints. Initialization is synchronous before the page content; without JavaScript or if enhancement fails, all links remain visible. Tablet and desktop navigation retain their existing presentation. No framework or animation dependency is added.

About's evidence key mirrors the visible Work labels: Contract engagement, Independent business, Sanitized architecture, and Independent project. Internal provenance values and definitions are unchanged.

Contact recovery distinguishes invalid input, verification failure, temporary delivery unavailability, and an unconfirmed network request using the existing API status contract. Every failure retains the visitor's form content and exposes a direct email recovery link next to the status message. Loading announces a busy form; success resets it to the selected role. Recovery uses the existing blueprint/focus tokens and a 44px link target. No new service or client island is introduced.

### Evidence-first refinement

Compact records lead with a concise result or implemented work. Native disclosures continue the review as contribution → decisions → evidence → scope; they do not repeat the visible result. Independent projects retain the internal `portfolio-lab` provenance but use the visitor-facing label **Independent project**.

Evidence is a build-time data contract: descriptive artifact link, kind, caption and pinned commit URL, with an optional escaped source excerpt or authored static SVG. No live repository requests, executable examples or client islands are used. Source snippets have their own keyboard-accessible horizontal scroll area; the page itself must reflow.

The regional network plate is a simplified conceptual sequence derived from the published documentation. It omits locations, addressing, capacity and performance figures. Both themes inherit the same ink, blueprint and oxide tokens. Client service records show approved contributions and scope without empty artifact placeholders, invented incidents or testimonials.

The hero rack, role transitions, primary résumé action and mobile reading sequence are unchanged.

The decorative role marker has its own six-pixel-padded clipping overlay. This prevents stale transformed overflow after narrow WebKit resizes without clipping the interactive links or their focus rings; motion timing and controller logic remain unchanged.

The Operations Manual identity is unchanged. The implemented reading scale now uses 16px narrative text, 14px navigation and technology lists, 12px minimum meaningful annotations, and 13px form/control labels. Headings use a 48–72px desktop range and 44–52.8px mobile range. Decorative serial metadata may remain smaller. Atkinson explains; JetBrains is reserved for document labels and controls.

The desktop rail is 204px. The homepage places one matching work summary beneath the role and résumé controls, beside the rack on desktop and before it on mobile. Additional summaries appear once below. Full Work records lead with provenance and results, with native disclosures for the evidence narrative. Role focus travels through internal links; displayed project order is also DOM order. The rack stamp says Illustrative model and does not imply project approval. Every page ends with résumé/contact actions.

These are intentional, user-approved changes from the original typography and layout specification below. The generated design.json sidecar is deliberately not refreshed.

## Overview

**Creative North Star: "The Inspected Operations Manual"**

The portfolio behaves like a field document prepared for review: dense but ordered, technical without becoming ornamental, and explicit about which evidence is professional, sanitized, or laboratory work. Its visual confidence comes from scale, one-pixel construction rules, original infrastructure geometry, and restrained inspection color—not from product-dashboard conventions.

The system has two equal operating scenes. Drafting-paper mode uses warm vellum under navy-black ink; night operations uses navy-black film under pale instrument text. Both preserve identical hierarchy and evidence semantics.

**Key Characteristics:**

- Compressed display lettering with hyperlegible body copy and measured mono data.
- One-pixel rules, square plates, small radii, and technical grid alignment.
- Oxide red is an inspection accent; blueprint blue marks diagrams and provenance.
- Every project leads with its result, then opens into contribution → decisions → evidence → scope.
- Illustrative infrastructure geometry is clearly separated from factual outcome claims.

## Colors

The palette pairs a warm technical-paper neutral with navy-black ink, then reserves oxide and blueprint colors for annotation and evidence structure.

### Primary

- **Oxide Inspection Red** (`#c24d2c`; night `#ef7755`): active navigation, field annotations, sequence labels, and approved outcomes.

### Secondary

- **Blueprint Blue** (`#315f7d`; night `#79a9c8`): diagram detail, provenance labels, and technical traces.

### Neutral

- **Technical Vellum** (`#f1efe5`): light-mode ground.
- **Raised Vellum** (`#f7f4ea`): restrained plate fill.
- **Navy-Black Ink** (`#17242c`): light-mode text, rules, and selected controls.
- **Night Drafting Film** (`#0c151c`): dark-mode ground.
- **Pale Instrument Text** (`#e9e7dc`): dark-mode text and selected surfaces.
- **Survey Rule** (`#6f8590`; night `#7893a1`): secondary construction lines.

**The Inspection Accent Rule.** Oxide identifies state, sequence, or approval; it never becomes a large decorative field.

**The Paired Theme Rule.** Dark mode swaps paper and ink roles while preserving oxide and blueprint semantics; it is not a separate visual brand.

## Typography

**Display Font:** Barlow Condensed (self-hosted, sans-serif fallback)<br>
**Body Font:** Atkinson Hyperlegible (self-hosted, sans-serif fallback)<br>
**Label/Mono Font:** JetBrains Mono Variable (self-hosted, monospace fallback)

**Character:** Display type is compressed and equipment-label direct. Body text stays unusually legible at dense record sizes, while mono is reserved for indexes, measurements, provenance, controls, and document metadata.

### Hierarchy

- **Display** (700, `clamp(4.2rem, 7vw, 6rem)`, 0.82): primary route and hero designations, balanced and limited to 12 characters of measure.
- **Record Title** (700, `1.25rem`, 1): uppercase project and capability identifiers.
- **Section Headline** (700, `2rem`, 1): interior prose and panel headings.
- **Body** (400, `1rem`, 1.62): narrative copy, kept near 52–76 characters where the layout permits.
- **Data Label** (700, approximately `0.52rem–0.7rem`, tracked uppercase): indexes, provenance, outcomes, and controls.

**The Three-Instrument Rule.** Barlow names the subject, Atkinson explains it, and JetBrains measures it; do not exchange their roles for variety.

## Layout

Desktop uses a 238px identity rail beside a fluid content sheet. The first viewport divides into a designation bay and a wider assembly plate, followed by a three-column evidence ledger. Page padding is fluid from 1.1rem to 2.75rem.

At 1180px the rail narrows and evidence uses two columns. At 900px the rail becomes a compact identity header, navigation moves below the manual title, and hero/evidence structures become one-column. At 620px controls retain 44px targets, role lenses stack, and project records become full-width inspection sheets.

The background’s 128px drafting grid is legitimate only because the interface is explicitly a blueprint and measuring surface. Content remains readable if the grid is removed.

## Elevation & Depth

The system is flat by default. One-pixel borders and tonal plate fills define layers; only evidence records receive a low, soft shadow, with a slightly warmer focus shadow when matched to the active role lens. There is no decorative glass, blur, or hard offset shadow.

**The Drafting-Sheet Rule.** Prefer a rule or a tonal shift before adding a shadow; depth supports evidence grouping, never spectacle.

## Shapes

Corners are nearly square: 2px on controls and fields, 3px on plates and role lenses. Hairline solid rules establish structure; dashed rules mark provenance and secondary record boundaries. Circular geometry is reserved for diagram fasteners and target marks, not for pill controls.

## Components

### Buttons

- **Shape:** near-square 2px radius, one-pixel ink border, minimum 44px height.
- **Primary:** navy-black fill with vellum text and compact mono uppercase labeling.
- **Hover / Focus:** primary moves to deep oxide; focus uses a 2px blue ring offset by 4px.
- **Secondary:** transparent at rest and reverses to ink on hover.

### Role Lenses

Three technical selectors combine an authored line icon, compressed role title, small numeric index, and directional arrow. The selected lens reverses paper and ink and sets `aria-current="true"`; role selection changes emphasis, never data visibility.

### Motion — Local First Pass

- A blueprint rule traces across the header and heading in 640ms on load. Text and the underlying rules remain visible; no content waits for an entrance animation.
- Ordinary same-page role clicks update the URL, matching résumé, capability emphasis, and actual project DOM order immediately. A 220ms oxide marker movement and 260ms, 6px evidence settle explain the change without remounting the WebGL rack. Native modified clicks and Back/Forward remain available.
- Utility icons move 3px on pointer hover or keyboard focus, with 160ms easing. Theme colors switch immediately to avoid transient low-contrast text.
- Reduced-motion preferences skip these effects, including when changed during an animation. Animation API failure leaves the completed content state usable; no new framework, island, dependency, or continuous loop is added.

### Cards / Containers

Operation records are square inspection plates with a number bay, title bay, provenance rule, three evidence sections, collaboration footer, technology labels, and outcome block. The structure is content-specific and must not be generalized into same-size icon cards.

### Inputs / Fields

Fields use a 1px ink border, 2px radius, raised-paper fill, oxide caret, and explicit mono labels. Error and success messages use oxide-deep and blueprint respectively. Disabled submit controls remain visible at 60% opacity and use a wait cursor.

### Navigation

Primary navigation uses compact mono uppercase labels within a ruled header. Hover and current state add oxide text, a faint oxide wash, and vertical rules. Below 620px, a labeled disclosure opens full-width navigation rows with 16px body text and 48px targets; it never requires horizontal scrolling. All links stay visible as a progressive-enhancement fallback.

### Infrastructure Assembly Plate

The signature SVG uses exact construction geometry, blueprint detail lines, oxide fasteners, and an explicit note that it is illustrative. It may index capability families, but it must never display invented production capacity, uptime, cost, or performance metrics.

## Do's and Don'ts

### Do:

- **Do** preserve the identity → role lens → evidence → résumé/contact reading order.
- **Do** label every project with one approved provenance category.
- **Do** use original SVG geometry for technical systems and a clear illustrative disclaimer.
- **Do** keep all primary content in prerendered HTML and preserve keyboard, no-JavaScript, and reduced-motion behavior.
- **Do** use mono only for document controls, indexes, measurements, provenance, and operational metadata.

### Don't:

- **Don't** publish unverified metrics, credentials, employers, responsibilities, or production outcomes.
- **Don't** restore location, immigration, or other private job-search context.
- **Don't** add generic dashboard cards, rounded pills, glass panels, gradient text, or decorative data widgets.
- **Don't** use field labels as generic marketing kickers on ordinary route headings.
- **Don't** introduce photography or remote decorative assets unless their provenance and relevance are confirmed.

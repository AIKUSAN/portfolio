# Lorenz Tazan — Infrastructure Operations Manual

An evidence-led portfolio for IT support, systems, network, infrastructure, and platform roles. The interface uses the approved Infrastructure Operations Manual direction: technical-paper and night-operations themes, an identity rail, an original infrastructure assembly diagram, and project records organized as Situation → Intervention → Verified Result.

## Architecture

- Astro with strict TypeScript
- Cloudflare Workers adapter
- Prerendered public pages with a lazy-loaded Three.js rack inspector on Home
- One Worker serving `POST /api/contact` and the retired `/blog` 410 response
- Cloudflare Turnstile and a restricted Email Service binding
- No database, Supabase, CMS, authentication, analytics, R2, D1, or remote image dependency

The Worker is named `lorenztazan-portfolio` in `wrangler.jsonc`. Astro generates the deployable Worker entry and static-asset binding during `npm run build`; do not replace that with the legacy `dist/_worker.js/index.js` entry.

The sole source repository is `AIKUSAN/portfolio`. This application replaces the legacy Next.js tree in place while preserving repository identity and Git history. The separate-repository strategy is superseded; do not recreate the deleted duplicate. Cloudflare's native Workers Builds integration owns deployment; GitHub Actions is validation-only. On 2026-09-13, the user explicitly approved retiring GitHub Pages before the Cloudflare replacement is verified, accepting public-site downtime. Pages publishing and its repository-level custom-domain association are disabled; the legacy publishing workflow remains disabled. Do not automatically restore Pages. The later domain-launch plan authorizes only the specified protected-domain preparation and SPF repair; public exposure and real contact delivery retain separate approval gates. Repository visibility remains unchanged during this launch; later privatization requires separate approval. Repository privacy does not protect a hosted preview: configure Cloudflare Access separately. See `DEPLOYMENT.md` for the current state, dashboard ownership of domain/Access settings, and release gates.

Dependabot's scheduled version-update PRs and automatic security-update PRs are disabled. Vulnerability alerts, dependency visibility, secret scanning, CodeQL, and CI dependency audits remain enabled. Dependency upgrades now require an intentional reviewed change; closing an old update PR does not mean its reported vulnerability is fixed.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Role-aware overview and strongest evidence records |
| `/work` | Full evidence register |
| `/experience` | Employment history and capability matrix |
| `/about` | Working approach and education |
| `/contact` | Direct channels and verified contact form |
| `/blog` | Intentional `410 Gone` response |

Legacy `/projects`, `/skills`, and `/education` URLs redirect to their current replacements. Legacy résumé paths redirect to the systems/cloud résumé.

## Role lenses

The query interface is `?focus=support|systems|platform`. A lens changes the headline, project emphasis, supporting copy, and résumé link while leaving the full background visible.

- Support → `/resume/lorenz-tazan-it-support.pdf`
- Systems and Platform → `/resume/lorenz-tazan-systems-cloud.pdf`

Project evidence is explicitly classified as `client-employment`, `independent-business`, `sanitized-architecture`, or `portfolio-lab` in `src/data/site.ts`.

## Local development

Requirements: Node.js 22.12 or newer and npm.

```bash
npm ci
cp .dev.vars.example .dev.vars
npm run dev
```

Local development and PR builds do not need Turnstile credentials; the page retains the direct email option when verification is unconfigured. Contact acceptance tests use network fixtures and never send messages. The Worker rejects Cloudflare's dummy secret keys even locally, so tests do not add a production bypass. Real secret values must remain uncommitted.

## Verification

```bash
npm run lint
npm test
npm run build
npm run test:worker
npx wrangler types --check
```

For rendered-browser checks, install Chromium once, run Astro on the isolated acceptance port, and execute the suite:

```bash
npx playwright install chromium
npm run dev -- --host 127.0.0.1 --port 4329 --strictPort
npm run test:browser
```

The browser suite checks role URLs, both themes at 375/768/1440 widths, rack selection and rotation, assembly/reset, keyboard controls, reduced-motion opt-in, WebGL initialization/context-loss fallbacks, horizontal overflow, no-JavaScript readability, axe WCAG rules, redirects, the 410 response, and both résumé downloads. To test the production Worker locally, run `npm run build`, start `npm run preview -- --port 4331`, then run `PORTFOLIO_TEST_URL=http://127.0.0.1:4331 npm run test:browser`.

`scripts/acceptance-security-schema.mjs` adds local-only Chromium, Firefox and WebKit smoke checks with CSP enforcement enabled. Start Wrangler with `--local-protocol https`, set `PORTFOLIO_TEST_URL` to the HTTPS loopback Worker and `PORTFOLIO_REVIEW_DIR` to an external review directory. HTTPS lets WebKit honor `upgrade-insecure-requests`; the runner accepts only this local development certificate and does not certify hosted TLS. It checks effective static/dynamic response headers, canonical JSON-LD, themes, reflow and axe; Turnstile is fixture-only and no contact is submitted. Install the test browser binaries separately if they are unavailable.

## Structured data

Initial HTML contains Schema.org JSON-LD from `src/lib/structured-data.ts`: the approved Person, a Home-only WebSite, About ProfilePage and Contact ContactPage. Stable entity IDs and canonical URLs exclude role query parameters. Retired/noindex pages emit no schema. Serialization escapes HTML script delimiters. No new career claims, ratings, review counts, location, LinkedIn profile, search action or visitor JavaScript are added. Structured data does not guarantee rankings or rich results.

## 3D rack inspector

The homepage rack is procedural WebGL geometry, not clipped image layers. `src/lib/rack-model.ts` owns the four equipment groups and shared geometry/materials; `rack-scene.ts` owns rendering, raycasting and camera controls; `rack-controller.ts` progressively enhances the existing Astro picture and HTML buttons.

- Drag or use arrow keys on the canvas to rotate. Use the zoom controls or plus/minus keys to zoom; Home restores the camera.
- Hover/focus highlights a capability without moving it. Picking uses only solid equipment surfaces, never decorative outlines or guides. Click a chassis or its label to lock and pull it forward; click again or press Escape to clear it.
- Assemble closes the stack; Reset view restores the exploded arrangement and camera.
- Rendering is demand-driven and pauses offscreen. Repeated hardware details are instanced, pixel density is capped, and model resources are disposed when switching to the static illustration.
- The responsive AVIF/WebP/PNG poster remains the no-JavaScript/WebGL fallback. Reduced-motion and data-saving preferences default to the poster with an explicit 3D opt-in; reduced-motion opt-in has no animated assembly or camera damping.
- Light and dark materials follow the existing theme controller without changing role focus or evidence content. No external model, texture, animation framework, or React island is used.

## Contact boundary

`POST /api/contact` accepts `name`, `email`, `message`, optional `focus`, the Turnstile token, and an invisible honeypot. It enforces input limits, exact same-origin requests, Turnstile action/hostname verification, HTML escaping, and generic public responses. Messages are sent only through the `EMAIL` binding to the configured verified destination and are never stored.

The handler caps actual encoded body bytes at 12,000 before form parsing, including ignored fields and multipart overhead. Content-Length is only an early rejection hint. Overflow, read failures and parse failures retain generic `400` responses; valid multipart and URL-encoded inputs retain their existing behavior. Dynamic route headers match `public/_headers` through a tested policy module; framework-generated responses still require separate hosted verification.

Native Workers Builds requires a real `PUBLIC_TURNSTILE_SITE_KEY` at build time. `PORTFOLIO_DEPLOYMENT_CHECK=1 npm run build` runs that same deployment check locally. The runtime `TURNSTILE_SECRET_KEY` is separate and must be configured in Worker secrets, never public build variables. Missing or dummy secrets fail closed with the existing generic failure response; an ordinary successful local/PR build does not certify contact readiness.

See `DEPLOYMENT.md` for the staged Cloudflare Builds setup and production cutover gate.

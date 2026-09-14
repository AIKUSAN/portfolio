# Agent Runbook

## System Architecture

This checkout is the Astro Operations Manual portfolio, using strict TypeScript, authored CSS, and a progressively enhanced Three.js rack. See `README.md` for the current architecture. Preserve the dirty legacy Next.js checkout. The approved Astro source is integrated into the existing `AIKUSAN/portfolio` repository. On 2026-09-13 the user superseded the keep-Pages-live requirement and explicitly approved retiring Pages before Cloudflare is ready, accepting public-site downtime.

## PDF Generation SOP

PDF generation must NOT rely on agent hallucination. It requires manually triggering `npx md-to-pdf` (or equivalent) and must involve visual DOM verification using the built-in browser. Raw HTML `<div style="page-break-before: always;"></div>` is required for pagination in Markdown.

## GitHub MCP Protocol

Prefer the GitHub MCP connector for supported repository operations and Git/GitHub CLI for local history, bulk source integration, and validation. The MCP connector and GitHub CLI use separate authorization; `gh api` is a CLI command, not MCP. The user explicitly approved Chrome as the fallback for repository administration unavailable through MCP or blocked through CLI authorization. Verify the exact repository identity before destructive actions and follow browser confirmation requirements. Never use this exception for unrelated repositories or broader permission grants.

## UI Styling Rules

Preserve the approved Operations Manual light/dark tokens, role lenses, accessible navigation, and evidence model in `DESIGN.md`. Do not refresh `.impeccable/design.json` without an explicit document-refresh request.

## Hosting and source boundaries

Use Cloudflare Workers Builds with `AIKUSAN/portfolio` as the sole source repository. The separate-repository strategy is superseded. Do not delete, rename, formally archive, or rewrite the history of `AIKUSAN/portfolio`. Preserve the legacy source with its dated tag and verified mirrors; make further changes through normal commits and reviewed PRs. GitHub Pages and its repository custom-domain association are disabled; keep the legacy publishing workflow disabled. Preserve the account-level verified domain and its TXT record. Do not restore Pages, redirect the shared `origin` remote, or edit the dirty legacy checkout.

Follow `DEPLOYMENT.md`. Repository visibility remains unchanged during the current domain launch; later privatization of this same repository requires separate approval. The accepted offline interval is not blanket authorization for credentials, DNS, or public exposure. The user subsequently approved the specific SPF repair and protected apex/www domain preparation in the current deployment runbook. Real email delivery and the change from All traffic to Previews only Access remain separate approval gates. Never use the PTC account, create another repository, or enable paid services without separate approval. Preserve backups through at least the seven-day rollback window; use verified Cloudflare versions for application rollback, not an unapproved return to public GitHub Pages.

The user has now authorized the protected-preview launch plan. The `cloudflare-personal` MCP connection is verified read-only against personal account `ab8306e92557d6b7fcfd56774bb9c2e5`; do not confuse it with the older connector or Wrangler login. Obtain explicit confirmation at credential creation and other security-sensitive grant steps. Use the narrowly scoped user token and per-Worker account-members Access protection described in `DEPLOYMENT.md`. Keep all public URL surfaces disabled until that policy is confirmed. Pause at required user verification; do not infer permission from an unattended request.

Native Workers Builds sets `WORKERS_CI=1`, which enables the real-site-key deployment guard. Never override it to bypass validation, embed dummy keys, or reintroduce the `dummy-key-pass` hostname. Contact tests must mock external services and send no messages. The runtime secret is never a public build variable.

The first native build succeeded on 2026-09-13 local time. The real Worker now has per-Worker **All traffic** Access protection with **Cloudflare account members — Allow**, confirmed before the reviewed URL-enablement change. Preserve that external Access application when deploying; Wrangler's URL flags do not provide authentication themselves. The narrow `portfolio-workers-builds` token is registered and working; do not repeat token creation or registration. Gmail destination status is verified, but this does not authorize mail DNS changes or a real contact send. Consult the latest hosted-bootstrap record in `DEPLOYMENT.md` before using historical preparation notes.

The latest domain-launch checkpoint records the completed single-record SPF repair and the unresolved Cloudflare One onboarding/custom-domain DNS conflict. Do not repeat token setup or assume an exact-hostname Access application exists. Keep domain attachment, redirects, and Access dashboard-managed; omit Wrangler route declarations and preserve the existing narrow token. Stop for required onboarding, destructive DNS confirmation, contact-send approval, and public-cutover confirmation rather than bypassing those gates.

## Security and metadata verification

Use the user's selected Codex Security workflow, not Claude Code or the removed security-guidance plugin. Keep private scan artifacts outside this temporarily public repository. A completed source scan is not certification of hosted Access, mail delivery or domain readiness. Preserve scan evidence and test the actual-byte contact boundary before public cutover. Test both form encodings, missing/understated size headers, cancellation and legitimate submissions with external services mocked.

Keep metadata in initial HTML, truthful and canonical: Person plus Home WebSite, About ProfilePage and Contact ContactPage. Do not add unsupported ratings, jobs, location, dates or social accounts. Run the CSP-enabled local security/schema smoke script in addition to presentation acceptance; never treat a bypassCSP browser context as policy enforcement evidence.

## Dependency maintenance

Scheduled Dependabot version-update PRs and automatic security-update PRs are disabled by user choice. Keep vulnerability alerts, dependency visibility, secret scanning, CodeQL, and CI dependency audits enabled. Do not reintroduce Dependabot configuration or weaken required checks without approval. The twelve legacy update PRs were closed without merging; their branches and discussions remain preserved, and closure is not evidence that a vulnerability was fixed.

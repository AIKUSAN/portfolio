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

Follow `DEPLOYMENT.md`. The source stays temporarily public until explicit Cloudflare cutover approval and successful cutover; then make this same repository private. The accepted offline interval does not authorize Cloudflare credentials, deployment, DNS edits, or domain activation. Protected preview setup, real email delivery, and domain cutover remain separate release gates. Never use the PTC account, create another repository, or enable paid services without separate approval. Preserve backups through at least the seven-day rollback window; after privatization, roll back with Cloudflare versions, not an unapproved return to public GitHub Pages.

## Dependency maintenance

Scheduled Dependabot version-update PRs and automatic security-update PRs are disabled by user choice. Keep vulnerability alerts, dependency visibility, secret scanning, CodeQL, and CI dependency audits enabled. Do not reintroduce Dependabot configuration or weaken required checks without approval. The twelve legacy update PRs were closed without merging; their branches and discussions remain preserved, and closure is not evidence that a vulnerability was fixed.

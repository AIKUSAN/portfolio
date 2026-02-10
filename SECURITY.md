# Security policy

## Report a vulnerability

Email `lorenztazan@gmail.com` with the subject `[SECURITY] Portfolio Vulnerability Report`. Include reproduction steps and impact; do not post credentials or visitor information publicly. Email is also the public reporting channel when the source repository is private.

## Current architecture

- Astro prerenders the portfolio pages. A Cloudflare Worker handles `POST /api/contact` and the retired `/blog` 410 response.
- The contact handler validates input, origin, and Turnstile responses; formats escaped email; restricts delivery to the configured verified destination; and returns generic errors.
- Messages are not stored in a database. Logs must never include contact bodies, visitor addresses, tokens, or secrets.
- Runtime secrets belong in Cloudflare, not Git. Local `.env*` and `.dev.vars` files are ignored. `.dev.vars.example` contains an empty secret assignment and public-key setup guidance, not working credentials.
- Actual contact body bytes are bounded before parsing; declared length and post-parse field lengths are not substitutes for that boundary.
- Static response headers are defined in `public/_headers`. Application-generated dynamic responses use the matching tested `src/lib/security-headers.ts` policy; verify framework-generated and hosted responses separately.
- Dependencies are lockfile-controlled. PR/manual validation runs tests, Astro checks, a build, and a dependency audit including development dependencies. Cloudflare Workers Builds owns deployments.

## Verification boundaries

Local tests do not prove production configuration or email delivery. Before the domain cutover, verify real Turnstile keys, allowed hostnames, the restricted email binding and verified inbox, preview access protection, response headers, logs, and rollback.

No claim is made that branch protection, hosted secret scanning, or paid CodeQL is enabled. The legacy CodeQL workflow skips private repositories unless a separately approved eligible setup replaces it. Do not enable paid services without approval.

Public source must exclude credentials, private client records, editable résumé sources and internal review artifacts. Approved downloadable résumé PDFs remain public. Review supporting documents as well as files served by Astro.

Removing a tracked file does not erase earlier commits, forks or cached copies. Suspected credential exposure requires separate revocation and historical-remediation review.

Residual limitations include inline-script CSP permissions, no application-level rate limiter, and limited source-scan coverage. Passing checks are not a claim of complete security.

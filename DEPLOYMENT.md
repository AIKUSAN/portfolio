# Cloudflare deployment

The public portfolio is served at https://lorenztazan.com by the `lorenztazan-portfolio` Worker. The source repository is `AIKUSAN/portfolio`; GitHub Pages is disabled. No separate Pages project is used.

## Release workflow

1. Start a focused branch from current `main`, preserving other working checkouts.
2. Run `npm ci`, `npm test`, `npm run lint`, `npm run build`, `npm run test:worker`, and `npm audit`.
3. Review the diff, including supporting documents and public artifacts. Never commit credentials, private client records, editable résumé sources, or internal review output.
4. Open a pull request. Wait for the required Build Portfolio and CodeQL checks; preserve branch protections and linear history.
5. Merge the reviewed change normally. Native Cloudflare Workers Builds deploys `main`; GitHub Actions validates only.
6. Verify the resulting deployment and public pages. Confirm preview URLs remain login-protected.

## Native Workers Builds

- Repository root; production branch `main`.
- Node.js 22, at least 22.12.0; install from the committed lockfile.
- Build command: `npm run build`.
- Production deploy: `npx wrangler deploy`.
- Non-production deploy: `npx wrangler versions upload`.
- Keep the existing restricted deployment credential. Do not broaden permissions or create replacement credentials as part of an ordinary source change.

## Configuration ownership

The dashboard owns the custom domain, `www` redirect and Cloudflare Access configuration. Keep custom-domain routes out of Wrangler so native builds do not require DNS permissions.

The main domain is public. Worker Access protects version previews, and an exact-hostname Access application protects the stable `workers.dev` hostname. Verify both anonymously, including asset requests, after relevant changes. Do not add an account-wide bypass.

The `www` redirect returns 301 to the apex while preserving path and query. Preserve mail and verification DNS records. GitHub Pages must not be restored automatically.

## Contact configuration

Set the public Turnstile site key as a build variable and its secret as a Worker runtime secret. Never put the secret in Git, public variables, logs or review artifacts. Native builds reject absent or dummy public keys; the contact handler rejects absent or dummy secrets.

Keep the restricted email destination, fixed domain sender and visitor Reply-To. Local Worker fixtures must not send real messages. A real delivery test requires separate approval and confirmed inbox receipt.

## Rollback and release checks

Before a release, record the current Worker version and relevant dashboard configuration in a private external checkpoint. Retain it for at least seven days.

For an application regression, restore the recorded verified Worker version through Cloudflare and retest. If preview privacy fails, restore the Worker's All traffic protection immediately, then investigate. Do not restore retired GitHub Pages hosting.

Check five routes, all role lenses, résumé downloads, legacy redirects, `/blog` returning 410, `www` forwarding, security headers and invalid contact rejection. Source-only documentation changes can reuse unchanged UI evidence; they still require build and deployment verification.

## Public-source boundary

Only approved résumé PDFs are published. Editable sources and internal planning/security reports are retained in private local backups outside this repository. PDF digest tests detect unreviewed replacement of the approved files.

Normal deletion removes a file from the current tree, not historical commits, forks or caches. History rewriting and any credential rotation require separately scoped approval.

Dependency alerts remain enabled. Refresh stale dependency-graph results against the exact release lockfile rather than dismissing alerts without evidence. See `SECURITY.md` for reporting and verification limitations.

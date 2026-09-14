# Cloudflare Builds deployment runbook

## Current state

The sole portfolio repository is `AIKUSAN/portfolio` (repository ID `1154119236`). On 2026-09-13 the user superseded the separate-repository strategy and authorized an in-place replacement with the approved Astro source at `130a375a8726561e3916e0b912139229859ca03d`, preserving history through a normal integration branch and PR. The extra `AIKUSAN/portfolio-astro` (ID `1368189361`) was deleted through the authenticated Chrome interface after verified backups. Do not recreate it or formally archive the original repository. The first native Cloudflare build has succeeded; protected hosted acceptance and domain cutover remain pending.

### Hosted bootstrap verified on 2026-09-13 (2026-09-14 UTC)

- Native Workers Builds is connected to `AIKUSAN/portfolio`, production branch `main`, with `npm run build`, `npx wrangler deploy`, repository root `/`, and build variables `NODE_VERSION=22` and the real public Turnstile site key. Non-production builds use `npx wrangler versions upload`.
- Build `890b1053-33f7-4e20-8045-0a0f3375b807` successfully uploaded 49 assets and Worker version `9e685cf7-69f0-4f68-b8c6-c113abe2e7d8` from the prepared release. Deployment `e653f034-3174-4d37-ba7a-cf510aee0c83` initially had both Worker URL surfaces disabled, verified by API.
- The Worker's Access page confirms **All traffic**, **Require login on every URL: production and previews**, and **Cloudflare account members — Allow**. Access application `01621fd7-ec49-4216-b214-c946955eec08` belongs to the personal account. No account-wide policy or PTC configuration was changed.
- With that prerequisite confirmed, this reviewed configuration enables `workers_dev` and `preview_urls`. Verify anonymous denial immediately after deployment. Access is an external Cloudflare policy, not enforced by these two Wrangler flags; never remove or bypass it during preview work.
- Managed Turnstile widget `lorenztazan-portfolio-contact` exists for `lorenztazan-portfolio.lorenztazan.workers.dev` and `lorenztazan.com`, with pre-clearance off. Store its existing secret only as the runtime `TURNSTILE_SECRET_KEY`; never commit it or regenerate the widget unnecessarily.
- After explicit approval, the destination `lorenztazan@gmail.com` was registered and Cloudflare reported **Verified** immediately. This is not proof of contact delivery. Mail-domain readiness, any required mail DNS approval, and a separately approved inbox smoke test remain gates.
- No custom domain is attached, DNS is unchanged, and repository visibility is unchanged. Older local-preparation observations below are historical, not the current deployment status.

The approved Astro application is integrated on `main` at `f569fdce8d2f65cd3848a9dfc4d0295fc883d6b9`; its tree matches tested integration head `4647034972eb92d4d2394bac3229b6a9f56c1d93`. PR #61 was administratively closed after a timed-out GitHub merge updated `main` without reconciling the PR's merged status. Do not submit a duplicate merge. The pre-migration source revision `782533540c7a0d01e10cbb03356cc20d790bc17b` is preserved by `legacy/github-pages-2026-09-13` and local mirrors.

On 2026-09-13, the user explicitly superseded the keep-Pages-live requirement and approved disabling the old site before the Cloudflare replacement is verified. GitHub Pages publishing and its repository-level `lorenztazan.com` association are disabled; the legacy `Build & Deploy` workflow remains disabled. Public-site downtime is intentional. Do not create a maintenance site or automatically restore Pages. The repository stays temporarily public until separately approved Cloudflare cutover.

Cloudflare DNS was inspected in the personal account: the four proxied apex A records still target GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`), and proxied `www` points to `aikusan.github.io`. These DNS records were not changed by the cleanup and do not establish a Cloudflare Worker deployment. Preserve the account-level verified GitHub domain and its `_github-pages-challenge-aikusan` TXT record while legacy DNS remains. Reinspect exact records before a separately approved cutover.

Scheduled Dependabot version-update PRs and automatic security-update PRs are disabled. Keep vulnerability alerts, dependency visibility, secret scanning, CodeQL, and CI dependency audits enabled. PRs #39, #42, #45, #50, #52, #53, #54, #55, #57, #58, #59, and #60 were closed without merging, retaining their branches and discussions. Closure does not certify that any vulnerability is fixed.

The personal Cloudflare account is `Lorenztazan@gmail.com's Account` (`ab8306e92557d6b7fcfd56774bb9c2e5`), verified in the dashboard. On 2026-09-13, the separate `cloudflare-personal` MCP connection successfully read that account and listed Workers (none deployed). Its approved OAuth scopes are account read, user read, Workers Scripts read, and background access; it is not deployment authorization. The older `cloudflare-api` connector and Wrangler authorization are separate and must not be assumed to target the personal account. Never use PTC for this portfolio; verify account identity before every deployment.

The first hosting milestone is a protected Cloudflare preview. Production domain cutover remains a separate, explicit approval gate. A private GitHub repository and a version-preview URL do not themselves restrict website visitors; configure and verify preview access before sharing unpublished work.

### Local preparation verified on 2026-09-13

- Existing snapshots remain under `../Portfolio Migration Backups/2026-09-13/` and `../Portfolio Migration Backups/correction-2026-09-13-A8Yu27/`. Fresh mirrors of both repositories, the approved Astro source archive, and a complete-history bundle are under `../Portfolio Migration Backups/correction-2026-09-13-final-qtHDZ7/`. Both fresh mirrors passed `git fsck --full` and exact comparison with every advertised remote ref before deletion (18 original branches; 7 duplicate branches).
- The Astro tree replaces the legacy deployment workflow with PR/manual validation. The legacy publishing workflow was disabled before integration; the previously published Pages site was subsequently retired under the user's explicit offline-first approval.
- A compatible `npm audit fix` updated Wrangler to 4.131.1, the Cloudflare Vite plugin to 1.54.8, and Miniflare to 5.20260911.0-alpha; the vulnerable nested Sharp copy was removed in favor of 0.35.4. No forced major-version upgrade was used.
- All 41 unit tests passed; Astro checked 42 files with zero errors, warnings, or hints; the production build passed. The existing large Three.js chunk warning remains.
- The full dependency audit reported zero vulnerabilities after the update. This is a point-in-time dependency result, not a complete security certification.
- The GitHub MCP connector identifies AIKUSAN and has repository admin access, but exposes no repository-deletion operation. GitHub CLI has separate authorization; Chrome was explicitly approved for the deletion fallback. Future Cloudflare Git setup must select the existing repository, not the deleted duplicate.
- No Cloudflare deployment, DNS change, real contact-email test, or repository-wide archive operation is part of the source correction or Pages cleanup. Cleanup snapshots of main, repository/Pages settings, PR inventory, workflow state, and branch protections are retained in `../Portfolio Migration Backups/cleanup-2026-09-13-LXpnlJ/` alongside the existing migration backups.
- Wrangler now pins the personal account ID and explicitly disables `workers_dev` and `preview_urls` for bootstrap. Configure and verify Cloudflare Access before enabling either URL surface in source control. No custom-domain route is declared.
- The account-pinned production build and `wrangler deploy --dry-run` passed. An initial local Vite cache conflict with the running preview resolved on retry; no preview server or user cache was deleted.

### Protected-preview launch authorization

The user approved preparing the release and setting up a protected Worker using `AIKUSAN/portfolio`; persistent credential creation, new security-sensitive grants, mail DNS edits, real email delivery, and domain cutover retain explicit approval gates. The dashboard's existing GitHub integration lists the correct repository ID `1154119236`. An earlier unsubmitted setup referenced the deleted duplicate; do not reuse it. Use Worker `lorenztazan-portfolio`, build `npm run build`, deploy `npx wrangler deploy`, and non-production `npx wrangler versions upload`. Protect both active and version-preview traffic using a per-Worker Cloudflare-account-members Access policy. Do not change unrelated account-wide Access settings. A draft setting is not an active Access application or a deployed Worker.

The earlier token-registration blocker is resolved. The existing custom user token `portfolio-workers-builds` is registered and selected in native Builds; its expiry is `2026-12-12 23:59:59 UTC`. The first native deploy succeeded with the approved narrow scope. The dashboard's generic warning about additional storage, AI, route, and email permissions did not prevent this deployment; do not add those permissions speculatively. Never substitute the broad **Create new token** template. The temporary registration credential is not the deployment token and is not needed for subsequent builds.

After explicit confirmation, create a custom **user** deployment token under My Profile → API Tokens, named `portfolio-workers-builds`, with a proposed 90-day expiry. Workers Builds currently supports user tokens, not account-owned tokens. Limit Account Settings read and Workers Scripts edit to the personal account; include User Details read and Memberships read. Do not include PTC resource permissions, database/storage services, or zone routes. Worker edit is account-scoped, not limited to this Worker's name. Do not restrict this CI token to the local computer's IP. Keep its value out of Git, chat, screenshots, and logs; record its expiry and rotation procedure without recording the token itself. Verify it is selectable in Workers Builds. If it is unavailable or deployment needs another permission, stop and report the exact issue rather than selecting the broad automatic token.

### Turnstile release safeguards

Cloudflare injects `WORKERS_CI=1` during native Builds. The npm `prebuild` guard requires a non-placeholder, non-dummy `PUBLIC_TURNSTILE_SITE_KEY` in that environment, before Astro or Cloudflare's isolated prerendering runtime starts. Keep the native build command as `npm run build`, not a direct `astro build` invocation. Run `PORTFOLIO_DEPLOYMENT_CHECK=1 npm run build` to exercise the same check locally, supplying the real public key through the build environment. The check never prints a rejected key. A syntactically acceptable key is not proof that its widget is active: protected-preview verification remains required.

Ordinary local and PR builds remain available without credentials, but render no implicit Turnstile test key and are not deployment-ready. Form tests use local network mocks only. The runtime endpoint fails closed with the existing generic `500` response if `TURNSTILE_SECRET_KEY` is missing, malformed, or a documented dummy key, before contacting Turnstile or the email binding. It rejects the `dummy-key-pass` hostname even if the configured expected hostname is incorrect. There is no deployed test bypass.

The contact endpoint uses the installed Astro adapter's `cloudflare:workers` environment import, not the removed `Astro.locals.runtime.env` API. `npm run test:worker` starts an isolated loopback-only Worker with a forced invalid fixture secret and verifies the real route's JSON responses, origin/input rejection, honeypot behavior, and method handling. GitHub's existing Build Portfolio check runs this after building. Successful delivery remains a separate, approved hosted test.

## 1. Account prerequisites

Before the first preview deployment:

1. Confirm the Cloudflare account owns or manages `lorenztazan.com` DNS.
2. Inspect the existing email routing setup. If enabling `lorenztazan.com` requires mail DNS changes, record the exact proposed changes and obtain approval first. Full paid arbitrary-recipient Email Sending onboarding is not required for this verified-destination-only form.
3. Verify the destination status of `lorenztazan@gmail.com`; obtain approval before triggering a verification email if needed.
4. Confirm `portfolio@lorenztazan.com` is permitted as the fixed sender.
5. Configure a real Turnstile widget for the exact protected preview hostname and eventual production hostname. Do not allow all hostnames or local domains on the deployed widget. Add additional branch/version hostnames deliberately before testing them.

The committed `send_email` binding is restricted to the verified Gmail destination. The visitor’s address is used only as `Reply-To`. Sends to verified destination addresses are free on all plans, including routing-only configurations; see the official pricing reference. Do not upgrade to a paid plan without separate approval.

## 2. Git and Worker connection

Use `AIKUSAN/portfolio`, preserving its existing identity, issues, branches, and history. The Astro replacement is already integrated; base new reviewed changes on the latest `main`, without merging legacy implementation files back into Astro or force-pushing. Keep the dirty legacy checkout and shared `origin` remote unchanged. Keep Pages publishing and its legacy workflow disabled. Source stays temporarily public during migration. Grant the Cloudflare GitHub App access only to this existing repository when needed, preserving unrelated grants; obtain approval before any new security-sensitive access grant.

In Workers & Pages, create or select a Worker named exactly:

```text
lorenztazan-portfolio
```

The dashboard Worker name must match `wrangler.jsonc`. Connect the GitHub repository and configure:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production deploy command | `npx wrangler versions upload` |
| Root directory | repository root |
| Non-production branch builds | enabled |

Cloudflare automatically installs package dependencies before the build. Use Node.js 22 (at least 22.12.0) or a separately validated supported version. Commit `package-lock.json` and keep install behavior reproducible; the manifest uses semver ranges, while the lockfile records the tested dependency versions.

The repository's `.github/workflows/validate.yml` only validates PRs or manual runs. It cannot publish to GitHub Pages. The inherited CodeQL job skips private repositories because an eligible paid license is not assumed or authorized.

## 3. Variables and secrets

Add this public build-time variable under Settings → Build → Build Variables and Secrets:

```text
PUBLIC_TURNSTILE_SITE_KEY=<production-widget-site-key>
```

Add this runtime secret under the Worker’s Settings → Variables & Secrets:

```text
TURNSTILE_SECRET_KEY=<production-widget-secret>
```

The non-secret runtime values and the fixed email destination are already declared in `wrangler.jsonc`:

- `CONTACT_FROM=portfolio@lorenztazan.com`
- `CONTACT_RECIPIENT=lorenztazan@gmail.com`
- `TURNSTILE_EXPECTED_HOSTNAME=lorenztazan.com`

Build variables are not runtime Worker variables. Keep the site key in the build settings and the secret key in runtime secrets.

## 4. Preview deployment

Connect the reviewed `main` of `AIKUSAN/portfolio` to Workers Builds. Create the initial Worker without attaching the custom domain and arrange per-Worker Access protection before exposure. Use the Cloudflare account policy, not an email-domain allow rule: only members of the personal account should be admitted. Protect both the active deployment and version previews. Keep `workers_dev` and `preview_urls` disabled until the policy is confirmed; then enable the intended URL surfaces through a reviewed configuration change and immediately verify anonymous requests are denied. Do not enable account-wide Access or add an Everyone bypass. If Zero Trust onboarding, agreement acceptance, or a new security-sensitive grant requires user participation, pause there.

Subsequent non-production builds should run `npm run build` and `npx wrangler versions upload`, producing a protected version preview without promoting it to the active deployment. Verify initial-Worker/bootstrap behavior before triggering a build; an unprotected public preview does not meet acceptance. Record the build UUID, source commit, active Worker version, and verified protection state without including credentials.

Do not attach `lorenztazan.com` at this stage.

Verify on the preview URL:

- all five public routes in light and dark themes;
- direct support, systems, and platform focus URLs;
- 375px, 768px, and 1440px layouts with no horizontal overflow;
- redirects and the `/blog` 410 response;
- both two-page résumé PDFs and their extracted text;
- Turnstile validation and, only after separate approval, one clearly labelled inbox smoke test; confirm actual receipt before recording delivery success;
- generic 400, 403, and 500 contact failures;
- Worker logs contain no message body, email address, or other contact-form content;
- a previous Worker version can be selected for rollback.

## 5. Production approval gate

Local contact contract tests isolate requests in fresh Wrangler processes because unread rejected bodies can break the local proxy's next connection ([upstream issue #15203](https://github.com/cloudflare/workers-sdk/issues/15203)). This does not change production rejection rules. On the protected hosted preview, also verify that a valid fixture request still reaches the handler after an oversized or cross-origin rejection; local isolation does not prove that sequence.

Obtain explicit approval only after all of these are complete:

- Cloudflare preview accepted;
- contact email smoke test received in `lorenztazan@gmail.com`;
- both résumé PDFs reviewed and approved;
- evidence/content audit has zero unsupported claims;
- accessibility and rendered-browser checks pass;
- Worker rollback has been exercised.

No production action below is authorized merely by completing the preview.

## 6. Controlled cutover

After explicit approval:

1. Reinspect and record the exact apex/www DNS records (including proxy state). Preserve the pre-retirement Pages configuration and legacy source backups; Pages is no longer a live fallback.
2. Confirm GitHub Pages and its legacy publishing workflow remain disabled. Astro source should already be merged in the original repository; do not restore the old site as a cutover prerequisite.
3. Confirm the original repository's Cloudflare production build and active Worker version, then approve its public audience.
4. Attach `lorenztazan.com` to the Worker using the reviewed DNS change set. Resolve any conflicting legacy DNS records deliberately; do not overwrite mail records.
5. Configure `www.lorenztazan.com` to redirect to the apex domain.
6. Verify DNS, TLS, canonical URLs, contact delivery, security headers, and both résumé downloads.
7. After confirming the custom domain serves the approved Astro release, reconfirm that Pages and its repository custom-domain association remain disabled, then make the same `AIKUSAN/portfolio` repository private. Confirm it remains editable, not archived. Preserve the account-level verified domain and TXT record.
8. Trigger a harmless follow-up Cloudflare build and verify the Git integration can still read the private repository. Retain source mirrors, the legacy tag, and DNS/Pages records through at least seven days after cutover. Do not change visibility or settings of any public evidence repository.

Vercel is not part of the verified current hosting path, so no Vercel changes are required for this migration.

## 7. Rollback

If the Cloudflare version fails before domain cutover, leave Pages disabled and DNS unchanged, and return to a previously tested Worker version when one exists. The public portfolio remains intentionally offline until a release is approved. Restoring legacy Pages hosting, even before privatization, requires separate explicit approval; the source tag and backups are recovery material, not authorization to republish.

After cutover and privatization, use a previously tested Cloudflare Worker version for rollback. Restoring public GitHub Pages would require making the source public again and changing hosting/DNS, so it requires separate explicit approval. Retain the legacy backups for at least seven days and do not invent old DNS targets from memory.

## References

- [Astro on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Email Service send bindings](https://developers.cloudflare.com/email-service/configuration/send-bindings/)
- [Email routing destinations](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/)
- [Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/)

import { resolveTurnstileSiteKey } from '../src/lib/turnstile.mjs';

// Run on the Node build host, not in Cloudflare's isolated prerendering runtime.
// Only the public site key belongs here; runtime secrets remain Worker secrets.
if (process.env.WORKERS_CI === '1' || process.env.PORTFOLIO_DEPLOYMENT_CHECK === '1') {
  resolveTurnstileSiteKey(process.env.PUBLIC_TURNSTILE_SITE_KEY, true);
}

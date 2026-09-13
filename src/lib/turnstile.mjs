// These checks reject missing/malformed keys and Cloudflare's documented dummy
// keys. Only Cloudflare can verify whether a real-looking key is active.
/** @param {unknown} value @returns {value is string} */
export function isConfiguredTurnstileKey(value) {
  return typeof value === 'string'
    && /^[A-Za-z0-9_-]{20,2048}$/.test(value)
    && !/^[123]x0+/.test(value)
    && !/^(?:test|dummy|placeholder|your)[_-]/i.test(value);
}

/** @param {unknown} value @param {boolean} deploymentBuild @returns {string} */
export function resolveTurnstileSiteKey(value, deploymentBuild) {
  if (isConfiguredTurnstileKey(value)) return value;
  if (deploymentBuild) {
    // Do not include the supplied value in build logs.
    throw new Error('Deployment requires a real PUBLIC_TURNSTILE_SITE_KEY in Cloudflare Build variables.');
  }
  // Local/PR builds can inspect the site without credentials. They must not
  // silently embed an always-pass key or be treated as deployment-ready.
  return '';
}

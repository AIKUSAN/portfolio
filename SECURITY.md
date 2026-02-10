# Security Policy

## Supported Versions

This is a personal portfolio website. The latest deployed version is always supported.

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | ✅ |

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio website, please report it responsibly:

### 🔒 Private Disclosure (Preferred)

1. **Email:** lorenztazan@gmail.com
2. **Subject:** `[SECURITY] Portfolio Vulnerability Report`
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if applicable)

**Response Time:** I aim to respond within 48 hours and provide a fix within 7 days for critical issues.

### 🔓 Public Disclosure (Low-Severity Only)

For low-severity issues (typos, broken links, minor UI bugs):
- Open a GitHub Issue: [github.com/AIKUSAN/portfolio/issues](https://github.com/AIKUSAN/portfolio/issues)

## Security Measures

This portfolio implements the following security practices:

✅ **Dependency Management**
- Weekly automated security updates via Dependabot
- CodeQL security scanning on all commits
- Zero known vulnerabilities (verified via `npm audit`)

✅ **Repository Security**
- Branch protection on `main` branch
- Secret scanning enabled
- Signed commits encouraged (GPG)

✅ **Static Site Security**
- No server-side code execution
- No database connections
- No API endpoints
- Content Security Policy headers (when deployed to Vercel/Netlify)

✅ **Third-Party Dependencies**
- Minimal external dependencies
- Regular updates to latest stable versions
- All dependencies from trusted sources (npm official registry)

## Out of Scope

The following are **not** security vulnerabilities:

- Missing security headers on GitHub Pages (platform limitation)
- Publicly visible source code (intentional - open source portfolio)
- Email address visibility (public contact information)
- Lack of authentication (static portfolio site, no auth needed)

## Acknowledgments

Security researchers who responsibly disclose vulnerabilities will be acknowledged here (with permission).

---

**Last Updated:** February 9, 2026  
**Contact:** Lorenz Tazan | lorenztazan@gmail.com | [GitHub](https://github.com/AIKUSAN)

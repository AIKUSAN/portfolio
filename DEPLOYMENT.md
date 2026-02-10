# 🚀 DEPLOYMENT GUIDE - GitHub Pages

## PHASE 1: Pre-Deployment Checklist

### ✅ Content Verification (ALL COMPLETE)
- [x] Education page updated (7+ → 7 years)
- [x] All pages consistent with mid-level positioning
- [x] Resume PDF updated and placed in `public/resume.pdf`
- [x] Contact information correct on all pages
- [x] Work authorization removed from website (on resume only)
- [x] Sitemap dates: **UPDATE NEEDED** (2026-02-07 → 2026-02-09)

### ✅ Build Verification
```bash
cd C:\Users\IKE\Downloads\IKE-CV\portfolio
npm run build
# Expected: "✔ Compiled successfully in ~6s"
```

### ✅ Security Files Created
- [x] `.github/dependabot.yml` - Automated dependency updates
- [x] `.github/workflows/codeql.yml` - Security scanning
- [x] `.github/workflows/deploy.yml` - CI/CD pipeline
- [x] `SECURITY.md` - Responsible disclosure policy
- [x] `LICENSE` - MIT License with content copyright notice
- [x] `README.md` - Professional repository documentation

---

## PHASE 2: Update Sitemap (REQUIRED)

### Update Sitemap Last Modified Dates

**File:** `public/sitemap.xml`

Change all `<lastmod>` dates from `2026-02-07` to `2026-02-09`:

```bash
# Quick find/replace in PowerShell:
(Get-Content public/sitemap.xml) -replace '2026-02-07', '2026-02-09' | Set-Content public/sitemap.xml
```

**Rebuild after sitemap update:**
```bash
npm run build
```

---

## PHASE 3: GitHub Repository Setup

### 1️⃣ Create GitHub Repository

**Option A: Via GitHub Web UI**
1. Go to https://github.com/new
2. Repository name: `portfolio` (or your preferred name)
3. Description: "Professional portfolio - Systems Engineer | DevOps & Infrastructure Automation"
4. Visibility: **Public** (recommended for job seekers)
5. ✅ Add README file: **NO** (we already have one)
6. ✅ Add .gitignore: **NO** (we already have one)
7. ✅ Choose license: **NO** (we already have LICENSE file)
8. Click **Create repository**

**Option B: Via GitHub CLI (gh)**
```bash
cd C:\Users\IKE\Downloads\IKE-CV\portfolio
gh repo create portfolio --public --source=. --remote=origin
```

### 2️⃣ Initialize Git & Push

```bash
cd C:\Users\IKE\Downloads\IKE-CV\portfolio

# Initialize git repository
git init

# Set main branch as default
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Professional portfolio with ATS-optimized positioning

Features:
- Next.js 16 with React 19 and TypeScript
- 7 pages: Home, About, Experience, Projects, Skills, Education, Contact
- Mid-level positioning (Systems Engineer targeting Platform/DevOps/SRE roles)
- Resume download with work authorization statement
- Dark/light theme with Framer Motion animations
- SEO optimized (OpenGraph, Twitter Cards, JSON-LD, sitemap)
- Security: Dependabot, CodeQL scanning, zero vulnerabilities
- CI/CD: GitHub Actions automated deployment
"

# Add GitHub remote (replace AIKUSAN with your GitHub username)
git remote add origin https://github.com/AIKUSAN/portfolio.git

# Push to GitHub
git push -u origin main
```

**Expected Output:**
```
Counting objects: 100% (X files)
Writing objects: 100% (X files)
To https://github.com/AIKUSAN/portfolio.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## PHASE 4: Configure GitHub Pages

### 1️⃣ Enable GitHub Pages

Navigate to: **Repository → Settings → Pages**

**Settings:**
- **Source:** GitHub Actions
- **Branch:** (not applicable - using Actions workflow)
- **Custom domain:** `lorenztazan.com`
- **Enforce HTTPS:** ✅ Enabled (automatic)

**Expected Behavior:**
- GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy on push to `main`
- First deployment triggered immediately after setup

### 2️⃣ Configure Custom Domain

**Create CNAME file** (if not already exists):

```bash
# In C:\Users\IKE\Downloads\IKE-CV\portfolio\public\
echo "lorenztazan.com" > public/CNAME
```

**Commit CNAME file:**
```bash
git add public/CNAME
git commit -m "Add custom domain CNAME for lorenztazan.com"
git push
```

### 3️⃣ Update DNS Records

**At your domain registrar (where you bought lorenztazan.com):**

Add these DNS records:

**For Apex Domain (lorenztazan.com):**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

**For www subdomain (www.lorenztazan.com):**
```
Type: CNAME
Name: www
Value: AIKUSAN.github.io (replace AIKUSAN with your GitHub username)
TTL: 3600
```

**DNS Propagation:**
- Takes 5 minutes to 48 hours (usually 15-30 minutes)
- Check status: https://www.whatsmydns.net/#A/lorenztazan.com

---

## PHASE 5: GitHub Security Configuration

### 1️⃣ Enable Security Features

Navigate to: **Repository → Settings → Security & analysis**

**Enable ALL:**
- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ✅ Secret scanning
- ✅ Code scanning (CodeQL analysis will auto-enable via workflow)

### 2️⃣ Set Up Branch Protection

Navigate to: **Repository → Settings → Branches → Add rule**

**Branch name pattern:** `main`

**Enable:**
- ✅ Require a pull request before merging
  - Require approvals: 0 (solo developer)
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date
  - Add status checks: `build`, `security-audit`, `CodeQL`
- ✅ Require conversation resolution before merging
- ✅ Include administrators
- ❌ Allow force pushes (DISABLED)
- ❌ Allow deletions (DISABLED)

**Click:** Save changes

### 3️⃣ Verify GitHub Actions

Navigate to: **Repository → Actions**

**Check workflows:**
1. **Build & Deploy** - Should run on every push
2. **CodeQL Security Scan** - Should run on push/PR + weekly schedule

**Expected Status:** ✅ All passing

---

## PHASE 6: Post-Deployment Verification

### 1️⃣ Verify Live Site

**Check deployment:**
```bash
# Check GitHub Actions status
gh run list --limit 5

# View specific run
gh run view
```

**Manual verification:**
1. Visit https://lorenztazan.com
2. Verify all 7 pages load correctly:
   - / (Home)
   - /about
   - /experience
   - /projects
   - /skills
   - /education
   - /contact
3. Test dark/light mode toggle
4. Test resume download on Contact page
5. Verify mobile responsiveness

### 2️⃣ Test SEO

**Google Search Console:**
1. Go to: https://search.google.com/search-console
2. Add property: `lorenztazan.com`
3. Verify ownership (DNS TXT record method recommended)
4. Submit sitemap: `https://lorenztazan.com/sitemap.xml`

**Test OpenGraph:**
- https://www.opengraph.xyz/
- Paste: `https://lorenztazan.com`
- Verify image, title, description appear correctly

**Test Twitter Cards:**
- https://cards-dev.twitter.com/validator
- Paste: `https://lorenztazan.com`
- Verify card renders properly

### 3️⃣ Security Verification

**Check SSL Certificate:**
```bash
# Should show valid SSL certificate
curl -I https://lorenztazan.com | findstr "HTTP/"
```

**Verify HTTPS Redirect:**
- Visit http://lorenztazan.com (HTTP)
- Should auto-redirect to https://lorenztazan.com (HTTPS)

**Check Security Scan:**
- https://observatory.mozilla.org/
- Enter: `lorenztazan.com`
- Review security score

---

## PHASE 7: Post-Launch Maintenance

### Weekly Tasks
- ✅ Review Dependabot PRs (auto-created)
- ✅ Check GitHub Actions build status
- ✅ Monitor Google Search Console for crawl errors

### Monthly Tasks
- ✅ Run `npm audit` locally
- ✅ Update resume PDF if experience changes
- ✅ Review CodeQL security findings
- ✅ Update sitemap last modified dates

### Quarterly Tasks
- ✅ Update dependencies manually (`npm update`)
- ✅ Review portfolio content for accuracy
- ✅ Add new projects to portfolio
- ✅ Check Google PageSpeed Insights score

---

## 🆘 Troubleshooting

### Issue: GitHub Pages 404 Error

**Solution:**
```bash
# Ensure CNAME file is in public/ directory (not root)
ls public/CNAME

# Rebuild to include CNAME in output
npm run build

# Verify CNAME in out/ directory
ls out/CNAME

# Commit and push
git add .
git commit -m "Fix CNAME placement"
git push
```

### Issue: Custom Domain Not Working

**Check:**
1. DNS propagation complete? (https://www.whatsmydns.net)
2. CNAME file present in `public/CNAME`?
3. GitHub Pages settings show custom domain?
4. Wait 15-30 minutes after DNS changes

### Issue: Build Failing in GitHub Actions

**Solution:**
```bash
# Run build locally to check errors
npm run build

# Check GitHub Actions logs
gh run view --log

# Common fix: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Dependabot PRs Not Merging

**Solution:**
1. Review PR changes in GitHub
2. Test locally:
   ```bash
   git fetch origin
   git checkout dependabot/npm_and_yarn/package-name-version
   npm install
   npm run build
   npm run dev
   ```
3. If tests pass, merge via GitHub UI

---

## 📊 Success Metrics

**After 7 days, you should see:**
- ✅ Google Search Console: Site indexed (5-7 pages)
- ✅ GitHub Actions: 7+ successful deployments
- ✅ Security: 0 Dependabot alerts
- ✅ Analytics: First organic traffic from job boards
- ✅ Social: LinkedIn preview working with OpenGraph

**After 30 days:**
- ✅ Google: Appearing in search results for "Lorenz Tazan"
- ✅ SEO: Site ranking for name + location queries
- ✅ GitHub: Stars/forks from interested developers
- ✅ Recruiters: Contacts via portfolio contact page

---

## 🎯 Next Steps After Deployment

1. **Share Portfolio:**
   - Update LinkedIn profile with website link
   - Add to resume header
   - Include in job applications
   - Share on Twitter/X (optional)

2. **Apply to Jobs:**
   - Target Platform Engineer roles
   - Target DevOps Engineer positions
   - Target SRE (Site Reliability Engineer) roles
   - Focus on hybrid/DMV area positions

3. **Monitor Performance:**
   - Set up Google Analytics (optional)
   - Track job application responses
   - A/B test resume vs. portfolio URL in applications

---

**Last Updated:** February 9, 2026  
**Questions?** Email: lorenztazan@gmail.com

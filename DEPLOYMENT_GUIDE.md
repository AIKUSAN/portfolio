# 🚀 GitHub Pages + Custom Domain Deployment Guide

## ✅ DO TODAY - COMPLETED

Your portfolio is now configured for **GitHub Pages with custom domain `lorenztazan.com`**!

All changes have been implemented:
- ✅ CNAME file created pointing to `lorenztazan.com`
- ✅ basePath removed (custom domain points to root)
- ✅ All metadata updated to "AI-Powered Platform Engineer"
- ✅ "Currently Seeking" section added to Contact page
- ✅ Sitemap/robots.txt configured for custom domain
- ✅ Build successful (all 7 pages pre-rendered)

---

## 📋 Next Steps: Deploy to GitHub Pages

### Step 1: Push to GitHub Repository

```bash
cd c:\Users\IKE\Downloads\IKE-CV\portfolio

# Initialize git if not already done
git init
git branch -M main

# Add all files
git add .
git commit -m "Configure for GitHub Pages with custom domain lorenztazan.com"

# Create repository on GitHub: https://github.com/new
# Repository name: portfolio (or your-name-portfolio)

# Push to GitHub
git remote add origin https://github.com/AIKUSAN/portfolio.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: `https://github.com/AIKUSAN/portfolio`
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/` (root)
5. Click **Save**

GitHub will automatically detect the `CNAME` file and configure custom domain.

### Step 3: Buy Domain (lorenztazan.com)

**Recommended Registrars:**

1. **Namecheap** (Easiest)
   - Go to: https://www.namecheap.com
   - Search: `lorenztazan.com`
   - Price: ~$12/year
   - Includes free WHOIS privacy

2. **Google Domains** (Simple DNS)
   - Go to: https://domains.google.com
   - Search: `lorenztazan.com`
   - Price: ~$12/year
   - Easy DNS management

3. **Cloudflare Registrar** (Advanced)
   - Go to: https://www.cloudflare.com/products/registrar/
   - Price: At-cost (~$9-10/year)
   - Free CDN, SSL, DDoS protection

### Step 4: Configure DNS Settings

After purchasing `lorenztazan.com`, add these DNS records:

**Option A: Apex Domain (lorenztazan.com)**
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

**Option B: WWW Subdomain (www.lorenztazan.com)**
```
Type: CNAME
Name: www
Value: aikusan.github.io
TTL: 3600
```

**Recommended:** Use both (apex + www redirect)

### Step 5: Enable HTTPS in GitHub Pages

1. Return to GitHub repo → **Settings** → **Pages**
2. Wait 5-10 minutes for DNS propagation
3. Check box: **Enforce HTTPS**

Your site will be live at: `https://lorenztazan.com`

---

## 🎨 CRITICAL: Create Missing Images

### 1. OG Image (Social Media Preview)

**Required Size:** 1200x630px PNG

**Quickest Method (Canva - 10 min):**
1. Visit: https://www.canva.com/create/og-images/
2. Search template: "Tech Portfolio" or "Professional"
3. Customize:
   - Text: "Lorenz Tazan"
   - Subtitle: "AI-Powered Platform Engineer"
   - Background: Dark gradient (#0f172a to #1e293b)
   - Add tech icons: Docker, Kubernetes, AI/brain icon
4. Download as PNG (1200x630px)
5. Save to: `public/og-image.png`
6. Delete `public/og-image.png.README.md`

**Example Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│   LORENZ TAZAN                      │
│   AI-Powered Platform Engineer      │
│                                     │
│   Infrastructure Automation         │
│   LLM Integration | 99.9% Uptime    │
│                                     │
│   [🐳] [☸️] [☁️] [🤖]               │
│                                     │
└─────────────────────────────────────┘
```

### 2. Apple Touch Icon

**Required Size:** 180x180px PNG

**Method 1: Export from Favicon (2 min):**
1. Open `public/favicon.svg` in browser
2. Right-click → Save Image As → PNG
3. Resize to 180x180px (use https://www.iloveimg.com/resize-image)
4. Save as: `public/apple-touch-icon.png`
5. Delete `public/apple-touch-icon.png.README.md`

**Method 2: Use Favicon Generator:**
1. Visit: https://realfavicongenerator.net/
2. Upload `public/favicon.svg`
3. Download generated package
4. Extract `apple-touch-icon.png` to `public/`

---

## 🔍 Google Search Console Setup

1. Go to: https://search.google.com/search-console
2. Click **Add Property**
3. Enter: `lorenztazan.com`
4. Choose verification method: **HTML tag**
5. Copy the code like: `google1234567890abcdef.html`
6. Open `src/app/layout.tsx` (line 75)
7. Replace:
   ```tsx
   google: 'your-google-verification-code',
   ```
   With:
   ```tsx
   google: 'google1234567890abcdef',
   ```

8. Rebuild and deploy:
   ```bash
   npm run build
   git add .
   git commit -m "Add Google Search Console verification"
   git push
   ```

9. Return to Search Console → Click **Verify**
10. Submit sitemap: `https://lorenztazan.com/sitemap.xml`

---

## 🎯 Post-Deployment Checklist

After site is live at `https://lorenztazan.com`:

### Immediate (30 minutes):
- [ ] Test all 7 pages load correctly
- [ ] Verify theme switcher works (dark/light mode)
- [ ] Check mobile responsiveness (use Chrome DevTools)
- [ ] Test form submission (Contact page)
- [ ] Download resume.pdf works
- [ ] All navigation links work
- [ ] Footer appears on all pages
- [ ] Social media links open correctly

### SEO Verification (1 hour):
- [ ] Test Rich Snippets: https://search.google.com/test/rich-results
- [ ] Check OG preview: https://www.opengraph.xyz/
- [ ] Twitter Card validator: https://cards-dev.twitter.com/validator
- [ ] LinkedIn post preview (share your portfolio link)
- [ ] Google PageSpeed Insights: https://pagespeed.web.dev/

### Share Your Portfolio:
- [ ] Update LinkedIn headline: "AI-Powered Platform Engineer"
- [ ] Update LinkedIn about section with portfolio link
- [ ] Add portfolio link to GitHub profile bio
- [ ] Pin 2-3 projects on GitHub with README links back to portfolio
- [ ] Update resume.pdf header with new title
- [ ] Share on LinkedIn: "Excited to share my new portfolio showcasing..."

---

## 🚨 Troubleshooting

**DNS not propagating?**
- Wait 24-48 hours (DNS can take time)
- Check DNS: https://dnschecker.org/#A/lorenztazan.com
- Flush your DNS cache: `ipconfig /flushdns` (Windows)

**HTTPS not working?**
- Ensure DNS points to GitHub Pages IPs
- Wait 10-15 minutes after DNS propagation
- Check "Enforce HTTPS" is enabled in GitHub Settings

**404 on GitHub Pages?**
- Verify `CNAME` file contains ONLY: `lorenztazan.com` (no http://, no trailing slash)
- Ensure repository is public (GitHub Pages requires public repos for free tier)
- Check GitHub Actions tab for build errors

**OG Image not showing on LinkedIn?**
- Wait 5-10 minutes after deploying image
- Use LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Click "Inspect" and paste your URL
- Click "Refresh" to fetch latest metadata

---

## 📈 Expected Results

**Within 24 Hours:**
- ✅ Site live at https://lorenztazan.com
- ✅ HTTPS certificate active
- ✅ Social media previews working

**Within 1 Week:**
- ✅ Google indexes your site (check: `site:lorenztazan.com` in Google)
- ✅ Sitemap processed in Search Console
- ✅ Search appearance for "Lorenz Tazan"

**Within 1 Month:**
- ✅ Rankings for long-tail keywords: "LLM infrastructure automation engineer"
- ✅ Direct traffic from Google searches
- ✅ Backlinks from GitHub profile/repos

---

## 💡 Alternative: Buy Both Domains

**Recommended Strategy:**

Purchase BOTH domains for brand protection:
- `lorenztazan.com` (primary) - $12/year
- `lorenztazan.dev` (redirect) - $15/year
- **Total:** $27/year

**Setup:**
1. Point `lorenztazan.com` to GitHub Pages (A records)
2. Point `lorenztazan.dev` to `lorenztazan.com` (301 redirect or CNAME)
3. Benefit: Anyone typing either domain reaches your site

---

## 📞 Support

If you encounter issues:
1. Check GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Pages docs: https://docs.github.com/pages
3. DNS help: Contact your domain registrar support
4. Build errors: Check terminal output from `npm run build`

---

**Next:** After completing Steps 1-5 above, your portfolio will be live! Then create the OG image and apple touch icon, and you're 100% ready for recruiters.

Good luck with your job search! 🚀

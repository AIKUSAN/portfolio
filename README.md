# 🌐 Lorenz Tazan - Portfolio Website

[![Build & Deploy](https://github.com/AIKUSAN/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/AIKUSAN/portfolio/actions/workflows/deploy.yml)
[![CodeQL Security Scan](https://github.com/AIKUSAN/portfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/AIKUSAN/portfolio/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Professional portfolio website showcasing **7 years of Systems Engineering** experience with focus on DevOps, Infrastructure Automation, and AI-enhanced workflows.

🔗 **Live Site:** [lorenztazan.com](https://lorenztazan.com)

---

## ✨ Features

- 🎨 **Modern Design** - Next.js 16 with React 19, TypeScript, Tailwind CSS
- 🌙 **Dark/Light Mode** - Automatic theme switching with persistent preferences
- 📱 **Responsive** - Mobile-first design, optimized for all devices
- ⚡ **Performance** - Static site generation, optimized bundle size, fast load times
- 🔍 **SEO Optimized** - OpenGraph, Twitter Cards, JSON-LD structured data, sitemap
- ♿ **Accessible** - Semantic HTML, ARIA labels, keyboard navigation support
- 🎬 **Animations** - Smooth Framer Motion transitions and scroll effects
- 🔒 **Secure** - Zero npm vulnerabilities, CodeQL scanning, Dependabot enabled

---

## 🚀 Tech Stack

### Core Framework
- **Next.js 16.1.6** - React framework with static site generation
- **React 19.2.3** - UI library with React Compiler enabled
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Animation library
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
### Backend & Database
- **Supabase** - PostgreSQL Database, Authentication, Row-Level Security (RLS)
- **Next.js API Routes** - Server-side logic and webhooks

### Automation & AI
- **Make.com** - Serverless Workflow Automation (Contact Form Integration)
- **Model Context Protocol (MCP)** - Standardized AI context exchange
- **n8n** - Workflow automation (Alternative/Legacy)

---

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Homepage
│   │   ├── about/           # About page
│   │   ├── experience/      # Professional experience timeline
│   │   ├── projects/        # Project portfolio
│   │   ├── skills/          # Technical skills matrix
│   │   ├── education/       # Education & certifications
│   │   └── contact/         # Contact form & info
│   ├── components/          # Reusable React components
│   ├── data/                # Project data and content
│   └── lib/                 # Utility functions
├── public/                  # Static assets
│   ├── resume.pdf           # Downloadable resume
│   ├── robots.txt           # SEO crawler directives
│   ├── sitemap.xml          # SEO sitemap
│   └── CNAME                # Custom domain configuration
├── .github/
│   ├── workflows/           # CI/CD pipelines
│   │   ├── deploy.yml       # Build & deploy to GitHub Pages
│   │   └── codeql.yml       # Security scanning
│   └── dependabot.yml       # Automated dependency updates
└── SECURITY.md              # Security policy
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/AIKUSAN/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build production static site (output: /out)
npm run start    # Preview production build locally
npm run lint     # Run ESLint code linting
npm audit        # Check for dependency vulnerabilities
```

---

## 🚢 Deployment

### GitHub Pages (Current)

Deployed automatically via GitHub Actions on push to `main` branch.

**Custom Domain:** [lorenztazan.com](https://lorenztazan.com)

**Workflow:**
1. Push to `main` branch
2. GitHub Actions runs:
   - Security audit (`npm audit`)
   - Build (`npm run build`)
   - Deploy to GitHub Pages
3. Site available at custom domain within 2-3 minutes

### Alternative Deployments

**Vercel (Recommended for Security Headers):**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Upload /out directory to Netlify
```

---

## 🔒 Security

### Security Features
✅ Zero npm vulnerabilities  
✅ Dependabot security updates (weekly)  
✅ CodeQL security scanning (on every commit)  
✅ Branch protection rules  
✅ Secret scanning enabled  

### Reporting Vulnerabilities
See [SECURITY.md](SECURITY.md) for responsible disclosure guidelines.

---

## 📊 Portfolio Highlights

**Systems Engineering Excellence:**
- 🎯 **99.9% Uptime** - 24-server distributed platform (300+ concurrent users)
- ⚡ **96% Performance Gain** - Database query optimization (800ms → 35ms)
- 💰 **65% Cost Reduction** - Infrastructure optimization
- 🚀 **93% Deployment Speed** - CI/CD automation (30min → <2min)

**AI-Powered Automation:**
- 🤖 Multi-LLM orchestration (Gemini, Claude, GPT-4)
- 🔄 Agentic workflows with n8n
- 📊 RAG-based documentation systems
- 🔍 Proactive monitoring with LLMs

**Security & Compliance:**
- 🛡️ NIST 800-171 compliant network design (DoD contractor)
- 🔐 Zero-trust architecture implementation
- ✅ 0 audit findings on government projects

---

## 📜 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

**Portfolio Content:** © 2026 Lorenz Tazan. All rights reserved.  
**Code & Design:** Open source under MIT License.

---

## 📞 Contact

**Lorenz Tazan**  
Systems Engineer | DevOps & Infrastructure Automation

- 🌐 Website: [lorenztazan.com](https://lorenztazan.com)
- 📧 Email: [lorenztazan@gmail.com](mailto:lorenztazan@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/lorenztazan](https://linkedin.com/in/lorenztazan)
- 🐙 GitHub: [@AIKUSAN](https://github.com/AIKUSAN)

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Excellent hosting platform
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations library

---

**Last Updated:** February 9, 2026  
**Built with** ❤️ **using Next.js & TypeScript**

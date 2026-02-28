# Agent Runbook

## System Architecture

The project uses Next.js 16 (Turbopack), Tailwind 4, and Framer Motion.

## PDF Generation SOP

PDF generation must NOT rely on agent hallucination. It requires manually triggering `npx md-to-pdf` (or equivalent) and must involve visual DOM verification using the built-in browser. Raw HTML `<div style="page-break-before: always;"></div>` is required for pagination in Markdown.

## GitHub MCP Protocol

DevOps-Git-02 MUST use the GitHub MCP Server API (`gh api`) or the GitHub CLI for Dependabot remediation and PR merging. Browsers are strictly forbidden for GitHub operations.

## UI Styling Rules

Specific sections in `experience/page.tsx` use dedicated Tailwind color themes (e.g., emerald for Lead Systems Engineer, blue for Network Consultant) and these must be preserved during text updates.

# portfolio Development Patterns

> Auto-generated skill from repository analysis

## Overview

This Next.js TypeScript portfolio application follows modern web development practices with automated dependency management and content synchronization workflows. The codebase emphasizes maintainable code structure with clear separation between pages, components, and static assets like resume content.

## Coding Conventions

### File Naming
Use camelCase for all TypeScript files and components:
```
src/components/Header.tsx
src/app/experience/page.tsx
```

### Import Style
Use alias imports for cleaner module resolution:
```typescript
import Header from '@/components/Header'
import { ExperienceData } from '@/types/experience'
```

### Export Style
Prefer default exports for components and pages:
```typescript
export default function ExperiencePage() {
  return <div>...</div>
}
```

### Commit Conventions
Follow conventional commit format with these prefixes:
- `feat:` - New features
- `fix:` - Bug fixes  
- `chore:` - Maintenance tasks

Keep commit messages around 59 characters average.

## Workflows

### Dependency Updates
**Trigger:** When dependencies need updating (automated via dependabot)
**Command:** `/update-deps`

1. Review dependabot PR for dependency updates
2. Update `package.json` with new versions
3. Regenerate `package-lock.json` with resolved dependencies
4. Test application for breaking changes
5. Merge PR after successful review

### Resume Synchronization
**Trigger:** When resume information needs to be updated
**Command:** `/sync-resume`

1. Update markdown resume source at `public/LORENZ_TAZAN_RESUME.md`
2. Regenerate PDF from markdown source to `public/resume.pdf`
3. Sync changes to experience page at `src/app/experience/page.tsx`
4. Update home page content at `src/app/page.tsx` if needed
5. Commit all changes with descriptive message

### Security Fixes
**Trigger:** When security alerts are detected
**Command:** `/fix-security`

1. Identify security vulnerability from GitHub alerts
2. Update vulnerable package version in `package.json`
3. Update `package-lock.json` with secure dependencies
4. Test application thoroughly for breaking changes
5. Deploy and verify fix resolves security issue

### GitHub Actions Updates
**Trigger:** When GitHub Actions need version updates
**Command:** `/update-actions`

1. Review dependabot PR for outdated GitHub Actions
2. Update action versions in `.github/workflows/deploy.yml`
3. Update action versions in `.github/workflows/codeql.yml`
4. Test workflow functionality on feature branch
5. Merge after successful workflow execution

### Content Polish
**Trigger:** When UI/content improvements are needed
**Command:** `/polish-ui`

1. Identify components needing visual or content updates
2. Update relevant page components in `src/app/*/page.tsx`
3. Refine shared components like `src/components/Header.tsx` and `src/components/Footer.tsx`
4. Test visual changes across different screen sizes
5. Commit changes with descriptive UI improvement message

## Testing Patterns

Tests follow the `*.test.*` file pattern. When adding tests:

```typescript
// Example test structure
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  })
})
```

Place test files adjacent to the components they test for easy maintenance.

## Commands

| Command | Purpose |
|---------|---------|
| `/update-deps` | Handle dependency updates from dependabot |
| `/sync-resume` | Update resume across all formats and locations |
| `/fix-security` | Address security vulnerabilities |
| `/update-actions` | Update GitHub Actions workflow dependencies |
| `/polish-ui` | Refine UI components and page content |
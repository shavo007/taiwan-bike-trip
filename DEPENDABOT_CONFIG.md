# Dependabot Configuration Documentation

## Overview

This repository uses Dependabot to automatically keep dependencies up-to-date across two key ecosystems:
- **Node.js/npm** - For Next.js application dependencies
- **GitHub Actions** - For CI/CD workflow automation

## Configuration Details

### Node.js/npm Dependencies

**Schedule**: Weekly updates on Mondays at 9:00 AM (Sydney time)
**Open PR Limit**: Maximum 5 pull requests at once

#### Dependency Groups

1. **Next.js Ecosystem**
   - Patterns: `next*`, `react*`, `@next/*`, `eslint-config-next`
   - Update Types: Minor and patch updates only
   - Purpose: Groups related Next.js and React updates into single PRs

2. **TypeScript Tooling**
   - Patterns: `typescript`, `@types/*`, `ts-*`, `eslint*`, `prettier*`
   - Update Types: Minor and patch updates only
   - Purpose: Groups development tooling updates together

3. **CSS Tooling**
   - Patterns: `tailwindcss`, `postcss*`, `autoprefixer`, `@tailwindcss/*`
   - Update Types: Minor and patch updates only
   - Purpose: Groups styling-related dependency updates

#### Ignored Updates

Major version updates are ignored for:
- `next` - Major Next.js updates require manual review
- `react` / `react-dom` - React major versions need compatibility testing
- `typescript` - TypeScript major versions may introduce breaking changes

### GitHub Actions Dependencies

**Schedule**: Weekly updates on Tuesdays at 10:00 AM (Sydney time)
**Open PR Limit**: Maximum 3 pull requests at once

#### Action Groups

1. **GitHub Core Actions**
   - Patterns: `actions/*`
   - Update Types: Minor and patch updates only
   - Purpose: Groups official GitHub actions together

2. **Deployment Actions**
   - Patterns: `*deploy*`, `*upload*`, `*cache*`
   - Update Types: Minor and patch updates only
   - Purpose: Groups deployment and artifact-related actions

#### Ignored Updates

Major version updates are ignored for:
- `actions/checkout` - Core action, major updates need manual review
- `actions/setup-node` - Node.js setup action, major changes may affect CI
- `actions/cache` - Caching action, major updates could affect performance

## Commit Message Strategy

- **npm dependencies**: `deps:` prefix for production, `deps-dev:` for development
- **GitHub Actions**: `ci:` prefix
- **Scope inclusion**: All commits include dependency scope information

## Labels Applied

All Dependabot PRs are automatically labeled:
- `dependencies` - General dependency update label
- `npm` or `github-actions` - Ecosystem-specific labels
- `automated` - Indicates automated update
- `ci-cd` - Additional label for GitHub Actions

## Versioning Strategy

**Strategy**: `increase-if-necessary`
- Maintains existing constraints when possible
- Only increases constraints when necessary for the new version
- Balances between stability and keeping dependencies current

## Security Updates

- Security updates are automatically enabled
- Security PRs bypass grouping rules for immediate attention
- Security updates have higher priority than version updates

## Best Practices Implemented

1. **Staggered Schedules**: npm and GitHub Actions updates on different days
2. **Conservative Major Updates**: Major versions ignored for core dependencies
3. **Logical Grouping**: Related dependencies grouped to reduce PR noise
4. **Clear Labeling**: Comprehensive labeling for easy PR management
5. **Timezone Awareness**: Scheduled for Australian business hours

## Manual Override

To temporarily disable Dependabot:
1. Set `open-pull-requests-limit: 0` for specific ecosystem
2. Add dependencies to ignore list
3. Modify schedule to less frequent intervals

## Monitoring

- Check Dependabot security tab for any configuration issues
- Review dependency insights for update patterns
- Monitor PR merge rates to adjust grouping if needed

## Related Files

- `.github/dependabot.yml` - Main configuration file
- `package.json` - npm dependencies being monitored
- `.github/workflows/deploy.yml` - GitHub Actions being monitored
- `DEPLOYMENT_OPTIMIZATIONS.md` - CI/CD performance documentation

# Documentation Sync Workflow

This project includes an automated documentation synchronization system to keep documentation files up-to-date with code changes.

## Overview

The documentation sync workflow automatically:

- **Detects changes** to project structure, dependencies, and workflows
- **Updates documentation** files to reflect current state
- **Validates consistency** between code and documentation
- **Creates pull requests** for documentation updates when needed

## Components

### 1. GitHub Actions Workflow (`.github/workflows/docs-sync.yml`)

Automatically runs on:

- Push to main/develop branches (when relevant files change)
- Pull requests to main/develop branches
- Weekly schedule (Sundays at 2 AM UTC)
- Manual trigger via workflow dispatch

### 2. Documentation Scripts (`scripts/`)

- **`sync-docs.js`** - Main synchronization script that updates documentation
- **`validate-docs.js`** - Validates documentation for consistency and accuracy
- **`check-links.js`** - Checks for broken links in documentation
- **`update-project-structure.js`** - Updates project structure documentation

### 3. Pre-commit Integration

The documentation sync is integrated into the git pre-commit hook to ensure documentation stays current with each commit.

## Usage

### Automatic Sync

The workflow runs automatically on relevant file changes and keeps documentation updated without manual intervention.

### Manual Sync

You can manually run documentation sync using npm scripts:

```bash
# Full documentation sync
npm run docs:sync

# Validate documentation
npm run docs:validate

# Check for broken links
npm run docs:check-links

# Update project structure only
npm run docs:update-structure
```

### Manual Workflow Trigger

You can manually trigger the GitHub Actions workflow:

1. Go to the Actions tab in your repository
2. Select "Documentation Sync" workflow
3. Click "Run workflow"
4. Optionally check "Force update all documentation"

## What Gets Updated

### README.md

- Project structure section based on actual file system
- Workflow descriptions based on actual workflow files
- Dependency versions from package.json

### .github/copilot-instructions.md

- Component structure information
- Dependency version information
- Project architecture details

### Other Documentation Files

- Link validation and fixing
- Markdown formatting consistency
- Cross-reference validation

## Benefits

1. **Always Up-to-Date**: Documentation automatically reflects current code state
2. **Reduced Maintenance**: No manual work needed to keep docs synchronized
3. **Consistency Checking**: Validates that documentation matches reality
4. **Link Validation**: Ensures all documentation links work correctly
5. **Quality Assurance**: Prevents documentation drift and outdated information

## Configuration

The workflow can be customized by modifying:

- **File patterns** in the workflow triggers
- **Validation rules** in the scripts
- **Update frequency** in the schedule
- **Sync behavior** in the script configuration

## Monitoring

The workflow provides detailed logs and will:

- Create issues for broken links or validation failures
- Send notifications for sync problems
- Generate reports on documentation health

This ensures your documentation always stays accurate and helpful for developers and users.

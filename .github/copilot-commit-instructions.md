# GitHub Copilot Commit Message Instructions

## Commit Message Format

Follow the [Conventional Commits](https://conventionalcommits.org/) specification for all commit messages:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types

Use these standardized commit types:

- **feat**: New features or enhancements
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates, build processes
- **ci**: Changes to CI/CD configuration files and scripts
- **perf**: Performance improvements
- **build**: Changes to build system or external dependencies

## Scope Guidelines

Use these scopes when applicable to the Taiwan Bike Trip project:

- **analytics**: Google Analytics, tracking, metrics
- **components**: React components (Hero, Navigation, Footer, etc.)
- **itinerary**: Tour schedule and route data
- **deps**: Dependency updates
- **deps-dev**: Development dependency updates
- **tests**: Test files and testing setup
- **ci**: GitHub Actions workflows
- **deployment**: Build and deployment configuration
- **styling**: CSS, Tailwind, visual styling
- **routes**: Strava route integration
- **qr**: QR code generation and display
- **tooling**: Development tools (Husky, ESLint, Prettier)

## Examples

### Good Commit Messages

```text
feat(analytics): add Google Analytics tracking scripts to layout

fix(components): resolve QR code canvas sizing on mobile devices

docs(readme): update installation and development instructions

style: format codebase with Prettier

refactor(itinerary): simplify schedule data structure

test(smoke): add basic functionality validation tests

chore(deps): update @playwright/test from 1.54.1 to 1.54.2

ci(workflow): optimize GitHub Actions with npm cache

perf(components): optimize Strava embed loading with lazy loading
```

### Message Guidelines

1. **Keep the subject line under 50 characters**
2. **Use imperative mood** ("add" not "added" or "adds")
3. **Capitalize the subject line**
4. **Don't end the subject line with a period**
5. **Use the body to explain what and why, not how**
6. **Separate subject from body with a blank line**

## Special Cases

### Breaking Changes

For breaking changes, add `!` after the type/scope and include `BREAKING CHANGE:` in the footer:

```text
feat(components)!: redesign itinerary layout structure

BREAKING CHANGE: ItineraryEnhanced component props have changed.
The 'schedule' prop is now required and must follow new data structure.
```

### Multiple Changes

If a commit contains multiple related changes, list them in the body:

```text
feat(tooling): enhance development workflow

- Add Husky pre-commit hooks with linting
- Configure lint-staged for staged file processing
- Add conventional commit message validation
- Update package.json scripts for better DX
```

### Dependency Updates

For dependency updates, be specific about the change:

```text
chore(deps-dev): bump @playwright/test from 1.54.1 to 1.54.2

Updates Playwright testing framework with bug fixes for:
- Codegen administrator terminal issues on Windows
- Codegen target language selection
- Reduced codegen option selection spam
```

## Project-Specific Context

When writing commits for this project, consider:

- **Static Export**: Changes affecting `output: 'export'` configuration
- **GitHub Pages**: Deployment and basePath considerations
- **Taiwan Tour**: Content related to the 8-day cycling adventure
- **Mobile Experience**: QR codes and responsive design
- **Performance**: Static site optimization and loading
- **Accessibility**: Screen reader support and semantic HTML

## Tools Integration

This project uses automated commit message validation through Husky hooks. Ensure your commits follow these guidelines to pass the validation checks.

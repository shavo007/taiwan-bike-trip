# Playwright Testing Setup

This project uses Playwright for end-to-end testing following the coding standards defined in `.github/instructions/playwright-typescript.instructions.md`.

## Quick Start

```bash
# Install dependencies (Playwright should already be installed)
npm install

# Install Playwright browsers if needed
npx playwright install

# Run all tests
npm run test

# Run tests with UI mode
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Show test report
npm run test:report
```

## Test Structure

```
tests/
├── smoke.spec.ts           # Basic smoke tests (primary testing)
├── homepage.spec.ts        # Homepage functionality tests (legacy)
├── itinerary.spec.ts       # Detailed itinerary feature tests (legacy)
├── strava-integration.spec.ts # Route integration tests (legacy)
└── setup.ts               # Test configuration and fixtures
```

## Current Testing Strategy

The project primarily relies on **smoke tests** to ensure core functionality without depending on external services (Strava embeds) that can cause test instability.

## Test Categories

### 🔥 Smoke Tests (`smoke.spec.ts`) - **PRIMARY**
Essential functionality tests that verify:
- Page loads without errors
- Main content and navigation elements are present
- No critical console errors (filtering out external service errors)
- Basic responsive behavior

### 📋 Legacy Test Files
Other test files exist but may have external dependencies that cause instability:
- `homepage.spec.ts` - Homepage functionality tests
- `itinerary.spec.ts` - Detailed itinerary feature tests  
- `strava-integration.spec.ts` - Route integration tests

These legacy tests are maintained but not part of the primary CI/CD validation due to their reliance on external iframe loading from Strava.

## Configuration

The project uses `playwright.config.ts` with these key settings:

- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Dev Server**: Automatically starts Next.js dev server
- **Test Directory**: `./tests`
- **Reports**: HTML reporter enabled

## Best Practices Followed

✅ **User-facing locators**: Prioritize `getByRole`, `getByLabel`, `getByText`  
✅ **Test steps**: Group interactions with `test.step()` for better reporting  
✅ **Auto-retrying assertions**: Use `await expect()` web-first assertions  
✅ **Descriptive titles**: Clear test and step names  
✅ **BeforeEach hooks**: Common setup in `test.describe()` blocks  
✅ **Responsive testing**: Multiple viewport sizes  
✅ **Accessibility**: Use `toMatchAriaSnapshot` where appropriate  

## Running Specific Tests

```bash
# Run only smoke tests (recommended)
npm run test tests/smoke.spec.ts

# Run all tests (may include flaky external dependencies)
npm run test

# Run only in Chromium
npm run test -- --project=chromium

# Run with grep pattern
npm run test -- --grep="Static assets"

# Debug mode
npm run test -- --debug
```

## CI/CD Integration

GitHub Actions workflow (`.github/workflows/playwright.yml`) runs tests on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Recommendation**: Update the workflow to run only smoke tests for stability:
```yaml
- name: Run Playwright tests
  run: npm run test tests/smoke.spec.ts
```

The workflow:
1. Sets up Node.js 20
2. Installs dependencies  
3. Installs Playwright browsers
4. Builds the Next.js application
5. Runs smoke tests (recommended) or all tests
6. Uploads test reports as artifacts

## Development Guidelines

When adding new tests:

1. **Follow naming convention**: `<feature>.spec.ts`
2. **Use test.describe()**: Group related tests  
3. **Add beforeEach**: Common setup for navigation
4. **Include test steps**: Break down complex tests
5. **Test mobile + desktop**: Add responsive checks
6. **Verify accessibility**: Use semantic locators

## Troubleshooting

### Tests timing out
- Check if dev server is running on port 3000
- Verify no other processes are using the port
- Use `domcontentloaded` instead of `networkidle` for faster loading

### Browser not found
```bash
npx playwright install
```

### Test reports not generated
```bash
npm run test:report
```

### Debug failing tests
```bash
npm run test -- --debug --grep="failing test name"
```

## Taiwan Bike Tour Specific Tests

Our **smoke tests** verify essential project functionality:

- **Page Loading**: Basic website functionality and error-free loading
- **Core Content**: Tour information is displayed (Taiwan Bike Tour 2025)
- **Navigation**: Main navigation elements are present and accessible
- **Error Tolerance**: Filters out external service errors (Strava, CORS, network issues)

**Note**: More comprehensive feature testing (QR codes, Strava integration, detailed itinerary) is available in legacy test files but excluded from CI/CD due to external service dependencies that can cause test instability.

For more details, see the [project-specific coding instructions](.github/copilot-instructions.md).

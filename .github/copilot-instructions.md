# Copilot Instructions for Taiwan Bike Trip

## Project Overview

A Next.js static site showcasing an 8-day Taiwan cycling tour with interactive itinerary, QR codes for accommodations, and Strava route integration. Built for GitHub Pages deployment with static export.

## Architecture & Key Patterns

### Static Export Configuration

- **Critical**: All changes must work with `output: 'export'` in `next.config.ts`
- Use `next/image` with `unoptimized: true` for GitHub Pages compatibility
- All components are client-side (`'use client'`) for static deployment
- BasePath/assetPrefix configured for GitHub Pages subdirectory deployment (`/taiwan-bike-trip`)

### Component Structure & Data Flow

```
app/
├── page.tsx              # Main layout: Navigation → Hero → Features → TourStats → ItineraryEnhanced → Footer
├── components/
│   ├── ItineraryEnhanced.tsx    # Primary component - contains complete schedule data array
│   ├── Itinerary.tsx           # Alternative/legacy view - compact grid layout
│   ├── QRCodeDisplay.tsx       # Canvas-based QR generation with bubble tea emoji overlay
│   ├── StravaRouteEmbed.tsx    # Third-party Strava embed integration with placeholder handling
│   ├── TourStats.tsx           # Animated statistics with intersection observer
│   ├── Hero.tsx, Features.tsx, Navigation.tsx, Footer.tsx  # Standard layout components
```

### Data Architecture & Structure

- **Single source of truth**: `ItineraryEnhanced.tsx` contains hardcoded `schedule` array (both components have similar arrays but may diverge)
- **Day object structure**: `{ day, date, location, title, description, stravaRouteID, details: { distance, estimatedTime, elevation }, accommodation: { name, type, price, roomType, features, bikeStorage, qrCode }, note }`
- **Route handling**: `stravaRouteID: null` indicates non-cycling days (e.g., arrival), placeholder handling for missing routes
- **QR codes**: Google Maps short links (`maps.app.goo.gl/...`) for accommodation locations

### Third-Party Integration Patterns

- **Strava**: Dynamically loads `strava-embeds.com/embed.js`, handles placeholder states for missing routes
- **QRCode generation**: Uses `qrcode` npm package with high error correction ('H'), renders to canvas with custom bubble tea emoji overlay (20% size, centered)
- **MCP Server**: Custom API routes at `/api/mcp` providing tour data tools for AI integration
- **No direct APIs**: All external data is embedded as URLs or hardcoded data

## Development Workflows

### Local Development

```bash
npm run dev --turbopack  # Uses Turbopack for faster development builds
npm run dev              # Standard development server
```

### Git Hooks & Code Quality (Husky)

```bash
# Automatic pre-commit checks (runs on every git commit)
# - Loads nvm environment for Node.js version consistency
# - Runs lint-staged: ESLint --fix and Prettier formatting on staged files
# - Executes smoke tests (npm run test:smoke) to ensure basic functionality

# Manual quality commands
npm run lint:fix         # Fix linting issues
npx prettier --write .   # Format all files
npm run test:smoke       # Run fast smoke tests only
```

- **Commit message validation**: Enforces conventional format `type(scope): description`
- **Valid types**: feat, fix, docs, style, refactor, test, chore
- **Node.js version**: Fixed to 22.17.1 via `.nvmrc` and nvm integration in hooks
- **lint-staged**: Only processes staged files for efficiency

### Testing & Quality Assurance

```bash
# Playwright testing commands
npm test                 # Run all tests (alias for playwright test)
npm run test:headed      # Run tests in headed mode (visible browser)
npm run test:ui          # Interactive test runner with live editing
npm run test:report      # View HTML test report

# First-time setup
npx playwright install   # Install browsers for testing
```

### Static Build & Deploy

```bash
npm run build  # Generates static export in ./out directory
```

### Testing Architecture & Patterns

- **Auto-server startup**: `playwright.config.ts` starts dev server automatically for tests with environment-specific nvm integration
- **Multi-browser support**: Chromium, Firefox, WebKit (mobile browsers commented out)
- **Test structure**: Feature-based test files in `/tests` directory
- **Key test files**:
  - `smoke.spec.ts`: Basic functionality validation (3 tests) - **PRIMARY** for pre-commit hooks
  - Legacy test files exist but smoke tests are the main validation
- **Environment handling**: CI uses direct `npm run dev`, local development uses nvm via bash

### Testing Strategy & Considerations

- **External dependencies**: Tests avoid relying on external iframe loading (Strava embeds) for reliability
- **Route testing**: Tests check for `.strava-embed-placeholder` elements instead of loaded iframes
- **Error tolerance**: Smoke tests filter out external service errors (CORS, network) and browser-specific issues
- **Fallback patterns**: Components gracefully handle missing external content with placeholder states

### CI/CD Pipelines

- **Deployment**: `.github/workflows/deploy.yml` - Auto-deploy to GitHub Pages on main branch push
- **Testing**: `.github/workflows/playwright.yml` - E2E testing on push/PR (main, develop branches)
- **Dependabot**: `.github/workflows/dependabot-auto-merge.yml` - Automated dependency updates and merging
- **Path filtering**: Deployment skips for `.md`, Python scripts, PDF changes
- **Optimizations**: Concurrent cancellation, npm cache, prefer-offline installs
- **Smoke testing**: Post-deployment smoke tests run against deployed site using `BASE_URL` env var
- **Node.js consistency**: All workflows use `node-version-file: '.nvmrc'` for version consistency

### Data Management Workflows

- **Schedule updates**: Modify the `schedule` array in `ItineraryEnhanced.tsx` (primary) or `Itinerary.tsx` (compact)
- **Route IDs**: Update `stravaRouteID` strings to change embedded routes; use `null` for non-cycling days
- **Accommodation changes**: Modify `accommodation` object properties; ensure `qrCode` URLs are short Google Maps links

### MCP Server Integration (Development Tool)

- **Status**: Documentation and configuration available for future implementation
- **Planned Endpoint**: `http://localhost:3000/api/mcp` when implemented
- **Purpose**: Provides AI-accessible tour data tools (get_tour_info, get_daily_itinerary, calculate_tour_stats, generate_booking_email)
- **Current Files**: Configuration in `.vscode/mcp.json`, documentation in `MCP_SERVER.md`, test script `test-mcp.js`
- **Implementation Status**: API routes not yet implemented - documentation exists as reference

## Project-Specific Conventions

### Component Patterns

- **Two-column layout**: `ItineraryEnhanced` uses `lg:grid-cols-2` with content left, accommodation/QR right
- **Grid layout**: `Itinerary` uses `md:grid-cols-2 lg:grid-cols-3` for compact card display
- **Conditional rendering**: `{item.stravaRouteID && (...)}` pattern for optional route embeds
- **Index-based numbering**: Day counter uses `{index}` in circle, not parsed from `item.day`

### State Management

- **Intersection Observer**: `TourStats` uses observer for scroll-triggered animations with `threshold: 0.3`
- **Dynamic script loading**: `StravaRouteEmbed` checks for existing script before loading
- **Canvas ref pattern**: `QRCodeDisplay` uses `useRef<HTMLCanvasElement>` for direct canvas manipulation

### QR Code Generation

- Uses high error correction level ('H') to support logo overlay without breaking scanning
- Bubble tea emoji (🧋) centered as 20% size overlay on white circular background
- Canvas-based rendering for pixel-perfect control and custom drawing
- Size prop controls overall dimensions (default 80px, itinerary uses 120px)

### Route Integration Patterns

- `stravaRouteID` of `null` indicates no cycling (e.g., arrival day) - conditionally hides route embed
- Route ID format: Long numeric strings (e.g., `'3327904070859937976'`)
- Placeholder handling: Falls back to `'placeholder-route-id'` with gray styling when route missing
- Satellite map style preferred for route visualization (`style='satellite'`)

### Styling & Layout Patterns

- **Color scheme**: Primary blue-600/blue-700, secondary blue-50/blue-100 for backgrounds
- **Gradients**: `from-gray-50 to-white` for sections, `from-blue-600 to-blue-800` for hero areas
- **Card design**: `rounded-xl shadow-sm` with `hover:shadow-lg` transitions
- **Typography**: `font-light` for headers, `text-2xl font-light` for statistics
- **Responsive grids**: Mobile-first with `md:` and `lg:` breakpoints

## Critical Dependencies & Compatibility

- **React 19.1.1 + Next.js 15.4.5** with TypeScript 5.8.3 for latest features
- **QR generation**: Requires both `qrcode@1.5.4` and `@types/qrcode@1.5.5` packages
- **Tailwind CSS 4.1.11** for styling with PostCSS integration
- **Playwright 1.54.1**: E2E testing framework with HTML reporting and multi-browser support
- **GitHub Pages deployment**: Specific `next.config.ts` settings for static export and subdirectory hosting
- **Husky 9.1.7 + lint-staged 16.1.2 + Prettier 3.6.2**: Git hooks for automated code quality enforcement
- **Node.js 22.17.1**: Specified in `.nvmrc`, critical for nvm environment consistency in hooks and CI

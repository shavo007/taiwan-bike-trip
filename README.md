# Taiwan Bike Trip 2025

A Next.js static site showcasing an **8-day cycling adventure** through Taiwan (October 26 - November 2, 2025), featuring interactive itinerary, QR codes for accommodations, and comprehensive Strava route integration. Built for GitHub Pages deployment with static export.

## ✨ Features

- **Interactive Itinerary**: Complete 8-day schedule with daily breakdowns
- **QR Code Integration**: Custom-branded QR codes with bubble tea emoji for accommodation locations
- **Strava Route Embedding**: 7 cycling routes with interactive elevation profiles and satellite maps
- **Responsive Design**: Mobile-first design with Tailwind CSS v4
- **Static Export**: Optimized for GitHub Pages deployment with automatic builds
- **Comprehensive Testing**: Full Playwright test suite covering all functionality
- **MCP Server Integration**: Custom tour data server for development workflow

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn package manager

### Development

```bash
# Install dependencies
npm install

# Start development server with Turbopack (faster builds)
npm run dev --turbopack

# Alternative: Standard development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build & Export

```bash
# Create static export for deployment
npm run build
```

This generates a static site in the `out` directory, optimized for GitHub Pages.

## 🧪 Testing

Comprehensive end-to-end testing with Playwright covering all website functionality.

### Run Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npx playwright test

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests with UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test tests/homepage-exploration.spec.ts
```

### Test Coverage

- **Homepage**: Navigation, hero section, features, statistics
- **Itinerary**: Daily schedules, accommodations, QR codes
- **Strava Integration**: Route embeds, difficulty progression, interactive maps
- **Responsive Design**: Mobile/desktop layouts
- **Smoke Tests**: Core functionality validation

### Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Push your code to GitHub**
2. **Enable GitHub Pages in your repository settings:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select `gh-pages` (will be created automatically)
3. **The workflow will automatically deploy on push to main branch**

### Manual Deployment:

If you prefer to deploy manually:

```bash
npm run build
# Upload the contents of the `out` directory to your web server
```

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── Hero.tsx                 # Hero section with tour overview
│   │   ├── Features.tsx             # Key features showcase
│   │   ├── TourStats.tsx           # Animated statistics
│   │   ├── Navigation.tsx          # Site navigation
│   │   ├── Footer.tsx              # Site footer
│   │   ├── Itinerary.tsx           # Compact grid itinerary view
│   │   ├── ItineraryEnhanced.tsx   # Primary detailed itinerary
│   │   ├── QRCodeDisplay.tsx       # QR code generation with bubble tea branding
│   │   └── StravaRouteEmbed.tsx    # Strava route integration
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main page
├── tests/                          # Playwright test suite
│   ├── homepage-exploration.spec.ts # Core website functionality
│   ├── strava-integration.spec.ts   # Strava route testing
│   ├── itinerary.spec.ts           # Itinerary feature testing
│   ├── homepage.spec.ts            # Basic homepage tests
│   └── smoke.spec.ts               # Smoke tests
├── public/
│   └── images/                     # Static images
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml              # GitHub Pages deployment
│   │   └── playwright.yml          # Playwright CI/CD
│   └── instructions/               # Development guidelines
├── playwright.config.ts            # Playwright configuration
└── next.config.ts                  # Next.js configuration (static export)
```

## 🛠️ Technologies Used

### Core Framework

- **Next.js 15.4.4** - React framework with App Router and static export
- **React 19** - Latest React with enhanced performance
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization

### Testing & Quality

- **Playwright ^1.54.1** - End-to-end testing framework
- **ESLint** - Code linting and quality enforcement
- **Multi-browser testing** - Chromium, Firefox, WebKit support

### Integrations

- **Strava API** - Route embedding and cycling data
- **QR Code Generation** - Custom branded accommodation codes
- **Google Maps** - Location linking via short URLs

### Development Tools

- **Turbopack** - Fast development builds
- **GitHub Actions** - Automated testing and deployment
- **MCP Server** - Custom tour data integration

## 🚴‍♂️ Tour Details

- **Duration**: 8 days (October 26 - November 2, 2025)
- **Route**: Complete Taiwan cycling circuit
- **Difficulty**: Progressive from +313m (Day 1) to +5,000m (Day 5)
- **Accommodations**: 7 locations with QR codes and booking details
- **Cycling Days**: 7 routes with Strava integration

## 🔧 Development Workflow

### Git Hooks (Automated Quality Checks)

This project uses [Husky](https://typicode.github.io/husky/) to run automated quality checks on every commit:

#### Pre-commit Hook

- **Code Formatting**: Runs Prettier on staged files
- **Linting**: Runs ESLint with auto-fix on staged files
- **Smoke Tests**: Runs critical Playwright tests (`npm run test:smoke`)

#### Commit Message Hook

- Enforces conventional commit format: `type(scope): description`
- Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Example: `feat(components): add QR code display`

### Testing Commands

```bash
npm test              # Run all Playwright tests
npm run test:smoke    # Run smoke tests only (used in pre-commit)
npm run test:headed   # Run tests with visible browser
npm run test:ui       # Interactive test runner
```

### Code Quality Commands

```bash
npm run lint          # Check code style
npm run lint:fix      # Fix linting issues automatically
npx prettier --write . # Format all files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npx playwright test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

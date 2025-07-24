# Copilot Instructions for Taiwan Bike Trip

## Project Overview
A Next.js static site showcasing a 7-day Taiwan cycling tour with interactive itinerary, QR codes for accommodations, and Strava route integration. Built for GitHub Pages deployment with static export.

## Architecture & Key Patterns

### Static Export Configuration
- **Critical**: All changes must work with `output: 'export'` in `next.config.ts`
- Use `next/image` with `unoptimized: true` for GitHub Pages compatibility
- All components are client-side (`'use client'`) for static deployment
- BasePath/assetPrefix configured for GitHub Pages subdirectory deployment

### Component Structure
```
app/
├── page.tsx              # Main layout: Navigation → Hero → Features → TourStats → ItineraryEnhanced → Footer
├── components/
│   ├── ItineraryEnhanced.tsx    # Core data structure with schedule array
│   ├── QRCodeDisplay.tsx        # Canvas-based QR generation with bubble tea emoji overlay
│   └── StravaRouteEmbed.tsx     # Third-party Strava embed integration
```

### Data Architecture
- **Central data source**: `ItineraryEnhanced.tsx` contains hardcoded `schedule` array with structured day objects
- Each day object includes: `day`, `date`, `location`, `title`, `description`, `stravaRouteID`, `details`, `accommodation`, `note`
- QR codes link to Google Maps locations via `accommodation.qrCode` URLs

### Third-Party Integrations
- **Strava**: Uses `strava-embeds.com/embed.js` script loaded dynamically in `StravaRouteEmbed`
- **QRCode**: Server-side generation with `qrcode` npm package, renders to canvas with custom logo overlay
- **Maps**: Google Maps links embedded as QR codes, not direct API integration

## Development Workflows

### Local Development
```bash
npm run dev --turbopack  # Uses Turbopack for faster builds
```

### Static Build & Deploy
```bash
npm run build  # Generates static export in ./out directory
```

#### Deployment Optimizations
- **Automatic GitHub Pages deployment** via `.github/workflows/deploy.yml`
- **Smart caching**: Next.js build cache + npm dependencies cached by lock file hash
- **Path filters**: Skips builds for documentation/non-code changes (`.md`, Python scripts)
- **Optimized npm install**: Uses `--prefer-offline --no-audit --no-fund` for faster installs
- **Node.js 20**: Uses latest LTS for better performance vs original Node 18
- **Concurrency control**: Prevents conflicting deployments with `cancel-in-progress`
- **Manual deployment**: Upload `./out` contents to web server

## Project-Specific Conventions

### QR Code Generation
- Uses high error correction level ('H') to support logo overlay
- Bubble tea emoji (🧋) centered as 20% size overlay on white background
- Canvas-based rendering for pixel-perfect control

### Route Integration  
- `stravaRouteID` of `null` indicates no cycling (e.g., arrival day)
- Placeholder route ID handling for incomplete route data
- Satellite map style preferred for route visualization

### Styling Patterns
- Tailwind CSS with gradient backgrounds (`from-gray-50 to-white`)
- Consistent color scheme: blue-600/blue-700 for primary elements
- Card-based layout with hover effects and subtle shadows
- Grid layouts: `lg:grid-cols-2` for desktop, stacked mobile

## Utilities & Scripts

### Python QR Extraction
- `extract_qr_codes.py`: Extracts QR codes from PDF accommodation documents
- Dependencies: `pdfplumber`, `PIL`, `cv2`, `pyzbar`
- Used for initial data extraction, not part of web app build

### File Naming
- Component files use PascalCase (e.g., `ItineraryEnhanced.tsx`)
- Utility scripts use snake_case (e.g., `extract_qr_codes.py`)

## Critical Dependencies
- React 19 + Next.js 15 with TypeScript
- QR generation requires both `qrcode` and `@types/qrcode`
- Tailwind CSS v4 for styling
- GitHub Pages deployment requires specific next.config.ts settings

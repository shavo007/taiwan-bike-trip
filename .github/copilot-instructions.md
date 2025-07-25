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
- **No direct APIs**: All external data is embedded as URLs or hardcoded data

## Development Workflows

### Local Development
```bash
npm run dev --turbopack  # Uses Turbopack for faster development builds
```

### Static Build & Deploy
```bash
npm run build  # Generates static export in ./out directory
```

### Data Management Workflows
- **Schedule updates**: Modify the `schedule` array in `ItineraryEnhanced.tsx` (primary) or `Itinerary.tsx` (compact)
- **Route IDs**: Update `stravaRouteID` strings to change embedded routes; use `null` for non-cycling days
- **Accommodation changes**: Modify `accommodation` object properties; ensure `qrCode` URLs are short Google Maps links

#### Deployment Optimizations
- **Automatic GitHub Pages deployment** via `.github/workflows/deploy.yml`
- **Smart caching**: Next.js build cache + npm dependencies cached by lock file hash
- **Path filters**: Skips builds for documentation/non-code changes (`.md`, Python scripts, PDFs)
- **Optimized npm install**: Uses `--prefer-offline --no-audit --no-fund` for faster CI installs
- **Node.js 20**: Uses latest LTS for better performance vs original Node 18
- **Concurrency control**: Prevents conflicting deployments with `cancel-in-progress`

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

## Utilities & Scripts

### Python QR Extraction (Development Only)
- `extract_qr_codes.py`: Extracts QR codes from `bike_accommodation.pdf` using `pdfplumber`, `cv2`, `pyzbar`
- `extract_qr_from_pngs.py`: Alternative PNG-based extraction
- Used for initial data extraction from PDF documents, not part of web app build process
- Dependencies not included in package.json (development/data preparation only)

### File Organization
- Component files: PascalCase (e.g., `ItineraryEnhanced.tsx`)
- Utility scripts: snake_case (e.g., `extract_qr_codes.py`)
- Static assets: `public/images/` for images, `public/` for icons

## Critical Dependencies & Compatibility
- **React 19 + Next.js 15** with TypeScript for latest features
- **QR generation**: Requires both `qrcode` and `@types/qrcode` packages
- **Tailwind CSS v4** for styling with PostCSS integration
- **GitHub Pages deployment**: Specific `next.config.ts` settings for static export and subdirectory hosting

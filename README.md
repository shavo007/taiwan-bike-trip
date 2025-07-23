# Taiwan Bike Trip 2025

A Next.js application showcasing a 7-day cycling adventure through Taiwan, featuring QR codes for accommodations and Strava route integration.

## Features

- Interactive itinerary with day-by-day breakdown
- QR code generation for accommodation locations
- Strava route integration
- Responsive design with Tailwind CSS
- Static export for GitHub Pages deployment

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

This will create a static export in the `out` directory.

## Deployment

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

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Hero.tsx           # Hero section
│   │   ├── Itinerary.tsx      # Main itinerary component
│   │   ├── QRCodeDisplay.tsx  # QR code generation
│   │   └── StravaRouteEmbed.tsx # Strava route integration
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── images/
└── .github/workflows/
    └── deploy.yml             # GitHub Actions workflow
```

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- QR Code generation
- Strava API integration

# GitHub Copilot Instructions for Taiwan Bike Trip

## Project Overview
This is a React + TypeScript web application for finding bike-friendly accommodations in Taiwan. The project uses Vite as the build tool and Tailwind CSS for styling.

## Key Technologies
- Frontend: React 18+ with TypeScript
- Styling: Tailwind CSS
- Build Tool: Vite
- Deployment: GitHub Pages
- CI/CD: GitHub Actions

## Project Structure
```
src/
  components/    # React components
    BikeAccommodation.tsx  # Example of a feature component
  App.tsx        # Main application component
  main.tsx      # Application entry point
```

## Development Workflow

### Local Development
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173/taiwan-bike-trip/`

### Deployment
- Deployments happen automatically on push to `main` branch
- Manual deployments can be triggered via GitHub Actions using the `workflow_dispatch` event
- Base URL is configured as `/taiwan-bike-trip/` for GitHub Pages hosting

## Component Patterns
1. Feature Components:
   - Located in `src/components/`
   - Use TypeScript interfaces for props
   - Example: `BikeAccommodation.tsx` demonstrates data structure and Tailwind styling patterns

2. Layout Structure:
   - Use Tailwind's container patterns: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
   - Responsive design breakpoints: `sm:`, `md:`, `lg:`
   - Example in `App.tsx`:
   ```tsx
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <h1 className="text-4xl font-bold">Title</h1>
   </div>
   ```

## TypeScript Conventions
- Use explicit type annotations for component props
- Define interfaces for data structures
- Example:
```typescript
interface Accommodation {
  name: string;
  location: string;
  description: string;
  amenities: string[];
}
```

## GitHub Actions
- Workflow file: `.github/workflows/deploy.yml`
- Builds and deploys to GitHub Pages
- Supports both automatic (on push) and manual triggers
- Node.js version: 20.x

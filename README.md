# Space Explorer — Interactive 3D Solar System Dashboard

A futuristic space exploration dashboard built with React, Three.js, and Node.js. Featuring an interactive 3D solar system, planet comparison tools, real-time space facts, and a sci-fi mission-control inspired interface.

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-r160-000000)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4)
![Node](https://img.shields.io/badge/Node.js-18-339933)

---

## Overview

Space Explorer is a visually immersive web application that brings the solar system to your browser. Designed with a dark cosmic theme, glassmorphism UI panels, and smooth animations, it recreates the experience of a NASA mission control dashboard. Users can explore all eight planets in real-time 3D, view scientific data, compare planetary attributes, and learn fascinating space facts — all within a single-page application with a premium sci-fi aesthetic.

The application features a fully interactive Three.js-powered 3D solar system as its centerpiece. Each planet orbits the Sun at a relative speed and distance, with click interactions that highlight orbit paths, trigger visual effects, and populate a detailed information panel. The UI is built with Framer Motion for fluid animations and TailwindCSS for precise, responsive styling with a custom dark-space color palette.

A lightweight Node.js backend serves planetary data and space facts through RESTful API endpoints, with a fallback mechanism that ensures the frontend works even when the backend is unreachable. The architecture is modular, component-driven, and designed for easy extension — whether adding new planets, mission data, or gallery features.

---

## Features

### 3D Solar System
- **Interactive 3D Scene** — Built with @react-three/fiber and Three.js, featuring a central glowing Sun with emissive materials and dynamic point lighting.
- **Orbital Mechanics** — Each planet orbits the Sun at unique speeds and radii based on real relative data, creating a realistic and mesmerizing visual display.
- **Click & Hover Interactions** — Click any planet to select it, highlighting its orbit ring, updating the info panel, and smoothly reorienting the camera. Hover reveals a tooltip with the planet's name.
- **Orbit Controls** — Users can freely rotate, pan, and zoom within the 3D scene using mouse drag and scroll, with configurable distance limits.

### Planet Information
- **Dynamic Info Panel** — A glassmorphism card updates with smooth fade-in animations whenever a planet is selected, displaying the planet's name, subtitle, category badge, and a color-coded circular icon.
- **Scientific Data** — Five key statistics are shown: distance from the Sun, mass, radius, temperature, and number of moons, each with an icon and formatted display.
- **Description** — A short scientific paragraph provides educational context about each planet.
- **Action Button** — "View Details" CTA button with gradient styling for future deep-dive pages.

### Planet Comparison
- **Multi-Select Comparison** — Users can select up to three planets from a horizontally scrollable card interface. Selected planets are highlighted with neon glow effects and scaling animations.
- **Comparison Cards** — Once selected, each planet shows a mini card with its name, radius, moon count, and temperature side by side for quick visual comparison.
- **Primary CTA** — A prominent "Compare Now" button triggers the comparison action.

### Search & Navigation
- **Sidebar Navigation** — Fixed vertical sidebar with glass blur background, neon glow for the active item, and hover scaling animations. Includes icons for Home, Solar System, Planets, Compare, Missions, Space Facts, Gallery, and Settings.
- **Search Bar** — A pill-shaped search input in the top bar with glow focus animation that filters planets by name and allows direct selection.
- **User Actions** — Star favorites, notification bell, and profile avatar icons in the top bar with hover effects.

### Extra UI Widgets
- **Did You Know? Card** — Auto-rotating space trivia facts with a 5-second carousel interval, smooth fade transitions, and a subtle galaxy background pattern.
- **Stats Bar** — Bottom bar displaying key metrics: Total Planets (8), Missions (150+), Space Facts (1000+), plus an "Explore Universe" gradient button.

### Animations
- Continuous rotating solar system loop
- Floating star particle background in the 3D scene
- Planet hover pulse glow effect
- Panel fade-in and slide transitions
- Sidebar item hover scale effect
- Search bar focus glow animation
- Trivia card text crossfade
- Loading spinner with pulse animation

---

## Tech Stack

### Frontend
- **React 18** — Component-based UI with hooks and functional components
- **Vite 5** — Fast build tool and dev server with HMR
- **TailwindCSS 3** — Utility-first CSS framework with custom dark-space theme
- **Framer Motion 10** — Declarative animations and gesture handling
- **Three.js r160** — 3D graphics library for WebGL rendering
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Utility components for R3F
- **React Icons** — Feather icon library for UI elements
- **Axios** — HTTP client for API requests

### Backend
- **Express.js** — Lightweight Node.js web server
- **CORS** — Cross-origin resource sharing middleware
- **RESTful API** — Structured JSON endpoints for planet data and space facts

---

## Project Structure

```
space-explorer/
├── index.html                  # Vite entry point
├── vite.config.js              # Vite configuration with API proxy
├── tailwind.config.js          # TailwindCSS theme customization
├── postcss.config.js           # PostCSS configuration
├── package.json                # Frontend dependencies
├── server/
│   ├── package.json            # Backend dependencies
│   ├── server.js               # Express server entry point
│   ├── routes/
│   │   ├── planets.js          # Planet API routes
│   │   └── facts.js            # Facts API routes
│   ├── controllers/
│   │   ├── planetController.js # Planet request handlers
│   │   └── factController.js   # Facts request handlers
│   └── data/
│       ├── planets.json        # 8 planets with full metadata
│       └── facts.json          # 20 space trivia facts
└── src/
    ├── main.jsx                # React entry point
    ├── index.css               # Global styles + Tailwind imports
    ├── App.jsx                 # Root component with layout orchestration
    ├── hooks/
    │   ├── usePlanets.js       # Planet data fetching + state
    │   └── useFacts.js         # Facts fetching + rotation logic
    └── components/
        ├── Sidebar.jsx         # Fixed left navigation panel
        ├── TopBar.jsx          # Search bar and user actions
        ├── SolarSystem.jsx     # 3D scene with Sun, planets, stars
        ├── PlanetInfoPanel.jsx # Dynamic planet detail card
        ├── CompareModule.jsx   # Planet selection and comparison
        ├── TriviaCard.jsx      # Rotating space fact display
        └── StatsBar.jsx        # Bottom metrics bar
```

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
git clone https://github.com/nexusauth0-cloud/space-explorer.git
cd space-explorer
npm install
cd server && npm install && cd ..
```

### Running the Application
Start the backend API server (terminal 1):
```bash
npm run server
```
Start the frontend dev server (terminal 2):
```bash
npm run dev
```
Open http://localhost:3000 in your browser. The Vite dev server proxies API requests to port 5000 automatically.

### Building for Production
```bash
npm run build
```
Output will be in the `dist/` directory, ready for static hosting.

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/planets` | GET | Returns all 8 planets with full metadata |
| `/api/planets/:id` | GET | Returns a single planet by ID (e.g., `earth`) |
| `/api/planets/compare?ids=earth,mars,jupiter` | GET | Returns comparison data for up to 3 planets |
| `/api/facts` | GET | Returns all space facts |
| `/api/facts/random` | GET | Returns a single random fact |
| `/api/health` | GET | Health check endpoint |

### Sample Planet Response
```json
{
  "id": "earth",
  "name": "Earth",
  "subtitle": "The Blue Planet",
  "distanceFromSun": "149.6 million km",
  "mass": "5.97 × 10^24 kg",
  "radius": "6,371 km",
  "temperature": "15°C",
  "moons": 1,
  "orbitalPeriod": "365.25 days",
  "category": "Terrestrial",
  "color": "#3B82F6",
  "orbitRadius": 20,
  "orbitSpeed": 1.0,
  "size": 1.0,
  "description": "Earth is the third planet from the Sun and the only known world to harbor life."
}
```

---

## Configuration

### TailwindCSS Theme
The custom theme in `tailwind.config.js` defines:
- **space** (`#050814`) — Deep space navy background
- **neon** (`#3B82F6`) — Blue neon primary glow
- **accent** (`#F59E0B`) — Sun orange accent
- Custom glow shadows and animations

### Backend
The Express server runs on port 5000 by default. Set the `PORT` environment variable to change it. CORS is enabled for all origins. The Vite dev server proxies `/api` requests to the backend via `vite.config.js`.

---

## Deployment

### Static Frontend + Backend
1. Build the frontend: `npm run build`
2. Serve the `dist/` folder from any static host (Netlify, Vercel, GitHub Pages, S3)
3. Deploy the server directory to any Node.js hosting platform (Railway, Render, Fly.io) and update the API base URL in `src/hooks/` if needed

For a single-server deployment, configure Express to serve the static `dist/` folder from the `server/` directory and handle the API routes.

---

## Roadmap

- [ ] Add detailed planet views with high-resolution textures
- [ ] Implement mission data with launch timelines and spacecraft details
- [ ] Add gallery page with NASA image integration
- [ ] Dark/light theme toggle
- [ ] User favorites and bookmarking
- [ ] 3D planet rotation with axial tilt visualization
- [ ] Real-time asteroid belt and dwarf planet (Ceres, Pluto)
- [ ] Timeline slider for historical space exploration events

---

## License

MIT

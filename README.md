# Attribution Portfolio Hub

A modern, visually stunning portfolio website showcasing 10+ production-grade attribution and data science projects.

[![Next.js](https://img.shields.io/badge/Next.js-15+-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3+-cyan)](https://tailwindcss.com/)

---

## Overview

This portfolio hub serves as a unified command center for all attribution and data science projects, featuring:

- **10 Production-Grade Projects** across attribution, forecasting, experimentation, and identity resolution
- **Netflix/Disney+ Scale** demonstrations with real performance metrics
- **Dark Theme Command Center UI** with tactical styling and animations
- **Responsive Design** optimized for all screen sizes

---

## Featured Projects

| Project | Target Company | Key Metric |
|---------|---------------|------------|
| Real-Time Streaming Attribution | Netflix | 208K eps, 87ms latency |
| Probabilistic Identity Resolution | Netflix/Disney+ | 81% accuracy |
| Bayesian Media Mix Modeling | Marketing CFO | 94% ROI accuracy |
| Live Event ROI Engine | WWE Raw/ESPN | 5m windows, 94% correlation |
| Causal Inference Test Suite | CFO/Marketplace | 94% integrity |
| Behavioral Profiling Platform | Uber/Airbnb | 45% ROAS gain |
| Spatio-Temporal Forecasting | Uber/DoorDash | 94% PI coverage |
| Experimentation Stats Engine | Netflix/Meta | 30% faster |
| Geo-Lift Incrementality | Growth Teams | 95% CI coverage |
| First-Principles Attribution | Core Engine | 100% deterministic |

---

## Quick Start

```bash
# Navigate to portfolio hub
cd portfolio-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:3000
```

---

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Icons**: Lucide React
- **Fonts**: Mono font stack

---

## Features

### Visual Design
- Carbon fiber textured backgrounds
- Tactical grid overlays
- Scanline effects
- Animated status indicators
- Red accent color scheme

### Project Cards
- Dynamic grid layout (responsive)
- Hover animations and transitions
- Status indicators (Operational, Production, Validated, etc.)
- Target company badges
- KPI output metrics

### System Modules
- Active module status display
- Sub-system grid
- Launch command center

---

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## Status

**Phase**: Production Ready
**Version**: 1.0.0
**Last Updated**: January 31, 2026

---

## License

MIT License - See LICENSE for details.

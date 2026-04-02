# 🌟 Stellar Mentor Marketplace

> A decentralized mentorship platform built on Soroban smart contracts. Connect skilled mentors with eager mentees in a transparent, on-chain marketplace powered by Stellar blockchain technology.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/Node-18+-green.svg)]()
[![React](https://img.shields.io/badge/React-19.2-blue.svg)]()
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-purple.svg)](https://developers.stellar.org/docs/build/smart-contracts)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Stellar Mentor Marketplace is a modern Web3 application that facilitates mentorship relationships entirely on-chain. Built with React 19 and Vite, it integrates with Stellar's Soroban smart contract platform to create a trustless, transparent marketplace where:

- **Mentors** can register profiles, set rates, and manage mentee relationships
- **Mentees** can discover mentors, request sessions, and provide transparent ratings
- **All interactions** are cryptographically verified and immutably stored on Stellar testnet

The application features a professional two-page architecture: a premium landing page for discovery and a powerful workspace for contract interactions.

## Features

✨ **Core Capabilities**
- 🔐 Freighter wallet integration with cryptographic signing
- 📝 On-chain mentor profile registration with expertise metadata
- 🤝 Mentorship request and acceptance workflow
- ⏱️ Session completion tracking with timestamped records
- ⭐ Transparent mentor rating system (1-5 stars)
- 🔍 Real-time mentor discovery and profile browsing
- 📊 Contract state queries and analytics

✔️ **Professional UX**
- Premium landing page with hero messaging and value proposition
- Multi-tab workspace for organized mentorship management
- Sticky output panel for live contract interaction feedback
- Fully responsive design (desktop, tablet, mobile)
- Dark landing theme with blue/gold accent palette
- Light workspace theme optimized for productivity

🛡️ **Blockchain Features**
- 100% on-chain data persistence
- Secure wallet authentication via Freighter
- Direct Soroban contract execution
- Testnet deployment with public contract verification

## Architecture

### Component Structure

```
src/
├── App.jsx                    # Router component (3 routes: /, /app, catch-all)
├── pages/
│   ├── LandingPage.jsx       # Premium landing with hero, stats, CTAs
│   ├── LandingPage.css       # Dark theme with gold accents
│   ├── AppWorkspacePage.jsx  # Contract interaction workspace
│   └── AppWorkspacePage.css  # Light professional theme
├── main.jsx                  # React entry with BrowserRouter
├── App.css                   # Shared styles (deprecated, see page-specific CSS)
├── index.css                 # Global styles
└── assets/                   # Static images and SVGs
lib/
└── stellar.js               # Stellar SDK utilities and contract bindings
```

### Routing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | LandingPage | Marketing entry point, value prop, CTAs |
| `/app` | AppWorkspacePage | Main dApp workspace with contract interactions |
| `*` | Redirect to `/` | Catch-all for undefined routes |

### Data Flow

1. **User connects wallet** → Freighter authentication
2. **User registers mentor profile** → `registerProfile()` contract call
3. **Mentee requests mentorship** → `requestMentorship()` contract call
4. **Mentor accepts** → `acceptMentee()` contract call
5. **Mentor completes session** → `completeSession()` contract call
6. **Mentee rates mentor** → `rateMentor()` contract call
7. **Contract stores state** → On-chain data persistence

## Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **Freighter Wallet** extension ([install](https://www.freighter.app/)) connected to Stellar testnet

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/saikattanti/stellar-mentor-marketplace.git
cd stellar-mentor-marketplace
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The app opens at `http://localhost:5173`. Vite will display your local URL in the terminal.

### First Steps

1. Navigate to the landing page (`/`)
2. Click "Launch App" or "Open App" button
3. Click "Connect Freighter" in the workspace
4. **Register as a Mentor:** Navigate to the "Register" tab and fill in your profile
5. **Try Mentorship Actions:** Use the "Mentorship" tab to request/accept sessions
6. **Rate Mentors:** Use the "Rate & Browse" tab to rate mentors and view contract data

## Tech Stack

### Frontend
- **React** 19.2.4 - UI component library
- **React Router DOM** 7.13.2 - Client-side routing
- **Vite** 8.0.1 - Build tool and dev server
- **JavaScript (ES6+)** - Core language

### Blockchain
- **@stellar/stellar-sdk** 14.6.1 - Stellar network integration
- **@stellar/freighter-api** 6.0.1 - Wallet connection
- **Soroban** - Smart contract platform (via Stellar testnet)

### Design
- **Fonts**: Manrope (sans-serif), Playfair Display (serif)
- **Colors**: Blue primary (#1d5fd4), Gold accent (#f4b325), dark backgrounds
- **Responsive**: Mobile-first CSS with 980px and 720px breakpoints

### Build & Deployment
- **Build:** Vite (production optimized)
- **Preview:** Vite preview mode
- **Deployment:** Ready for Vercel, Netlify, GitHub Pages, or traditional hosting

## Project Structure

```
stellar-mentor-marketplace/
├── README.md                  # Project documentation
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint rules
├── index.html                # HTML entry point with meta tags
├── src/
│   ├── App.jsx              # Router orchestrator
│   ├── main.jsx             # React DOM render entry
│   ├── index.css            # Global styles
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.css
│   │   ├── AppWorkspacePage.jsx
│   │   └── AppWorkspacePage.css
│   └── assets/              # Images, icons
├── lib/
│   └── stellar.js           # Contract utilities, constants
├── contract/                # Rust Soroban contract source (reference)
│   └── contracts/hello-world/
├── public/                  # Static files (favicon, etc.)
└── dist/                    # Production build output (generated)
```

## Usage Guide

### Landing Page (`/`)

The landing page introduces the Stellar Mentor Marketplace with:
- **Hero Section**: Compelling value proposition with project benefits
- **Stats Panel**: 4 key metrics (100% On-Chain, Secure Auth, Soroban Engine, Contract ID)
- **Dual CTAs**: "Launch App" (primary) and "Open App" (secondary)
- **Footer Link**: Direct contract verification on Stellar Expert

### App Workspace (`/app`)

#### Tabs

**Register Tab**
- Register your mentor profile on-chain
- Fields: Name, Expertise, Bio, Hourly Rate, Max Mentees
- Output shows contract transaction status

**Mentorship Tab**
- Request mentorship: Find mentor by ID, request sessions with message and hours
- Accept mentees: View and accept incoming mentorship requests
- Complete sessions: Mark sessions finished with timestamped notes

**Rate & Browse Tab**
- Rate mentors: Provide 1-5 star ratings with optional feedback
- Browse: Query total mentors, active sessions, mentor details

#### Output Panel

Live contract interaction results displayed with:
- Status-based border color (green = success, red = error, gray = idle)
- Full JSON responses from contract calls
- Transaction hashes for on-chain verification
- Error messages with debugging context

### Wallet Connection

1. Install [Freighter](https://www.freighter.app/)
2. Configure for Stellar Testnet (Settings → Network)
3. Fund your account with testnet lumens ([faucet](https://laboratory.stellar.org/#?network=test))
4. Click "Connect Freighter" in the app workspace

## Configuration

### Environment Variables

Currently, the app uses a hardcoded contract ID:

```javascript
// lib/stellar.js
export const CONTRACT_ID = 'CBEM2XKBZ7B5GD7MHFVTO6W7Y5HWASEPK5BWFM4LKHUID5CO2AQV6XOJ';
```

To use a different contract:
1. Edit `lib/stellar.js`
2. Replace CONTRACT_ID with your deployed contract address
3. Rebuild with `npm run build`

### Stellar Network

Current setup targets **Stellar Testnet**. To switch networks:
1. Edit `lib/stellar.js` SorobanRpc/Networks references
2. Update Freighter wallet to the target network

## Deployment

### Production Build

```bash
npm run build
```

Output is in the `dist/` directory (ready for static hosting).

### Preview Production Build

```bash
npm run preview
```

### Hosting Options

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages**
```bash
npm run build
# Push dist/ to gh-pages branch
```

**Docker** (Custom)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request with clear description

### Development Workflow

- Run `npm run dev` during development
- Follow ESLint rules (`npm run lint` if configured)
- Test wallet integration on testnet before committing
- Update README/docs for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact & Support

- **GitHub Issues**: [Report bugs](https://github.com/saikattanti/stellar-mentor-marketplace/issues)
- **Stellar Docs**: [Build on Stellar](https://developers.stellar.org/)
- **Soroban Guides**: [Smart Contracts](https://developers.stellar.org/docs/build/smart-contracts)

---

**Live Contract**: [Stellar Expert Explorer](https://stellar.expert/explorer/testnet/contract/CBEM2XKBZ7B5GD7MHFVTO6W7Y5HWASEPK5BWFM4LKHUID5CO2AQV6XOJ)

**Last Updated**: April 2026 | Built with ❤️ on Stellar Soroban

# Stellar Mentor Marketplace

Stellar Mentor Marketplace is a React + Vite frontend for a Soroban smart contract on Stellar testnet. It demonstrates a complete mentorship workflow: mentor registration, mentorship requests, session completion, and mentor ratings.

## What This Project Does

- Connects a Freighter wallet for transaction signing.
- Registers mentor profiles on-chain.
- Lets mentees request mentorship and mentors accept them.
- Completes sessions and stores session updates.
- Rates mentors and reads mentor data from the contract.

## Screenshots

![screenshot](screenshots/home.png)
![screenshot](screenshots/mentorship-flow.png)
![screenshot](screenshots/output-panel.png)

Note: The current files in screenshots/ are placeholders. Replace them with real screenshots from your running app.

## Deployed Contract

- Contract ID: CBEM2XKBZ7B5GD7MHFVTO6W7Y5HWASEPK5BWFM4LKHUID5CO2AQV6XOJ
- Stellar Expert: https://stellar.expert/explorer/testnet/contract/CBEM2XKBZ7B5GD7MHFVTO6W7Y5HWASEPK5BWFM4LKHUID5CO2AQV6XOJ

## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- npm 9+
- Freighter wallet extension (connected to Stellar testnet)

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

### 4. Connect Wallet and Interact

- Click Connect Freighter in the app.
- Use the Register tab to create a mentor profile.
- Use Mentorship actions to request and complete sessions.
- Use Rate and Browse to rate mentors and query contract data.

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

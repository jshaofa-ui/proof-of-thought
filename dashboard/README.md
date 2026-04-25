# Proof of Thought — Web Dashboard

> Next.js dashboard for visualizing TEE-verified multi-model AI consensus in real-time.

## Features

### 5 Dashboard Panels

1. **Agent Network** — Live AXL node visualization with model info, connection status, CPU/memory metrics
2. **Deliberation Feed** — Real-time agent responses with TEE verification badges
3. **Consensus View** — Claims cross-referenced live with green=agreement, amber=divergence, red=conflict
4. **PoT Report** — Final report with consensus score, proof chain links, and full details
5. **Commerce** — x402 payment button with KeeperHub audit receipt

## Tech Stack

- **Next.js 14** — App Router, Server Components
- **Tailwind CSS** — Dark theme, data-forward design
- **Lucide React** — Icon library
- **Recharts** — Data visualization (coming soon)
- **Framer Motion** — Smooth animations

## Quick Start

```bash
cd dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with header
│   │   ├── page.tsx        # Main dashboard page
│   │   └── globals.css     # Global styles
│   └── components/
│       ├── AgentNetwork.tsx      # Panel 1: Agent Network
│       ├── DeliberationFeed.tsx  # Panel 2: Deliberation Feed
│       ├── ConsensusView.tsx     # Panel 3: Consensus View
│       ├── PotReport.tsx         # Panel 4: PoT Report
│       └── CommercePanel.tsx     # Panel 5: Commerce
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Integration

The dashboard connects to the Proof of Thought backend via:
- **WebSocket** — Real-time deliberation updates
- **REST API** — Report data and consensus results
- **x402** — Payment flow via KeeperHub

## License

MIT

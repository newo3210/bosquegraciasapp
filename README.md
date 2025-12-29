# 🌳 BosqueGracias

A biofílico-themed mini-app integrating curated blind mints and a marketplace for digital artworks on Base blockchain.

## 🚀 Features

- **Blind Mint Pool**: Surprise artwork mints at fixed price (0.0007 ETH)
- **Direct Sales Gallery**: Browse and purchase specific artworks
- **Milestone Rewards**: Unlock special artworks by reaching contribution milestones
- **Artist Whitelist**: Off-chain signature-based authentication for artists
- **Hybrid Points System**: Combines app points with on-chain token balance
- **Leaderboard**: Community ranking based on contributions and points
- **Farcaster Integration**: Native mini-app experience within Warpcast

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.8, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI components
- **Blockchain**: Base (Ethereum L2), wagmi, viem, OnchainKit
- **Database**: Upstash Redis
- **IPFS**: Pinata for artwork metadata
- **Auth**: Farcaster Quick Auth
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/newo3210/bosquegraciasapp.git
   cd bosquegraciasapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your values in `.env.local`:
   - Upstash Redis URL and token
   - OnchainKit API key and project ID
   - Pinata JWT for IPFS
   - Smart contract address (after deployment)

4. **Run development server**:
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/newo3210/bosquegraciasapp)

## 🎨 Smart Contract Deployment

The BosqueGracias NFT contract needs to be deployed separately:

1. Open the contract code in Remix IDE
2. Compile with Solidity 0.8.20+
3. Deploy to Base Mainnet (Chain ID: 8453)
4. Update `BOSQUE_NFT_ADDRESS` in `src/lib/contract-abi.ts`
5. Copy the full ABI and update `BOSQUE_ABI` in the same file
6. Update `.env.local` with the contract address

## 📁 Project Structure

```
bosquegraciasapp/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── admin/        # Admin panel
│   │   ├── api/          # API routes
│   │   ├── mint/         # Minting page
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── admin/        # Admin components
│   │   └── ui/           # UI components (shadcn)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   │   ├── db.ts         # Upstash Redis client
│   │   ├── wagmi.ts      # wagmi configuration
│   │   └── contract-abi.ts  # Smart contract ABI
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── package.json
```

## 🔑 Key Components

- **Blind Mint**: Fixed-price surprise artwork minting
- **Gallery Feed**: Browse available artworks with filters
- **Milestone Dashboard**: Track progress and claim rewards
- **Leaderboard**: Community ranking and statistics
- **Admin Panel**: Manage artworks, artists, and configuration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Support

For support, please open an issue on GitHub or contact the team on Farcaster.

## 🔗 Links

- [Base Network](https://base.org)
- [OnchainKit Documentation](https://onchainkit.xyz)
- [Farcaster Developer Docs](https://docs.farcaster.xyz)
- [Upstash Documentation](https://docs.upstash.com/redis)

---

Built with 💚 by the BosqueGracias community

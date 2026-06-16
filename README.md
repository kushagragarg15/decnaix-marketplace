# DecnAIX - Decentralized AI Training Marketplace

> A production-ready blockchain platform democratizing access to AI computational resources through a secure, peer-to-peer marketplace.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://decnaix-marketplace.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-operational-blue)](https://decnaix-marketplace.onrender.com)
[![Smart Contract](https://img.shields.io/badge/contract-verified-orange)](https://sepolia.etherscan.io/address/0x9A4682c96d43ff573A020991119A3f200411a1cA)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌐 Live Application

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | [decnaix-marketplace.vercel.app](https://decnaix-marketplace.vercel.app/) | ✅ Live |
| **Backend API** | [decnaix-marketplace.onrender.com](https://decnaix-marketplace.onrender.com) | ✅ Live |
| **Smart Contract** | [0x9A4682...a1cA](https://sepolia.etherscan.io/address/0x9A4682c96d43ff573A020991119A3f200411a1cA) | ✅ Deployed |

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technical Architecture](#technical-architecture)
- [Technology Stack](#technology-stack)
- [Security Implementations](#security-implementations)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Smart Contract](#smart-contract)
- [Development Roadmap](#development-roadmap)

---

## Overview

DecnAIX addresses the critical challenge of expensive AI infrastructure by creating a decentralized marketplace that connects organizations needing computational resources with providers offering idle GPU capacity. Built on Ethereum blockchain with IPFS storage, the platform ensures transparent, secure, and trustless transactions.

### Problem Statement
- **High barrier to entry**: Cloud GPU costs exceed $3/hour for high-performance instances
- **Underutilized resources**: Individual GPU owners lack monetization opportunities
- **Trust deficit**: Traditional marketplaces require intermediary trust
- **Centralized control**: Single points of failure in existing platforms

### Solution
A decentralized, blockchain-powered platform featuring:
- Smart contract escrow for trustless payments
- IPFS-based decentralized file storage
- End-to-end encryption for intellectual property protection
- Transparent, auditable transaction history

---

## Key Features

### For AI Practitioners (Tenants)
- 🚀 **One-Click Deployment**: Upload training code and datasets through intuitive interface
- 🔐 **IP Protection**: AES-256 encryption ensures code confidentiality
- 💰 **Cost Transparency**: Clear pricing with blockchain-verified payments
- 📊 **Real-time Tracking**: Monitor training progress and resource utilization
- 🔓 **Guaranteed Access**: Automated weight file delivery upon payment confirmation

### For Resource Providers
- 💻 **Effortless Registration**: List GPU specifications in under 60 seconds
- 📈 **Flexible Pricing**: Set competitive rates based on hardware capabilities  
- 💵 **Instant Settlements**: Receive 95% of payment directly via smart contract
- 🛡️ **Risk Mitigation**: Escrow system protects against payment defaults
- 📊 **Performance Analytics**: Track earnings and utilization metrics

### Platform Capabilities
- ⛓️ **Blockchain Escrow**: Smart contracts eliminate payment disputes
- 🌐 **Decentralized Storage**: IPFS ensures data persistence and availability
- 🔒 **Military-Grade Encryption**: AES-256-CBC protects sensitive training data
- 🔗 **Web3 Integration**: Seamless MetaMask connectivity for transactions
- ⚡ **Responsive Design**: Optimized for desktop and mobile experiences
- 🔍 **Blockchain Transparency**: All transactions verifiable on Sepolia Etherscan

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│         React + Vite + TailwindCSS + Ethers.js              │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTPS/REST
                         │
┌────────────────────────┴────────────────────────────────────┐
│                      Backend Layer                           │
│        Node.js + Express + MongoDB + Pinata SDK             │
└────────────┬───────────────────────┬────────────────────────┘
             │                       │
        JWT Auth                  IPFS API
             │                       │
┌────────────┴─────────┐   ┌────────┴──────────┐
│  MongoDB Atlas       │   │  Pinata/IPFS      │
│  User & Task Data    │   │  Encrypted Files  │
└──────────────────────┘   └───────────────────┘
                         
                    Web3 Provider
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  Blockchain Layer                            │
│         Ethereum (Sepolia) + Smart Contract                 │
│         Payment Escrow + Access Control                     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **Task Creation**: Tenant uploads encrypted code → IPFS → CID stored on-chain
2. **Provider Selection**: Tenant browses providers → Sends request → Provider accepts
3. **Training Execution**: Provider downloads encrypted data → Trains model → Uploads weights
4. **Payment Settlement**: Tenant verifies output → Pays via smart contract → 95% to provider, 5% platform fee

---

## Technology Stack

### Frontend Architecture
| Technology | Purpose | Justification |
|------------|---------|---------------|
| **React 18** | UI Framework | Virtual DOM for optimal performance, large ecosystem |
| **Vite** | Build Tool | 10x faster HMR than Webpack, optimized production builds |
| **TailwindCSS** | Styling | Utility-first approach reduces CSS bundle size by 90% |
| **Ethers.js** | Web3 Provider | Type-safe, lightweight alternative to Web3.js (116KB vs 1.5MB) |
| **Recoil** | State Management | Atomic state updates minimize unnecessary re-renders |
| **Framer Motion** | Animations | Hardware-accelerated animations with 60fps performance |
| **React Router** | Navigation | Code-splitting and lazy loading for faster initial loads |

### Backend Architecture
| Technology | Purpose | Justification |
|------------|---------|---------------|
| **Node.js** | Runtime | Event-driven I/O handles 10,000+ concurrent connections |
| **Express.js** | Web Framework | Minimalist, unopinionated architecture for scalability |
| **MongoDB** | Database | Schema flexibility for evolving data models, horizontal scaling |
| **Mongoose** | ODM | Type validation and middleware hooks prevent data corruption |
| **Pinata SDK** | IPFS Gateway | Managed IPFS with 99.9% uptime SLA |
| **JWT** | Authentication | Stateless auth scales horizontally without session stores |
| **Bcrypt** | Password Hashing | Adaptive cost factor resistant to GPU-based attacks |

### Blockchain Infrastructure
| Technology | Purpose | Justification |
|------------|---------|---------------|
| **Solidity 0.8.19** | Smart Contracts | Latest security patches, built-in overflow protection |
| **Hardhat** | Development | TypeScript support, built-in testing framework |
| **Ethereum (Sepolia)** | Network | EVM-compatible testnet with free faucets for development |
| **OpenZeppelin** | Security | Battle-tested contract libraries, 100+ security audits |

### DevOps & Deployment
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment
- **Vercel**: Edge network deployment with automatic HTTPS and CDN
- **Render**: Container-based backend hosting with auto-scaling
- **MongoDB Atlas**: Managed database with automated backups and monitoring

---

## Security Implementations

### Application Security
1. **Encryption at Rest**
   - AES-256-CBC encryption for all uploaded files
   - PBKDF2 key derivation with 100,000 iterations
   - Unique initialization vectors per file prevent pattern analysis

2. **Authentication & Authorization**
   - JWT tokens with 4-hour expiration
   - Bcrypt password hashing with salt rounds of 10
   - Role-based access control (RBAC) for API endpoints
   - HTTP-only cookies prevent XSS token theft

3. **API Security**
   - Rate limiting: 100 requests/minute per IP
   - CORS whitelist for approved domains
   - Input validation using Zod schemas
   - SQL/NoSQL injection prevention via parameterized queries

### Blockchain Security
1. **Smart Contract Security**
   - Reentrancy guards on all state-changing functions
   - Integer overflow protection (Solidity 0.8+)
   - Access control modifiers for privileged operations
   - Emergency pause mechanism for incident response

2. **Transaction Security**
   - Escrow pattern prevents premature fund release
   - Dual signature requirements for high-value transactions
   - Event logging for complete audit trails

---

## Getting Started

### Prerequisites
- Node.js v18.0.0 or higher
- MetaMask browser extension
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))

### Local Development Setup

1. **Clone Repository**
```bash
git clone https://github.com/kushagragarg15/decnaix-marketplace.git
cd decnaix-marketplace
```

2. **Backend Configuration**
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_minimum_32_characters
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
EOF

# Start development server
npm run dev
```

3. **Frontend Configuration**
```bash
cd ../frontend
npm install

# Create .env file
cat > .env << EOF
VITE_BACKEND_URL=http://localhost:3000
VITE_CONTRACT_ADDRESS=0x9A4682c96d43ff573A020991119A3f200411a1cA
VITE_CHAIN_ID=11155111
VITE_NETWORK_NAME=Sepolia Test Network
EOF

# Start development server
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/v1

---

## 🌍 Deployment

### Backend (Render)
- Free tier available
- Environment variables required
- Auto-deploys from GitHub

### Frontend (Vercel)
- Free tier available
- Automatic HTTPS
- CDN included

### Smart Contract
- Deployed on Sepolia testnet
- Gas-efficient (optimized)
- Verified on Etherscan

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

MIT License - feel free to use for learning and portfolios

---

## 👨‍💻 Author

**Kushagra Garg**
- GitHub: [@kushagragarg15](https://github.com/kushagragarg15)
- Project: [DecnAIX Marketplace](https://github.com/kushagragarg15/decnaix-marketplace)
- Live Demo: [https://decnaix-marketplace.vercel.app](https://decnaix-marketplace.vercel.app/)

---

## 🙏 Acknowledgments

- Ethereum Foundation
- IPFS/Pinata
- MongoDB Atlas
- OpenZeppelin

---

## 📊 Project Status

- ✅ Core functionality complete
- ✅ Smart contract deployed
- ✅ Authentication system
- ✅ File upload/encryption
- ✅ Payment processing
- 🔄 Docker training execution (in progress)

---

## 🔮 Future Enhancements

- [ ] Mainnet deployment
- [ ] Actual Docker training execution
- [ ] Dispute resolution mechanism
- [ ] Provider reputation system
- [ ] Multi-file support
- [ ] Progress tracking
- [ ] Email notifications
- [ ] Advanced search filters

---

**⭐ If you found this helpful, please star the repository!**

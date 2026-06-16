# 🚀 DecnAIX - Decentralized AI Training Marketplace

A blockchain-based marketplace connecting AI model trainers with GPU providers. Secure, transparent, and decentralized.

## 🌐 Live Demo

- **Frontend**: [Will be added after Vercel deployment]
- **Backend**: [Will be added after Render deployment]
- **Smart Contract**: `0x9A4682c96d43ff573A020991119A3f200411a1cA` (Sepolia)
- **Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x9A4682c96d43ff573A020991119A3f200411a1cA)

---

## 🎯 Features

### For Tenants (AI Trainers)
- 📤 Upload training code and datasets (encrypted)
- 🔍 Browse available GPU providers
- 💰 Pay securely via smart contracts
- 🔐 Get trained models after payment

### For Providers (GPU Owners)
- 💻 Register computing resources
- 📊 View and accept training requests
- 💵 Earn cryptocurrency for computing power
- ⚡ Automatic payment distribution

### Platform Features
- 🔒 **End-to-end encryption** (AES-256)
- 🌐 **Decentralized storage** (IPFS via Pinata)
- ⛓️ **Smart contract escrow** (5% platform fee, 95% to provider)
- 🔐 **MetaMask integration**
- 📱 **Responsive design**

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Ethers.js** - Web3 integration
- **Recoil** - State management
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Pinata** - IPFS storage
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Blockchain
- **Solidity** - Smart contract
- **Hardhat** - Development environment
- **Ethereum** - Blockchain (Sepolia testnet)
- **MetaMask** - Wallet

---

## 📦 Project Structure

```
DecnAIX-main/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── abi/         # Contract ABI
│   │   └── store/       # Recoil state
│   └── package.json
│
├── backend/              # Node.js backend
│   ├── src/
│   │   ├── controller/  # Business logic
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API routes
│   │   └── config/      # Configuration
│   └── package.json
│
├── contracts/           # Smart contracts
│   └── DecnAIX.sol     # Main contract
│
├── scripts/            # Deployment scripts
│   └── deploy.js
│
└── hardhat.config.js   # Hardhat config
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Pinata account
- MetaMask wallet
- Sepolia test ETH

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd DecnAIX-main
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key

# Start backend
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
VITE_BACKEND_URL=http://localhost:3000
VITE_CONTRACT_ADDRESS=0x9A4682c96d43ff573A020991119A3f200411a1cA
VITE_CHAIN_ID=11155111

# Start frontend
npm run dev
```

### 4. Access Application
Open http://localhost:5173

---

## 📝 Smart Contract

### Contract Address (Sepolia)
```
0x9A4682c96d43ff573A020991119A3f200411a1cA
```

### Key Functions
- `createTask()` - Tenant creates training task
- `acceptTask()` - Provider accepts task
- `markTaskCompleted()` - Provider marks completion
- `payAndUnlock()` - Tenant pays and gets access
- `getDownloadKey()` - Retrieve decryption key

### Payment Distribution
- **95%** to Provider
- **5%** to Platform

---

## 🔐 Security Features

- **AES-256-CBC** encryption for files
- **PBKDF2** key derivation
- **JWT** token authentication
- **Bcrypt** password hashing
- **Smart contract** escrow
- **Blockchain** transparency

---

## 🧪 Testing

### Register Accounts
1. Visit `/auth`
2. Register as **Provider**
3. Register as **Tenant** (different email)

### Test Provider Flow
1. Login as Provider
2. Add machine (CPU, RAM, Storage)
3. View pending requests
4. Accept requests

### Test Tenant Flow
1. Login as Tenant
2. Create ZIP with `main.py` and `requirements.txt`
3. Create task and upload
4. Approve MetaMask transaction
5. Select provider machine
6. Pay after completion

---

## 📚 Documentation

- **`PROJECT_ANALYSIS.md`** - Complete project overview
- **`INTERVIEW_PREP_TOPICS.md`** - Interview preparation
- **`LOCAL_TESTING_GUIDE.md`** - Testing guide
- **`PRODUCTION_DEPLOYMENT.md`** - Deployment guide

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

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

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

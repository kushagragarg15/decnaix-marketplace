# DecnAIX - Complete Project Analysis & Deployment Guide

## 📋 Project Overview

**DecnAIX** is a **Decentralized AI Model Training Marketplace** built on blockchain technology. It connects two types of users:
- **Tenants/Renters**: Users who want to train AI/ML models but don't have computing resources
- **Providers**: Users who own computing machines and want to rent them out for profit

### Core Concept
Think of it as "Airbnb for AI Computing Power" - people with ML training code can rent computational resources from others, pay them in cryptocurrency, and get their trained model weights back.

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 + Vite
- TailwindCSS for styling
- Recoil for state management
- Ethers.js for blockchain interaction
- React Router for navigation
- Framer Motion for animations

**Backend:**
- Node.js + Express
- MongoDB for database
- Pinata (IPFS) for decentralized file storage
- JWT authentication
- Bcrypt for password hashing

**Blockchain:**
- Solidity smart contract
- Ethereum-based (likely testnet like Sepolia or Goerli)
- MetaMask wallet integration

---

## 🔄 How It Works - Complete Flow

### 1. **User Registration & Authentication**
- Users sign up with email, password, and MetaMask wallet address
- They choose their role: Tenant (needs compute), Provider (has compute), or Both
- JWT tokens manage authentication

### 2. **Provider Adds Machines**
- Machine owners register their computers with specs (CPU, RAM, Storage)
- Machines are categorized: HIGH, MID, or BASIC
- Set availability status

### 3. **Tenant Creates Training Task**
- **Step 1**: Tenant prepares a ZIP file containing:
  - `main.py` (training script)
  - `requirements.txt` (Python dependencies)
  - Dataset files
  
- **Step 2**: Upload ZIP to platform
  - File is encrypted with a password
  - Encrypted file uploaded to IPFS via Pinata
  - Receives IPFS CID (Content Identifier)

- **Step 3**: Create blockchain transaction
  - Tenant calls smart contract `createTask()` function
  - Stores task metadata on blockchain
  - Task gets a unique task number

- **Step 4**: Store in database
  - Task details saved to MongoDB
  - Links blockchain task number with IPFS CID

### 4. **Tenant Selects Provider Machine**
- Browse available machines
- Send request to specific machine owner
- Request stored in Status collection

### 5. **Provider Accepts Request**
- Provider views pending requests
- Can accept or reject
- If accepted:
  - Machine marked as unavailable
  - Status changed to "WORKING"
  - Training begins

### 6. **Training Execution** (Conceptual)
The system generates a Dockerfile that:
- Downloads encrypted ZIP from IPFS
- Decrypts using password
- Installs Python dependencies
- Runs training script (`main.py`)
- Saves trained model weights to output file

### 7. **Payment & Completion**
- Provider marks task as completed on blockchain
- Tenant pays through smart contract `payAndUnlock()`
- Smart contract:
  - Takes 5% platform fee
  - Sends 95% to provider
  - Unlocks download key for trained weights
- Machine becomes available again

---

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  role: "Tenant" | "Provider" | "Both",
  hashedPassword: String,
  wallet_address: String
}
```

### Machines Collection
```javascript
{
  userId: ObjectId (ref: User),
  walletAddress: String,
  name: String (unique),
  category: "HIGH" | "MID" | "BASIC",
  cpu: String,
  ram: String,
  storage: String,
  available: Boolean (default: true)
}
```

### Tasks Collection
```javascript
{
  userId: ObjectId (ref: User),
  name: String (unique),
  ipfsCID: String,
  filePassword: String,
  duration: Number,
  taskNumber: String (from blockchain),
  status: "PENDING" | "REJECTED" | "ACCEPTED"
}
```

### Status Collection (Tracking)
```javascript
{
  taskId: ObjectId (ref: Task),
  machineId: ObjectId (ref: Machine),
  machineOwnerId: ObjectId (ref: User),
  status: "PENDING" | "WORKING" | "COMPLETED" | "FAILED"
}
```

---

## 🔐 Smart Contract Functions

### Key Functions:
1. **createTask(ipfsCodeHash, filePassword, duration)** - Tenant creates task
2. **acceptTask(taskId)** - Provider accepts task
3. **markTaskCompleted(taskId)** - Provider marks completion
4. **payAndUnlock(taskId)** - Tenant pays and gets download key
5. **getDownloadKey(taskId)** - Get password after payment
6. **withdraw()** - Platform owner withdraws fees

### Payment Flow:
- 5% goes to platform as fee
- 95% goes to provider
- Payment in cryptocurrency (ETH or testnet tokens)

---

## 📁 Project Structure

```
DecnAIX/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home/           # Landing page
│   │   │   ├── Rent/           # Tenant dashboard
│   │   │   └── provider/       # Provider dashboard
│   │   ├── abi/                # Smart contract ABI
│   │   ├── store/              # Recoil state
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controller/         # Business logic
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API endpoints
│   │   ├── services/           # Pinata, Training
│   │   ├── middlewares/        # Auth, Authorization
│   │   └── config/             # DB, Pinata config
│   └── index.js
│
└── contract/
    └── DecnAIX.sol             # Solidity smart contract
```

---

## 🚀 COMPLETE DEPLOYMENT GUIDE

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier works)
- Pinata account (for IPFS)
- MetaMask wallet
- Ethereum testnet tokens (Sepolia or Goerli)

---

## STEP 1: Backend Setup

### 1.1 Install Dependencies
```bash
cd backend
npm install
```

### 1.2 Create Environment File
Create `backend/.env`:
```env
PORT=3000
MONGO_PASSWORD=your_mongodb_password
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/decenAI
JWT_SECRET=your_super_secret_jwt_key_here
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
```

### 1.3 Get MongoDB Credentials
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Database Access → Add user → Create password
4. Network Access → Add IP (0.0.0.0/0 for testing)
5. Clusters → Connect → Get connection string
6. Replace `<password>` with your password

### 1.4 Get Pinata Credentials
1. Go to [Pinata](https://www.pinata.cloud/)
2. Sign up for free account
3. API Keys → Generate New Key
4. Copy API Key and Secret Key

### 1.5 Fix Database Connection
Edit `backend/src/config/db.js`:
```javascript
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 
  `mongodb+srv://username:${process.env.MONGO_PASSWORD}@cluster.mongodb.net/decenAI`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});
```

### 1.6 Fix Pinata Config
Create/Edit `backend/src/config/pinata.js`:
```javascript
import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
dotenv.config();

const pinata = pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY
);

export default pinata;
```

### 1.7 Start Backend
```bash
npm run dev
```
Should see: "running on port: 3000" and "Connected to MongoDB"

---

## STEP 2: Smart Contract Deployment

### 2.1 Install Hardhat
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

### 2.2 Create Deployment Script
Create `scripts/deploy.js`:
```javascript
async function main() {
  const DecenAIX = await ethers.getContractFactory("DecenAIX");
  const decenAIX = await DecenAIX.deploy();
  await decenAIX.deployed();
  
  console.log("DecenAIX deployed to:", decenAIX.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### 2.3 Configure Hardhat
Edit `hardhat.config.js`:
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
  }
};
```

### 2.4 Get Test Tokens
1. Get Sepolia ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
2. Need MetaMask wallet private key (NEVER share!)

### 2.5 Deploy Contract
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```
**Save the contract address!**

### 2.6 Update Contract ABI
After deployment, copy ABI:
```bash
cp artifacts/contracts/DecnAIX.sol/DecenAIX.json frontend/src/abi/DecnAIX.js
cp artifacts/contracts/DecnAIX.sol/DecenAIX.json backend/src/abi/DecnAIX.json
```

---

## STEP 3: Frontend Setup

### 3.1 Install Dependencies
```bash
cd frontend
npm install
```

### 3.2 Create Environment File
Create `frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_CHAIN_ID=11155111
```
*(11155111 is Sepolia testnet)*

### 3.3 Update Contract Configuration
Edit `frontend/src/config/contract.js` (create if doesn't exist):
```javascript
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
```

### 3.4 Start Frontend
```bash
npm run dev
```
Should open at `http://localhost:5173`

---

## STEP 4: Testing the Complete Flow

### 4.1 Setup MetaMask
1. Install MetaMask browser extension
2. Switch to Sepolia Test Network
3. Get test ETH from faucet

### 4.2 Register Users
1. Open frontend
2. Register as Provider (for machine owner)
3. Register as Tenant (for task creator)
4. Connect MetaMask when prompted

### 4.3 Test Provider Flow
1. Login as Provider
2. Navigate to "Add Machine"
3. Fill machine specs
4. Submit

### 4.4 Test Tenant Flow
1. Login as Tenant
2. Prepare test ZIP file with:
   - `main.py` (simple Python script)
   - `requirements.txt`
3. Create new task
4. Upload ZIP file
5. Confirm blockchain transaction
6. Select available machine
7. Send request

### 4.5 Test Complete Cycle
1. Provider accepts request
2. Mark as completed (simulated)
3. Tenant pays through smart contract
4. Verify payment received

---

## 📦 PRODUCTION DEPLOYMENT

### Backend Deployment (Railway/Render/Heroku)

#### Using Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Add environment variables in Railway dashboard
# Deploy
railway up
```

#### Using Render:
1. Push code to GitHub
2. Go to [Render](https://render.com)
3. New → Web Service
4. Connect GitHub repo
5. Set build command: `cd backend && npm install`
6. Set start command: `node index.js`
7. Add environment variables
8. Deploy

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

#### Using Netlify:
```bash
# Build
npm run build

# Deploy to Netlify
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables for Production:
**Backend:**
- `MONGO_PASSWORD`
- `MONGODB_URI`
- `JWT_SECRET`
- `PINATA_API_KEY`
- `PINATA_SECRET_API_KEY`
- `PORT` (usually auto-set)

**Frontend:**
- `VITE_BACKEND_URL` (your deployed backend URL)
- `VITE_CONTRACT_ADDRESS`
- `VITE_CHAIN_ID`

---

## 🔧 Common Issues & Fixes

### Issue 1: MongoDB Connection Failed
**Solution:** Check IP whitelist in MongoDB Atlas, use correct password

### Issue 2: MetaMask Not Connecting
**Solution:** Make sure on correct network (Sepolia), check browser console

### Issue 3: Contract Transaction Fails
**Solution:** Ensure enough test ETH, check contract address, verify network

### Issue 4: File Upload Fails
**Solution:** Check Pinata credentials, verify file is valid ZIP, check file size limits

### Issue 5: CORS Errors
**Solution:** Backend has `cors()` middleware, but verify frontend URL is allowed

---

## 🎓 Understanding for Interview/Presentation

### Key Points to Mention:

1. **Decentralization**: Files stored on IPFS (not centralized server), payments via blockchain

2. **Security**: 
   - Files encrypted before upload
   - Password only shared after payment
   - JWT authentication

3. **Trust Mechanism**: 
   - Smart contract handles payments (no middleman)
   - Transparent blockchain transactions
   - Platform takes only 5% fee

4. **Scalability**:
   - IPFS handles file storage
   - MongoDB for metadata
   - Can add more providers easily

5. **Use Cases**:
   - Small companies without GPU clusters
   - Students needing compute for projects
   - Researchers with limited resources

### Technical Highlights:
- **Full-stack**: React, Node.js, MongoDB, Solidity
- **Web3 Integration**: Ethers.js, MetaMask
- **File Encryption**: AES-256-CBC
- **RESTful API**: Express routes
- **State Management**: Recoil
- **Responsive Design**: TailwindCSS

---

## 🐛 Known Limitations

1. **Training Execution**: The Dockerfile generation exists but actual Docker execution is not implemented
2. **File Retrieval**: Download of trained weights after payment needs implementation
3. **Dispute Resolution**: Smart contract has dispute event but no resolution logic
4. **Testing**: No automated tests
5. **Validation**: Limited input validation on some endpoints

---

## ✅ What You Should Do Before Presenting

1. **Test Everything**: Register users, add machines, create tasks
2. **Prepare Demo Data**: Have sample ZIP files ready
3. **Check All APIs**: Test with Postman/Thunder Client
4. **Smart Contract**: Deploy and verify on testnet
5. **Documentation**: Keep this guide handy
6. **Screenshots**: Take screenshots of working features
7. **Backup Plan**: Have video recording if live demo fails

---

## 📚 Learning Resources

- **IPFS**: https://docs.ipfs.tech/
- **Pinata**: https://docs.pinata.cloud/
- **Ethers.js**: https://docs.ethers.org/
- **Solidity**: https://docs.soliditylang.org/
- **MongoDB**: https://www.mongodb.com/docs/

---

## 🎯 Summary

This is a **blockchain-based marketplace** where:
- People **rent computational power** for AI training
- Payments handled via **smart contracts**
- Files stored on **decentralized IPFS**
- Full **MERN stack + Web3** application

The core innovation is **removing trust issues** in a peer-to-peer compute marketplace using blockchain and encryption.

---

**Good luck with your presentation! 🚀**

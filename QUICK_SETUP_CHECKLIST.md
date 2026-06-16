# 🚀 DecnAIX Quick Setup Checklist

## Before You Start
- [ ] Node.js installed (v18+)
- [ ] Git installed
- [ ] MetaMask browser extension installed
- [ ] Code editor (VS Code recommended)

---

## ✅ Step-by-Step Setup Checklist

### 🔵 Phase 1: Accounts & Prerequisites (30 mins)

- [ ] **MongoDB Atlas Account**
  - Sign up at https://www.mongodb.com/cloud/atlas
  - Create free cluster (M0)
  - Create database user with password
  - Whitelist IP: 0.0.0.0/0 (for testing)
  - Copy connection string
  - ✏️ Note password: `_________________`

- [ ] **Pinata Account** 
  - Sign up at https://www.pinata.cloud/
  - Go to API Keys section
  - Create new key (admin access)
  - ✏️ API Key: `_________________`
  - ✏️ Secret Key: `_________________`

- [ ] **Infura Account** (for blockchain)
  - Sign up at https://infura.io/
  - Create new project
  - Copy Sepolia endpoint URL
  - ✏️ Infura URL: `_________________`

- [ ] **Get Test ETH**
  - Visit https://sepoliafaucet.com/
  - Enter your MetaMask wallet address
  - Claim test tokens
  - ✏️ Wallet Address: `_________________`

---

### 🔵 Phase 2: Backend Setup (20 mins)

- [ ] **Navigate to backend folder**
  ```bash
  cd backend
  ```

- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Create .env file**
  ```bash
  # Create backend/.env with:
  PORT=3000
  MONGO_PASSWORD=your_password_here
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=my_super_secret_jwt_key_12345
  PINATA_API_KEY=your_pinata_api_key
  PINATA_SECRET_API_KEY=your_pinata_secret_key
  ```

- [ ] **Fix database config** (backend/src/config/db.js)
  - Update MongoDB connection string
  - Use environment variable

- [ ] **Fix Pinata config** (backend/src/config/pinata.js)
  - Import environment variables
  - Initialize SDK properly

- [ ] **Test backend**
  ```bash
  npm run dev
  ```
  - [ ] Should see: "running on port: 3000"
  - [ ] Should see: "Connected to MongoDB"

---

### 🔵 Phase 3: Smart Contract Deployment (30 mins)

- [ ] **Install Hardhat in project root**
  ```bash
  cd ..
  npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
  ```

- [ ] **Initialize Hardhat**
  ```bash
  npx hardhat init
  ```
  - Choose "Create a JavaScript project"

- [ ] **Move contract file**
  ```bash
  # Copy DecnAIX.sol to contracts/
  ```

- [ ] **Create deployment script** (scripts/deploy.js)

- [ ] **Configure Hardhat** (hardhat.config.js)
  - Add Sepolia network configuration
  - Add your wallet private key (KEEP SECRET!)

- [ ] **Compile contract**
  ```bash
  npx hardhat compile
  ```
  - [ ] No errors shown

- [ ] **Deploy to Sepolia**
  ```bash
  npx hardhat run scripts/deploy.js --network sepolia
  ```
  - [ ] Note contract address: `_________________`

- [ ] **Copy ABI files**
  ```bash
  # Copy to frontend/src/abi/
  # Copy to backend/src/abi/
  ```

---

### 🔵 Phase 4: Frontend Setup (15 mins)

- [ ] **Navigate to frontend**
  ```bash
  cd frontend
  ```

- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Create .env file**
  ```bash
  # Create frontend/.env with:
  VITE_BACKEND_URL=http://localhost:3000
  VITE_CONTRACT_ADDRESS=your_contract_address_here
  VITE_CHAIN_ID=11155111
  ```

- [ ] **Update contract address in code**
  - Find where contract is imported
  - Update with your deployed address

- [ ] **Start frontend**
  ```bash
  npm run dev
  ```
  - [ ] Opens at http://localhost:5173
  - [ ] No console errors

---

### 🔵 Phase 5: Testing (30 mins)

- [ ] **MetaMask Setup**
  - [ ] Switch to Sepolia Test Network
  - [ ] Verify you have test ETH (at least 0.1)

- [ ] **Create Provider Account**
  - [ ] Navigate to signup page
  - [ ] Register with email/password
  - [ ] Select role: "Provider"
  - [ ] Connect MetaMask wallet
  - [ ] Login successful

- [ ] **Add Machine**
  - [ ] Go to Provider dashboard
  - [ ] Click "Add Machine"
  - [ ] Fill machine details (CPU, RAM, Storage)
  - [ ] Submit successfully
  - [ ] Machine appears in list

- [ ] **Create Tenant Account**
  - [ ] Logout
  - [ ] Register new account
  - [ ] Select role: "Tenant"
  - [ ] Connect MetaMask
  - [ ] Login successful

- [ ] **Prepare Test Data**
  - [ ] Create main.py (simple Python script)
    ```python
    print("Training started")
    import time
    time.sleep(5)
    print("Training complete")
    ```
  - [ ] Create requirements.txt (empty or `numpy`)
  - [ ] ZIP both files

- [ ] **Create Task**
  - [ ] Go to Tenant dashboard
  - [ ] Click "Create Task"
  - [ ] Upload ZIP file
  - [ ] Enter password (remember it!)
  - [ ] MetaMask transaction appears
  - [ ] Confirm transaction
  - [ ] Wait for confirmation
  - [ ] Task created successfully

- [ ] **Request Machine**
  - [ ] View available machines
  - [ ] Select provider's machine
  - [ ] Send request
  - [ ] Request appears in provider's dashboard

- [ ] **Accept Request (as Provider)**
  - [ ] Logout and login as Provider
  - [ ] View pending requests
  - [ ] Accept the task request
  - [ ] Machine status changes to unavailable

- [ ] **Complete & Pay (simulate)**
  - [ ] Provider marks task as complete
  - [ ] Login as Tenant
  - [ ] Pay for completed task
  - [ ] MetaMask transaction
  - [ ] Payment successful
  - [ ] Provider receives payment (minus 5% fee)

---

## 🎯 Final Checks Before Demo

- [ ] **All services running**
  - [ ] Backend: http://localhost:3000
  - [ ] Frontend: http://localhost:5173
  - [ ] MongoDB connected
  - [ ] Pinata configured

- [ ] **Test accounts ready**
  - [ ] Provider account with machine
  - [ ] Tenant account with funds
  - [ ] Both wallets have test ETH

- [ ] **Demo data prepared**
  - [ ] Sample ZIP files ready
  - [ ] Screenshots of working features
  - [ ] Contract address noted down

- [ ] **Documentation ready**
  - [ ] PROJECT_ANALYSIS.md read
  - [ ] Understand the flow
  - [ ] Can explain each component

---

## 🔴 Troubleshooting Quick Fixes

### Backend won't start
```bash
# Check node version
node --version  # Should be 18+

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### MongoDB connection fails
- Check internet connection
- Verify password in .env
- Confirm IP whitelist (0.0.0.0/0)
- Test connection string format

### MetaMask not connecting
- Ensure on Sepolia network
- Check browser console for errors
- Try disconnecting and reconnecting
- Clear site data and retry

### Contract deployment fails
- Verify you have test ETH
- Check Infura URL is correct
- Confirm private key is correct (keep secret!)
- Try increasing gas limit

### File upload fails
- Check file is valid ZIP format
- Verify Pinata credentials
- Check file size (< 10MB for free tier)
- Test Pinata API directly

---

## 📝 Important URLs to Bookmark

- Sepolia Faucet: https://sepoliafaucet.com/
- Sepolia Etherscan: https://sepolia.etherscan.io/
- MongoDB Atlas: https://cloud.mongodb.com/
- Pinata: https://app.pinata.cloud/
- Infura: https://infura.io/dashboard

---

## 🎓 Quick Presentation Tips

**Opening Line:**
"DecnAIX is a decentralized marketplace that connects people who need AI computational power with those who have it, using blockchain for trustless payments."

**Key Features to Highlight:**
1. Decentralized file storage (IPFS)
2. Smart contract escrow payments
3. Encrypted file sharing
4. Peer-to-peer compute rental
5. 5% platform fee structure

**Tech Stack to Mention:**
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express + MongoDB
- Blockchain: Solidity + Ethers.js
- Storage: IPFS via Pinata
- Security: AES-256 encryption + JWT

**Live Demo Flow:**
1. Show provider adding machine (1 min)
2. Show tenant creating task (2 min)
3. Show provider accepting request (1 min)
4. Show payment transaction (1 min)
5. Show blockchain transaction on Sepolia Etherscan (1 min)

---

## ✅ Done!

When all checkboxes are complete, you're ready to demo and deploy! 🚀

**Good Luck!**

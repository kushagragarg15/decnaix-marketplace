# 🔗 Smart Contract Deployment Guide

Your backend is running! Now let's deploy the smart contract to blockchain.

---

## 📋 What You'll Need

- [ ] MetaMask wallet with Sepolia test ETH
- [ ] Infura account (for blockchain RPC)
- [ ] Hardhat (we'll install)
- [ ] 10-15 minutes

---

## ✅ Step 1: Get Sepolia Test ETH (5 minutes)

### 1.1 Get Your Wallet Address
- Open MetaMask
- Click on your account name at top
- Click to copy your address (starts with 0x...)
- Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb6`

### 1.2 Get Free Test ETH
Visit **ANY** of these faucets (try multiple if needed):

**Option 1: Alchemy Faucet** (Recommended)
- https://www.alchemy.com/faucets/ethereum-sepolia
- Login with your email
- Paste wallet address
- Click "Send Me ETH"

**Option 2: Infura Faucet**
- https://www.infura.io/faucet/sepolia
- Paste wallet address
- Complete captcha
- Receive 0.5 ETH

**Option 3: QuickNode Faucet**
- https://faucet.quicknode.com/ethereum/sepolia
- Paste wallet address
- Receive ETH

**Option 4: Sepolia PoW Faucet**
- https://sepolia-faucet.pk910.de/
- Mine for test ETH (takes time)

### 1.3 Verify You Got ETH
- Open MetaMask
- Make sure you're on **Sepolia Test Network**
- You should see balance (at least 0.1 ETH)

---

## ✅ Step 2: Get Infura API Key (5 minutes)

### 2.1 Sign Up for Infura
- Visit: https://infura.io/
- Click **"Get Started for Free"**
- Sign up with email
- Verify email

### 2.2 Create New Project
- After login, click **"Create New API Key"**
- Choose **"Web3 API (Ethereum, Polygon, etc.)"**
- Name: `DecenAIX` (or any name)
- Click **"Create"**

### 2.3 Get Sepolia Endpoint
- Click on your new project
- Under **"API Keys"** section
- Find **"ENDPOINTS"**
- Copy the **Sepolia** endpoint URL
- It looks like: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`

### 2.4 Save Your Keys
```
Infura Project ID: __________________________
Sepolia Endpoint: https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

---

## ✅ Step 3: Setup Hardhat for Deployment

### 3.1 Install Hardhat
Open a new terminal in project root:

```bash
cd c:\Users\namas\Downloads\DecnAIX-main\DecnAIX-main
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox ethers
```

### 3.2 Initialize Hardhat
```bash
npx hardhat init
```

When prompted:
- Choose: **"Create a JavaScript project"**
- Project root: Press Enter (default)
- .gitignore: **Yes**
- Dependencies: **Yes** (install sample project dependencies)

### 3.3 Move Contract File
The contract is already in `contract/DecnAIX.sol`. We need to move it:

```bash
# Create contracts folder if it doesn't exist
mkdir contracts

# Copy the contract
copy contract\DecnAIX.sol contracts\DecnAIX.sol
```

---

## ✅ Step 4: Configure Hardhat

### 4.1 Get Your MetaMask Private Key

**⚠️ NEVER SHARE THIS KEY! KEEP IT SECRET!**

1. Open MetaMask
2. Click three dots (⋮) on your account
3. Click **"Account Details"**
4. Click **"Show Private Key"**
5. Enter your MetaMask password
6. Click to reveal and copy
7. It's a 64-character hex string

### 4.2 Create .env for Contract Deployment

Create `c:\Users\namas\Downloads\DecnAIX-main\DecnAIX-main\.env`:

```env
INFURA_API_KEY=your_infura_project_id_here
SEPOLIA_PRIVATE_KEY=your_metamask_private_key_here
```

**Example:**
```env
INFURA_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
SEPOLIA_PRIVATE_KEY=0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

### 4.3 Update hardhat.config.js

Replace the content with:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      chainId: 11155111
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
```

---

## ✅ Step 5: Create Deployment Script

### 5.1 Create deploy.js

Create `scripts/deploy.js`:

```javascript
async function main() {
  console.log("🚀 Starting deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
  
  // Deploy contract
  console.log("\n📦 Deploying DecenAIX contract...");
  const DecenAIX = await ethers.getContractFactory("DecenAIX");
  const decenAIX = await DecenAIX.deploy();
  
  await decenAIX.waitForDeployment();
  
  const contractAddress = await decenAIX.getAddress();
  
  console.log("\n✅ DecenAIX deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("\n🔗 View on Sepolia Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);
  
  console.log("\n📋 Save this contract address - you'll need it for frontend!");
  console.log("\n⚠️  IMPORTANT: Copy the contract address above!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
```

---

## ✅ Step 6: Compile Contract

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully
```

---

## ✅ Step 7: Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**This will take 30-60 seconds.**

Expected output:
```
🚀 Starting deployment...
📝 Deploying contracts with account: 0x742d...
💰 Account balance: 0.5 ETH

📦 Deploying DecenAIX contract...

✅ DecenAIX deployed successfully!
📍 Contract Address: 0x1234567890abcdef1234567890abcdef12345678

🔗 View on Sepolia Etherscan:
https://sepolia.etherscan.io/address/0x1234567890abcdef1234567890abcdef12345678

📋 Save this contract address - you'll need it for frontend!
```

### 🎯 COPY AND SAVE THE CONTRACT ADDRESS!

**Your Contract Address:** `_________________________________`

---

## ✅ Step 8: Verify Deployment on Etherscan

1. Copy the Etherscan URL from output
2. Open in browser
3. You should see:
   - Contract created
   - Balance: 0 ETH
   - Creator: Your wallet address
   - Transaction history

---

## ✅ Step 9: Copy Contract ABI

### 9.1 For Frontend
```bash
# Copy ABI to frontend
copy artifacts\contracts\DecnAIX.sol\DecnAIX.json frontend\src\abi\
```

### 9.2 For Backend
```bash
# Copy ABI to backend
copy artifacts\contracts\DecnAIX.sol\DecnAIX.json backend\src\abi\
```

---

## 🔴 Troubleshooting

### Error: "insufficient funds"
- You need more Sepolia ETH
- Visit faucets again
- Wait 24 hours for more

### Error: "Invalid API Key"
- Check your Infura API key in .env
- Make sure no extra spaces
- Verify the key is active

### Error: "private key should be 66 characters"
- Your private key should start with 0x
- Make sure you copied the full key
- Check for extra spaces

### Error: "network sepolia not found"
- Check hardhat.config.js syntax
- Verify you have dotenv installed: `npm install dotenv`

### Contract deployment hangs
- Check your internet connection
- Try again (gas prices might be high)
- Make sure MetaMask is unlocked

---

## ✅ Success Checklist

- [ ] Got Sepolia test ETH (at least 0.1)
- [ ] Created Infura account and got API key
- [ ] Installed Hardhat and dependencies
- [ ] Created .env with Infura key and private key
- [ ] Updated hardhat.config.js
- [ ] Created deploy.js script
- [ ] Compiled contract successfully
- [ ] Deployed contract to Sepolia
- [ ] Saved contract address
- [ ] Verified on Etherscan
- [ ] Copied ABI files to frontend and backend

---

## 🎯 Next Steps

Once deployment is successful:

1. ✅ Smart contract deployed
2. ⏭️ Configure frontend .env with contract address
3. ⏭️ Test the complete application

---

**Let me know when you get your contract address!** 🚀

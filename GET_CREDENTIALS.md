# 🔑 Get Your Deployment Credentials

Your Hardhat setup is complete! Now you need two things to deploy:

---

## ✅ Step 1: Get Sepolia Test ETH (5 mins)

### Your MetaMask Wallet Address
1. Open MetaMask extension
2. Make sure you're on **Sepolia Test Network** (top left dropdown)
3. Click your account name to copy address (starts with 0x...)
4. Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb6`

### Get Free Test ETH from Faucets

Visit **ANY** of these (try multiple if needed):

**Option 1: Alchemy Faucet** ⭐ Recommended
```
https://www.alchemy.com/faucets/ethereum-sepolia
```
- Login with email/Google
- Paste your wallet address
- Click "Send Me ETH"
- Get 0.5 Sepolia ETH

**Option 2: Infura Faucet**
```
https://www.infura.io/faucet/sepolia
```
- Paste wallet address
- Complete captcha
- Receive 0.5 ETH

**Option 3: QuickNode Faucet**
```
https://faucet.quicknode.com/ethereum/sepolia
```

**Option 4: Google Cloud Faucet**
```
https://cloud.google.com/application/web3/faucet/ethereum/sepolia
```

### Verify You Got ETH
- Open MetaMask
- Check balance shows at least **0.1 ETH**
- If not, try another faucet

---

## ✅ Step 2: Get Infura API Key (5 mins)

### Sign Up
1. Go to: https://infura.io/
2. Click **"Get Started for Free"**
3. Sign up with email
4. Verify email

### Create API Key
1. After login, dashboard appears
2. Click **"Create New API Key"** or **"API Keys"** → **"Create New Key"**
3. Select: **"Web3 API (Ethereum, Polygon, etc.)"**
4. Name: `DecenAIX` (or any name)
5. Click **"Create"**

### Get Your Keys
1. Click on your new API key
2. Under **"API Key"** section, you'll see:
   - **API Key ID** (this is what you need)
   - Example: `abc123def456ghi789jkl012mno345pq`

3. Under **"Endpoints"** section:
   - Find **Sepolia**
   - URL looks like: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`
   - The part after `/v3/` is your **INFURA_API_KEY**

### Save Your Infura Key
```
Infura API Key: _________________________________
```

---

## ✅ Step 3: Get MetaMask Private Key

**⚠️ CRITICAL: NEVER SHARE THIS KEY WITH ANYONE!**
**⚠️ This key gives full control of your wallet!**

### Export Private Key
1. Open MetaMask
2. Click the **three dots (⋮)** on your account
3. Click **"Account Details"**
4. Click **"Show Private Key"**
5. Enter your MetaMask **password**
6. Click to reveal the key
7. Copy it (64-character hexadecimal string)
8. Should start with `0x`

Example format: `0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890`

### Save Your Private Key (Keep Secret!)
```
Private Key: 0x_________________________________
```

---

## ✅ Step 4: Update .env File

Open: `c:\Users\namas\Downloads\DecnAIX-main\DecnAIX-main\.env`

Replace with your actual values:

```env
# Infura Configuration
INFURA_API_KEY=paste_your_infura_api_key_here

# MetaMask Private Key (KEEP SECRET!)
SEPOLIA_PRIVATE_KEY=0x_paste_your_private_key_here
```

### Example (with fake keys):
```env
INFURA_API_KEY=abc123def456ghi789jkl012mno345pq
SEPOLIA_PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

### Important:
- No spaces around `=`
- No quotes around values
- Private key MUST start with `0x`
- Private key MUST be 66 characters total (0x + 64 hex characters)

---

## ✅ Step 5: Test Compilation

After updating `.env`:

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully (evm target: paris).
```

---

## ✅ Step 6: Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

This will:
1. Connect to Sepolia via Infura
2. Use your MetaMask account
3. Deploy the smart contract
4. Show you the contract address

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

📋 SAVE THIS CONTRACT ADDRESS!
💾 Deployment info saved to: deployment-info.json
```

---

## 🔴 Troubleshooting

### "private key too short"
- Your private key in `.env` is incomplete
- Must be 66 characters (0x + 64 hex)
- Make sure you copied the FULL key from MetaMask

### "insufficient funds"
- You need more Sepolia ETH
- Visit faucets again
- Some faucets have 24hr limits

### "invalid project id"
- Check your Infura API key
- Make sure no spaces in `.env`
- Try creating a new Infura project

### "network sepolia not found"
- Check `hardhat.config.js` syntax
- Make sure `dotenv` is installed
- Verify `.env` is in root folder

---

## ✅ Checklist

- [ ] Got Sepolia test ETH (at least 0.1)
- [ ] Created Infura account
- [ ] Got Infura API Key
- [ ] Exported MetaMask private key (KEPT SECRET!)
- [ ] Updated `.env` with both keys
- [ ] Contract compiled successfully
- [ ] Ready to deploy!

---

## 🎯 Next Command

Once your `.env` is ready:

```bash
npx hardhat compile
```

If successful, then:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Good luck! Let me know the contract address once deployed!** 🚀
